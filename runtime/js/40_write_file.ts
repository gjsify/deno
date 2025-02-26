// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Based on https://github.com/denoland/deno/blob/main/runtime/js/40_write_file.js
"use strict";

import * as core from '../../core/01_core.js';
import * as ops from '../../ops/index.js';
import * as abortSignal from '../../ext/web/03_abort_signal.js';
import { pathFromURL } from './06_util.js';
import { open } from './40_files.js';
import { ReadableStreamPrototype } from '../../ext/web/06_streams.js';
import primordials from '../../core/00_primordials.js';

const { ObjectPrototypeIsPrototypeOf } = primordials;

/** Synchronously write `data` to the given `path`, by default creating a new
 * file if needed, else overwriting.
 *
 * ```ts
 * const encoder = new TextEncoder();
 * const data = encoder.encode("Hello world\n");
 * Deno.writeFileSync("hello1.txt", data);  // overwrite "hello1.txt" or create it
 * Deno.writeFileSync("hello2.txt", data, { create: false });  // only works if "hello2.txt" exists
 * Deno.writeFileSync("hello3.txt", data, { mode: 0o777 });  // set permissions on new file
 * Deno.writeFileSync("hello4.txt", data, { append: true });  // add data to the end of the file
 * ```
 *
 * Requires `allow-write` permission, and `allow-read` if `options.create` is
 * `false`.
 *
 * @tags allow-read, allow-write
 * @category File System
 */
export function writeFileSync(
  path: string | URL,
  data: Uint8Array,
  options: Deno.WriteFileOptions = {},
) {
  options.signal?.throwIfAborted();
  ops.op_write_file_sync(
    pathFromURL(path),
    options.mode,
    options.append ?? false,
    options.create ?? true,
    options.createNew ?? false,
    data,
  );
}

/** Write `data` to the given `path`, by default creating a new file if
 * needed, else overwriting.
 *
 * ```ts
 * const encoder = new TextEncoder();
 * const data = encoder.encode("Hello world\n");
 * await Deno.writeFile("hello1.txt", data);  // overwrite "hello1.txt" or create it
 * await Deno.writeFile("hello2.txt", data, { create: false });  // only works if "hello2.txt" exists
 * await Deno.writeFile("hello3.txt", data, { mode: 0o777 });  // set permissions on new file
 * await Deno.writeFile("hello4.txt", data, { append: true });  // add data to the end of the file
 * ```
 *
 * Requires `allow-write` permission, and `allow-read` if `options.create` is
 * `false`.
 *
 * @tags allow-read, allow-write
 * @category File System
 */
export async function writeFile(
  path: string | URL,
  data: Uint8Array | ReadableStream<Uint8Array>,
  options: Deno.WriteFileOptions = {},
) {
  let cancelRid: number;
  let abortHandler;
  if (options.signal) {
    options.signal.throwIfAborted();
    cancelRid = ops.op_cancel_handle();
    abortHandler = () => core.tryClose(cancelRid);
    options.signal[abortSignal.add](abortHandler);
  }
  try {
    if (ObjectPrototypeIsPrototypeOf(ReadableStreamPrototype, data)) {
      const file = await open(path, {
        mode: options.mode,
        append: options.append ?? false,
        create: options.create ?? true,
        createNew: options.createNew ?? false,
        write: true,
      });
      await (data as ReadableStream<Uint8Array>).pipeTo(file.writable as WritableStream<Uint8Array>, {
        signal: options.signal,
      });
    } else {
      await core.opAsync(
        "op_write_file_async",
        pathFromURL(path),
        options.mode,
        options.append ?? false,
        options.create ?? true,
        options.createNew ?? false,
        data,
        cancelRid,
      );
    }
  } finally {
    if (options.signal) {
      options.signal[abortSignal.remove](abortHandler);

      // always throw the abort error when aborted
      options.signal.throwIfAborted();
    }
  }
}


/** Synchronously write string `data` to the given `path`, by default creating
 * a new file if needed, else overwriting.
 *
 * ```ts
 * Deno.writeTextFileSync("hello1.txt", "Hello world\n");  // overwrite "hello1.txt" or create it
 * ```
 *
 * Requires `allow-write` permission, and `allow-read` if `options.create` is
 * `false`.
 *
 * @tags allow-read, allow-write
 * @category File System
 */
export function writeTextFileSync(
  path: string | URL,
  data: string,
  options: Deno.WriteFileOptions = {},
) {
  const encoder = new TextEncoder();
  return writeFileSync(path, encoder.encode(data), options);
}

/** Write string `data` to the given `path`, by default creating a new file if
 * needed, else overwriting.
 *
 * ```ts
 * await Deno.writeTextFile("hello1.txt", "Hello world\n");  // overwrite "hello1.txt" or create it
 * ```
 *
 * Requires `allow-write` permission, and `allow-read` if `options.create` is
 * `false`.
 *
 * @tags allow-read, allow-write
 * @category File System
 */
export function writeTextFile(
  path: string | URL,
  data: string | ReadableStream<string>,
  options: Deno.WriteFileOptions = {},
) {
  if (ObjectPrototypeIsPrototypeOf(ReadableStreamPrototype, data)) {
    return writeFile(
      path,
      (data as ReadableStream).pipeThrough(new TextEncoderStream()),
      options,
    );
  } else {
    const encoder = new TextEncoder();
    return writeFile(path, encoder.encode((data as string)), options);
  }
}

