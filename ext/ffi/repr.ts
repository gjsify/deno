import { state } from '@gjsify/deno-core/ops.js';
const { ops } = globalThis.Deno.core;

const MAX_STRING_LENGTH = 255;

export const op_ffi_ptr_create = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_get_static");
}

/**
 * This function should check if two FFI pointers are equal.
 * @param ptr1 - The first FFI pointer.
 * @param ptr2 - The second FFI pointer.
 * @returns Whether the two FFI pointers are equal.
 */
ops.op_ffi_ptr_equals = (ptr1: any, ptr2: any) => {
  // TODO: Implement this function.
  console.warn("op_ffi_ptr_equals needs to be implemented");
  return false;
};

/**
 * This function should get the FFI pointer of a given object.
 * @param obj - The object to get the FFI pointer of.
 * @returns The FFI pointer of the object.
 */
ops.op_ffi_ptr_of = (buf: Uint8Array) => {
  // TODO: Implement this function.
  console.warn("op_ffi_ptr_of needs to be implemented");
  return buf.buffer;
};

/**
 * Gets the pointer of the ArrayBufferView.
 * This is a TypeScript implementation of the Rust function `op_ffi_ptr_of_exact`.
 * @param buf - The ArrayBufferView.
 * @returns The pointer of the ArrayBufferView, or 0 if the ArrayBufferView does not have a backing store or data.
 * @throws {Error} If the operation is unstable or the permissions check fails.
 */
ops.op_ffi_ptr_of_exact = (buf: ArrayBufferView) => {
  return buf.buffer;
};

/**
 * Offsets a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_ptr_offset`.
 * @param ptr - The pointer to offset.
 * @param offset - The amount to offset the pointer by.
 * @returns The offset pointer, or an error if the operation is unstable, the permissions check fails, or the pointer is null.
 */
ops.op_ffi_ptr_offset = (ptr: any, offset: number): any => {

  if (ptr === null) {
    throw new Error("Invalid pointer to offset, pointer is null");
  }

  // TODO: Create a RawPointer that can safely do pointer math.

  // Using `ptr.offset` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.wrapping_offset`.
  return ptr.wrapping_offset(offset);
};

/**
 * Gets the value of a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_ptr_value`.
 * @param ptr - The pointer to get the value of.
 * @param out - The output buffer to write the value to.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, or the pointer is null.
 */
ops.op_ffi_ptr_value = async (ptr: any, out: Uint32Array): Promise<void> => {
  if (ptr === null) {
    throw new Error("Invalid pointer, pointer is null");
  }

  // TODO: Create a RawPointer that can safely get the value of a pointer.

  // Using `ptr.value` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.value`.
  let value = ptr.value;

  // Write the value to the output buffer.
  let dataView = new DataView(out.buffer);
  dataView.setUint32(0, value, true);
};

/**
 * Gets an ArrayBuffer from a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_get_buf`.
 * @param ptr - The pointer to get the ArrayBuffer from.
 * @param offset - The offset of the pointer.
 * @param len - The length of the ArrayBuffer.
 * @returns A promise that resolves with the ArrayBuffer, or rejects with an error if the operation is unstable, the permissions check fails, or the pointer is null.
 */
ops.op_ffi_get_buf = async (ptr: any, offset: number, len: number): Promise<ArrayBuffer> => {
  if (ptr === null) {
    throw new Error("Invalid ArrayBuffer pointer, pointer is null");
  }

  // TODO: Create a RawPointer that can safely get an ArrayBuffer from a pointer.

  // Using `ptr.getArrayBuffer` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.getArrayBuffer`.
  let arrayBuffer = ptr.getArrayBuffer(offset, len);

  return arrayBuffer;
};

/**
 * Copies data from a source buffer into a destination buffer.
 * This is a TypeScript implementation of the Rust function `op_ffi_buf_copy_into`.
 * @param state - The state of the operation.
 * @param src - The source buffer.
 * @param offset - The offset of the source buffer.
 * @param dst - The destination buffer.
 * @param len - The length of the data to copy.
 * @returns A promise that resolves with no value, or rejects with an error if the operation is unstable, the permissions check fails, the source buffer is null, or the destination buffer is smaller than the source buffer.
 */
ops.op_ffi_buf_copy_into = async (src: ArrayBuffer, offset: number, dst: Uint8Array, len: number): Promise<void> => {
  if (src === null) {
    throw new Error("Invalid ArrayBuffer pointer, pointer is null");
  } else if (dst.length < len) {
    throw new Error("Destination length is smaller than source length");
  } else {
    let srcView = new DataView(src, offset, len);
    let dstView = new DataView(dst.buffer);

    for (let i = 0; i < len; i++) {
      let value = srcView.getUint8(i);
      dstView.setUint8(i, value);
    }
  }
};

/**
 * Reads a C string from a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_cstr_read`.
 * @param ptr - The pointer to read the C string from.
 * @param offset - The offset of the pointer.
 * @returns A promise that resolves with the C string, or rejects with an error if the operation is unstable, the permissions check fails, the pointer is null, or the string exceeds the max length.
 */
