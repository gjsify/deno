// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Based on https://github.com/denoland/deno/blob/main/runtime/js/40_signals.js
"use strict";

import { primordials } from '../../core/00_primordials.js';
import * as core from '../../core/01_core.js';
import * as ops from '../../ops/index.js';

const {
  SafeSetIterator,
  Set,
  SetPrototypeDelete,
  SymbolFor,
  TypeError,
} = primordials;

function bindSignal(signo: Deno.Signal) {
  return ops.op_signal_bind(signo);
}

function pollSignal(rid: number) {
  const promise = core.opAsync("op_signal_poll", rid);
  core.unrefOp(promise[SymbolFor("Deno.core.internalPromiseId")]);
  return promise;
}

function unbindSignal(rid: number) {
  ops.op_signal_unbind(rid);
}

// Stores signal listeners and resource data. This has type of
// `Record<string, { rid: number | undefined, listeners: Set<() => void> }>`
const signalData: Record<string, { rid?: number, listeners: Set<() => void>}> = {};

/** Gets the signal handlers and resource data of the given signal */
function getSignalData(signo: Deno.Signal) {
  return signalData[signo] ??
    (signalData[signo] = { rid: undefined, listeners: new Set() });
}

function checkSignalListenerType(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      `Signal listener must be a function. "${typeof listener}" is given.`,
    );
  }
}

export function addSignalListener(signo: Deno.Signal, listener) {
  checkSignalListenerType(listener);

  const sigData = getSignalData(signo);
  sigData.listeners.add(listener);

  if (!sigData.rid) {
    // If signal resource doesn't exist, create it.
    // The program starts listening to the signal
    sigData.rid = bindSignal(signo);
    loop(sigData);
  }
}

export function removeSignalListener(signo: Deno.Signal, listener) {
  checkSignalListenerType(listener);

  const sigData = getSignalData(signo);
  SetPrototypeDelete(sigData.listeners, listener);

  if (sigData.listeners.size === 0 && sigData.rid) {
    unbindSignal(sigData.rid);
    sigData.rid = undefined;
  }
}

async function loop(sigData) {
  while (sigData.rid) {
    if (await pollSignal(sigData.rid)) {
      return;
    }
    for (const listener of new SafeSetIterator(sigData.listeners)) {
      listener();
    }
  }
}

