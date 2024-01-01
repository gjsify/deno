const { ops } = globalThis.Deno.core;

/**
 * @returns {[number, number]}
 */
ops.op_message_port_create_entangled = () => {
  console.warn("Not implemented: ops.op_message_port_create_entangled");
  return [-1, -1];
}

ops.op_message_port_post_message = (...args) => {
  console.warn("Not implemented: ops.op_message_port_post_message");
}

ops.op_message_port_recv_message = (...args) => {
  console.warn("Not implemented: ops.op_message_port_recv_message");
}
