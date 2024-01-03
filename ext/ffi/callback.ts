import { state } from '@gjsify/deno-core/ops.js';

const { ops } = globalThis.Deno.core;

/**
 * References an unsafe callback.
 * This is a TypeScript implementation of the Rust function `op_ffi_unsafe_callback_ref`.
 * @param rid - The resource ID of the callback to reference.
 * @returns A promise that resolves with undefined, or rejects with an error if the operation is unstable, the permissions check fails, or the callback is null.
 */
ops.op_ffi_unsafe_callback_ref = async (rid: number): Promise<void> => {
  let callbackResource = state.resourceTable.get(rid);

  if (callbackResource === null) {
    throw new Error("Invalid callback resource, resource is null");
  }

  // TODO: Implement the rest of the function.
};


/**
 * Creates an unsafe callback.
 * This is a TypeScript implementation of the Rust function `op_ffi_unsafe_callback_create`.
 * @param scope - The scope of the operation.
 * @param args - The arguments for registering the callback.
 * @param cb - The callback function.
 * @returns A promise that resolves with the callback, or rejects with an error if the operation is unstable, the permissions check fails, or the callback is null.
 */
ops.op_ffi_unsafe_callback_create = async (scope: any, args: any, cb: Function): Promise<any> => {
  if (cb === null) {
    throw new Error("Invalid callback, callback is null");
  }

  // TODO: Implement the rest of the function.
};

/**
 * Closes an unsafe callback.
 * This is a TypeScript implementation of the Rust function `op_ffi_unsafe_callback_close`.
 * @param scope - The scope of the operation.
 * @param rid - The resource ID of the callback to close.
 * @returns A promise that resolves with undefined, or rejects with an error if the operation is unstable, the permissions check fails, or the callback is null.
 */
ops.op_ffi_unsafe_callback_close = async (scope: any, rid: number): Promise<void> => {
  // TODO: Implement the rest of the function.
  console.debug("op_ffi_unsafe_callback_close", scope, rid);
};
