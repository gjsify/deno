// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.
// Based on https://raw.githubusercontent.com/denoland/deno/main/runtime/js/10_permissions.js
"use strict";

import { primordials } from '../../core/00_primordials.js';
import * as ops from '../../ops/index.js';
import { illegalConstructorKey } from './01_web_util.js';
import { pathFromURL } from './06_util.js';
import { Event, EventTarget } from '../../ext/web/02_event.js';

const {
  ArrayIsArray,
  ArrayPrototypeIncludes,
  ArrayPrototypeMap,
  ArrayPrototypeSlice,
  Map,
  MapPrototypeGet,
  MapPrototypeHas,
  MapPrototypeSet,
  FunctionPrototypeCall,
  PromiseResolve,
  PromiseReject,
  ReflectHas,
  SafeArrayIterator,
  SymbolFor,
  TypeError,
} = primordials;

interface StatusCacheValue {
  state: Deno.PermissionState;
  status: PermissionStatus;
}

/** @type {ReadonlyArray<"read" | "write" | "net" | "env" | "sys" | "run" | "ffi" | "hrtime">} */
const permissionNames: ReadonlyArray<"read" | "write" | "net" | "env" | "sys" | "run" | "ffi" | "hrtime"> = [
  "read",
  "write",
  "net",
  "env",
  "sys",
  "run",
  "ffi",
  "hrtime",
];

function opQuery(desc: Deno.PermissionDescriptor): Deno.PermissionState {
  return ops.op_query_permission(desc);
}

function opRevoke(desc: Deno.PermissionDescriptor): Deno.PermissionState {
  return ops.op_revoke_permission(desc);
}

function opRequest(desc: Deno.PermissionDescriptor): Deno.PermissionState {
  return ops.op_request_permission(desc);
}

export class PermissionStatus extends EventTarget {
  #state: { state: Deno.PermissionState };

  onchange: ((this: PermissionStatus, event: Event) => any) | null = null;

  get state(): Deno.PermissionState {
    return this.#state.state;
  }

  constructor(state: { state: Deno.PermissionState } | null = null, key: unknown | null = null) {
    if (key != illegalConstructorKey) {
      throw new TypeError("Illegal constructor.");
    }
    super();
    this.#state = state;
  }

  dispatchEvent(event: Event): boolean {
    let dispatched = super.dispatchEvent(event);
    if (dispatched && this.onchange) {
      FunctionPrototypeCall(this.onchange, this, event);
      dispatched = !event.defaultPrevented;
    }
    return dispatched;
  }

  [SymbolFor("Deno.privateCustomInspect")](inspect: (arg0: { state: Deno.PermissionState; onchange: (this: PermissionStatus, event: Event) => any; }) => any) {
    return `${this.constructor.name} ${
      inspect({ state: this.state, onchange: this.onchange })
    }`;
  }
}

const statusCache: Map<string, StatusCacheValue> = new Map();

function cache(desc: Deno.PermissionDescriptor, state: Deno.PermissionState): PermissionStatus {
  let { name: key } = desc;
  if (
    (desc.name === "read" || desc.name === "write" || desc.name === "ffi") &&
    ReflectHas(desc, "path")
  ) {
    key += `-${desc.path}&`;
  } else if (desc.name === "net" && desc.host) {
    key += `-${desc.host}&`;
  } else if (desc.name === "run" && desc.command) {
    key += `-${desc.command}&`;
  } else if (desc.name === "env" && desc.variable) {
    key += `-${desc.variable}&`;
  } else if (desc.name === "sys" && desc.kind) {
    key += `-${desc.kind}&`;
  } else {
    key += "$";
  }
  if (MapPrototypeHas(statusCache, key)) {
    const status = MapPrototypeGet(statusCache, key);
    if (status.state !== state) {
      status.state = state;
      status.status.dispatchEvent(new Event("change", { cancelable: false }));
    }
    return status.status;
  }
  const status: { state: Deno.PermissionState; status?: PermissionStatus } = { state };
  status.status = new PermissionStatus(status, illegalConstructorKey);
  MapPrototypeSet(statusCache, key, status);
  return status.status;
}

function isValidDescriptor(desc: unknown): desc is Deno.PermissionDescriptor {
  return typeof desc === "object" && desc !== null &&
    ArrayPrototypeIncludes(permissionNames, (desc as any).name);
}

/**
 * @param {Deno.PermissionDescriptor} desc
 * @returns {desc is Deno.PermissionDescriptor}
 */
function formDescriptor(desc: Deno.PermissionDescriptor): desc is Deno.PermissionDescriptor {
  if (
    desc.name === "read" || desc.name === "write" || desc.name === "ffi"
  ) {
    desc.path = pathFromURL(desc.path);
  } else if (desc.name === "run") {
    desc.command = pathFromURL(desc.command);
  }

  return true;
}

export class Permissions {
  constructor(key = null) {
    if (key != illegalConstructorKey) {
      throw new TypeError("Illegal constructor.");
    }
  }

  query(desc: { name: string}) {
    try {
      return PromiseResolve(this.querySync(desc));
    } catch (error) {
      return PromiseReject(error);
    }
  }

  querySync(desc: { name: string}) {
    if (!isValidDescriptor(desc)) {
      throw new TypeError(
        `The provided value "${desc?.name}" is not a valid permission name.`,
      );
    }

    formDescriptor(desc);

    const state = opQuery(desc);
    return cache(desc, state);
  }

  revoke(desc: {name: string}) {
    try {
      return PromiseResolve(this.revokeSync(desc));
    } catch (error) {
      return PromiseReject(error);
    }
  }

  revokeSync(desc: {name: string}) {
    if (!isValidDescriptor(desc)) {
      throw new TypeError(
        `The provided value "${desc?.name}" is not a valid permission name.`,
      );
    }

    formDescriptor(desc);

    const state = opRevoke(desc);
    return cache(desc, state);
  }

  request(desc: {name: string}) {
    try {
      return PromiseResolve(this.requestSync(desc));
    } catch (error) {
      return PromiseReject(error);
    }
  }

  requestSync(desc: {name: string}) {
    if (!isValidDescriptor(desc)) {
      throw new TypeError(
        `The provided value "${desc?.name}" is not a valid permission name.`,
      );
    }

    formDescriptor(desc);

    const state = opRequest(desc);
    return cache(desc, state);
  }
}

export const permissions = new Permissions(illegalConstructorKey);

/** Converts all file URLs in FS allowlists to paths. */
export function serializePermissions(permissions: Deno.PermissionOptions) {
  if (typeof permissions == "object" && permissions != null) {
    const serializedPermissions = {};
    for (
      const key of new SafeArrayIterator(["read", "write", "run", "ffi"])
    ) {
      if (ArrayIsArray(permissions[key])) {
        serializedPermissions[key] = ArrayPrototypeMap(
          permissions[key],
          (path) => pathFromURL(path),
        );
      } else {
        serializedPermissions[key] = permissions[key];
      }
    }
    for (
      const key of new SafeArrayIterator(["env", "hrtime", "net", "sys"])
    ) {
      if (ArrayIsArray(permissions[key])) {
        serializedPermissions[key] = ArrayPrototypeSlice(permissions[key]);
      } else {
        serializedPermissions[key] = permissions[key];
      }
    }
    return serializedPermissions;
  }
  return permissions;
}


