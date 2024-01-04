const { ops } = globalThis.Deno.core;

import "./http_next.ts";

ops.op_http_accept = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_accept");
}

ops.op_http_headers = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_headers");
}

ops.op_http_shutdown = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_shutdown");
}

ops.op_http_upgrade_websocket = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_upgrade_websocket");
}

ops.op_http_websocket_accept_header = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_websocket_accept_header");
}

ops.op_http_write_headers = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_write_headers");
}

ops.op_http_write_resource = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_write_resource");
}

ops.op_http_write = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_write");
}
