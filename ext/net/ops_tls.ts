import { state } from '@gjsify/deno-core/ops.js';
const { ops } = globalThis.Deno.core;

/**
 * Starts a TLS connection over a TCP stream.
 * This is a TypeScript implementation of the Rust function `op_tls_start` using Gjs.
 * @param args - The arguments for starting the TLS connection.
 * @returns A promise that resolves with the resource ID of the new TLS stream and the local and remote IP addresses, or rejects with an error if the operation is unstable, the permissions check fails, or the starting fails.
 */
ops.op_tls_start = async (args: any): Promise<[number, string, string]> => {
  let rid = args.rid;
  let hostname = args.hostname || "localhost";

  // {
  //   let permissions = state.getPermissions();
  //   permissions.checkNet(hostname, 0, "Deno.startTls()");
  // }

  // TODO: Implement the rest of the function.
  return [0, "", ""];
};

/**
 * Connects to a TLS server over a TCP stream.
 * This is a TypeScript implementation of the Rust function `op_net_connect_tls` using Gjs.
 * @param addr - The IP address of the server to connect to.
 * @param args - The arguments for connecting to the TLS server.
 * @returns A promise that resolves with the resource ID of the new TLS stream and the local and remote IP addresses, or rejects with an error if the operation is unstable, the permissions check fails, or the connection fails.
 */
ops.op_net_connect_tls = async (state: any, addr: string, args: any): Promise<[number, string, string]> => {
  // TODO: Implement the rest of the function.
  return [0, "", ""];
};

/**
 * Listens for TLS connections over a TCP stream.
 * This is a TypeScript implementation of the Rust function `op_net_listen_tls` using Gjs.
 * @param addr - The IP address to listen on.
 * @param args - The arguments for listening for TLS connections.
 * @returns A promise that resolves with the resource ID of the new TLS listener and the local IP address, or rejects with an error if the operation is unstable, the permissions check fails, or the listening fails.
 */
ops.op_net_listen_tls = async (addr: string, args: any): Promise<[number, string]> => {
  if (args.reuse_port) {
    // TODO: Check if the operation is unstable.
  }

  let cert_file = args.cert_file;
  let key_file = args.key_file;
  let cert = args.cert;
  let key = args.key;

  // TODO: Implement the rest of the function.
  return [0, ""];
};

/**
 * Accepts a TLS connection over a TCP stream.
 * This is a TypeScript implementation of the Rust function `op_net_accept_tls` using Gjs.
 * @param rid - The resource ID of the TLS listener to accept the connection from.
 * @returns A promise that resolves with the resource ID of the new TLS stream and the local and remote IP addresses, or rejects with an error if the operation is unstable, the permissions check fails, or the acceptance fails.
 */
ops.op_net_accept_tls = async (rid: number): Promise<[number, string, string]> => {
  let resource = state.resourceTable.get(rid);
  if (!resource) {
    throw new Error("Listener has been closed");
  }

  let cancel_handle = resource.cancel_handle;
  let tcp_listener = resource.tcp_listener;

  // TODO: Implement the rest of the function.
  return [0, "", ""];
};

/**
 * Performs a TLS handshake over a TCP stream.
 * This is a TypeScript implementation of the Rust function `op_tls_handshake` using Gjs.
 * @param state - The state of the operation.
 * @param rid - The resource ID of the TLS stream to perform the handshake on.
 * @returns A promise that resolves with the handshake info, or rejects with an error if the operation is unstable, the permissions check fails, or the handshake fails.
 */
ops.op_tls_handshake = async (state: any, rid: number): Promise<any> => {
  let resource = state.resourceTable.get(rid);
  if (!resource) {
    throw new Error("Stream has been closed");
  }

  let tls_stream = resource.tls_stream;

  let handshake_info = await tls_stream.handshake();

  return handshake_info;
};
