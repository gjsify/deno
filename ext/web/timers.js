import { getCancelHandler } from '@gjsify/utils';

const { ops } = globalThis.Deno.core;

/**
 * Returns the current time in milliseconds since the UNIX epoch.
 * This is a JavaScript implementation of the Rust function `op_now`.
 * @returns {number} The current time in milliseconds.
 */
ops.op_now = () => {
  // The Rust function `op_now` uses the `Instant::now` function
  // to get the current time, and then formats it as a UNIX timestamp
  // in milliseconds. In JavaScript, we can use `Date.now` to get
  // the current time in the same format.
  return Date.now();
}

/**
 * Waits asynchronously until either `ms` milliseconds have passed or the
 * [`TimerHandle`] resource given by `rid` has been canceled.
 * If the timer is canceled, this returns `false`. Otherwise, it returns `true`.
 * @param {number} ms
 * @param {number} rid
 * @returns
 */
ops.op_sleep = async (ms, rid) => {

  return new Promise<boolean>((resolve) => {

    const cancelHandler = getCancelHandler(rid);

    const sleepTimer = setTimeout(() => {
      clearTimeout(sleepTimer);
      cancelHandler.disconnect(cancelConnector);
      resolve(true);
    }, ms);

    const cancelConnector = cancelHandler.connect("close", () => {
      clearTimeout(sleepTimer);
      cancelHandler.disconnect(cancelConnector);
      resolve(false)
    });

  });
}
