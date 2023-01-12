// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
"use strict";

export interface RuntimeOptions {
  unstableFlag?: boolean;
  inspectFlag?: boolean;
  debugFlag?: boolean;
  /** Value of 'globalThis.location' used by some web APIs */
  location: string | null;
  cpuCount: number;
  userAgent: string;
  locale: string;
  args: string[];
  pid: number;
  ppid: number;
  noColor?: boolean;

  //  Gjsify: We set the target directly in packages/deno/runtime/src/runtime/js/01_version.ts
  // denoVersion: string;
  // v8Version: string;
  // tsVersion: string;
  // gjsVersion: string;

  // Gjsify: We set the target directly in packages/deno/runtime/src/runtime/js/01_build.ts
  // target?: string;

  isTty: boolean;
  enableTestingFeaturesFlag?: boolean;
}

type DenoNs = typeof denoNs;

interface FinalDenoNs extends DenoNs {
  core: typeof core;
  internal: any;
  resources: typeof core.resources;
  close: typeof core.close;
  spawnChild: ReturnType<typeof __bootstrap.spawn.createSpawnChild>;
  spawn: ReturnType<typeof __bootstrap.spawn.createSpawn>;
  spawnSync: ReturnType<typeof __bootstrap.spawn.createSpawnSync>;
  serve: ReturnType<typeof __bootstrap.flash.createServe>;
  listenDatagram: ReturnType<typeof __bootstrap.net.createListenDatagram>;
  Command: ReturnType<typeof __bootstrap.spawn.createCommand>;
}

// Removes the `__proto__` for security reasons.
// https://tc39.es/ecma262/#sec-get-object.prototype.__proto__
if ((Object.prototype as any).__proto__ !== undefined) {
  // @ts-ignore
  delete Object.prototype.__proto__;
}

// Remove Intl.v8BreakIterator because it is a non-standard API.
if ((Intl as any)?.v8BreakIterator !== undefined) {
  // @ts-ignore
  delete Intl.v8BreakIterator;
}

import { primordials } from '../../core/00_primordials.js';
import * as core from '../../core/01_core.js';
import * as ops from '../../ops/index.js';
const {
  ArrayPrototypeIndexOf,
  ArrayPrototypePush,
  ArrayPrototypeShift,
  ArrayPrototypeSplice,
  ArrayPrototypeMap,
  DateNow,
  Error,
  ErrorPrototype,
  FunctionPrototypeCall,
  FunctionPrototypeBind,
  ObjectAssign,
  ObjectDefineProperty,
  ObjectDefineProperties,
  ObjectFreeze,
  ObjectPrototypeIsPrototypeOf,
  ObjectSetPrototypeOf,
  PromiseResolve,
  Symbol,
  SymbolFor,
  SymbolIterator,
  PromisePrototypeThen,
  SafeWeakMap,
  TypeError,
  WeakMapPrototypeDelete,
  WeakMapPrototypeGet,
  WeakMapPrototypeSet,
} = primordials;

import { DedicatedWorkerGlobalScope } from '../../ext/web/04_global_interfaces.js';

import { __bootstrap } from './80_bootstrap.js';
import { denoNs, denoNsUnstable } from './90_deno_ns.js';

const util = __bootstrap.util;
const event = __bootstrap.event;
const eventTarget = __bootstrap.eventTarget;
const location = __bootstrap.location;
const build = __bootstrap.build;
const version = __bootstrap.version;
const os = __bootstrap.os;
const timers = __bootstrap.timers;
const colors = __bootstrap.colors;
const inspectArgs = __bootstrap.console.inspectArgs;
const quoteString = __bootstrap.console.quoteString;
const internals = __bootstrap.internals;
const performance = __bootstrap.performance;
const net = __bootstrap.net;
const url = __bootstrap.url;
const fetch = __bootstrap.fetch;
const messagePort = __bootstrap.messagePort;
// const denoNs = __bootstrap.denoNs;
// const denoNsUnstable = __bootstrap.denoNsUnstable;
const errors = __bootstrap.errors.errors;
const webidl = __bootstrap.webidl;
const domException = __bootstrap.domException;
const { defineEventHandler, reportException } = __bootstrap.event;
const { deserializeJsMessageData, serializeJsMessageData } =
  __bootstrap.messagePort;

