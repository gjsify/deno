import { state } from '@gjsify/deno-core/ops.js';
const { ops } = globalThis.Deno.core;

ops.op_ffi_call = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_call");
};

/**
 * A non-blocking FFI call.
 * This is a TypeScript implementation of the Rust function `op_ffi_call_nonblocking`.
 * @param rid - The resource ID of the dynamic library resource.
 * @param symbol - The symbol to call.
 * @param parameters - The parameters to pass to the symbol.
 * @param outBuffer - The output buffer.
 * @returns A promise that resolves with the FFI value, or rejects with an error if the operation is unstable, the permissions check fails, or the symbol is invalid.
 */
ops.op_ffi_call_nonblocking = async (rid: number, symbol: string, parameters: any[], outBuffer: any): Promise<any> => {
  let resource = state.resourceTable.get<any>(rid);

  if (resource === null) {
    throw new Error("Invalid dynamic library resource, resource is null");
  }

  let symbols = resource.symbols;
  let symbolInfo = symbols[symbol];

  if (symbolInfo === undefined) {
    throw new Error("Invalid FFI symbol name");
  }

  // TODO: Implement the rest of the function.
};

ops.op_ffi_call_ptr = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_call_ptr");
};

ops.op_ffi_call_ptr_nonblocking = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_call_ptr_nonblocking");
};
