// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Based on https://raw.githubusercontent.com/denoland/deno/main/runtime/js/01_version.js
"use strict";

import { primordials } from '../../core/00_primordials.js';

const { ObjectFreeze } = primordials;

export const version = {
  deno: "",
  v8: "",
  typescript: "",
  gjs: "",
};

export function setVersions(
  denoVersion: string,
  v8Version: string,
  tsVersion: string,
  gjsVersion: string,
) {
  version.deno = denoVersion;
  version.v8 = v8Version;
  version.typescript = tsVersion;
  version.gjs = gjsVersion;

  ObjectFreeze(version);
}