import {
  windowOrWorkerGlobalScope,
  unstableWindowOrWorkerGlobalScope,
  workerRuntimeGlobalProperties,
  mainRuntimeGlobalProperties,
  setNumCpus,
  setUserAgent,
  setLanguage,
} from './98_global_scope.js';

let windowIsClosing = false;

function windowClose() {
  if (!windowIsClosing) {
    windowIsClosing = true;
    // Push a macrotask to exit after a promise resolve.
    // This is not perfect, but should be fine for first pass.
    PromisePrototypeThen(
      PromiseResolve(),
      () =>
        FunctionPrototypeCall(timers.setTimeout, null, () => {
          // This should be fine, since only Window/MainWorker has .close()
          os.exit(0);
        }, 0),
    );
  }
}

function workerClose() {
  if (isClosing) {
    return;
  }

  isClosing = true;
  ops.op_worker_close();
}

function postMessage(message, transferOrOptions = {}) {
  const prefix =
    "Failed to execute 'postMessage' on 'DedicatedWorkerGlobalScope'";
  webidl.requiredArguments(arguments.length, 1, { prefix });
  message = webidl.converters.any(message);
  let options;
  if (
    webidl.type(transferOrOptions) === "Object" &&
    transferOrOptions !== undefined &&
    transferOrOptions[SymbolIterator] !== undefined
  ) {
    const transfer = webidl.converters["sequence<object>"](
      transferOrOptions,
      { prefix, context: "Argument 2" },
    );
    options = { transfer };
  } else {
    options = webidl.converters.StructuredSerializeOptions(
      transferOrOptions,
      {
        prefix,
        context: "Argument 2",
      },
    );
  }
  const { transfer } = options;
  const data = serializeJsMessageData(message, transfer);
  ops.op_worker_post_message(data);
}

let isClosing = false;
let globalDispatchEvent;

async function pollForMessages() {
  if (!globalDispatchEvent) {
    globalDispatchEvent = FunctionPrototypeBind(
      globalThis.dispatchEvent,
      globalThis,
    );
  }
  while (!isClosing) {
    const data = await core.opAsync("op_worker_recv_message");
    if (data === null) break;
    const v = deserializeJsMessageData(data);
    const message = v[0];
    const transferables = v[1];

    const msgEvent = new event.MessageEvent("message", {
      cancelable: false,
      data: message,
      ports: transferables.filter((t) =>
        ObjectPrototypeIsPrototypeOf(messagePort.MessagePortPrototype, t)
      ) as MessagePort[],
    });

    try {
      globalDispatchEvent(msgEvent);
    } catch (e) {
      const errorEvent = new event.ErrorEvent("error", {
        cancelable: true,
        message: e.message,
        lineno: e.lineNumber ? e.lineNumber + 1 : undefined,
        colno: e.columnNumber ? e.columnNumber + 1 : undefined,
        filename: e.fileName,
        error: e,
      });

      globalDispatchEvent(errorEvent);
      if (!errorEvent.defaultPrevented) {
        throw e;
      }
    }
  }
}

let loadedMainWorkerScript = false;

function importScripts(...urls: Array<string|URL>) {
  if (ops.op_worker_get_type() === "module") {
    throw new TypeError("Can't import scripts in a module worker.");
  }

  const baseUrl = location.getLocationHref();
  const parsedUrls = ArrayPrototypeMap(urls, (scriptUrl) => {
    try {
      return new url.URL(scriptUrl, baseUrl ?? undefined).href;
    } catch {
      throw new domException.DOMException(
        "Failed to parse URL.",
        "SyntaxError",
      );
    }
  }) as string[];

  // A classic worker's main script has looser MIME type checks than any
  // imported scripts, so we use `loadedMainWorkerScript` to distinguish them.
  // TODO(andreubotella) Refactor worker creation so the main script isn't
  // loaded with `importScripts()`.
  const scripts = ops.op_worker_sync_fetch(
    parsedUrls,
    !loadedMainWorkerScript,
  );
  loadedMainWorkerScript = true;

  for (let i = 0; i < scripts.length; ++i) {
    const { url, script } = scripts[i];
    const err = core.evalContext(script, url)[1];
    if (err !== null) {
      throw err.thrown;
    }
  }
}

function opMainModule() {
  return ops.op_main_module();
}

