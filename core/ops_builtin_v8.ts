import GLib from "@gjsify/types/GLib-2.0";

export const op_ref_op = (promiseId: number) => {
  console.warn("Not implemented: ops.op_ref_op");
}

export const op_unref_op = (promiseId: number) => {
  console.warn("Not implemented: ops.op_unref_op");
}

export const op_set_macrotask_callback = (fn: () => boolean): void => {
  console.warn("Not implemented: ops.op_set_macrotask_callback");
  fn();
}

export const op_set_next_tick_callback = (fn: () => void): void => {
  console.warn("Not implemented: ops.op_set_next_tick_callback");
  fn();
}

export const op_set_promise_reject_callback = (fn: Deno.core.PromiseRejectCallback): void => {
  console.warn("Not implemented: ops.op_set_promise_reject_callback");
}

export const op_run_microtasks = () => {
  console.warn("Not implemented: ops.op_run_microtasks");
}

export const op_has_tick_scheduled = () => {
  console.warn("Not implemented: ops.op_has_tick_scheduled");
}

export const op_set_has_tick_scheduled = (bool: boolean) => {
  console.warn("Not implemented: ops.op_set_has_tick_scheduled");
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
  console.warn("Not implemented: ops.op_encode");
  return new Uint8Array();
}

export const op_decode = (buffer: Uint8Array): string => {
  console.warn("Not implemented: ops.op_decode");
  return "";
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

export const op_destructure_error = (error: Error) => {
  console.warn("Not implemented: ops.op_destructure_error");
  const frames = [];
  return {
    frames,
    exceptionMessage: ""
  }
}

export const op_dispatch_exception = (error: Error) => {
  console.warn("Not implemented: ops.op_dispatch_exception");
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

export const op_event_loop_has_more_work = (): void => {
  console.warn("Not implemented: ops.op_event_loop_has_more_work");
}

export const op_store_pending_promise_exception = (promise, reason) => {
  console.warn("Not implemented: ops.op_store_pending_promise_exception");
}

export const op_remove_pending_promise_exception = (promise) => {
  console.warn("Not implemented: ops.op_remove_pending_promise_exception");
}

export const op_has_pending_promise_exception = (promise) => {
  console.warn("Not implemented: ops.op_has_pending_promise_exception");
  return false;
}

export const op_arraybuffer_was_detached = (O: ArrayBufferLike): boolean => {
  console.warn("Not implemented: ops.op_arraybuffer_was_detached");
  return false;
}
