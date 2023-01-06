import GLib from '@gjsify/types/GLib-2.0';

const System = imports.system;

const startTime = new Date().getTime();

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

export const op_node_unstable_os_uptime = (): number => {
  return op_os_uptime();
}
