// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.

// deno-lint-ignore-file no-explicit-any no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

import type { FormDataEntry } from '../../ext/fetch/21_formdata.js';
import type { InnerRequest } from '../../ext/fetch/23_request.js';
import type { InnerResponse } from '../../ext/fetch/23_response.js';
import type { InnerBody } from '../../ext/fetch/22_body.js';
import type { AbortSignal } from '../web/03_abort_signal.js';

export var fetchUtil: {
  requiredArguments(name: string, length: number, required: number): void;
};

export var domIterable: {
  DomIterableMixin(base: any, dataSymbol: symbol): any;
};

export namespace headers {
  class Headers {
  }
  type HeaderList = [string, string][];
  function headersFromHeaderList(
    list: HeaderList,
    guard:
      | "immutable"
      | "request"
      | "request-no-cors"
      | "response"
      | "none",
  ): Headers;
  function headerListFromHeaders(headers: Headers): HeaderList;
  function fillHeaders(headers: Headers, object: HeadersInit): void;
  function getDecodeSplitHeader(
    list: HeaderList,
    name: string,
  ): string[] | null;
  function guardFromHeaders(
    headers: Headers,
  ): "immutable" | "request" | "request-no-cors" | "response" | "none";
}

export namespace formData {
  export type FormData = typeof FormData;
  export function formDataToBlob(
    formData: globalThis.FormData,
  ): Blob;
  export function parseFormData(
    body: Uint8Array,
    boundary: string | undefined,
  ): FormData;
  export function formDataFromEntries(entries: FormDataEntry[]): FormData;
}

export namespace fetchBody {
  function mixinBody(
    prototype: any,
    bodySymbol: symbol,
    mimeTypeSymbol: symbol,
  ): void;
  class InnerBody {
    constructor(stream?: ReadableStream<Uint8Array>);
    stream: ReadableStream<Uint8Array>;
    source: null | Uint8Array | Blob | FormData;
    length: null | number;
    unusable(): boolean;
    consume(): Promise<Uint8Array>;
    clone(): InnerBody;
  }
  function extractBody(object: BodyInit): {
    body: InnerBody;
    contentType: string | null;
  };
}

export namespace fetch {
  function toInnerRequest(request: Request): InnerRequest;
  function fromInnerRequest(
    inner: InnerRequest,
    signal: AbortSignal | null,
    guard:
      | "request"
      | "immutable"
      | "request-no-cors"
      | "response"
      | "none",
  ): Request;
  function redirectStatus(status: number): boolean;
  function nullBodyStatus(status: number): boolean;
  function newInnerRequest(
    method: string,
    url: any,
    headerList?: [string, string][],
    body?: InnerBody,
  ): InnerResponse;
  function toInnerResponse(response: Response): InnerResponse;
  function fromInnerResponse(
    inner: InnerResponse,
    guard:
      | "request"
      | "immutable"
      | "request-no-cors"
      | "response"
      | "none",
  ): Response;
  function networkError(error: string): InnerResponse;
}
