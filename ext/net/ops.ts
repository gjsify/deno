import Soup from '@girs/soup-3.0';
import { state } from '@gjsify/deno-core/ops.js';
const { ops } = globalThis.Deno.core;

/**
 * Accepts a TCP connection.
 * This is a TypeScript implementation of the Rust function `op_net_accept_tcp` using Gjs.
 * @param rid - The resource ID of the TCP listener to accept a connection from.
 * @returns A promise that resolves with the resource ID and the local and remote IP addresses, or rejects with an error if the operation is unstable, the permissions check fails, or the accepting fails.
 */
ops.op_net_accept_tcp = async (rid: number): Promise<[number, string, string]> => {
  let listenerResource = state.resourceTable.get(rid);

  if (listenerResource === null) {
    throw new Error("Listener has been closed");
  }

  // TODO: Implement the rest of the function.
  return [0, "", ""];
};

/**
 * Receives data from a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_recv_udp` using Gjs.
 * @param rid - The resource ID of the UDP socket to receive data from.
 * @param buf - The buffer to store the received data in.
 * @returns A promise that resolves with the number of bytes read and the remote IP address, or rejects with an error if the operation is unstable, the permissions check fails, or the receiving fails.
 */
ops.op_net_recv_udp = async (state: any, rid: number, buf: Uint8Array): Promise<[number, string]> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
  return [0, ""];
};


/**
 * Sends data over a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_send_udp` using Gjs.
 * @param rid - The resource ID of the UDP socket to send data over.
 * @param addr - The IP address to send data to.
 * @param zero_copy - The data to send.
 * @returns A promise that resolves with the number of bytes written, or rejects with an error if the operation is unstable, the permissions check fails, or the sending fails.
 */
ops.op_net_send_udp = async (rid: number, addr: string, zero_copy: Uint8Array): Promise<number> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
  return 0;
};

/**
 * Joins a multicast group on a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_join_multi_v4_udp` using Gjs.
 * @param rid - The resource ID of the UDP socket to join the multicast group on.
 * @param address - The IP address of the multicast group to join.
 * @param multiInterface - The local interface to use for the multicast group.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, or the joining fails.
 */
ops.op_net_join_multi_v4_udp = async (rid: number, address: string, multiInterface: string): Promise<void> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
};

/**
 * Joins a multicast group on a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_join_multi_v6_udp` using Gjs.
 * @param rid - The resource ID of the UDP socket to join the multicast group on.
 * @param address - The IP address of the multicast group to join.
 * @param multiInterface - The local interface to use for the multicast group.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, or the joining fails.
 */
ops.op_net_join_multi_v6_udp = async (rid: number, address: string, multiInterface: number): Promise<void> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
};

/**
 * Leaves a multicast group on a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_leave_multi_v4_udp` using Gjs.
 * @param rid - The resource ID of the UDP socket to leave the multicast group on.
 * @param address - The IP address of the multicast group to leave.
 * @param multiInterface - The local interface used for the multicast group.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, or the leaving fails.
 */
ops.op_net_leave_multi_v4_udp = async (rid: number, address: string, multiInterface: string): Promise<void> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
};

/**
 * Leaves a multicast group on a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_leave_multi_v6_udp` using Gjs.
 * @param state - The state of the operation.
 * @param rid - The resource ID of the UDP socket to leave the multicast group on.
 * @param address - The IP address of the multicast group to leave.
 * @param multiInterface - The local interface used for the multicast group.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, or the leaving fails.
 */
ops.op_net_leave_multi_v6_udp = async (state: any, rid: number, address: string, multiInterface: number): Promise<void> => {
  let stateBorrowed = state.borrow();
  let socketResource = stateBorrowed.resourceTable.get("UdpSocketResource", rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
};

/**
 * Sets the multicast loopback on a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_set_multi_loopback_udp` using Gjs.
 * @param rid - The resource ID of the UDP socket to set the multicast loopback on.
 * @param is_v4_membership - A boolean indicating whether the membership is IPv4.
 * @param loopback - A boolean indicating whether to set the loopback.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, or the setting fails.
 */
ops.op_net_set_multi_loopback_udp = async (state: any, rid: number, is_v4_membership: boolean, loopback: boolean): Promise<void> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
};

/**
 * Sets the multicast loopback on a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_set_multi_loopback_udp` using Gjs.
 * @param state - The state of the operation.
 * @param rid - The resource ID of the UDP socket to set the multicast loopback on.
 * @param is_v4_membership - A boolean indicating whether the membership is IPv4.
 * @param loopback - A boolean indicating whether to set the loopback.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, or the setting fails.
 */
