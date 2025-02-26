// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Based on https://github.com/denoland/deno/blob/main/ext/web/02_structured_clone.js

// @ts-check
/// <reference path="../../core/lib.deno_core.d.ts" />
/// <reference path="../../core/internal.d.ts" />
/// <reference path="../web/internal.d.ts" />
/// <reference path="../web/lib.deno_web.d.ts" />

"use strict";

import { primordials } from '../../core/00_primordials.js';
import * as core from '../../core/01_core.js';
import { DOMException } from './01_dom_exception.js';
const {
  ArrayBuffer,
  ArrayBufferPrototype,
  ArrayBufferPrototypeGetByteLength,
  ArrayBufferPrototypeSlice,
  ArrayBufferIsView,
  DataView,
  DataViewPrototypeGetBuffer,
  DataViewPrototypeGetByteLength,
  DataViewPrototypeGetByteOffset,
  ObjectPrototypeIsPrototypeOf,
  TypedArrayPrototypeGetBuffer,
  TypedArrayPrototypeGetByteOffset,
  TypedArrayPrototypeGetLength,
  TypedArrayPrototypeGetSymbolToStringTag,
  TypeErrorPrototype,
  WeakMap,
  WeakMapPrototypeSet,
  Int8Array,
  Int16Array,
  Int32Array,
  BigInt64Array,
  Uint8Array,
  Uint8ClampedArray,
  Uint16Array,
  Uint32Array,
  BigUint64Array,
  Float32Array,
  Float64Array,
} = primordials;

const objectCloneMemo = new WeakMap();

function cloneArrayBuffer(
  srcBuffer,
  srcByteOffset,
  srcLength,
  _cloneConstructor,
) {
  // this function fudges the return type but SharedArrayBuffer is disabled for a while anyway
  return ArrayBufferPrototypeSlice(
    srcBuffer,
    srcByteOffset,
    srcByteOffset + srcLength,
  );
}

// TODO see also packages/deno/runtime/src/ext/web/13_message_port.ts
/** Clone a value in a similar way to structured cloning.  It is similar to a
 * StructureDeserialize(StructuredSerialize(...)). */
export function structuredClone(value: any) {
  // Performance optimization for buffers, otherwise
  // `serialize/deserialize` will allocate new buffer.
  if (ObjectPrototypeIsPrototypeOf(ArrayBufferPrototype, value)) {
    const cloned = cloneArrayBuffer(
      value,
      0,
      ArrayBufferPrototypeGetByteLength(value),
      ArrayBuffer,
    );
    WeakMapPrototypeSet(objectCloneMemo, value, cloned);
    return cloned;
  }

  if (ArrayBufferIsView(value)) {
    const tag = TypedArrayPrototypeGetSymbolToStringTag(value);
    // DataView
    if (tag === undefined) {
      return new DataView(
        structuredClone(DataViewPrototypeGetBuffer(value as DataView)),
        DataViewPrototypeGetByteOffset(value as DataView),
        DataViewPrototypeGetByteLength(value as DataView),
      );
    }
    // TypedArray
    let Constructor;
    switch (tag) {
      case "Int8Array":
        Constructor = Int8Array;
        break;
      case "Int16Array":
        Constructor = Int16Array;
        break;
      case "Int32Array":
        Constructor = Int32Array;
        break;
      case "BigInt64Array":
        Constructor = BigInt64Array;
        break;
      case "Uint8Array":
        Constructor = Uint8Array;
        break;
      case "Uint8ClampedArray":
        Constructor = Uint8ClampedArray;
        break;
      case "Uint16Array":
        Constructor = Uint16Array;
        break;
      case "Uint32Array":
        Constructor = Uint32Array;
        break;
      case "BigUint64Array":
        Constructor = BigUint64Array;
        break;
      case "Float32Array":
        Constructor = Float32Array;
        break;
      case "Float64Array":
        Constructor = Float64Array;
        break;
    }
    return new Constructor(
      structuredClone(TypedArrayPrototypeGetBuffer(value as Uint8Array)),
      TypedArrayPrototypeGetByteOffset(value as Uint8Array),
      TypedArrayPrototypeGetLength(value as Uint8Array),
    );
  }

  try {
    return core.deserialize(core.serialize(value));
  } catch (e) {
    if (ObjectPrototypeIsPrototypeOf(TypeErrorPrototype, e)) {
      throw new DOMException(e.message, "DataCloneError");
    }
    throw e;
  }
}
