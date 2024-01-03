import { state } from '@gjsify/deno-core/ops.js';
const { ops } = globalThis.Deno.core;

/**
 * Accepts a new connection on a Unix listener.
 * This is a TypeScript implementation of the Rust function `op_net_accept_unix` using Gjs.
 * @param rid - The resource ID of the Unix listener to accept the new connection on.
 * @returns A promise that resolves with the resource ID of the new Unix stream, the local address path, and the remote address path, or rejects with an error if the operation is unstable, the permissions check fails, or the acceptance fails.
 */
ops.op_net_accept_unix = async (rid: number): Promise<[number, string | null, string | null]> => {
  let listenerResource = state.resourceTable.get(rid);

  if (listenerResource === null) {
    throw new Error("Listener has been closed");
  }

  // TODO: Implement the rest of the function.
  return [0, null, null];
};

/**
 * Connects to a Unix server.
 * This is a TypeScript implementation of the Rust function `op_net_connect_unix` using Gjs.
 * @param path - The path of the Unix server to connect to.
 * @returns A promise that resolves with the resource ID of the new Unix stream, the local address path, and the remote address path, or rejects with an error if the operation is unstable, the permissions check fails, or the connection fails.
 */
ops.op_net_connect_unix = async (path: string): Promise<[number, string | null, string | null]> => {
  // TODO: Implement the rest of the function.
  return [0, null, null];
};

/**
 * Receives a packet from a Unix datagram socket.
 * This is a TypeScript implementation of the Rust function `op_net_recv_unixpacket` using Gjs.
 * @param rid - The resource ID of the Unix datagram socket to receive the packet from.
 * @param buf - The buffer to receive the packet into.
 * @returns A promise that resolves with the number of bytes read and the path of the remote address, or rejects with an error if the operation is unstable, the permissions check fails, or the reception fails.
 */
ops.op_net_recv_unixpacket = async (rid: number, buf: Uint8Array): Promise<[number, string | null]> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
  return [0, null];
};

/**
 * Sends a packet to a Unix datagram socket.
 * This is a TypeScript implementation of the Rust function `op_net_send_unixpacket` using Gjs.
 * @param rid - The resource ID of the Unix datagram socket to send the packet to.
 * @param path - The path of the Unix server to send the packet to.
 * @param zero_copy - The packet to send.
 * @returns A promise that resolves with the number of bytes written, or rejects with an error if the operation is unstable, the permissions check fails, or the sending fails.
 */
ops.op_net_send_unixpacket = async (rid: number, path: string, zero_copy: Uint8Array): Promise<number> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
  return 0;
};

/**
 * Listens for connections on a Unix server.
 * This is a TypeScript implementation of the Rust function `op_net_listen_unix` using Gjs.
 * @param path - The path of the Unix server to listen on.
 * @param apiName - The name of the API call.
 * @returns A promise that resolves with the resource ID of the new Unix listener and the local address path, or rejects with an error if the operation is unstable, the permissions check fails, or the listening fails.
 */
ops.op_net_listen_unix = async (path: string, apiName: string): Promise<[number, string | null]> => {
  // TODO: Implement
  return [0, null];
};

/**
 * Listens for packets on a Unix datagram socket.
 * This is a TypeScript implementation of the Rust function `net_listen_unixpacket` using Gjs.
 * @param path - The path of the Unix datagram socket to listen on.
 * @returns A promise that resolves with the resource ID of the new Unix datagram socket and the local address path, or rejects with an error if the operation is unstable, the permissions check fails, or the listening fails.
 */
ops.net_listen_unixpacket = async (path: string): Promise<[number, string | null]> => {
  // let permissions = state.getPermissions();

  // permissions.checkRead(path, "Deno.listenDatagram()");
  // permissions.checkWrite(path, "Deno.listenDatagram()");

  // TODO: Implement the rest of the function.
  return [0, null];
};

/**
 * Listens for packets on a Unix datagram socket.
 * This is a TypeScript implementation of the Rust function `op_net_listen_unixpacket` using Gjs.
 * @param state - The state of the operation.
 * @param path - The path of the Unix datagram socket to listen on.
 * @returns A promise that resolves with the resource ID of the new Unix datagram socket and the local address path, or rejects with an error if the operation is unstable, the permissions check fails, or the listening fails.
 */
ops.op_net_listen_unixpacket = async (state: any, path: string): Promise<[number, string | null]> => {
  // TODO: Implement the function.
  return [0, null];
};

/**
 * Listens for packets on a Unix datagram socket.
 * This is a TypeScript implementation of the Rust function `op_node_unstable_net_listen_unixpacket` using Gjs.
 * @param state - The state of the operation.
 * @param path - The path of the Unix datagram socket to listen on.
 * @returns A promise that resolves with the resource ID of the new Unix datagram socket and the local address path, or rejects with an error if the operation is unstable, the permissions check fails, or the listening fails.
 */
ops.op_node_unstable_net_listen_unixpacket = async (state: any, path: string): Promise<[number, string | null]> => {
  // TODO: Implement the function.
  return [0, null];
};
