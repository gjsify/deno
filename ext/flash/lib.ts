export const op_flash_respond = (server, requestId, response, end, shutdown?) => {
  console.warn("Not implemented: ops.op_flash_respond");
  const nwritten = -1;
  return nwritten;
}

export const op_try_flash_respond_chunked = (
  serverId: number,
  token: number,
  chunk: Uint8Array | string,
  shutdown: boolean,
) => {
  console.warn("Not implemented: ops.op_try_flash_respond_chunked");
  return -1;
}

export const op_flash_respond_async = (
  serverId: number,
  token: number,
  chunk: Uint8Array | string,
  shutdown: boolean,
) => {
  console.warn("Not implemented: ops.op_flash_respond_async");
  return -1;
}

export const op_flash_respond_chunked = (
  serverId: number,
  token: number,
  chunk: Uint8Array | string,
  shutdown: boolean,
  nwritten: number,
) => {
  console.warn("Not implemented: ops.op_flash_respond_chunked");
  return -1;
}

export const op_flash_write_resource = (
  response: Uint8Array | string,
  serverId: number,
  token: number,
  resourceId: number,
  autoClose: boolean,
) => {
  console.warn("Not implemented: ops.op_flash_write_resource");
  return -1;
}

export const op_flash_method = (serverId: number, token: number) => {
  console.warn("Not implemented: ops.op_flash_method");
  const firstRead = null;
  return firstRead;
}

export const op_flash_close_server = (serverId: number) => {
  console.warn("Not implemented: ops.op_flash_close_server");
}

export const op_flash_path = (serverId: number, index: number) => {
  console.warn("Not implemented: ops.op_flash_path");
}

export const op_flash_make_request = () => {
  console.warn("Not implemented: ops.op_flash_make_request");
}

export const op_flash_has_body_stream = (serverId: number, token: number) => {
  console.warn("Not implemented: ops.op_flash_has_body_stream");
}

export const op_flash_headers = (serverId: number, index: number): [string, string][] => {
  console.warn("Not implemented: ops.op_flash_headers");
  return []
}

export const op_flash_first_packet = (streamRid: number, token: number) => {
  console.warn("Not implemented: ops.op_flash_first_packet");
  const firstRead = null;
  return firstRead;
}

export const op_flash_read_body = (serverId: number, token: number, buf: Uint8Array) => {
  console.warn("Not implemented: ops.op_flash_read_body");
  const firstRead = null;
  return firstRead;
}

export const op_flash_serve = () => {
  console.warn("Not implemented: ops.op_flash_serve");
}

export const op_node_unstable_flash_serve = (opts: any) => {
  console.warn("Not implemented: ops.op_node_unstable_flash_serve");
}

export const op_flash_wait_for_listening = (serverId: number) => {
  console.warn("Not implemented: ops.op_flash_wait_for_listening");
}

export const op_flash_drive_server = (serverId: number) => {
  console.warn("Not implemented: ops.op_flash_drive_server");
}

export const op_flash_next_async = (serverId: number) => {
  console.warn("Not implemented: ops.op_flash_next_async");
}

export const op_flash_next = (serverId: number) => {
  console.warn("Not implemented: ops.op_flash_next");
}

export const op_flash_next_server = (serverId: number) => {
  console.warn("Not implemented: ops.op_flash_next_server");
}

export const op_flash_upgrade_websocket = (serverId: number, token: number) => {
  console.warn("Not implemented: ops.op_flash_upgrade_websocket");
}
