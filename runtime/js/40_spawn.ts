// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
"use strict";

import { primordials } from '../../core/00_primordials.js';
import * as core from '../../core/01_core.js';
import * as ops from '../../ops/index.js';
import { pathFromURL } from './06_util.js';
import { illegalConstructorKey } from './01_web_util.js';
import { add, remove } from '../../ext/web/03_abort_signal.js';

import type { Deno, DenoUnstable, AbortSignal } from '../../types/index.js';

const {
  ArrayPrototypeMap,
  ObjectEntries,
  String,
  TypeError,
  PromisePrototypeThen,
  SafePromiseAll,
  SymbolFor,
} = primordials;

import {
  readableStreamCollectIntoUint8Array,
  readableStreamForRidUnrefable,
  readableStreamForRidUnrefableRef,
  readableStreamForRidUnrefableUnref,
  writableStreamForRid,
  ReadableStream,
  WritableStream,
} from '../../ext/web/06_streams.js';

const promiseIdSymbol = SymbolFor("Deno.core.internalPromiseId");

function spawnChildInner(opFn, command, apiName, {
  args = [],
  cwd = undefined,
  clearEnv = false,
  env = {},
  uid = undefined,
  gid = undefined,
  stdin = "null",
  stdout = "piped",
  stderr = "piped",
  signal = undefined,
  windowsRawArguments = false,
} = {}) {
  const child = opFn({
    cmd: pathFromURL(command),
    args: ArrayPrototypeMap(args, String),
    cwd: pathFromURL(cwd),
    clearEnv,
    env: ObjectEntries(env),
    uid,
    gid,
    stdin,
    stdout,
    stderr,
    windowsRawArguments,
  }, apiName);
  return new Child(illegalConstructorKey, {
    ...child,
    signal,
  });
}

export function createSpawnChild(opFn) {
  return function spawnChild(command, options = {}) {
    return spawnChildInner(opFn, command, "Deno.spawnChild()", options);
  };
}

function collectOutput(readableStream) {
  if (!(readableStream instanceof ReadableStream)) {
    return null;
  }

  return readableStreamCollectIntoUint8Array(readableStream);
}

