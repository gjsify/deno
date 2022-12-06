// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

/// <reference no-default-lib="true" />
// <reference lib="deno.ns" />
// <reference lib="deno.shared_globals" />
// <reference lib="deno.webgpu" />
/// <reference lib="esnext" />
// <reference lib="deno.cache" />

import type { Deno } from './lib.deno.ns.d.js';
import type { GPU } from '../../../ext/webgpu/src/01_webgpu.js';

/** @category Web Workers */
interface WorkerGlobalScopeEventMap {
  "error": ErrorEvent;
  "unhandledrejection": PromiseRejectionEvent;
}

/** @category Web Workers */
export class WorkerGlobalScope extends EventTarget {
  readonly location: WorkerLocation;
  readonly navigator: WorkerNavigator;
  onerror: ((this: WorkerGlobalScope, ev: ErrorEvent) => any) | null;
  onunhandledrejection:
    | ((this: WorkerGlobalScope, ev: PromiseRejectionEvent) => any)
    | null;

  readonly self: WorkerGlobalScope & typeof globalThis;

  addEventListener<K extends keyof WorkerGlobalScopeEventMap>(
    type: K,
    listener: (
      this: WorkerGlobalScope,
      ev: WorkerGlobalScopeEventMap[K],
    ) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof WorkerGlobalScopeEventMap>(
    type: K,
    listener: (
      this: WorkerGlobalScope,
      ev: WorkerGlobalScopeEventMap[K],
    ) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;

  Deno: typeof Deno;
  caches: CacheStorage;
}

/** @category Web APIs */
export class WorkerNavigator {
  constructor();
  readonly gpu: GPU;
  readonly hardwareConcurrency: number;
  readonly userAgent: string;
  readonly language: string;
  readonly languages: string[];
}

/** @category Web APIs */
// export var navigator: WorkerNavigator;

/** @category Web Workers */
interface DedicatedWorkerGlobalScopeEventMap extends WorkerGlobalScopeEventMap {
  "message": MessageEvent;
  "messageerror": MessageEvent;
}

/** @category Web APIs */
export class DedicatedWorkerGlobalScope extends WorkerGlobalScope {
  readonly name: string;
  onmessage:
    | ((this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any)
    | null;
  onmessageerror:
    | ((this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any)
    | null;
  close(): void;
  postMessage(message: any, transfer: Transferable[]): void;
  postMessage(message: any, options?: StructuredSerializeOptions): void;
  addEventListener<K extends keyof DedicatedWorkerGlobalScopeEventMap>(
    type: K,
    listener: (
      this: DedicatedWorkerGlobalScope,
      ev: DedicatedWorkerGlobalScopeEventMap[K],
    ) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof DedicatedWorkerGlobalScopeEventMap>(
    type: K,
    listener: (
      this: DedicatedWorkerGlobalScope,
      ev: DedicatedWorkerGlobalScopeEventMap[K],
    ) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

/** @category Web Workers */
export var name: string;
/** @category Web Workers */
export var onmessage:
  | ((this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any)
  | null;
/** @category Web Workers */
export var onmessageerror:
  | ((this: DedicatedWorkerGlobalScope, ev: MessageEvent) => any)
  | null;
/** @category Web Workers */
export function close(): void;
/** @category Web Workers */
export function postMessage(message: any, transfer: Transferable[]): void;
/** @category Web Workers */
export function postMessage(
  message: any,
  options?: StructuredSerializeOptions,
): void;
/** @category Web APIs */
export var navigator: WorkerNavigator;
/** @category Web APIs */
export var onerror:
  | ((this: DedicatedWorkerGlobalScope, ev: ErrorEvent) => any)
  | null;
/** @category Observability */
export var onunhandledrejection:
  | ((this: DedicatedWorkerGlobalScope, ev: PromiseRejectionEvent) => any)
  | null;
/** @category Web Workers */
export var self: WorkerGlobalScope & typeof globalThis;
/** @category DOM Events */
export function addEventListener<
  K extends keyof DedicatedWorkerGlobalScopeEventMap,
>(
  type: K,
  listener: (
    this: DedicatedWorkerGlobalScope,
    ev: DedicatedWorkerGlobalScopeEventMap[K],
  ) => any,
  options?: boolean | AddEventListenerOptions,
): void;
/** @category DOM Events */
export function addEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions,
): void;
/** @category DOM Events */
export function removeEventListener<
  K extends keyof DedicatedWorkerGlobalScopeEventMap,
>(
  type: K,
  listener: (
    this: DedicatedWorkerGlobalScope,
    ev: DedicatedWorkerGlobalScopeEventMap[K],
  ) => any,
  options?: boolean | EventListenerOptions,
): void;
/** @category DOM Events */
export function removeEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions,
): void;

// TODO(nayeemrmn): Move this to `extensions/web` where its implementation is.
// The types there must first be split into window, worker and global types.
/** The absolute location of the script executed by the Worker. Such an object
 * is initialized for each worker and is available via the
 * WorkerGlobalScope.location property obtained by calling self.location.
 *
 * @category Web APIs
 */
export class WorkerLocation {
  constructor();
  readonly hash: string;
  readonly host: string;
  readonly hostname: string;
  readonly href: string;
  toString(): string;
  readonly origin: string;
  readonly pathname: string;
  readonly port: string;
  readonly protocol: string;
  readonly search: string;
}

// TODO(nayeemrmn): Move this to `extensions/web` where its implementation is.
// The types there must first be split into window, worker and global types.
/** @category Web APIs */
export var location: WorkerLocation;
