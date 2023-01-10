// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Based on https://github.com/denoland/deno/blob/main/runtime/js/01_build.js
"use strict";

import { primordials } from '../../core/00_primordials.js';
import { getTarget } from '@gjsify/utils';

const { ObjectFreeze, StringPrototypeSplit } = primordials;

// Test this in deno with: `console.log(Deno.build)`
export const build = {
  target: "unknown",
  arch: "unknown",
  os: "unknown",
  vendor: "unknown",
  env: undefined as string | undefined
};

/**
 *
 * @param target E.g. `"x86_64-gjsify-linux-gnu"`
 */
export function setBuildInfo(target: string) {
  const [arch, vendor, os, env] = StringPrototypeSplit(target, "-" as any, 4);
  build.target = target;
  build.arch = arch;
  build.vendor = vendor;
  build.os = os;
  build.env = env;
  ObjectFreeze(build);
}

// Gjsify
setBuildInfo(getTarget());