ops.op_net_set_multi_loopback_udp = async (state: any, rid: number, is_v4_membership: boolean, loopback: boolean): Promise<void> => {
  let stateBorrowed = state.borrow();
  let socketResource = stateBorrowed.resourceTable.get("UdpSocketResource", rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
};

/**
 * Sets the multicast TTL on a UDP socket.
 * This is a TypeScript implementation of the Rust function `op_net_set_multi_ttl_udp` using Gjs.
 * @param rid - The resource ID of the UDP socket to set the multicast TTL on.
 * @param ttl - The TTL to set.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, or the setting fails.
 */
ops.op_net_set_multi_ttl_udp = async (rid: number, ttl: number): Promise<void> => {
  let socketResource = state.resourceTable.get(rid);

  if (socketResource === null) {
    throw new Error("Socket has been closed");
  }

  // TODO: Implement the rest of the function.
};

/**
 * Connects to a TCP server.
 * This is a TypeScript implementation of the Rust function `op_net_connect_tcp` using Gjs.
 * @param addr - The IP address of the server to connect to.
 * @returns A promise that resolves with the resource ID of the new TCP stream, the local IP address, and the remote IP address, or rejects with an error if the operation is unstable, the permissions check fails, or the connection fails.
 */
ops.op_net_connect_tcp = async (addr: string): Promise<[number, string, string]> => {
  // TODO: Implement the rest of the function.
  return [0, "", ""];
};

/**
 * Listens for TCP connections on a specified IP address.
 * This is a TypeScript implementation of the Rust function `op_net_listen_tcp`.
 * @param addr - The IP address to listen on.
 * @param reusePort - Whether to reuse the port.
 * @returns A promise that resolves with the resource ID and the local IP address, or rejects with an error if the operation is unstable, the permissions check fails, or the listening fails.
 */
ops.op_net_listen_tcp = async (addr: string, reusePort: boolean): Promise<[number, string]> => {
  if (reusePort) {
    // TODO: Implement check for unstable features.
    // This involves checking if the feature is marked as unstable and if the --unstable flag is not set.
  }

  // TODO: Implement permissions check.
  // This involves checking the permissions against the IP address and port.

  let server = new Soup.Server();

  let success = server.listen_all(parseInt(addr), Soup.ServerListenOptions.IPV4_ONLY);

  if (!success) {
    throw new Error("Failed to listen on address: " + addr);
  }

  let localAddr = server.get_uris()[0].to_string();

  let rid = state.resourceTable.add(server);

  return [rid, localAddr];
};

/**
 * Listens for UDP connections on a specified IP address.
 * This is a TypeScript implementation of the Rust function `op_net_listen_udp` using Soup.
 * @param addr - The IP address to listen on.
 * @param reuseAddress - Whether to reuse the address.
 * @param loopback - Whether to use loopback.
 * @returns A promise that resolves with the resource ID and the local IP address, or rejects with an error if the operation is unstable, the permissions check fails, or the listening fails.
 */
ops.op_net_listen_udp = async (addr: string, reuseAddress: boolean, loopback: boolean): Promise<[number, string]> => {
  if (reuseAddress || loopback) {
    // TODO: Implement check for unstable features.
    // This involves checking if the feature is marked as unstable and if the --unstable flag is not set.
  }

  // TODO: Implement permissions check.
  // This involves checking the permissions against the IP address and port.

  let server = new Soup.Server();

  let success = server.listen_all(parseInt(addr), Soup.ServerListenOptions.IPV4_ONLY);

  if (!success) {
    throw new Error("Failed to listen on address: " + addr);
  }

  let localAddr = server.get_uris()[0].to_string();

  let rid = state.resourceTable.add(server);

  return [rid, localAddr];
};

/**
 * Resolves a DNS query.
 * This is a TypeScript implementation of the Rust function `op_dns_resolve`.
 * @param args - The arguments for the DNS query.
 * @returns A promise that resolves with the DNS return records, or rejects with an error if the operation is unstable, the permissions check fails, or the DNS query fails.
 */
ops.op_dns_resolve = async (args: any): Promise<any[]> => {
  console.warn("Not implemented: ops.op_set_nodelay");
  return [];
};

/**
 * Sets the `nodelay` option on a TCP stream resource.
 * This is a TypeScript implementation of the Rust function `op_set_nodelay`.
 * @param rid - The resource ID of the TCP stream resource.
 * @param nodelay - The new value for the `nodelay` option.
 * @returns A promise that resolves with undefined, or rejects with an error if the TCP stream resource is not found or the `nodelay` option cannot be set.
 */
ops.op_set_nodelay = async (rid: number, nodelay: boolean): Promise<void> => {
  console.warn("Not implemented: ops.op_set_nodelay");
  let resource = state.resourceTable.get<any>(rid);

  if (resource === null) {
    throw new Error("Invalid TCP stream resource, resource is null");
  }

  try {
    resource.setNoDelay(nodelay);
  } catch (error) {
    throw new Error("Failed to set nodelay option on TCP stream resource: " + error.message);
  }
};

/**
 * Sets the `keepalive` option on a TCP stream resource.
 * This is a TypeScript implementation of the Rust function `op_set_keepalive`.
 * @param rid - The resource ID of the TCP stream resource.
 * @param keepalive - The new value for the `keepalive` option.
 * @returns A promise that resolves with undefined, or rejects with an error if the TCP stream resource is not found or the `keepalive` option cannot be set.
 */
ops.op_set_keepalive = async (rid: number, keepalive: boolean): Promise<void> => {
  let resource = state.resourceTable.get(rid);

  if (resource === null) {
    throw new Error("Invalid TCP stream resource, resource is null");
  }

  try {
    resource.setKeepAlive(keepalive);
  } catch (error) {
    throw new Error("Failed to set keepalive option on TCP stream resource: " + error.message);
  }
};
