import { op_cancel_handle } from '../../ext/web/lib.js';
import { getCancelHandler } from '@gjsify/utils';

export const op_now = (...args: any[]) => {
  console.warn("Not implemented: ops.op_now");
}

/**
 * Creates a [`TimerHandle`] resource that can be used to cancel invocations of [`op_sleep`].
 * @returns
 */
export const op_timer_handle = () => {
  return op_cancel_handle();
}

/**
 * Waits asynchronously until either `ms` milliseconds have passed or the
 * [`TimerHandle`] resource given by `rid` has been canceled.
 * If the timer is canceled, this returns `false`. Otherwise, it returns `true`.
 * @param ms
 * @param rid
 * @returns
 */
export const op_sleep = async (ms: number, rid: number) => {

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