function formatException(error: Error | string) {
  if (ObjectPrototypeIsPrototypeOf(ErrorPrototype, error)) {
    return null;
  } else if (typeof error == "string") {
    return `Uncaught ${
      inspectArgs([quoteString(error)], {
        colors: !colors.getNoColor(),
      })
    }`;
  } else {
    return `Uncaught ${
      inspectArgs([error], { colors: !colors.getNoColor() })
    }`;
  }
}

function runtimeStart(runtimeOptions: RuntimeOptions, source?: string) {
  core.setMacrotaskCallback(timers.handleTimerMacrotask);
  core.setMacrotaskCallback(promiseRejectMacrotaskCallback);
  core.setWasmStreamingCallback(fetch.handleWasmStreaming);
  core.setReportExceptionCallback(reportException);
  ops.op_set_format_exception_callback(formatException);

  // Gjsify: We set the target directly in packages/deno/runtime/src/runtime/js/01_version.ts
  // version.setVersions(
  //   runtimeOptions.denoVersion,
  //   runtimeOptions.v8Version,
  //   runtimeOptions.tsVersion,
  //   runtimeOptions.gjsVersion,
  // );

  // Gjsify we do this already in the build import: build.setBuildInfo(runtimeOptions.target);
  util.setLogDebug(runtimeOptions.debugFlag, source);
  colors.setNoColor(runtimeOptions.noColor || !runtimeOptions.isTty);
  // @ts-ignore
  Error.prepareStackTrace = core.prepareStackTrace;
  registerErrors();
}

function registerErrors() {
  core.registerErrorClass("NotFound", errors.NotFound);
  core.registerErrorClass("PermissionDenied", errors.PermissionDenied);
  core.registerErrorClass("ConnectionRefused", errors.ConnectionRefused);
  core.registerErrorClass("ConnectionReset", errors.ConnectionReset);
  core.registerErrorClass("ConnectionAborted", errors.ConnectionAborted);
  core.registerErrorClass("NotConnected", errors.NotConnected);
  core.registerErrorClass("AddrInUse", errors.AddrInUse);
  core.registerErrorClass("AddrNotAvailable", errors.AddrNotAvailable);
  core.registerErrorClass("BrokenPipe", errors.BrokenPipe);
  core.registerErrorClass("AlreadyExists", errors.AlreadyExists);
  core.registerErrorClass("InvalidData", errors.InvalidData);
  core.registerErrorClass("TimedOut", errors.TimedOut);
  core.registerErrorClass("Interrupted", errors.Interrupted);
  core.registerErrorClass("WriteZero", errors.WriteZero);
  core.registerErrorClass("UnexpectedEof", errors.UnexpectedEof);
  core.registerErrorClass("BadResource", errors.BadResource);
  core.registerErrorClass("Http", errors.Http);
  core.registerErrorClass("Busy", errors.Busy);
  core.registerErrorClass("NotSupported", errors.NotSupported);
  core.registerErrorBuilder(
    "DOMExceptionOperationError",
    function DOMExceptionOperationError(msg) {
      return new domException.DOMException(msg, "OperationError");
    },
  );
  core.registerErrorBuilder(
    "DOMExceptionQuotaExceededError",
    function DOMExceptionQuotaExceededError(msg) {
      return new domException.DOMException(msg, "QuotaExceededError");
    },
  );
  core.registerErrorBuilder(
    "DOMExceptionNotSupportedError",
    function DOMExceptionNotSupportedError(msg) {
      return new domException.DOMException(msg, "NotSupported");
    },
  );
  core.registerErrorBuilder(
    "DOMExceptionNetworkError",
    function DOMExceptionNetworkError(msg) {
      return new domException.DOMException(msg, "NetworkError");
    },
  );
  core.registerErrorBuilder(
    "DOMExceptionAbortError",
    function DOMExceptionAbortError(msg) {
      return new domException.DOMException(msg, "AbortError");
    },
  );
  core.registerErrorBuilder(
    "DOMExceptionInvalidCharacterError",
    function DOMExceptionInvalidCharacterError(msg) {
      return new domException.DOMException(msg, "InvalidCharacterError");
    },
  );
  core.registerErrorBuilder(
    "DOMExceptionDataError",
    function DOMExceptionDataError(msg) {
      return new domException.DOMException(msg, "DataError");
    },
  );
}

const pendingRejections = [];
const pendingRejectionsReasons = new SafeWeakMap();

