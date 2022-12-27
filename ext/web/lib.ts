import GLib from '@gjsify/types/GLib-2.0';

export const op_base64_decode = (data: string): Uint8Array => {
  return GLib.base64_decode(data)
}

export const op_base64_encode = (data: Uint8Array): string => {
  return GLib.base64_encode(data)
}

export const op_base64_atob = (data: string): string => {
  const decoder = new TextDecoder();
  return decoder.decode(op_base64_decode(data));
}

export const op_base64_btoa = (data: string): string => {
  const encoder = new TextEncoder();
  const utf8Arr = encoder.encode(data);
  return op_base64_encode(utf8Arr)
}

export const op_encoding_normalize_label = (label: string): string => {
  console.warn("Not implemented: ops.op_encoding_normalize_label");
  return "";
}

export const op_encoding_decode_single = (input: BufferSource, encoding: string, fatal: boolean, ignoreBOM: boolean): string => {
  console.warn("Not implemented: ops.op_encoding_decode_single");
  return "";
}


export const op_encoding_decode_utf8 = (input: BufferSource, ignoreBOM: boolean): string => {
  console.warn("Not implemented: ops.op_encoding_decode_single");
  return "";
}

export const op_encoding_new_decoder = (encoding: string, fatal: boolean, ignoreBOM: boolean): number => {
  console.warn("Not implemented: ops.op_encoding_new_decoder");
  return 0;
}

export const op_encoding_decode = (input: BufferSource, rid: number, stream: boolean): string => {
  console.warn("Not implemented: ops.op_encoding_decode");
  return "";
}

export const op_encoding_encode_into = (...args: any[]) => {
  console.warn("Not implemented: ops.op_encoding_encode_into");
}

export const op_encode_binary_string = (bytes: Uint8Array): string => {
  console.warn("Not implemented: ops.op_encode_binary_string");
  return "";
}

export const op_blob_create_part = (data: Uint8Array): string => {
  console.warn("Not implemented: ops.op_blob_create_part");
  return "";
}

export const op_blob_slice_part = (id: string, data: { start: number, len: number }): string => {
  console.warn("Not implemented: ops.op_blob_slice_part");
  return "";
}

export const op_blob_read_part = (...args: any[]) => {
  console.warn("Not implemented: ops.op_blob_read_part");
}

export const op_blob_remove_part = (...args: any[]) => {
  console.warn("Not implemented: ops.op_blob_remove_part");
}

export const op_blob_create_object_url = (type: string, parts: string[]): string => {
  console.warn("Not implemented: ops.op_blob_create_object_url");
  return "";
}

export const op_blob_revoke_object_url = (...args: any[]) => {
  console.warn("Not implemented: ops.op_blob_revoke_object_url");
}

export const op_blob_from_object_url = (url: string): { parts: [], media_type: string } | null => {
  console.warn("Not implemented: ops.op_blob_from_object_url");
  return null;
}

export const op_message_port_create_entangled = (): [number, number] => {
  console.warn("Not implemented: ops.op_message_port_create_entangled");
  return [-1, -1];
}

export const op_message_port_post_message = (...args: any[]) => {
  console.warn("Not implemented: ops.op_message_port_post_message");
}

export const op_message_port_recv_message = (...args: any[]) => {
  console.warn("Not implemented: ops.op_message_port_recv_message");
}

export const op_compression_new = (...args: any[]) => {
  console.warn("Not implemented: ops.op_compression_new");
}

export const op_compression_write = (...args: any[]) => {
  console.warn("Not implemented: ops.op_compression_write");
}

export const op_compression_finish = (...args: any[]) => {
  console.warn("Not implemented: ops.op_compression_finish");
}

export const op_now = (...args: any[]) => {
  console.warn("Not implemented: ops.op_now");
}

export const op_timer_handle = (...args: any[]) => {
  console.warn("Not implemented: ops.op_timer_handle");
}

export const op_cancel_handle = () => {
  console.warn("Not implemented: ops.op_cancel_handle");
  const cancelRid = 0;
  return cancelRid;
}

export const op_sleep = (...args: any[]) => {
  console.warn("Not implemented: ops.op_sleep");
}

export const op_sleep_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_sleep_sync");
}

export const op_transfer_arraybuffer = (O: ArrayBufferLike): ArrayBufferLike => {
  console.warn("Not implemented: ops.op_transfer_arraybuffer");
  return new ArrayBuffer(0);
}
