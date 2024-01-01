import GLib from '@girs/glib-2.0';
import { createCancelHandler } from '@gjsify/utils';

// The following imports are synced with './lib.rs'.

// OP methods
import './blob.js';
import './message_port.js';
import './timers.js';
import './stream_resource.js';

// Extensions
// import '00_infra.js';
// import '01_dom_exception.js';
// import '01_mimesniff.js';
// import '02_event.js';
// import '02_structured_clone.js';
// import '02_timers.js';
// import '03_abort_signal.js';
// import '04_global_interfaces.js';
// import '05_base64.js';
// import '06_streams.js';
// import '08_text_encoding.js';
// import '09_file.js';
// import '10_filereader.js';
// import '12_location.js';
// import '13_message_port.js';
// import '14_compression.js';
// import '15_performance.js';
// import '16_image_data.js';

const { ops } = globalThis.Deno.core;

/**
 * Decodes a base64 encoded string.
 * This is a JavaScript implementation of the Rust function `op_base64_decode`.
 * @param {string} input - The base64 encoded string.
 * @returns {Uint8Array} The decoded data.
 */
ops.op_base64_decode = (data) => {
  return GLib.base64_decode(data)
}

/**
 * Decodes a base64 encoded string to a byte string.
 * This is a JavaScript implementation of the Rust function `op_base64_atob`.
 * @param {string} input - The base64 encoded string.
 * @returns {Uint8Array} The decoded data.
 */
ops.op_base64_atob = (data) => {
  const decoder = new TextDecoder();
  return decoder.decode(op_base64_decode(data));
}

/**
 * Encodes a byte array to a base64 string.
 * This is a JavaScript implementation of the Rust function `op_base64_encode`.
 * @param {Uint8Array} s - The byte array to encode.
 * @returns {string} The base64 encoded string.
 */
ops.op_base64_encode = (s) => {
  // In Rust, this function uses the `forgiving_base64_encode` function
  // to encode the byte array. In Gjs, we can use `GLib.base64_encode` to
  // achieve the same result.
  return GLib.base64_encode(s);
}

/**
 * Encodes a byte string to a base64 string.
 * This is a JavaScript implementation of the Rust function `op_base64_btoa`.
 * @param {string} s - The byte string to encode.
 * @returns {string} The base64 encoded string.
 */
ops.op_base64_btoa = (s) => {
  // Similar to `op_base64_encode`, we can use `GLib.base64_encode` to encode
  // the byte string. The difference is that this function takes a string
  // instead of a byte array.
  const encoder = new TextEncoder();
  const utf8Arr = encoder.encode(s);
  return op_base64_encode(utf8Arr)
}

/**
 * Normalizes an encoding label.
 * This is a JavaScript implementation of the Rust function `op_encoding_normalize_label`.
 * @param {string} label - The encoding label to normalize.
 * @returns {string} The normalized encoding label.
 */
ops.op_encoding_normalize_label = (label) => {
  // In Rust, this function uses the `Encoding::for_label_no_replacement` function
  // to normalize the encoding label. In JavaScript, there is no direct equivalent,
  // so we will simply return the label in lowercase.
  return label.toLowerCase();
}

/**
 * Decodes a UTF-8 encoded byte array.
 * This is a JavaScript implementation of the Rust function `op_encoding_decode_utf8`.
 * @param {Uint8Array} zero_copy - The UTF-8 encoded byte array.
 * @param {boolean} ignore_bom - Whether to ignore the byte order mark.
 * @returns {string} The decoded string.
 */
ops.op_encoding_decode_utf8 = (zero_copy, ignore_bom) => {
  let buf = zero_copy;

  if (!ignore_bom && buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf) {
    buf = buf.slice(3);
  }

  // In Rust, this function uses `v8::String::new_from_utf8` to decode the UTF-8 string.
  // In Gjs, we can use `ByteArray.toString` to achieve the same result.
  return ByteArray.toString(buf);
}

/**
 * Decodes a single encoded byte array.
 * This is a JavaScript implementation of the Rust function `op_encoding_decode_single`.
 * @param {Uint8Array} data - The encoded byte array.
 * @param {string} label - The encoding label.
 * @param {boolean} fatal - Whether to throw an error on invalid input.
 * @param {boolean} ignore_bom - Whether to ignore the byte order mark.
 * @returns {string} The decoded string.
 * @throws {Error} If the encoding label is invalid, the data is too large to decode, the provided buffer is too small, or the encoded data is not valid.
 */