function promiseRejectCallback(type, promise, reason) {
  switch (type) {
    case 0: {
      ops.op_store_pending_promise_exception(promise, reason);
      ArrayPrototypePush(pendingRejections, promise);
      WeakMapPrototypeSet(pendingRejectionsReasons, promise, reason);
      break;
    }
    case 1: {
      ops.op_remove_pending_promise_exception(promise);
      const index = ArrayPrototypeIndexOf(pendingRejections, promise);
      if (index > -1) {
        ArrayPrototypeSplice(pendingRejections, index, 1);
        WeakMapPrototypeDelete(pendingRejectionsReasons, promise);
      }
      break;
    }
    default:
      return false;
  }

  return !!globalThis.onunhandledrejection ||
    eventTarget.listenerCount(globalThis, "unhandledrejection") > 0;
}

function promiseRejectMacrotaskCallback() {
  while (pendingRejections.length > 0) {
    const promise = ArrayPrototypeShift(pendingRejections);
    const hasPendingException = ops.op_has_pending_promise_exception(
      promise,
    );
    const reason = WeakMapPrototypeGet(pendingRejectionsReasons, promise);
    WeakMapPrototypeDelete(pendingRejectionsReasons, promise);

    if (!hasPendingException) {
      continue;
    }

    const rejectionEvent = new event.PromiseRejectionEvent(
      "unhandledrejection",
      {
        cancelable: true,
        promise,
        reason,
      },
    );

    const errorEventCb = (event) => {
      if (event.error === reason) {
        ops.op_remove_pending_promise_exception(promise);
      }
    };
    // Add a callback for "error" event - it will be dispatched
    // if error is thrown during dispatch of "unhandledrejection"
    // event.
    globalThis.addEventListener("error", errorEventCb);
    globalThis.dispatchEvent(rejectionEvent);
    globalThis.removeEventListener("error", errorEventCb);

    // If event was not prevented (or "unhandledrejection" listeners didn't
    // throw) we will let Rust side handle it.
    if (rejectionEvent.defaultPrevented) {
      ops.op_remove_pending_promise_exception(promise);
    }
  }
  return true;
}

let hasBootstrapped = false;

