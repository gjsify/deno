import GLib from "@gjsify/types/GLib-2.0";
import { byteArray } from "@gjsify/types/Gjs";
import { logSignals, parseStackTrace, StackTraceFrame, extractErrorData } from "@gjsify/utils";

let has_tick_scheduled = false;
const pending_promise_exceptions: {promise: Promise<any>, reason: any}[] = [];

export const op_ref_op = (promiseId: number) => {
  console.warn("Not implemented: ops.op_ref_op");
}

export const op_unref_op = (promiseId: number) => {
  console.warn("Not implemented: ops.op_unref_op");
}

export const op_set_macrotask_callback = (fn: () => boolean): void => {
  console.warn("Not implemented: ops.op_set_macrotask_callback");

  // TODO: Not sure how we should implement this:
  return op_set_next_tick_callback(fn);
}

export const op_set_next_tick_callback = (fn: () => void): void => {
  GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
    fn();
    return GLib.SOURCE_CONTINUE;
  });
}

export const op_set_promise_reject_callback = (fn: Deno.core.PromiseRejectCallback): void => {
  logSignals.connect("unhandledRejection", (self, data, promiseData) => {

    /**
     * TODO: Not sure how we should implement this:
     * 0: store pending promise exception
     * 1: remove pending promise exception
     */
    const type: 0 | 1 = 1;

    fn(type, promiseData.promise, promiseData.reason);
  });
}

export const op_run_microtasks = () => {
  // In Deno this method runs the microtask which a in the microtask queue added with `op_queue_microtask`,
  // but we let GLib do this. If this should lead to problems, we can still adjust the implementation.

  // But we can force the execution of idle callbacks
  GLib.main_context_default().iteration(false);
}

export const op_has_tick_scheduled = () => {
  return has_tick_scheduled;
}

export const op_set_has_tick_scheduled = (bool: boolean) => {
  has_tick_scheduled = bool;
}

export const op_eval_context = (source: string, specifier: string) => {
  console.warn("Not implemented: ops.op_eval_context");

  const f = undefined;
  const err = undefined;

  return [f, err]
}

export const op_queue_microtask = (cb: () => void) => {
  GLib.idle_add(GLib.PRIORITY_DEFAULT_IDLE, () => {
    cb();
    return GLib.SOURCE_REMOVE;
  });
}

export const op_create_host_object = (): object => {
  console.warn("Not implemented: ops.op_create_host_object");
  return new Object();
}

export const op_encode = (text: string): Uint8Array => {
  return byteArray.fromString(text);
}

export const op_decode = (buffer: Uint8Array): string => {
  return byteArray.toString(buffer);
}

export const op_serialize = (value, options = {}, errorCallback?): any => {
  console.warn("Not implemented: ops.op_serialize");
}

export const op_deserialize = (buffer, options = {}): any => {
  console.warn("Not implemented: ops.op_deserialize");
}

export const op_set_promise_hooks = (
  init: (promise: Promise<unknown>, parentPromise: Promise<unknown>) => void,
  before: (promise: Promise<unknown>) => void,
  after: (promise: Promise<unknown>) => void,
  resolve: (promise: Promise<unknown>) => void) => {
  console.warn("Not implemented: ops.op_set_promise_hooks");
}

export const op_get_promise_details = (promise: Promise<any>): [state: number, result: any] => {
  console.warn("Not implemented: ops.op_get_promise_details");
  const state: number = -1;
  const result: any = undefined; // TODO
  return [state, result];
}

export const op_get_proxy_details = (proxy) => {
  console.warn("Not implemented: ops.op_get_proxy_details", proxy);
  return null;
}

export const op_memory_usage = (): number => {
  console.warn("Not implemented: ops.op_memory_usage");
  return -1;
}

export const op_set_wasm_streaming_callback = (
  fn: (source: any, rid: number) => void,
): void => {
  console.warn("Not implemented: ops.op_set_wasm_streaming_callback");
}

export const op_abort_wasm_streaming = (rid: number, error: Error): void => {
  console.warn("Not implemented: ops.op_abort_wasm_streaming");
}

export const op_destructure_error = (error: Error | string) => {
  if(typeof error === 'object' && error.stack) {
    const stackLines = error.stack.split('\n');
    const frames: StackTraceFrame[] = [];
    for (let stackLine of stackLines) {
      const frame = parseStackTrace(stackLine.trim());
      if(frame) {
        frames.push(frame);
      }
    }

    return {
      frames,
      exceptionMessage: error.message,
    }
  }

  const message = typeof error === 'string' ? error : error.message;
  const data = extractErrorData(message);

  return {
    frames: data.frames,
    exceptionMessage: data.message,
  }
}

/**
 * Effectively throw an uncatchable error. This will terminate runtime
 * execution before any more JS code can run, except in the REPL where it
 * should just output the error to the console.
 * @param error
 */
export const op_dispatch_exception = (error: Error) => {
  console.warn("Not implemented: ops.op_dispatch_exception");
  throw error;
}

export const op_op_names = () => {
  console.warn("Not implemented: ops.op_op_names");
  return [];
}

export const op_apply_source_map = (cse) => {
  console.warn("Not implemented: ops.op_apply_source_map");
  return {};
}

export const op_set_format_exception_callback = (cb: (error: Error | string) => string) => {
  console.warn("Not implemented: ops.op_set_format_exception_callback");
  return [];
}

export const op_event_loop_has_more_work = (): boolean => {
  console.warn("Not implemented: ops.op_event_loop_has_more_work");
  return false;
}

export const op_store_pending_promise_exception = (promise: Promise<any>, reason: any) => {
  pending_promise_exceptions.push({
    promise,
    reason
  });
}

export const op_remove_pending_promise_exception = (promise: Promise<any>) => {
  const index = pending_promise_exceptions.findIndex((el) => el.promise === promise);
  pending_promise_exceptions.splice(index, 1);
}

export const op_has_pending_promise_exception = (promise: Promise<any>) => {
  return !!pending_promise_exceptions.find((el) => el.promise === promise);
}

export const op_arraybuffer_was_detached = (O: ArrayBufferLike): boolean => {
  console.warn("Not implemented: ops.op_arraybuffer_was_detached");
  return false;
}
