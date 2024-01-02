

import Soup from '@girs/soup-3.0';
import * as SoupExt from '@gjsify/soup-3.0';
import Gio from '@girs/gio-2.0';

import { state } from '@gjsify/deno-core/ops.js';

const { ops } = globalThis.Deno.core;

/**
 * Fetches a resource.
 * This is a TypeScript implementation of the Rust function `op_fetch`.
 * @param method - The HTTP method to use.
 * @param url - The URL of the resource to fetch.
 * @param headers - An array of headers to include in the request.
 * @param hasBody - Whether the request has a body.
 * @param data - The body of the request, if it has one.
 * @returns A promise that resolves with the response.
 */
ops.op_fetch = async (method: string, url: string, headers: [string, string][], hasBody: boolean, data?: ArrayBuffer): Promise<any> => {

  let session = SoupExt.ExtSession.new();
  let message = new Soup.Message(method, url);

  // Set headers
  for (let [name, value] of headers) {
    message.request_headers.append(name, value);
  }

  // Set body
  if (hasBody && data) {
    let dataStream = Gio.MemoryInputStream.new_from_data(new Uint8Array(data), null);
    message.set_request_body('application/octet-stream', dataStream, data.byteLength);
  }

  const extInputStream = await session.sendAsync(message)

  if (message.status_code !== Soup.Status.OK) {
    throw new Error(`HTTP error: ${message.status_code}`);
  }

  // Get response data
  const extOutputStream = await extInputStream.spliceAsync();
  const bodyUInt8Array = extOutputStream.steal_as_bytes().toArray();

  let response = {
    status: message.status_code,
    headers: {},
    body: bodyUInt8Array,
  };

  // Get headers
  message.response_headers.foreach((name, value) => {
    response.headers[name] = value;
  });

  return response;
};

/**
 * Sends a fetch request and returns the response.
 * This is a TypeScript implementation of the Rust function `op_fetch_send`.
 * @param rid - The resource ID of the fetch request.
 * @returns A promise that resolves with the fetch response.
 * @throws {Error} If the request is cancelled or an error occurs while sending the request.
 */
ops.op_fetch_send = async (rid: number): Promise<any> => {
  let request = state.resource_table.take<any>(rid);

  let res;
  try {
    res = await request.send();
  } catch (error) {
    if (error.is_cancelled()) {
      throw new Error('request was cancelled');
    } else {
      throw new Error(error.message);
    }
  }

  let status = res.status;
  let url = res.uri.toString();
  let headers = [];
  res.response_headers.foreach((name, value) => {
    headers.push([name, value]);
  });

  let contentLength = res.response_body.length;
  let remoteAddr = res.remote_address;

  let responseRid = state.resource_table.add(res);

  return {
    status: status,
    statusText: Soup.status_get_phrase(status),
    headers: headers,
    url: url,
    responseRid: responseRid,
    contentLength: contentLength,
    remoteAddrIp: remoteAddr ? remoteAddr.get_ip().to_string() : null,
    remoteAddrPort: remoteAddr ? remoteAddr.get_port() : null,
    error: null,
  };
};

/**
 * Upgrades a fetch response to a duplex stream.
 * This is a TypeScript implementation of the Rust function `op_fetch_response_upgrade`.
 * @param rid - The resource ID of the fetch response to upgrade.
 * @returns A promise that resolves with the resource ID of the upgraded stream.
 * @throws {Error} If the fetch response cannot be upgraded.
 */
ops.op_fetch_response_upgrade = async (rid: number): Promise<number> => {
  let rawResponse = state.resource_table.take<any>(rid);

  console.log('op_fetch_response_upgrade', rid, rawResponse);

  let upgraded;
  try {
    upgraded = await rawResponse.upgrade();
  } catch (error) {
    throw new Error(`Failed to upgrade fetch response: ${error.message}`);
  }

  // let readWrite = Gio.DatagramBased.create_datagram_based(upgraded);
  // let readRx = readWrite.get_input_stream();
  // let writeTx = readWrite.get_output_stream();

  // let upgradedRid = state.resource_table.add(readWrite);

  // return upgradedRid;
  return 0;
};