function bootstrapMainRuntime(runtimeOptions: RuntimeOptions) {
  if (hasBootstrapped) {
    throw new Error("Worker runtime already bootstrapped");
  }

  core.initializeAsyncOps();
  performance.setTimeOrigin(DateNow());
  net.setup(runtimeOptions.unstableFlag);

  const consoleFromV8 = window.console;
  const wrapConsole = __bootstrap.console.wrapConsole;

  // Remove bootstrapping data from the global scope
  // const __bootstrap = globalThis.__bootstrap;
  delete globalThis.__bootstrap;
  delete globalThis.bootstrap;
  util.log("bootstrapMainRuntime");
  hasBootstrapped = true;

  // If the `--location` flag isn't set, make `globalThis.location` `undefined` and
  // writable, so that they can mock it themselves if they like. If the flag was
  // set, define `globalThis.location`, using the provided value.
  if (runtimeOptions.location == null) {
    mainRuntimeGlobalProperties.location = {
      // @ts-ignore
      writable: true,
    };
  } else {
    location.setLocationHref(runtimeOptions.location);
  }

  ObjectDefineProperties(globalThis, windowOrWorkerGlobalScope);
  if (runtimeOptions.unstableFlag) {
    ObjectDefineProperties(globalThis, unstableWindowOrWorkerGlobalScope);
  }
  ObjectDefineProperties(globalThis, mainRuntimeGlobalProperties);
  ObjectDefineProperties(globalThis, {
    close: util.writable(windowClose),
    closed: util.getterOnly(() => windowIsClosing),
  });
  ObjectSetPrototypeOf(globalThis, Window.prototype);

  if (runtimeOptions.inspectFlag) {
    const consoleFromDeno = globalThis.console;
    wrapConsole(consoleFromDeno, consoleFromV8);
  }

  eventTarget.setEventTargetData(globalThis);

  defineEventHandler(window, "error");
  defineEventHandler(window, "load");
  defineEventHandler(window, "beforeunload");
  defineEventHandler(window, "unload");
  defineEventHandler(window, "unhandledrejection");

  core.setPromiseRejectCallback(promiseRejectCallback);

  const isUnloadDispatched = SymbolFor("isUnloadDispatched");
  // Stores the flag for checking whether unload is dispatched or not.
  // This prevents the recursive dispatches of unload events.
  // See https://github.com/denoland/deno/issues/9201.
  // @ts-ignore
  window[isUnloadDispatched] = false;
  window.addEventListener("unload", () => {
    // @ts-ignore
    window[isUnloadDispatched] = true;
  });

  runtimeStart(runtimeOptions);

  setNumCpus(runtimeOptions.cpuCount);
  setUserAgent(runtimeOptions.userAgent);
  setLanguage(runtimeOptions.locale);

  const internalSymbol = Symbol("Deno.internal");

  // These have to initialized here and not in `90_deno_ns.js` because
  // the op function that needs to be passed will be invalidated by creating
  // a snapshot

  ObjectAssign(internals, {
    nodeUnstable: {
      Command: __bootstrap.spawn.createCommand(
        __bootstrap.spawn.createSpawn(ops.op_node_unstable_spawn_child),
        __bootstrap.spawn.createSpawnSync(
          ops.op_node_unstable_spawn_sync,
        ),
        __bootstrap.spawn.createSpawnChild(
          ops.op_node_unstable_spawn_child,
        ),
      ),
      serve: __bootstrap.flash.createServe(ops.op_node_unstable_flash_serve),
      upgradeHttpRaw: __bootstrap.flash.upgradeHttpRaw,
      listenDatagram: __bootstrap.net.createListenDatagram(
        ops.op_node_unstable_net_listen_udp,
        ops.op_node_unstable_net_listen_unixpacket,
      ),
      osUptime: __bootstrap.os.createOsUptime(ops.op_node_unstable_os_uptime),
    },
  });

  const finalDenoNs = {
    core,
    internal: internalSymbol,
    [internalSymbol]: internals,
    resources: core.resources,
    close: core.close,
    ...denoNs,
  } as FinalDenoNs;
  ObjectDefineProperties(finalDenoNs, {
    pid: util.readOnly(runtimeOptions.pid),
    ppid: util.readOnly(runtimeOptions.ppid),
    noColor: util.readOnly(runtimeOptions.noColor),
    args: util.readOnly(ObjectFreeze(runtimeOptions.args)),
    mainModule: util.getterOnly(opMainModule),
  });

  if (runtimeOptions.unstableFlag) {
    ObjectAssign(finalDenoNs, denoNsUnstable);
    // These have to initialized here and not in `90_deno_ns.js` because
    // the op function that needs to be passed will be invalidated by creating
    // a snapshot
    ObjectAssign(finalDenoNs, {
      Command: __bootstrap.spawn.Command,
      serve: __bootstrap.flash.createServe(ops.op_flash_serve),
      listenDatagram: __bootstrap.net.createListenDatagram(
        ops.op_net_listen_udp,
        ops.op_net_listen_unixpacket,
      ),
      osUptime: __bootstrap.os.createOsUptime(ops.op_os_uptime),
    });
  }

  // Setup `Deno` global - we're actually overriding already existing global
  // `Deno` with `Deno` namespace from "./deno.ts".
  ObjectDefineProperty(globalThis, "Deno", util.readOnly(finalDenoNs));
  ObjectFreeze(globalThis.Deno.core);

  util.log("args", runtimeOptions.args);
}

