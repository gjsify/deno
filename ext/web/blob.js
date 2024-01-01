const { ops } = globalThis.Deno.core;

/**
 * @param {Uint8Array} data
 * @returns {string}
 */
ops.op_blob_create_part = (data) => {
  console.warn("Not implemented: ops.op_blob_create_part");
  return "";
}

/**
 * @param {string} id
 * @param {{ start: number, len: number }} data
 * @returns {string}
 */
ops.op_blob_slice_part = (id, data) => {
  console.warn("Not implemented: ops.op_blob_slice_part");
  return "";
}

ops.op_blob_read_part = (...args) => {
  console.warn("Not implemented: ops.op_blob_read_part");
}

ops.op_blob_remove_part = (...args) => {
  console.warn("Not implemented: ops.op_blob_remove_part");
}

/**
 * @param {string} type
 * @param {string[]} parts
 * @returns {string}
 */
ops.op_blob_create_object_url = (type, parts) => {
  console.warn("Not implemented: ops.op_blob_create_object_url");
  return "";
}

ops.op_blob_revoke_object_url = (...args) => {
  console.warn("Not implemented: ops.op_blob_revoke_object_url");
}

/**
 * @param {string} url
 * @returns {{ parts: [], media_type: string } | null}
 */
ops.op_blob_from_object_url = (url) => {
  console.warn("Not implemented: ops.op_blob_from_object_url");
  return null;
}