ops.op_ffi_cstr_read = async (ptr: any, offset: number): Promise<string> => {
  if (ptr === null) {
    throw new Error("Invalid CString pointer, pointer is null");
  }

  // TODO: Create a RawPointer that can safely read a C string from a pointer.

  // Using `ptr.readCString` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.readCString`.
  let cstr = ptr.readCString(offset);

  if (cstr.length > MAX_STRING_LENGTH) {
    throw new Error("Invalid CString pointer, string exceeds max length");
  }

  return cstr;
};

/**
 * Reads a boolean from a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_read_bool`.
 * @param ptr - The pointer to read the boolean from.
 * @param offset - The offset of the pointer.
 * @returns A promise that resolves with the boolean, or rejects with an error if the operation is unstable, the permissions check fails, or the pointer is null.
 */
ops.op_ffi_read_bool = async (ptr: any, offset: number): Promise<boolean> => {
  if (ptr === null) {
    throw new Error("Invalid bool pointer, pointer is null");
  }

  // TODO: Create a RawPointer that can safely read a boolean from a pointer.

  // Using `ptr.readBoolean` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.readBoolean`.
  let boolValue = ptr.readBoolean(offset);

  return boolValue;
};

/**
 * Reads a u8 from a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_read_u8`.
 * @param ptr - The pointer to read the u8 from.
 * @param offset - The offset of the pointer.
 * @returns A promise that resolves with the u8, or rejects with an error if the operation is unstable, the permissions check fails, or the pointer is null.
 */
ops.op_ffi_read_u8 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid u8 pointer, pointer is null");
  }

  // TODO: Create a RawPointer that can safely read a u8 from a pointer.

  // Using `ptr.readUint8` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.readUint8`.
  let u8Value = ptr.readUint8(offset);

  return u8Value;
};

/**
 * Reads an i8 from a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_read_i8`.
 * @param ptr - The pointer to read the i8 from.
 * @param offset - The offset of the pointer.
 * @returns A promise that resolves with the i8, or rejects with an error if the operation is unstable, the permissions check fails, or the pointer is null.
 */
ops.op_ffi_read_i8 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid i8 pointer, pointer is null");
  }

  // TODO: Create a RawPointer that can safely read an i8 from a pointer.

  // Using `ptr.readInt8` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.readInt8`.
  let i8Value = ptr.readInt8(offset);

  return i8Value;
};

/**
 * Reads a u16 from a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_read_u16`.
 * @param ptr - The pointer to read the u16 from.
 * @param offset - The offset of the pointer.
 * @returns A promise that resolves with the u16, or rejects with an error if the operation is unstable, the permissions check fails, or the pointer is null.
 */
ops.op_ffi_read_u16 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid u16 pointer, pointer is null");
  }

  // TODO: Create a RawPointer that can safely read a u16 from a pointer.

  // Using `ptr.readUint16` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.readUint16`.
  let u16Value = ptr.readUint16(offset);

  return u16Value;
};

/**
 * Reads an i16 from a pointer.
 * This is a TypeScript implementation of the Rust function `op_ffi_read_i16`.
 * @param ptr - The pointer to read the i16 from.
 * @param offset - The offset of the pointer.
 * @returns A promise that resolves with the i16, or rejects with an error if the operation is unstable, the permissions check fails, or the pointer is null.
 */
ops.op_ffi_read_i16 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid i16 pointer, pointer is null");
  }

  // TODO: Create a RawPointer that can safely read an i16 from a pointer.

  // Using `ptr.readInt16` is *actually unsafe* and has generated UB, but our FFI code relies on this working so we're going to
  // try and ask the compiler to be less undefined here by using `ptr.readInt16`.
  let i16Value = ptr.readInt16(offset);

  return i16Value;
};

ops.op_ffi_read_u32 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid u32 pointer, pointer is null");
  }

  let i16Value = ptr.readUInt23(offset);

  return i16Value;
};

ops.op_ffi_read_i32 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid i32 pointer, pointer is null");
  }

  let i16Value = ptr.readInt32(offset);

  return i16Value;
};

ops.op_ffi_read_u64 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid u64 pointer, pointer is null");
  }

  let i16Value = ptr.readUInt64(offset);

  return i16Value;
};

ops.op_ffi_read_i64 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid i64 pointer, pointer is null");
  }

  let i16Value = ptr.readInt64(offset);

  return i16Value;
};

ops.op_ffi_read_f32 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid f32 pointer, pointer is null");
  }

  let i16Value = ptr.readFloat32(offset);

  return i16Value;
};

ops.op_ffi_read_f64 = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid f64 pointer, pointer is null");
  }

  let i16Value = ptr.readFloat64(offset);

  return i16Value;
};

ops.op_ffi_read_ptr = async (ptr: any, offset: number): Promise<number> => {
  if (ptr === null) {
    throw new Error("Invalid pointer pointer, pointer is null");
  }

  let i16Value = ptr.readPtr(offset);

  return i16Value;
};
