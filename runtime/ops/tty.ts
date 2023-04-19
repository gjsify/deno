// import { cli } from '@gjsify/utils';
// import GLib from 'gi://GLib?version=2.0';
// import Gio from 'gi://Gio?version=2.0';

export const op_stdin_set_raw = (mode: boolean, cbreak: boolean): void => {
  console.warn("Not implemented: ops.op_stdin_set_raw");
}

/**
 *
 * @param rid The resource id
 * @param out The result is stored here
 * @returns
 */
export const op_isatty = (rid: number, out: Uint8Array): void => {
  console.warn("Not full implemented: ops.op_isatty");
  let isatty = false;

  // TODO: Write a Lib in Vala to use the posix module: https://valadoc.org/posix/Posix.isatty.html
  if(rid === 0 || rid === 1 || rid === 2) {
    isatty = true;
  }

  out[0] = Number(isatty)
}

const check_console_size = (result: Uint32Array, fd: number) => {

  // TODO: Write a Lib in Vala to use the posix module: https://valadoc.org/posix/Posix.ioctl.html
  // Posix.ioctl(fd, TIOCGWINSZ, &ws);

  // result[0] = ws.ws_col;
  // result[1] = ws.ws_row;

  result[0] = 80 // columns
  result[1] = 120 // rows

  return true;
}

export const op_console_size = (out: Uint32Array) => {
  console.warn("Not implemented: ops.op_console_size");

  let lastResult = false;
  for (const fd of [0, 1, 2]) {
    lastResult = check_console_size(out, fd);
    if(lastResult) {
      return lastResult;
    }
  }
  return lastResult;
}
