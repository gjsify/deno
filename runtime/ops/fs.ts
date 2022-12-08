export const op_readfile_sync = (path: string): BufferSource => {
  console.warn("Not implemented: ops.op_readfile_sync");
  return new ArrayBuffer(0);
}
export const op_readfile_text_sync = (path: string): string => {
  console.warn("Not implemented: ops.op_readfile_text_sync");
  return "";
}
export const op_readfile_async = async (path: string, cancelRid?: number): Promise<BufferSource> => {
  console.warn("Not implemented: ops.op_readfile_async");
  return new ArrayBuffer(0);
}
export const op_readfile_text_async = async (path: string, cancelRid?: number): Promise<string> => {
  console.warn("Not implemented: ops.op_readfile_text_async");
  return "";
}
