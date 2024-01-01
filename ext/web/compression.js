const { ops } = globalThis.Deno.core;

ops.op_compression_new = (...args) => {
  console.warn("Not implemented: ops.op_compression_new");
}

ops.op_compression_write = (...args) => {
  console.warn("Not implemented: ops.op_compression_write");
}

ops.op_compression_finish = (...args) => {
  console.warn("Not implemented: ops.op_compression_finish");
}