/** **UNSTABLE**: New API, yet to be vetted.
 *
 * The interface for handling a child process returned from
 * {@linkcode Deno.spawnChild}.
 *
 * @category Sub Process
 */
 export class Child {
  #rid: number;
  #waitPromiseId;
  #unrefed = false;

  #pid: number;
  get pid() {
    return this.#pid;
  }

  #stdin = null;
  get stdin(): WritableStream<Uint8Array> {
    if (this.#stdin == null) {
      throw new TypeError("stdin is not piped");
    }
    return this.#stdin;
  }

  #stdoutPromiseId;
  #stdoutRid: number;
  #stdout: ReadableStream<Uint8Array> | null = null;
  get stdout(): ReadableStream<Uint8Array> {
    if (this.#stdout == null) {
      throw new TypeError("stdout is not piped");
    }
    return this.#stdout;
  }

  #stderrPromiseId;
  #stderrRid: number;
  #stderr: ReadableStream<Uint8Array> | null = null;
  get stderr(): ReadableStream<Uint8Array> {
    if (this.#stderr == null) {
      throw new TypeError("stderr is not piped");
    }
    return this.#stderr;
  }

  constructor(key: symbol | null = null, {
    signal,
    rid,
    pid,
    stdinRid,
    stdoutRid,
    stderrRid,
  }: {
    signal: AbortSignal;
    rid: number;
    pid: number;
    stdinRid: number,
    stdoutRid: number,
    stderrRid: number,
  } | null = null) {
    if (key !== illegalConstructorKey) {
      throw new TypeError("Illegal constructor.");
    }

    this.#rid = rid;
    this.#pid = pid;

    if (stdinRid !== null) {
      this.#stdin = writableStreamForRid(stdinRid);
    }

    if (stdoutRid !== null) {
      this.#stdoutRid = stdoutRid;
      this.#stdout = readableStreamForRidUnrefable(stdoutRid);
    }

    if (stderrRid !== null) {
      this.#stderrRid = stderrRid;
      this.#stderr = readableStreamForRidUnrefable(stderrRid);
    }

    const onAbort = () => this.kill("SIGTERM");
    signal?.[add](onAbort);

    const waitPromise = core.opAsync("op_spawn_wait", this.#rid);
    this.#waitPromiseId = waitPromise[promiseIdSymbol];
    this.#status = PromisePrototypeThen(waitPromise, (res) => {
      this.#rid = null;
      signal?.[remove](onAbort);
      return res;
    }) as Promise<DenoUnstable.ChildStatus>;
  }

  #status: Promise<DenoUnstable.ChildStatus>;

  /** Get the status of the child. */
  get status(): Promise<DenoUnstable.ChildStatus> {
    return this.#status;
  }

  /** Waits for the child to exit completely, returning all its output and
   * status. */
  async output(): Promise<DenoUnstable.SpawnOutput> {
    if (this.#stdout?.locked) {
      throw new TypeError(
        "Can't collect output because stdout is locked",
      );
    }
    if (this.#stderr?.locked) {
      throw new TypeError(
        "Can't collect output because stderr is locked",
      );
    }

    const [status, _stdout, _stderr] = await SafePromiseAll([
      this.#status,
      collectOutput(this.#stdout),
      collectOutput(this.#stderr),
    ]) as [ DenoUnstable.ChildStatus, Uint8Array, Uint8Array ];

    return {
      success: status.success,
      code: status.code,
      signal: status.signal,
      get stdout() {
        if (_stdout == null) {
          throw new TypeError("stdout is not piped");
        }
        return _stdout;
      },
      get stderr() {
        if (_stderr == null) {
          throw new TypeError("stderr is not piped");
        }
        return _stderr;
      },
    };
  }

  /** Kills the process with given {@linkcode Deno.Signal}. Defaults to
   * `"SIGTERM"`. */
  kill(signo: Deno.Signal = "SIGTERM"): void {
    if (this.#rid === null) {
      throw new TypeError("Child process has already terminated.");
    }
    ops.op_kill(this.#pid, signo, "Deno.Child.kill()");
  }

  /** Ensure that the status of the child process prevents the Deno process
   * from exiting. */
  ref(): void {
    this.#unrefed = false;
    core.refOp(this.#waitPromiseId);
    if (this.#stdout) readableStreamForRidUnrefableRef(this.#stdout);
    if (this.#stderr) readableStreamForRidUnrefableRef(this.#stderr);
  }

  /** Ensure that the status of the child process does not block the Deno
   * process from exiting. */
  unref(): void {
    this.#unrefed = true;
    core.unrefOp(this.#waitPromiseId);
    if (this.#stdout) readableStreamForRidUnrefableUnref(this.#stdout);
    if (this.#stderr) readableStreamForRidUnrefableUnref(this.#stderr);
  }
}

export function createSpawn(opFn) {
  return function spawn(command, options) {
    if (options?.stdin === "piped") {
      throw new TypeError(
        "Piped stdin is not supported for this function, use 'Deno.spawnChild()' instead",
      );
    }
    return spawnChildInner(opFn, command, "Deno.spawn()", options).output();
  };
}

export function createSpawnSync(opFn) {
  return function spawnSync(command, {
    args = [],
    cwd = undefined,
    clearEnv = false,
    env = {},
    uid = undefined,
    gid = undefined,
    stdin = "null",
    stdout = "piped",
    stderr = "piped",
    windowsRawArguments = false,
  } = {}) {
    if (stdin === "piped") {
      throw new TypeError(
        "Piped stdin is not supported for this function, use 'Deno.spawnChild()' instead",
      );
    }
    const result = opFn({
      cmd: pathFromURL(command),
      args: ArrayPrototypeMap(args, String),
      cwd: pathFromURL(cwd),
      clearEnv,
      env: ObjectEntries(env),
      uid,
      gid,
      stdin,
      stdout,
      stderr,
      windowsRawArguments,
    });
    return {
      success: result.status.success,
      code: result.status.code,
      signal: result.status.signal,
      get stdout() {
        if (result.stdout == null) {
          throw new TypeError("stdout is not piped");
        }
        return result.stdout;
      },
      get stderr() {
        if (result.stderr == null) {
          throw new TypeError("stderr is not piped");
        }
        return result.stderr;
      },
    };
  };
}

export function createCommand(spawn, spawnSync, spawnChild) {
  return class Command {
    #command;
    #options;

    constructor(command, options) {
      this.#command = command;
      this.#options = options;
    }

    output() {
      if (this.#options?.stdin === "piped") {
        throw new TypeError(
          "Piped stdin is not supported for this function, use 'Deno.Command.spawn()' instead",
        );
      }
      return spawn(this.#command, this.#options);
    }

    outputSync() {
      if (this.#options?.stdin === "piped") {
        throw new TypeError(
          "Piped stdin is not supported for this function, use 'Deno.Command.spawn()' instead",
        );
      }
      return spawnSync(this.#command, this.#options);
    }

    spawn() {
      return spawnChild(this.#command, this.#options);
    }
  };
}

// window.__bootstrap.spawn = {
//   Child,
//   ChildProcess: Child,
//   createCommand,
//   createSpawn,
//   createSpawnChild,
//   createSpawnSync,
// };

