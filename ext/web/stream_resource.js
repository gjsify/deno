const { ops } = globalThis.Deno.core;

/**
 * This function should allocate a new readable stream resource.
 * Currently, it does nothing and needs to be implemented.
 */
ops.op_readable_stream_resource_allocate = function() {
  // TODO: Implement this function.
  console.warn("op_readable_stream_resource_allocate needs to be implemented");
};

/**
 * This function should allocate a new readable stream resource of a specific size.
 * @param {number} length - The length of the resource.
 * Currently, it does nothing and needs to be implemented.
 */
ops.op_readable_stream_resource_allocate_sized = function(length) {
  // TODO: Implement this function.
  console.warn("op_readable_stream_resource_allocate_sized needs to be implemented");
};

/**
 * This function should get the sink of a readable stream resource with a specific id.
 * @param {number} rid - The resource id.
 * Currently, it does nothing and needs to be implemented.
 */
ops.op_readable_stream_resource_get_sink = function(rid) {
  // TODO: Implement this function.
  console.warn("op_readable_stream_resource_get_sink needs to be implemented");
};

/**
 * This function should write to a readable stream resource asynchronously.
 * @param {Object} sender - The sender object.
 * @param {ArrayBuffer} buffer - The buffer to write.
 */
ops.op_readable_stream_resource_write_buf = async function(sender, buffer) {
  // TODO: Implement this function.
  console.warn("op_readable_stream_resource_write_buf needs to be implemented");
};

/**
 * This function should write to a readable stream resource synchronously.
 * @param {Object} sender - The sender object.
 * @param {ArrayBuffer} buffer - The buffer to write.
 * @returns {number} - The status of the write operation.
 */
ops.op_readable_stream_resource_write_sync = function(sender, buffer) {
  // TODO: Implement this function.
  console.warn("op_readable_stream_resource_write_sync needs to be implemented");
  return 0;
};

/**
 * This function should write an error to a readable stream resource.
 * @param {Object} sender - The sender object.
 * @param {string} error - The error to write.
 * @returns {boolean} - Whether the sender is closed.
 */
ops.op_readable_stream_resource_write_error = function(sender, error) {
  // TODO: Implement this function.
  console.warn("op_readable_stream_resource_write_error needs to be implemented");
  return false;
};

/**
 * This function should close a readable stream resource.
 * @param {Object} sender - The sender object.
 */
ops.op_readable_stream_resource_close = function(sender) {
  // TODO: Implement this function.
  console.warn("op_readable_stream_resource_close needs to be implemented");
};

/**
 * This function should await the close of a readable stream resource.
 * @param {Object} state - The state object.
 * @param {number} rid - The resource id.
 */
ops.op_readable_stream_resource_await_close = async function(state, rid) {
  // TODO: Implement this function.
  console.warn("op_readable_stream_resource_await_close needs to be implemented");
};

