// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Based on https://github.com/denoland/deno/blob/main/ext/websocket/02_websocketstream.js

"use strict";

/// <reference path="../../core/internal.d.ts" />

import { primordials } from '../../core/00_primordials.js';
import * as core from '../../core/01_core.js';
import * as ops from '../../ops/index.js';

import * as webidl from '../webidl/00_webidl.js';
import { writableStreamClose, Deferred, WritableStream } from '../web/06_streams.js';
import { DOMException } from '../web/01_dom_exception.js';
import { add, remove } from '../web/03_abort_signal.js';
import { headersFromHeaderList, headerListFromHeaders, fillHeaders } from '../fetch/20_headers.js';
import { URL } from '../url/00_url.js';

const {
  ArrayPrototypeJoin,
  ArrayPrototypeMap,
  Error,
  ObjectPrototypeIsPrototypeOf,
  PromisePrototypeCatch,
  PromisePrototypeThen,
  Set,
  StringPrototypeEndsWith,
  StringPrototypeToLowerCase,
  Symbol,
  SymbolFor,
  TypeError,
  Uint8ArrayPrototype,
} = primordials;

webidl.converters.WebSocketStreamOptions = webidl.createDictionaryConverter(
  "WebSocketStreamOptions",
  [
    {
      key: "protocols",
      converter: webidl.converters["sequence<USVString>"],
      get defaultValue() {
        return [];
      },
    },
    {
      key: "signal",
      converter: webidl.converters.AbortSignal,
    },
    {
      key: "headers",
      converter: webidl.converters.HeadersInit,
    },
  ],
);
webidl.converters.WebSocketCloseInfo = webidl.createDictionaryConverter(
  "WebSocketCloseInfo",
  [
    {
      key: "code",
      converter: webidl.converters["unsigned short"],
    },
    {
      key: "reason",
      converter: webidl.converters.USVString,
      defaultValue: "",
    },
  ],
);

const CLOSE_RESPONSE_TIMEOUT = 5000;

const _rid = Symbol("[[rid]]");
const _url = Symbol("[[url]]");
const _connection = Symbol("[[connection]]");
const _closed = Symbol("[[closed]]");
const _earlyClose = Symbol("[[earlyClose]]");
const _closeSent = Symbol("[[closeSent]]");
export class WebSocketStream {
  // @ts-ignore
  [_rid]: number;

  // @ts-ignore
  [_url]: string;
  get url() {
    webidl.assertBranded(this, WebSocketStreamPrototype);
    return this[_url];
  }

