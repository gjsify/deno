import GLib from '@gjsify/types/GLib-2.0'

const startTime = new Date().getTime();

export const op_exec_path = (...args: any[]) => {
  console.warn("Not tested: ops.op_exec_path");
  const [__filename] = GLib.filename_from_uri(import.meta.url);
  return __filename;
}

export const op_runtime_memory_usage = (): Deno.MemoryUsage => {
  console.warn("Not implemented: ops.op_runtime_memory_usage");
  return {
    external: 0,
    heapTotal: 0,
    heapUsed: 0,
    rss: 0,
  }
}

export const op_delete_env = (key: string): void => {
  return GLib.unsetenv(key);
}

export const op_get_env = (key: string): string | undefined => {
  return GLib.getenv(key);
}

export const op_os_release = (): string => {
  console.warn("Not implemented: ops.op_os_release");
  return "";
}

export const op_system_memory_info = (...args: any[]) => {
  console.warn("Not implemented: ops.op_system_memory_info");
}

export const op_gid = (): number => {
  console.warn("Not implemented: ops.op_gid");
  return 0;
}

export const op_uid = (): number => {
  console.warn("Not implemented: ops.op_uid");
  return 0;
}

/** Returns the uptime in seconds */
export const op_os_uptime = (): number => {
  const seconds = new Date().getTime() - startTime / 1000;
  return seconds;
}