ops.op_encoding_decode_single = (data, label, fatal, ignore_bom) => {
  // In Rust, this function uses the `Encoding::for_label` function to get the encoding
  // and the `Decoder::decode_to_utf16_without_replacement` or `Decoder::decode_to_utf16`
  // function to decode the data. In JavaScript, there is no direct equivalent, so we
  // will use the `TextDecoder` class to achieve a similar result.

  let decoder = new TextDecoder(label, { fatal: fatal, ignoreBOM: ignore_bom });

  try {
    let decoded = decoder.decode(data);
    return decoded;
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * Creates a new text decoder.
 * This is a JavaScript implementation of the Rust function `op_encoding_new_decoder`.
 * @param {string} label - The encoding label.
 * @param {boolean} fatal - Whether to throw an error on invalid input.
 * @param {boolean} ignore_bom - Whether to ignore the byte order mark.
 * @returns {TextDecoder} The new text decoder.
 * @throws {Error} If the encoding label is invalid.
 */
ops.op_encoding_new_decoder = (label, fatal, ignore_bom) => {
  // In Rust, this function uses the `Encoding::for_label` function to get the encoding
  // and the `Decoder::new_decoder_without_bom_handling` or `Decoder::new_decoder_with_bom_removal`
  // function to create the decoder. In JavaScript, we can use the `TextDecoder` class to
  // achieve a similar result.

  try {
    let decoder = new TextDecoder(label, { fatal: fatal, ignoreBOM: ignore_bom });
    return decoder;
  } catch (e) {
    throw new Error(`The encoding label provided ('${label}') is invalid.`);
  }
}

/**
 * Decodes encoded data.
 * This is a JavaScript implementation of the Rust function `op_encoding_decode`.
 * @param {Uint8Array} data - The encoded data.
 * @param {TextDecoder} decoder - The text decoder.
 * @param {boolean} stream - Whether to stream the data.
 * @returns {string} The decoded string.
 * @throws {Error} If the data is too large to decode, the provided buffer is too small, or the encoded data is not valid.
 */
ops.op_encoding_decode = (data, decoder, stream) => {
  // In Rust, this function uses the `Decoder::max_utf16_buffer_length` function to get the maximum buffer length
  // and the `Decoder::decode_to_utf16_without_replacement` or `Decoder::decode_to_utf16` function to decode the data.
  // In JavaScript, we can use the `TextDecoder` class to achieve a similar result.

  try {
    let decoded = decoder.decode(data, { stream: stream });
    return decoded;
  } catch (e) {
    throw new Error(e.message);
  }
}

/**
 * Encodes a string into a byte array.
 * This is a JavaScript implementation of the Rust function `op_encoding_encode_into`.
 * @param {string} input - The string to encode.
 * @param {Uint8Array} buffer - The buffer to write the encoded data into.
 * @returns {number} The number of characters encoded.
 * @throws {Error} If the buffer is too small to hold the encoded data.
 */
ops.op_encoding_encode_into = (input, buffer) => {
  // In Rust, this function uses the `v8::Local::<v8::String>::write_utf8` function to encode the string.
  // In Gjs, we can use the `TextEncoder` class to achieve a similar result.

  let encoder = new TextEncoder();
  let encoded = encoder.encode(input);

  if (encoded.length > buffer.length) {
    throw new Error('The buffer is too small to hold the encoded data.');
  }

  buffer.set(encoded);
  return encoded.length;
};

/**
 * Encodes a string into a byte array, but faster.
 * This is a JavaScript implementation of the Rust function `op_encoding_encode_into_fast`.
 * @param {string} input - The string to encode.
 * @param {Uint8Array} buffer - The buffer to write the encoded data into.
 * @returns {number} The number of characters encoded.
 * @throws {Error} If the buffer is too small to hold the encoded data.
 */
ops.op_encoding_encode_into_fast = (input, buffer) => {
  // This function is similar to `op_encoding_encode_into`, but it uses a faster method to find the last UTF-8 code
  // point boundary from input that fits in `buffer`, and copy the bytes up to that point.

  let encoder = new TextEncoder();
  let encoded = encoder.encode(input);

  let boundary = Math.min(buffer.length, encoded.length);

  // The maximum length of a UTF-8 code point is 4 bytes.
  while (boundary > 0 && (encoded[boundary] & 0xC0) === 0x80) {
    boundary--;
  }

  if (boundary === 0) {
    throw new Error('The buffer is too small to hold the encoded data.');
  }

  buffer.set(encoded.subarray(0, boundary));
  return boundary;
};

/**
 * Transfers an ArrayBuffer.
 * This is a JavaScript implementation of the Rust function `op_transfer_arraybuffer`.
 * @param {ArrayBuffer} ab - The ArrayBuffer to transfer.
 * @returns {ArrayBuffer} The transferred ArrayBuffer.
 * @throws {Error} If the ArrayBuffer is not transferable.
 */
ops.op_transfer_arraybuffer = (ab) => {
  if (!ArrayBuffer.isTransferable(ab)) {
    throw new Error('ArrayBuffer is not transferable');
  }

  let bs = ab.slice(0);
  return bs;
};

/**
 * Encodes a binary string.
 * This is a JavaScript implementation of the Rust function `op_encode_binary_string`.
 * @param {Uint8Array} s - The binary string to encode.
 * @returns {string} The encoded string.
 */
ops.op_encode_binary_string = (s) => {
  let encoder = new TextEncoder();
  return encoder.encode(s);
};

/**
 * Creates a [`CancelHandle`] resource that can be used to cancel invocations of certain ops.
 * This is a JavaScript implementation of the Rust function `op_cancel_handle`.
 * @returns {Object} The cancel handler.
 */
ops.op_cancel_handle = () => {
  // return new AbortController();
  return createCancelHandler();
}