  constructor(url: string | URL, options) {
    this[webidl.brand] = webidl.brand;
    const prefix = "Failed to construct 'WebSocketStream'";
    webidl.requiredArguments(arguments.length, 1, { prefix });
    url = webidl.converters.USVString(url, {
      prefix,
      context: "Argument 1",
    });
    options = webidl.converters.WebSocketStreamOptions(options, {
      prefix,
      context: "Argument 2",
    });

    const wsURL = new URL(url);

    if (wsURL.protocol !== "ws:" && wsURL.protocol !== "wss:") {
      throw new DOMException(
        "Only ws & wss schemes are allowed in a WebSocket URL.",
        "SyntaxError",
      );
    }

    if (wsURL.hash !== "" || StringPrototypeEndsWith(wsURL.href, "#")) {
      throw new DOMException(
        "Fragments are not allowed in a WebSocket URL.",
        "SyntaxError",
      );
    }

    this[_url] = wsURL.href;

    if (
      options.protocols.length !==
        new Set(
          ArrayPrototypeMap(
            options.protocols,
            (p) => StringPrototypeToLowerCase(p),
          ),
        ).size
    ) {
      throw new DOMException(
        "Can't supply multiple times the same protocol.",
        "SyntaxError",
      );
    }

    const headers = headersFromHeaderList([], "request");
    if (options.headers !== undefined) {
      fillHeaders(headers, options.headers);
    }

    const cancelRid = ops.op_ws_check_permission_and_cancel_handle(
      "WebSocketStream.abort()",
      this[_url],
      true,
    );

    if (options.signal?.aborted) {
      core.close(cancelRid);
      const err = options.signal.reason;
      this[_connection].reject(err);
      this[_closed].reject(err);
    } else {
      const abort = () => {
        core.close(cancelRid);
      };
      options.signal?.[add](abort);
      PromisePrototypeThen(
        core.opAsync(
          "op_ws_create",
          "new WebSocketStream()",
          this[_url],
          options.protocols
            ? ArrayPrototypeJoin(options.protocols, ", ")
            : "",
          cancelRid,
          headerListFromHeaders(headers),
        ),
        (create) => {
          options.signal?.[remove](abort);
          if (this[_earlyClose]) {
            PromisePrototypeThen(
              core.opAsync("op_ws_close", create.rid),
              () => {
                PromisePrototypeThen(
                  (async () => {
                    while (true) {
                      const { kind } = await core.opAsync(
                        "op_ws_next_event",
                        create.rid,
                      );

                      if (kind === "close") {
                        break;
                      }
                    }
                  })(),
                  () => {
                    const err = new DOMException(
                      "Closed while connecting",
                      "NetworkError",
                    );
                    this[_connection].reject(err);
                    this[_closed].reject(err);
                  },
                );
              },
              () => {
                const err = new DOMException(
                  "Closed while connecting",
                  "NetworkError",
                );
                this[_connection].reject(err);
                this[_closed].reject(err);
              },
            );
          } else {
            this[_rid] = create.rid;

            const writable = new WritableStream({
              write: async (chunk) => {
                if (typeof chunk === "string") {
                  await core.opAsync("op_ws_send", this[_rid], {
                    kind: "text",
                    value: chunk,
                  });
                } else if (
                  ObjectPrototypeIsPrototypeOf(Uint8ArrayPrototype, chunk)
                ) {
                  await core.opAsync("op_ws_send", this[_rid], {
                    kind: "binary",
                    value: chunk,
                  }, chunk);
                } else {
                  throw new TypeError(
                    "A chunk may only be either a string or an Uint8Array",
                  );
                }
              },
              // @ts-ignore
              close: async (reason) => {
                try {
                  this.close(reason?.code !== undefined ? reason : {});
                } catch (_) {
                  this.close();
                }
                await this.closed;
              },
              abort: async (reason) => {
                try {
                  this.close(reason?.code !== undefined ? reason : {});
                } catch (_) {
                  this.close();
                }
                await this.closed;
              },
            });
            const pull = async (controller) => {
              const { kind, value } = await core.opAsync(
                "op_ws_next_event",
                this[_rid],
              );

              switch (kind) {
                case "string": {
                  controller.enqueue(value);
                  break;
                }
                case "binary": {
                  controller.enqueue(value);
                  break;
                }
                case "ping": {
                  await core.opAsync("op_ws_send", this[_rid], {
                    kind: "pong",
                  });
                  await pull(controller);
                  break;
                }
                case "closed":
                case "close": {
                  this[_closed].resolve(value);
                  core.tryClose(this[_rid]);
                  break;
                }
                case "error": {
                  const err = new Error(value);
                  this[_closed].reject(err);
                  controller.error(err);
                  core.tryClose(this[_rid]);
                  break;
                }
              }

              if (
                this[_closeSent].state === "fulfilled" &&
                this[_closed].state === "pending"
              ) {
                if (
                  new Date().getTime() - await this[_closeSent].promise <=
                    CLOSE_RESPONSE_TIMEOUT
                ) {
                  return pull(controller);
                }

                this[_closed].resolve(value);
                core.tryClose(this[_rid]);
              }
            };
            const readable = new ReadableStream({
              start: (controller) => {
                PromisePrototypeThen(this.closed, () => {
                  try {
                    controller.close();
                  } catch (_) {
                    // needed to ignore warnings & assertions
                  }
                  try {
                    PromisePrototypeCatch(
                      writableStreamClose(writable),
                      () => {},
                    );
                  } catch (_) {
                    // needed to ignore warnings & assertions
                  }
                });

                PromisePrototypeThen(this[_closeSent].promise, () => {
                  if (this[_closed].state === "pending") {
                    return pull(controller);
                  }
                });
              },
              pull,
              cancel: async (reason) => {
                try {
                  this.close(reason?.code !== undefined ? reason : {});
                } catch (_) {
                  this.close();
                }
                await this.closed;
              },
            });

            this[_connection].resolve({
              readable,
              writable,
              extensions: create.extensions ?? "",
              protocol: create.protocol ?? "",
            });
          }
        },
        (err) => {
          if (ObjectPrototypeIsPrototypeOf(core.InterruptedPrototype, err)) {
            // The signal was aborted.
            err = options.signal.reason;
          } else {
            core.tryClose(cancelRid);
          }
          this[_connection].reject(err);
          this[_closed].reject(err);
        },
      );
    }
  }

  // @ts-ignore
  [_connection]: Deferred = new Deferred();
  get connection() {
    webidl.assertBranded(this, WebSocketStreamPrototype);
    return this[_connection].promise;
  }

  // @ts-ignore
  [_earlyClose]: boolean = false;
  // @ts-ignore
  [_closed]: Deferred = new Deferred();
  // @ts-ignore
  [_closeSent]: Deferred = new Deferred();
  get closed() {
    webidl.assertBranded(this, WebSocketStreamPrototype);
    return this[_closed].promise;
  }

  close(closeInfo?) {
    webidl.assertBranded(this, WebSocketStreamPrototype);
    closeInfo = webidl.converters.WebSocketCloseInfo(closeInfo, {
      prefix: "Failed to execute 'close' on 'WebSocketStream'",
      context: "Argument 1",
    });

    if (
      closeInfo.code &&
      !(closeInfo.code === 1000 ||
        (3000 <= closeInfo.code && closeInfo.code < 5000))
    ) {
      throw new DOMException(
        "The close code must be either 1000 or in the range of 3000 to 4999.",
        "InvalidAccessError",
      );
    }

    const encoder = new TextEncoder();
    if (
      closeInfo.reason && encoder.encode(closeInfo.reason).byteLength > 123
    ) {
      throw new DOMException(
        "The close reason may not be longer than 123 bytes.",
        "SyntaxError",
      );
    }

    let code = closeInfo.code;
    if (closeInfo.reason && code === undefined) {
      code = 1000;
    }

    if (this[_connection].state === "pending") {
      this[_earlyClose] = true;
    } else if (this[_closed].state === "pending") {
      PromisePrototypeThen(
        core.opAsync("op_ws_close", this[_rid], code, closeInfo.reason),
        () => {
          setTimeout(() => {
            this[_closeSent].resolve(new Date().getTime());
          }, 0);
        },
        (err) => {
          this[_rid] && core.tryClose(this[_rid]);
          this[_closed].reject(err);
        },
      );
    }
  }

  [SymbolFor("Deno.customInspect")](inspect) {
    return `${this.constructor.name} ${
      inspect({
        url: this.url,
      })
    }`;
  }
}

export const WebSocketStreamPrototype = WebSocketStream.prototype;
