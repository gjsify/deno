// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Based on https://raw.githubusercontent.com/denoland/deno/main/runtime/js/01_version.js
"use strict";

import { primordials } from '../../core/00_primordials.js';
import { getGjsVersion } from '@gjsify/utils'

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

// Gjsify: Set versions to latest Deno versions and current Gjs version
setVersions('1.29.2', '10.9.194.5', '4.9.4', getGjsVersion());
