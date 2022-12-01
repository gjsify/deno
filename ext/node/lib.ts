import { PackageJson } from './package_json.js';

export function op_require_init_paths(): string[] {
  console.warn("Not implemented: ops.op_require_init_paths");
  return [];
}

export function op_require_node_module_paths(
  from: string,
): string[] {
  console.warn("Not implemented: ops.op_require_node_module_paths");
  return [];
}

export function op_require_proxy_path(filename: string): string {
  console.warn("Not implemented: ops.op_require_proxy_path");
  return "";
}

export function op_require_is_request_relative(request: string): boolean {
  console.warn("Not implemented: ops.op_require_is_request_relative");
  return false;
}

export function op_require_resolve_deno_dir(
  request: string,
  parent_filename: string,
): string | undefined {
  console.warn("Not implemented: ops.op_require_resolve_deno_dir");
  return undefined;
}

export function op_require_is_deno_dir_package(path: string): boolean {
  console.warn("Not implemented: ops.op_require_is_deno_dir_package");
  return false;
}

export function op_require_resolve_lookup_paths(
  request: string,
  maybe_parent_paths: string[] | undefined,
  parent_filename: string,
): string[] | undefined {
  console.warn("Not implemented: ops.op_require_resolve_lookup_paths");
  return undefined;
}

export function op_require_path_is_absolute(p: string): boolean {
  console.warn("Not implemented: ops.op_require_path_is_absolute");
  return false;
}

export function op_require_stat(
  path: string,
): number {
  console.warn("Not implemented: ops.op_require_stat");
  return -1;
}

export function op_require_real_path(
  request: string,
): string {
  console.warn("Not implemented: ops.op_require_real_path");
  return "";
}

function path_resolve(parts: string[]): string {
  console.warn("Not implemented: ops.path_resolve");
  return "";
}

export function op_require_path_resolve(parts: string[]): string {
  return path_resolve(parts);
}

export function op_require_path_dirname(request: string): string {
  console.warn("Not implemented: ops.op_require_path_dirname");
  return request;
}

export function op_require_path_basename(request: string): string {
  console.warn("Not implemented: ops.op_require_path_basename");
  return request;
}

export function op_require_try_self_parent_path(
  has_parent: boolean,
  maybe_parent_filename?: string,
  maybe_parent_id?: string,
): string | undefined {
  console.warn("Not implemented: ops.op_require_try_self_parent_path");
  return undefined;
}

export function op_require_try_self(
  parent_path: string | undefined,
  request: string,
): string | undefined {
  console.warn("Not implemented: ops.op_require_try_self");
  return undefined;
}

export function op_require_read_file(
  file_path: string,
): string {
  console.warn("Not implemented: ops.op_require_read_file");
  return "";
}

export function op_require_as_file_path(file_or_url: string): string {
  console.warn("Not implemented: ops.op_require_as_file_path");
  return file_or_url;
}

export function op_require_resolve_exports(
  modules_path: string,
  _request: string,
  name: string,
  expansion: string,
  parent_path: string,
): string | undefined {
  console.warn("Not implemented: ops.op_require_resolve_exports");
  return undefined;
}

export function op_require_read_closest_package_json(
  filename: string,
): PackageJson {
  console.warn("Not implemented: ops.op_require_read_closest_package_json");
  return {
    exists: false,
    path: filename,
    typ: "None",
  };
}

export function op_require_read_package_scope(
  package_json_path: string,
): PackageJson | undefined {
  console.warn("Not implemented: ops.op_require_read_package_scope");
  return undefined;
}

export function op_require_package_imports_resolve(
  parent_filename: string,
  request: string,
): string | undefined {
  console.warn("Not implemented: ops.op_require_package_imports_resolve");
  return undefined;
}

export function op_require_break_on_next_statement(): void {
  console.warn("Not implemented: ops.op_require_break_on_next_statement");
}
