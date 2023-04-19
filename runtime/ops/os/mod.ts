import GLib from 'gi://GLib?version=2.0';
import { cli, getOs } from '@gjsify/utils';

const System = imports.system;
const EOL = /\r\n|\n/;
let exitCode = 0;

export const op_exec_path = (...args: any[]) => {
  console.warn("Not tested: ops.op_exec_path");
  const [__filename] = GLib.filename_from_uri(import.meta.url);
  return __filename;
}

export const op_runtime_memory_usage = (): Deno.MemoryUsage => {
  console.warn("Not implemented: ops.op_runtime_memory_usage");
  return {
    external: 0,
    heapTotal: Number.MAX_SAFE_INTEGER,
    heapUsed: 0,
    rss: 0,
  }
}

export const op_set_env = (key: string, value: string): void => {
  GLib.setenv(key, value, true);
}

export const op_delete_env = (key: string): void => {
  return GLib.unsetenv(key);
}

export const op_get_env = (key: string): string | undefined => {
  return GLib.getenv(key);
}

export const op_env = (): { [index: string]: string } => {
  return GLib.listenv().reduce(
    (env, key) => {
      env[key] = GLib.getenv(key);
      return env;
    },
    {}
  );
}

export const op_set_exit_code = (code: number) => {
  exitCode = code;
}

export const op_exit = () => {
  System.exit(exitCode);
}

export const op_hostname = (): string => {
  return GLib.get_home_dir();
}

const op_loadavg_darwin = (): number[] => {
  return /load\s+averages:\s+(\d+(?:\.\d+))\s+(\d+(?:\.\d+))\s+(\d+(?:\.\d+))/.test(
    cli('uptime')
  ) && [
    parseFloat(RegExp.$1),
    parseFloat(RegExp.$2),
    parseFloat(RegExp.$3)
  ];
}

const op_loadavg_linux = (): number[] => {
  return /(\d+(?:\.\d+))\s+(\d+(?:\.\d+))\s+(\d+(?:\.\d+))/.test(
    cli('cat /proc/loadavg')
  ) && [
    parseFloat(RegExp.$1),
    parseFloat(RegExp.$2),
    parseFloat(RegExp.$3)
  ];
}

export const op_loadavg = (): number[] => {
  if(getOs() === 'darwin') {
    return op_loadavg_darwin();
  }
  return op_loadavg_linux();
}

const op_network_interfaces_linux = (): Deno.NetworkInterfaceInfo[] => {
  console.warn("Not implemented: ops.op_network_interfaces_linux");
  return [];
}

export const op_network_interfaces = (): Deno.NetworkInterfaceInfo[] => {
  console.warn("Not implemented: ops.op_network_interfaces");
  return [];
}

export const op_os_release = (): string => {
  return cli('uname -r');
}

const op_system_memory_info_free_linux = () => {
  let I: number, mem = cli('free -b').split(EOL);
  mem[0].split(/\s+/).some((info, i) => info === 'free' && (I = i));
  return parseFloat(mem[1].split(/\s+/)[I + 1]);
}

const op_system_memory_info_free_darwin = () => {
  return parseFloat(cli('sysctl -n hw.memsize')) - parseFloat(cli('sysctl -n hw.physmem'));
}

const op_system_memory_info_total = () => {
  let I: number, mem = cli('free -b').split(EOL);
  mem[0].split(/\s+/).some((info, i) => info === 'total' && (I = i));
  return parseFloat(mem[1].split(/\s+/)[I + 1]);
}

export const op_system_memory_info = (): Deno.SystemMemoryInfo => {
  const result: Deno.SystemMemoryInfo = {
    total: 0,
    free: 0,
    available: 0,
    buffers: 0,
    cached: 0,
    swapTotal: 0,
    swapFree: 0
  }

  if(getOs() === 'darwin') {
    result.free = op_system_memory_info_free_darwin();
    result.total = op_system_memory_info_total();
  } else {
    result.free = op_system_memory_info_free_linux();
    result.total = op_system_memory_info_total();
  }

  return result;
}

export const op_gid = (): number => {
  console.warn("Not implemented: ops.op_gid");
  return 0;
}

export const op_uid = (): number => {
  console.warn("Not implemented: ops.op_uid");
  return 0;
}

/** Returns the uptime of the linux os in seconds */
const op_os_uptime_linux = (): number => {
  return (Date.now() - Date.parse(cli('uptime -s').replace(' ', 'T'))) / 1000
}

/** Returns the uptime of the darwin os in seconds */
const op_os_uptime_darwin = (): number => {
  const uptime = cli('uptime');
  const up = /up\s+([^,]+)?,/.test(uptime) && RegExp.$1;
  switch (true) {
    case /^(\d+):(\d+)$/.test(up):
      return ((parseInt(RegExp.$1, 10) * 60) + parseInt(RegExp.$2, 10)) * 60;
    case /^(\d+)\s+mins?$/.test(up):
      return parseInt(RegExp.$1, 10) * 60;
    case /^(\d+)\s+days?$/.test(up):
      return (parseInt(RegExp.$1, 10) * 86400) + (
        /days?,\s+^(\d+):(\d+)$/.test(uptime) && (
          ((parseInt(RegExp.$1, 10) * 60) +
          parseInt(RegExp.$2, 10)) * 60
        )
      );
  }
  return Number(up);
}

/** Returns the uptime of the os in seconds */
export const op_os_uptime = (): number => {
  if(getOs() === 'darwin') {
    return op_os_uptime_darwin();
  }
  return op_os_uptime_linux();
}

export const op_node_unstable_os_uptime = (): number => {
  return op_os_uptime();
}