function bootstrapWorkerRuntime(
  runtimeOptions: RuntimeOptions,
  name: string,
  internalName: string,
) {
  if (hasBootstrapped) {
    throw new Error("Worker runtime already bootstrapped");
  }

  core.initializeAsyncOps();
  performance.setTimeOrigin(DateNow());
  net.setup(runtimeOptions.unstableFlag);

  const consoleFromV8 = window.console;
  const wrapConsole = __bootstrap.console.wrapConsole;

  // Remove bootstrapping data from the global scope
  // const __bootstrap = globalThis.__bootstrap;
  delete globalThis.__bootstrap;
  delete globalThis.bootstrap;
  util.log("bootstrapWorkerRuntime");
  hasBootstrapped = true;
  ObjectDefineProperties(globalThis, windowOrWorkerGlobalScope);
  if (runtimeOptions.unstableFlag) {
    ObjectDefineProperties(globalThis, unstableWindowOrWorkerGlobalScope);
  }
  ObjectDefineProperties(globalThis, workerRuntimeGlobalProperties);
  ObjectDefineProperties(globalThis, {
    name: util.writable(name),
    // TODO(bartlomieju): should be readonly?
    close: util.nonEnumerable(workerClose),
    postMessage: util.writable(postMessage),
  });
  if (runtimeOptions.enableTestingFeaturesFlag) {
    ObjectDefineProperty(
      globalThis,
      "importScripts",
      util.writable(importScripts),
    );
  }
  ObjectSetPrototypeOf(globalThis, DedicatedWorkerGlobalScope.prototype);

  const consoleFromDeno = globalThis.console;
  wrapConsole(consoleFromDeno, consoleFromV8);

  eventTarget.setEventTargetData(globalThis);

  defineEventHandler(self, "message");
  defineEventHandler(self, "error", undefined, true);
  defineEventHandler(self, "unhandledrejection");

  core.setPromiseRejectCallback(promiseRejectCallback);

  // `Deno.exit()` is an alias to `self.close()`. Setting and exit
  // code using an op in worker context is a no-op.
  os.setExitHandler((_exitCode) => {
    workerClose();
  });

  runtimeStart(
    runtimeOptions,
    internalName ?? name,
  );

  location.setLocationHref(runtimeOptions.location);

  setNumCpus(runtimeOptions.cpuCount);
  setLanguage(runtimeOptions.locale);

  globalThis.pollForMessages = pollForMessages;

  const internalSymbol = Symbol("Deno.internal");

  // These have to initialized here and not in `90_deno_ns.js` because
  // the op function that needs to be passed will be invalidated by creating
  // a snapshot
  ObjectAssign(internals, {
    nodeUnstable: {
      Command: __bootstrap.spawn.createCommand(
        __bootstrap.spawn.createSpawn(ops.op_node_unstable_spawn_child),
        __bootstrap.spawn.createSpawnSync(
          ops.op_node_unstable_spawn_sync,
        ),
        __bootstrap.spawn.createSpawnChild(
          ops.op_node_unstable_spawn_child,
        ),
      ),
      serve: __bootstrap.flash.createServe(ops.op_node_unstable_flash_serve),
      upgradeHttpRaw: __bootstrap.flash.upgradeHttpRaw,
      listenDatagram: __bootstrap.net.createListenDatagram(
        ops.op_node_unstable_net_listen_udp,
        ops.op_node_unstable_net_listen_unixpacket,
      ),
      osUptime: __bootstrap.os.createOsUptime(ops.op_node_unstable_os_uptime),
    },
  });

  ObjectAssign((internals as any).nodeUnstable, {
    Command: __bootstrap.spawn.createCommand(
      (internals as any).nodeUnstable.spawn,
      (internals as any).nodeUnstable.spawnSync,
      (internals as any).nodeUnstable.spawnChild,
    ),
  });

  const finalDenoNs = {
    core,
    internal: internalSymbol,
    [internalSymbol]: internals,
    resources: core.resources,
    close: core.close,
    ...denoNs,
  } as FinalDenoNs;
  if (runtimeOptions.unstableFlag) {
    ObjectAssign(finalDenoNs, denoNsUnstable);
    // These have to initialized here and not in `90_deno_ns.js` because
    // the op function that needs to be passed will be invalidated by creating
    // a snapshot
    ObjectAssign(finalDenoNs, {
      Command: __bootstrap.spawn.Command,
      serve: __bootstrap.flash.createServe(ops.op_flash_serve),
      listenDatagram: __bootstrap.net.createListenDatagram(
        ops.op_net_listen_udp,
        ops.op_net_listen_unixpacket,
      ),
      osUptime: __bootstrap.os.createOsUptime(ops.op_os_uptime),
    });
  }
  ObjectDefineProperties(finalDenoNs, {
    pid: util.readOnly(runtimeOptions.pid),
    noColor: util.readOnly(runtimeOptions.noColor),
    args: util.readOnly(ObjectFreeze(runtimeOptions.args)),
  });
  // Setup `Deno` global - we're actually overriding already
  // existing global `Deno` with `Deno` namespace from "./deno.ts".
  ObjectDefineProperty(globalThis, "Deno", util.readOnly(finalDenoNs));
  ObjectFreeze(globalThis.Deno.core);
}

export const mainRuntime = bootstrapMainRuntime;
export const workerRuntime = bootstrapWorkerRuntime;

ObjectDefineProperties(globalThis, {
  bootstrap: {
    value: {
      mainRuntime,
      workerRuntime,
    },
    configurable: true,
  },
});

