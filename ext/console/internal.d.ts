// Copyright 2018-2023 the Deno authors. All rights reserved. MIT license.

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

// declare namespace globalThis {
//   declare namespace __bootstrap {
    export namespace console {
      export function createFilteredInspectProxy<TObject>(params: {
        object: TObject;
        keys: (keyof TObject)[];
        evaluate: boolean;
      }): Record<string, unknown>;
    }
//   }
// }
