
/**
 * This binding should be used if there's a custom console implementation
 * available. Using it will make sure that proper stack frames are displayed
 * in the inspector console.
 *
 * Each method on console object should be bound to this function, eg:
 * ```ignore
 * function wrapConsole(consoleFromDeno, consoleFromV8) {
 *   const callConsole = core.callConsole;
 *
 *   for (const key of Object.keys(consoleFromV8)) {
 *     if (consoleFromDeno.hasOwnProperty(key)) {
 *       consoleFromDeno[key] = callConsole.bind(
 *         consoleFromDeno,
 *         consoleFromV8[key],
 *         consoleFromDeno[key],
 *       );
 *     }
 *   }
 * }
 * ```
 *
 * Inspired by:
 * https://github.com/nodejs/node/blob/1317252dfe8824fd9cfee125d2aaa94004db2f3b/src/inspector_js_api.cc#L194-L222
 */
export function callConsole(gjs_console_method: (...args: any[]) => void, deno_console_method: (...args: any[]) => void, ...args: any[]) {
  const receiver = this;
  gjs_console_method.call(receiver, ...args);
  deno_console_method.call(receiver, ...args);
}
