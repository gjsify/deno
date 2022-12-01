// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.

// deno-lint-ignore-file no-var

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

import type { URLPattern } from '../../ext/url/01_urlpattern.js'

// export namespace globalThis {
//   export namespace __bootstrap {
    export var url: {
      URL: typeof URL;
      URLSearchParams: typeof URLSearchParams;
      parseUrlEncoded(bytes: Uint8Array): [string, string][];
    };

    export var urlPattern: {
      URLPattern: typeof URLPattern;
    };
//   }
// }
