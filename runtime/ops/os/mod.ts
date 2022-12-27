import GLib from '@gjsify/types/GLib-2.0'

export const op_runtime_memory_usage = (): number => {
  console.warn("Not implemented: ops.op_runtime_memory_usage");
  return -1;
}

export const op_delete_env = (key: string): void => {
  return GLib.unsetenv(key);
}

export const op_get_env = (key: string): string | undefined => {
  return GLib.getenv(key);
}
