export const op_close = (...args: any[]) => {
  console.warn("Not implemented: ops.op_close");
}

export const op_try_close = (...args: any[]) => {
  console.warn("Not implemented: ops.op_try_close");
}

export const op_print = (msg: string, isErr = false) => {
  if(isErr) {
    printerr(msg)
  } else {
    print(msg)
  }
}

export const op_resources = () => {
  console.warn("Not implemented: ops.op_resources");
}

export const op_wasm_streaming_feed = (...args: any[]) => {
  console.warn("Not implemented: ops.op_wasm_streaming_feed");
}

export const op_wasm_streaming_set_url = (...args: any[]) => {
  console.warn("Not implemented: ops.op_wasm_streaming_set_url");
}

export const op_void_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_void_sync");
}

export const op_void_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_void_async");
}

export const op_add = async (a: number, b: number) => {
  return a + b;
}

export const op_read = async (rid: number, buffer: Uint8Array): Promise<number> => {
  console.warn("Not implemented: ops.op_read");
  return 0;
}

export const op_read_all = async (rid: number): Promise<Uint8Array> => {
  console.warn("Not implemented: ops.op_read_all");
  return new Uint8Array();
}

export const op_write = async (rid: number, buffer: Uint8Array): Promise<number> => {
  console.warn("Not implemented: ops.op_write");
  return 0;
}

export const op_write_all = async (rid: number, buffer: Uint8Array | ArrayBufferView): Promise<void> => {
  console.warn("Not implemented: ops.op_write_all");
}

export const op_shutdown = async (rid: number): Promise<void> => {
  console.warn("Not implemented: ops.op_shutdown");
}

export const op_metrics = (...args: any[]) => {
  console.warn("Not implemented: ops.op_metrics");
  return [];
}

export const op_format_file_name = (...args: any[]) => {
  console.warn("Not implemented: ops.op_format_file_name");
}

export const op_is_proxy = (value): boolean => {
  console.warn("Not implemented: ops.op_is_proxy");
  return false;
}

export const op_str_byte_length = (str: string): number => {
  // convert the string to a utf-8 encoded array of bytes
  // const bytes = new TextEncoder().encode(str);
  // return the length of the array
  // return bytes.length;

  return str.length;
}
