import GLib from '@girs/glib-2.0';
import Gio from '@girs/gio-2.0';
import Soup from '@girs/soup-3.0';
import { state } from '@gjsify/deno-core/ops.js';
const { ops } = globalThis.Deno.core;
/**
 * Checks WebSocket permissions and optionally creates a cancel handle.
 * This is a TypeScript implementation of the Rust function `op_ws_check_permission_and_cancel_handle` using Gjs.
 * @param apiName - The name of the API.
 * @param url - The URL to check permissions for.
 * @param cancelHandle - Whether to create a cancel handle.
 * @returns A promise that resolves with the resource ID of the new cancel handle if one was created, or null if not, or rejects with an error if the operation is unstable, the permissions check fails, or the URL parsing fails.
 */
ops.op_ws_check_permission_and_cancel_handle = async (apiName: string, url: string, cancelHandle: boolean): Promise<number | null> => {
  console.warn("Not implemented: ops.op_ws_check_permission_and_cancel_handle");

  let permissions = state.permissions;
  if (!permissions.checkNetUrl(url, apiName)) {
    throw new Error("Permissions check failed");
  }

  if (cancelHandle) {
    let cancelResource = new Gio.Cancellable();
    let rid = state.resourceTable.add(cancelResource);
    return rid;
  } else {
    return null;
  }
};

/**
 * Creates a WebSocket.
 * This is a TypeScript implementation of the Rust function `op_ws_create` using Gjs.
 * @param apiName - The name of the API.
 * @param url - The URL to connect to.
 * @param protocols - The protocols to use.
 * @param cancelHandle - The resource ID of the cancel handle, or null if no cancel handle is provided.
 * @param headers - The headers to send with the WebSocket handshake, or null if no headers are provided.
 * @returns A promise that resolves with the response from the WebSocket handshake, or rejects with an error if the operation is unstable, the permissions check fails, the URL parsing fails, or the WebSocket handshake fails.
 */
ops.op_ws_create = async (apiName: string, url: string, protocols: string | string[], cancelHandle: number | null, headers: Array<[string, string]> | null): Promise<any> => {
  console.warn("Not implemented: ops.op_ws_create");

  if(!Array.isArray(protocols)) {
    protocols = protocols.split(',');
  }
  let permissions = state.permissions;
  if (!permissions.checkNetUrl(url, apiName)) {
    throw new Error("Permissions check failed");
  }

  let cancelResource = null;
  if (cancelHandle !== null) {
    cancelResource = state.resourceTable.get<Gio.Cancellable>(cancelHandle);
  }

  // The following is untested:
  const uri = GLib.Uri.parse(url, GLib.UriFlags.NONE);

  const message = new Soup.Message();

  const session = new Soup.Session();
  const origin = uri.to_string(); // `${uri.get_scheme()}://${uri.get_host()}:${uri.get_port()}`;
  const connection = await session.websocket_connect_async(message, origin, protocols, 0, cancelResource);

  if (cancelHandle !== null) {
    state.resourceTable.remove(cancelHandle);
  }

  let rid = state.resourceTable.add(connection);

  // let protocol = response.get('Sec-WebSocket-Protocol') || '';
  // let extensions = response.get_all('Sec-WebSocket-Extensions').join(',');

  return {
    rid,
    // protocol,
    // extensions,
  };
};

ops.op_ws_close = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_close");
}

ops.op_ws_next_event = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_next_event");
}

ops.op_ws_get_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_get_buffer");
}

ops.op_ws_get_buffer_as_string = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_get_buffer_as_string");
}

ops.op_ws_get_error = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_get_error");
}

ops.op_ws_send_binary = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_send_binary");
}

ops.op_ws_send_binary_ab = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_send_binary_ab");
}

ops.op_ws_send_text = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_send_text");
}

ops.op_ws_send_binary_async = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_send_binary_async");
}

ops.op_ws_send_text_async = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_send_text_async");
}

ops.op_ws_send_ping = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_send_text_async");
}

ops.op_ws_send_pong = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_send_text_async");
}

ops.op_ws_next_event = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_next_event");
}

ops.op_ws_get_buffered_amount = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_get_buffered_amount");
}
