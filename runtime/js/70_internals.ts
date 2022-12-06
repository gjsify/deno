export { pathFromURL } from './06_util.js';
// Expose these fields to internalObject for tests.
export { Console, cssToAnsi, inspectArgs, parseCss, parseCssColor } from '../../ext/console/02_console.js';

export * as node from '../../ext/node/01_node.js';
export * as require from '../../ext/node/02_require.js';

export { testing } from '../../cli/js/40_testing.js';

// packages/deno/runtime/src/cli/js/40_testing.ts
// window.__bootstrap.internals = {
//   ...window.__bootstrap.internals ?? {},
//   testing,
// };

// packages/deno/runtime/src/ext/node/01_node.ts
// window.__bootstrap.internals = {
//   ...window.__bootstrap.internals ?? {},
//   node: {
//     globalThis: nodeGlobalThis,
//     initialize,
//     nativeModuleExports,
//     builtinModules,
//   },
// };

// packages/deno/runtime/src/ext/node/02_require.ts
// window.__bootstrap.internals = {
//   ...window.__bootstrap.internals ?? {},
//   require: {
//     setInspectBrk() {
//       hasInspectBrk = true;
//     },
//     Module,
//     wrapSafe,
//     toRealPath,
//     cjsParseCache,
//     readPackageScope,
//   },
// };
