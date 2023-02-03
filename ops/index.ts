// Based on https://github.com/denoland/deno/blob/main/core/ops.rs
// Based on https://github.com/denoland/deno/blob/main/core/ops_builtin.rs
// Based on https://github.com/denoland/deno/blob/main/core/ops_builtin_v8.rs
// Based on https://github.com/denoland/deno/blob/main/core/ops_metrics.rs

/// <reference path="../ext/url/lib.deno_url.d.ts" />

export * from '../core/ops_builtin_v8.js';
export * from '../core/ops_builtin.js';
export * from './webstorage.js';
export * from './crypto.js';
export * from './node.js';
export * from '../runtime/ops/os/mod.js';
export * from '../runtime/ops/fs.js';
export * from '../runtime/ops/io.js';
export * from '../runtime/ops/spawn.js';
export * from '../runtime/ops/tty.js';
export * from '../ext/node/lib.js';
export * from '../ext/napi/lib.js';
export * from '../ext/web/lib.js';
export * from '../ext/url/lib.js';
export * from '../ext/flash/lib.js';
export * from '../cli/ops/mod.js';

import type {
  TypedArray,
  messagePort,
  URLPatternInput,
  UrlComponents,
  UrlComponent,
} from '../types/index.js';
import type { TestDescription } from '../cli/js/40_testing.js';
import type { URL } from '../ext/url/00_url.js';
import type { HeaderList } from '../ext/fetch/20_headers.js';


export const op_urlpattern_parse = (input: URLPatternInput, baseURL: string): UrlComponents => {
  console.warn("Not implemented: ops.op_urlpattern_parse");
  const emptyRes: UrlComponent = {
    patternString: "",
    regexp: new RegExp(""),
    groupNameList: []
  }

  return {
    protocol: emptyRes,
    username: emptyRes,
    password: emptyRes,
    hostname: emptyRes,
    port: emptyRes,
    pathname: emptyRes,
    search: emptyRes,
    hash: emptyRes,
  }
}

export const op_urlpattern_process_match_input = (...args: any[]): [values: { [key: string]: any }, inputs: Array<any>] => {
  console.warn("Not implemented: ops.op_urlpattern_process_match_input");
  const values = {};
  const inputs = [];
  return [values, inputs];
}

export const op_fetch = (method: string, url: string | URL, headers: [string, string][], clientRid: number | null, hasBody: boolean, bodyLength: number, body: Uint8Array | null) => {
  console.warn("Not implemented: ops.op_fetch");
  const result: { requestRid: number; requestBodyRid: number | null; cancelHandleRid: number; } = { requestRid: -1, requestBodyRid: -1, cancelHandleRid: -1 }
  return result;
}
export const op_fetch_send = (...args: any[]) => {
  console.warn("Not implemented: ops.op_fetch_send");
}
export const op_fetch_custom_client = (options: Deno.CreateHttpClientOptions) => {
  console.warn("Not implemented: ops.op_fetch_custom_client");
  const rid = 0;
  return rid;
}
export const op_ws_check_permission_and_cancel_handle = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_check_permission_and_cancel_handle");
  const cancelRid = -1;
  return cancelRid;
}
export const op_ws_create = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_create");
}
export const op_ws_send = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_send");
}
export const op_ws_close = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_close");
}
export const op_ws_next_event = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ws_next_event");
}

export const op_broadcast_subscribe = (...args: any[]) => {
  console.warn("Not implemented: ops.op_broadcast_subscribe");
}
export const op_broadcast_unsubscribe = (...args: any[]) => {
  console.warn("Not implemented: ops.op_broadcast_unsubscribe");
}
export const op_broadcast_send = (...args: any[]) => {
  console.warn("Not implemented: ops.op_broadcast_send");
}
export const op_broadcast_recv = (...args: any[]) => {
  console.warn("Not implemented: ops.op_broadcast_recv");
}

export const op_webgpu_request_adapter = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_request_adapter");
}
export const op_webgpu_request_device = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_request_device");
}
export const op_webgpu_create_query_set = (data: GPUQuerySetDescriptor & { deviceRid: number }) => {
  console.warn("Not implemented: ops.op_webgpu_create_query_set");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_query_set" };
  return { rid: data.deviceRid, err };
}
export const op_webgpu_create_buffer = (
  rid: number,
  label: string,
  size: number,
  usage: number,
  mappedAtCreation?: boolean,
) => {
  console.warn("Not implemented: ops.op_webgpu_create_buffer");
  rid = -1;
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_buffer" };
  return { rid, err };
}
export const op_webgpu_buffer_get_mapped_range = (bufferRid: number, offset: number, size: number, data: Uint8Array) => {
  console.warn("Not implemented: ops.op_webgpu_buffer_get_mapped_range");
  return { rid: bufferRid }
}
export const op_webgpu_buffer_unmap = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_buffer_unmap");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_buffer_unmap" };
  return { err };
}
export const op_webgpu_buffer_get_map_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_buffer_get_map_async");
}
export const op_webgpu_create_texture = (options: (GPUSamplerDescriptor & Partial<GPUTextureDescriptor>) & { deviceRid: number; size?: GPUExtent3DDict }) => {
  console.warn("Not implemented: ops.op_webgpu_create_texture");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_sampler" };
  return { rid: options.deviceRid, err };
}
export const op_webgpu_create_texture_view = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_create_texture_view");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_texture_view" };
  return { rid: -1, err };
}
export const op_webgpu_create_sampler = (desc: GPUSamplerDescriptor & { deviceRid: number }) => {
  console.warn("Not implemented: ops.op_webgpu_create_sampler");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_sampler" };
  return { rid: desc.deviceRid, err };
}
export const op_webgpu_create_bind_group_layout = (
  rid: number,
  label: string,
  entries: GPUBindGroupLayoutEntry[],
) => {
  console.warn("Not implemented: ops.op_webgpu_create_bind_group_layout");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_bind_group_layout" };
  return { rid, err };
}
export const op_webgpu_create_pipeline_layout = (
  rid: number,
  label: string,
  entries: number[],
) => {
  console.warn("Not implemented: ops.op_webgpu_create_pipeline_layout");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_pipeline_layout" };
  return { rid, err };
}
export const op_webgpu_create_bind_group = (
  rid: number,
  label: string,
  layout: number,
  entries?: unknown[], // TODO
) => {
  console.warn("Not implemented: ops.op_webgpu_create_bind_group");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_bind_group" };
  return { rid, err };
}
export const op_webgpu_create_compute_pipeline = (rid: number, label: string, layout: string | number, data: { module: number, entryPoint: string, constants: any }) => {
  console.warn("Not implemented: ops.op_webgpu_create_compute_pipeline");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_compute_pipeline" };
  return { rid, err };
}
export const op_webgpu_compute_pipeline_get_bind_group_layout = (computePipelineRid: number, index: number) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pipeline_get_bind_group_layout");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_compute_pipeline_get_bind_group_layout" };
  return { rid: computePipelineRid, err, label: "NotImplemented" };
}
export const op_webgpu_create_render_pipeline = (data: {
  deviceRid: number;
  label: string;
  layout: any;
  vertex: {
    module: number;
    entryPoint: string;
    buffers: GPUVertexBufferLayout[];
  },
  primitive: GPUPrimitiveState;
  depthStencil: GPUDepthStencilState;
  multisample: GPUMultisampleState;
  fragment: any;
}) => {
  console.warn("Not implemented: ops.op_webgpu_create_render_pipeline");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_render_pipeline" };
  return { rid: data.deviceRid, err, label: data.label };
}
export const op_webgpu_render_pipeline_get_bind_group_layout = (renderPipelineRid: number, index: number) => {
  console.warn("Not implemented: ops.op_webgpu_render_pipeline_get_bind_group_layout");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_render_pipeline" };
  return { rid: renderPipelineRid, err, label: "TODO" };
}
export const op_webgpu_create_command_encoder = (rid: number, label: string) => {
  console.warn("Not implemented: ops.op_webgpu_create_command_encoder");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_command_encoder" };
  return { rid, err };
}

export const op_webgpu_render_pass_end = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_end");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_render_pass_end" };
  return { err };
}

export const op_webgpu_command_encoder_begin_render_pass = (commandEncoderRid: number, label: string, colorAttachments: unknown[], depthStencilAttachment: any) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_begin_render_pass");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_begin_render_pass" };
  return { rid: commandEncoderRid, err };
}
export const op_webgpu_command_encoder_begin_compute_pass = (commandEncoderRid: number, label: string) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_begin_compute_pass");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_begin_compute_pass" };
  return { rid: commandEncoderRid, err };
}
export const op_webgpu_command_encoder_copy_buffer_to_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_copy_buffer_to_buffer");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_copy_buffer_to_buffer" };
  return { err };
}
export const op_webgpu_command_encoder_copy_buffer_to_texture = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_copy_buffer_to_texture");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_copy_buffer_to_texture" };
  return { err };
}
export const op_webgpu_command_encoder_copy_texture_to_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_copy_texture_to_buffer");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_copy_texture_to_buffer" };
  return { err };
}
export const op_webgpu_command_encoder_copy_texture_to_texture = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_copy_texture_to_texture");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_copy_texture_to_texture" };
  return { err };
}
export const op_webgpu_command_encoder_clear_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_clear_buffer");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_clear_buffer" };
  return { err };
}
export const op_webgpu_command_encoder_push_debug_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_push_debug_group");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_push_debug_group" };
  return { err };
}
export const op_webgpu_command_encoder_pop_debug_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_pop_debug_group");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_pop_debug_group" };
  return { err };
}
export const op_webgpu_command_encoder_insert_debug_marker = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_insert_debug_marker");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_insert_debug_marker" };
  return { err };
}
export const op_webgpu_command_encoder_write_timestamp = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_write_timestamp");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_write_timestamp" };
  return { err };
}
export const op_webgpu_command_encoder_resolve_query_set = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_resolve_query_set");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_resolve_query_set" };
  return { rid: -1, err };
}
export const op_webgpu_command_encoder_finish = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_command_encoder_finish");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_command_encoder_finish" };
  return { rid: -1, err };
}
export const op_webgpu_render_pass_set_viewport = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_set_viewport");
}
export const op_webgpu_render_pass_set_scissor_rect = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_set_scissor_rect");
}
export const op_webgpu_render_pass_set_blend_constant = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_set_blend_constant");
}
export const op_webgpu_render_pass_set_stencil_reference = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_set_stencil_reference");
}
export const op_webgpu_render_pass_begin_pipeline_statistics_query = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_begin_pipeline_statistics_query");
}
export const op_webgpu_render_pass_end_pipeline_statistics_query = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_end_pipeline_statistics_query");
}
export const op_webgpu_render_pass_write_timestamp = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_write_timestamp");
}
export const op_webgpu_render_pass_execute_bundles = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_execute_bundles");
}
export const op_webgpu_render_pass_end_pass = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_end_pass");
}
export const op_webgpu_render_pass_set_bind_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_set_bind_group");
}
export const op_webgpu_render_pass_push_debug_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_push_debug_group");
}
export const op_webgpu_render_pass_pop_debug_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_pop_debug_group");
}
export const op_webgpu_render_pass_insert_debug_marker = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_insert_debug_marker");
}
export const op_webgpu_render_pass_set_pipeline = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_set_pipeline");
}
export const op_webgpu_render_pass_set_index_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_set_index_buffer");
}
export const op_webgpu_render_pass_set_vertex_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_set_vertex_buffer");
}
export const op_webgpu_render_pass_draw = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_draw");
}
export const op_webgpu_render_pass_draw_indexed = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_draw_indexed");
}
export const op_webgpu_render_pass_draw_indirect = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_draw_indirect");
}
export const op_webgpu_render_pass_draw_indexed_indirect = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_pass_draw_indexed_indirect");
}
export const op_webgpu_compute_pass_set_pipeline = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_set_pipeline");
}
export const op_webgpu_compute_pass_dispatch = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_dispatch");
}
export const op_webgpu_compute_pass_dispatch_indirect = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_dispatch_indirect");
}
export const op_webgpu_compute_pass_begin_pipeline_statistics_query = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_begin_pipeline_statistics_query");
}
export const op_webgpu_compute_pass_end_pipeline_statistics_query = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_end_pipeline_statistics_query");
}
export const op_webgpu_compute_pass_write_timestamp = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_write_timestamp");
}
export const op_webgpu_compute_pass_end_pass = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_end_pass");
}
export const op_webgpu_compute_pass_set_bind_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_set_bind_group");
}
export const op_webgpu_compute_pass_push_debug_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_push_debug_group");
}
export const op_webgpu_compute_pass_pop_debug_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_pop_debug_group");
}
export const op_webgpu_compute_pass_insert_debug_marker = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_insert_debug_marker");
}
export const op_webgpu_create_render_bundle_encoder = (desc: GPURenderBundleEncoderDescriptor & { deviceRid: number }) => {
  console.warn("Not implemented: ops.op_webgpu_create_render_bundle_encoder");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_render_bundle_encoder" };
  return { rid: desc.deviceRid, err };
}
export const op_webgpu_render_bundle_encoder_finish = (renderBundleEncoderRid: number, label: string) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_finish");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_render_bundle_encoder_finish" };
  return { rid: renderBundleEncoderRid, err };
}
export const op_webgpu_render_bundle_encoder_set_bind_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_set_bind_group");
}
export const op_webgpu_render_bundle_encoder_push_debug_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_push_debug_group");
}
export const op_webgpu_render_bundle_encoder_pop_debug_group = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_pop_debug_group");
}
export const op_webgpu_render_bundle_encoder_insert_debug_marker = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_insert_debug_marker");
}
export const op_webgpu_render_bundle_encoder_set_pipeline = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_set_pipeline");
}
export const op_webgpu_render_bundle_encoder_set_index_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_set_index_buffer");
}
export const op_webgpu_render_bundle_encoder_set_vertex_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_set_vertex_buffer");
}
export const op_webgpu_render_bundle_encoder_draw = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_draw");
}
export const op_webgpu_render_bundle_encoder_draw_indexed = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_draw_indexed");
}
export const op_webgpu_render_bundle_encoder_draw_indirect = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_render_bundle_encoder_draw_indirect");
}
export const op_webgpu_queue_submit = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_queue_submit");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_queue_submit" };
  return { err }
}
export const op_webgpu_write_buffer = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_write_buffer");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_write_buffer" };
  return { err }
}
export const op_webgpu_write_texture = (...args: any[]) => {
  console.warn("Not implemented: ops.op_webgpu_write_texture");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_write_texture" };
  return { err }
}

export const op_webgpu_create_shader_module = (rid: number, label: string, code: string, sourceMap?: any) => {
  console.warn("Not implemented: ops.op_webgpu_create_shader_module");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_create_shader_module" };
  return { rid, err };
}

export const op_webgpu_compute_pass_dispatch_workgroups = (computePassRid: number, workgroupCountX: number, workgroupCountY: number, workgroupCountZ: number) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_dispatch_workgroups");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_compute_pass_dispatch_workgroups" };
  return { rid: computePassRid, err };
}

export const op_webgpu_compute_pass_dispatch_workgroups_indirect = (computePassRid: number, indirectBufferRid: number, indirectOffset: number) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_dispatch_workgroups_indirect");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_compute_pass_dispatch_workgroups_indirect" };
  return { err };
}

export const op_webgpu_compute_pass_end = (commandEncoderRid: number, computePassRid: number) => {
  console.warn("Not implemented: ops.op_webgpu_compute_pass_end");
  const err: { type: string, value: string } = { type: 'NotImplemented', value: "Not implemented: ops.op_webgpu_compute_pass_end" };
  return { rid: computePassRid, err };
}

export const op_ffi_load = (options: { path: string, symbols: {} }) => {
  console.warn("Not implemented: ops.op_ffi_load");
  const rid = 0;
  const symbols = {};
  return [rid, symbols];
}
export const op_ffi_get_static = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_get_static");
}
export const op_ffi_call = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_call");
}
export const op_ffi_call_nonblocking = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_call_nonblocking");
}
export const op_ffi_call_ptr = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_call_ptr");
}
export const op_ffi_call_ptr_nonblocking = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_call_ptr_nonblocking");
}
export const op_ffi_ptr_of = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_ptr_of");
}
export const op_ffi_buf_copy_into = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ffi_buf_copy_into");
}

export const op_ffi_cstr_read = (pointer: Deno.PointerValue, offset: number): string => {
  console.warn("Not implemented: ops.op_ffi_cstr_read");
  return "";
}

export const op_ffi_get_buf = (pointer: Deno.PointerValue, offset: number, byteLength: number): ArrayBuffer => {
  console.warn("Not implemented: ops.op_ffi_get_buf");
  return new ArrayBuffer(byteLength);
}

export const op_ffi_read_bool = (pointer: Deno.PointerValue, offset: number): boolean => {
  console.warn("Not implemented: ops.op_ffi_read_bool");
  return false;
}

export const op_ffi_read_u8 = (pointer: Deno.PointerValue, offset: number): number => {
  console.warn("Not implemented: ops.op_ffi_read_u8");
  return 0;
}
export const op_ffi_read_i8 = (pointer: Deno.PointerValue, offset: number): number => {
  console.warn("Not implemented: ops.op_ffi_read_i8");
  return 0;
}
export const op_ffi_read_u16 = (pointer: Deno.PointerValue, offset: number): number => {
  console.warn("Not implemented: ops.op_ffi_read_u16");
  return 0;
}
export const op_ffi_read_i16 = (pointer: Deno.PointerValue, offset: number): number => {
  console.warn("Not implemented: ops.op_ffi_read_i16");
  return 0;
}
export const op_ffi_read_u32 = (pointer: Deno.PointerValue, offset: number): number => {
  console.warn("Not implemented: ops.op_ffi_read_u32");
  return 0;
}
export const op_ffi_read_i32 = (pointer: Deno.PointerValue, offset: number): number => {
  console.warn("Not implemented: ops.op_ffi_read_i32");
  return 0;
}
export const op_ffi_read_u64 = (pointer: Deno.PointerValue, offset: number, buffer: Uint32Array): void => {
  console.warn("Not implemented: ops.op_ffi_read_u64");
}

export const op_ffi_read_i64 = (pointer: Deno.PointerValue, offset: number, buffer: Uint32Array): void => {
  console.warn("Not implemented: ops.op_ffi_read_i64");
}

export const op_ffi_read_f32 = (pointer: Deno.PointerValue, offset: number): number => {
  console.warn("Not implemented: ops.op_ffi_read_f32");
  return 0;
}
export const op_ffi_read_f64 = (pointer: Deno.PointerValue, offset: number): number => {
  console.warn("Not implemented: ops.op_ffi_read_f64");
  return 0;
}

export const op_ffi_unsafe_callback_create = (definition: any, callback: any): [number, Deno.PointerValue] => {
  console.warn("Not implemented: ops.op_ffi_unsafe_callback_create");
  const rid = 0;
  const pointer: Deno.PointerValue = 0;
  return [rid, pointer];
}

export const op_ffi_unsafe_callback_unref = (rid: number) => {
  console.warn("Not implemented: ops.op_ffi_unsafe_callback_unref");
}

export const op_main_module = (...args: any[]) => {
  console.warn("Not implemented: ops.op_main_module");
}
export const op_create_worker = (...args: any[]): number => {
  console.warn("Not implemented: ops.op_create_worker");
  return 0;
}
export const op_host_terminate_worker = (...args: any[]) => {
  console.warn("Not implemented: ops.op_host_terminate_worker");
}
export const op_host_post_message = (...args: any[]) => {
  console.warn("Not implemented: ops.op_host_post_message");
}
export const op_host_recv_ctrl = (...args: any[]) => {
  console.warn("Not implemented: ops.op_host_recv_ctrl");
}
export const op_host_recv_message = (...args: any[]) => {
  console.warn("Not implemented: ops.op_host_recv_message");
}
export const op_spawn_child = (
  options: {
    cmd: string;
    args: string[];
    cwd: string;
    clearEnv: boolean;
    env: [string, string][];
    uid: number;
    gid: number;
    stdin: "piped" | "inherit" | "null";
    stdout: "piped" | "inherit" | "null";
    stderr: "piped" | "inherit" | "null"
    windowsRawArguments: boolean;
  },
  apiName: string,
): {
  rid: number;
  pid: number;
  stdinRid: number,
  stdoutRid: number,
  stderrRid: number,
} => {
  console.warn("Not implemented: ops.op_spawn_child");
  return {
    rid: 0,
    pid: 0,
    stdinRid: 0,
    stdoutRid: 0,
    stderrRid: 0,
  }
}
export const op_spawn_wait = (...args: any[]) => {
  console.warn("Not implemented: ops.op_spawn_wait");
}
export const op_spawn_sync = (...args: any[]): {
  status: Deno.CommandStatus;
  stdout: Uint8Array | null;
  stderr: Uint8Array | null;
} => {
  console.warn("Not implemented: ops.op_spawn_sync");
  const status: Deno.CommandStatus = {
    code: 0,
    signal: null,
    success: false,
  }
  return {
    status,
    stdout: new Uint8Array(),
    stderr: new Uint8Array(),
  }
}
export const op_fs_events_open = (options: { recursive: boolean, paths: string[] }): number => {
  console.warn("Not implemented: ops.op_fs_events_open");
  return 0;
}

export const op_fs_events_poll = (...args: any[]) => {
  console.warn("Not implemented: ops.op_fs_events_poll");
}

export const op_net_accept = (...args: any[]) => {
  console.warn("Not implemented: ops.op_net_accept");
}

export const op_net_connect = (...args: any[]) => {
  console.warn("Not implemented: ops.op_net_connect");
}

export const op_net_listen = (...args: any[]) => {
  console.warn("Not implemented: ops.op_net_listen");
}

export const op_net_listen_udp = (...args: any[]) => {
  console.warn("Not implemented: ops.op_net_listen_udp");
}

export const op_net_listen_unixpacket = (...args: any[]) => {
  console.warn("Not implemented: ops.op_net_listen_unixpacket");
}

export const op_dgram_recv = (...args: any[]) => {
  console.warn("Not implemented: ops.op_dgram_recv");
}
export const op_dgram_send = (...args: any[]) => {
  console.warn("Not implemented: ops.op_dgram_send");
}
export const op_dns_resolve = (...args: any[]) => {
  console.warn("Not implemented: ops.op_dns_resolve");
}
export const op_set_nodelay = (...args: any[]) => {
  console.warn("Not implemented: ops.op_set_nodelay");
}
export const op_set_keepalive = (...args: any[]) => {
  console.warn("Not implemented: ops.op_set_keepalive");
}
export const op_tls_start = (...args: any[]) => {
  console.warn("Not implemented: ops.op_tls_start");
}
export const op_tls_connect = (...args: any[]) => {
  console.warn("Not implemented: ops.op_tls_connect");
}
export const op_tls_listen = (...args: any[]) => {
  console.warn("Not implemented: ops.op_tls_listen");
}
export const op_tls_accept = (...args: any[]) => {
  console.warn("Not implemented: ops.op_tls_accept");
}
export const op_tls_handshake = (...args: any[]) => {
  console.warn("Not implemented: ops.op_tls_handshake");
}

export const op_getuid = (...args: any[]) => {
  console.warn("Not implemented: ops.op_getuid");
}

export const op_query_permission = (desc: Deno.PermissionDescriptor): PermissionState => {
  console.warn("Not implemented: ops.op_query_permission");
  return "denied";
}
export const op_revoke_permission = (desc: Deno.PermissionDescriptor): PermissionState => {
  console.warn("Not implemented: ops.op_revoke_permission");
  return "denied";
}
export const op_request_permission = (desc: Deno.PermissionDescriptor): PermissionState => {
  console.warn("Not implemented: ops.op_request_permission");
  return "denied";
}
export const op_run = (...args: any[]) => {
  console.warn("Not implemented: ops.op_run");
}
export const op_run_status = (...args: any[]) => {
  console.warn("Not implemented: ops.op_run_status");
}
export const op_kill = (pid: number, signo: Deno.Signal, parent: string) => {
  console.warn("Not implemented: ops.op_kill");
}
export const op_signal_bind = (signo: Deno.Signal): number => {
  console.warn("Not implemented: ops.op_signal_bind");
  return 0;
}
export const op_signal_unbind = (rid: number) => {
  console.warn("Not implemented: ops.op_signal_unbind");
}
export const op_signal_poll = (...args: any[]) => {
  console.warn("Not implemented: ops.op_signal_poll");
}
export const op_set_raw = (...args: any[]) => {
  console.warn("Not implemented: ops.op_set_raw");
}

export const op_http_accept = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_accept");
}
export const op_http_read = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_read");
}
export const op_http_write_headers = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_write_headers");
}
export const op_http_write = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_write");
}
export const op_http_write_resource = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_write_resource");
}
export const op_http_shutdown = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_shutdown");
}
export const op_http_websocket_accept_header = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_websocket_accept_header");
  return "";
}
export const op_http_upgrade_websocket = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_upgrade_websocket");
}
export const op_http_start = (rid: number): number => {
  console.warn("Not implemented: ops.op_http_start");
  return 0;
}
export const op_http_upgrade = (...args: any[]) => {
  console.warn("Not implemented: ops.op_http_upgrade");
}
export const op_format_diagnostic = (...args: any[]) => {
  console.warn("Not implemented: ops.op_format_diagnostic");
}

export const op_emit = (...args: any[]) => {
  console.warn("Not implemented: ops.op_emit");
}

export const asyncOpsInfo = () => {
  console.warn("Not implemented: ops.asyncOpsInfo");
  return {}
}

export const op_url_get_serialization = () => {
  console.warn("Not implemented: ops.op_url_get_serialization");
  return {};
}

export const op_pledge_test_permissions = (permissions: Deno.PermissionOptions) => {
  console.warn("Not implemented: ops.op_pledge_test_permissions");
  const token = "";
  return token;
}

export const op_restore_test_permissions = (token: string) => {
  console.warn("Not implemented: ops.op_restore_test_permissions");
}

export const op_dispatch_test_event = (
  options: {
    stepWait?: number;
    stepResult?: any[];
    wait?: number;
    plan?: any; // TODO
    result?: any[]; // TODO
  }
) => {
  console.warn("Not implemented: ops.op_dispatch_test_event");
}

export const op_dispatch_bench_event = (options: {
  output?: string;
  wait?: number;
  plan?: any; // TODO
  result?: any[]; // TODO
}) => {
  console.warn("Not implemented: ops.op_dispatch_bench_event");
}

export const op_register_test = (desc: TestDescription) => {
  console.warn("Not implemented: ops.op_register_test");
  const id: number = 0;
  const filteredOut: boolean = false;
  return {
    id,
    filteredOut
  }
}

export const op_bench_check_unstable = () => {
  console.warn("Not implemented: ops.op_bench_check_unstable");
}

export const op_register_bench = (benchDesc: any) => {
  console.warn("Not implemented: ops.op_register_bench");
  const id: number = 0;
  const filteredOut: boolean = false;
  return {
    id,
    filteredOut
  }
}

export const op_bench_now = () => {
  console.warn("Not implemented: ops.op_bench_now");
  return 0;
}

export const op_get_test_origin = () => {
  console.warn("Not implemented: ops.op_get_test_origin");
  return "";
}

export const op_get_bench_origin = () => {
  console.warn("Not implemented: ops.op_get_bench_origin");
  return "";
}

export const op_register_test_step = (stepDesc: Deno.TestStepDefinition) => {
  console.warn("Not implemented: ops.op_register_test_step");
  return {
    id: 0
  };
}

export const op_net_listen_tcp = (options: {
  hostname: string;
  port: number;
}, reusePort: number): [number, { transport: string }] => {
  console.warn("Not implemented: ops.op_net_listen_tcp");
  const rid: number = 0;
  const addr: {
    transport: string
  } = {
    transport: ""
  }
  return [rid, addr];
}

export const op_net_listen_unix = (path: string): [number, string] => {
  console.warn("Not implemented: ops.op_net_listen_unix");
  const rid = 0;
  return [rid, path];
}

export const op_net_listen_tls = (addr: { hostname: string, port: number }, cert: { cert, certFile, key, keyFile, alpnProtocols, reusePort }): [number, any] => {
  console.warn("Not implemented: ops.op_net_listen_tls");
  const rid = 0;
  return [rid, addr];
}

export const op_ws_try_send_string = (rid: number, data: string) => {
  console.warn("Not implemented: ops.op_ws_try_send_string");
  const send = false;
  return send;
}

export const op_ws_try_send_binary = (rid: number, data: TypedArray) => {
  console.warn("Not implemented: ops.op_ws_try_send_binary");
  const send = false;
  return send;
}

export const op_flash_upgrade_http = (streamRid: number, serverId: number) => {
  console.warn("Not implemented: ops.op_flash_upgrade_http");
  const connRid = -1;
  return connRid;
}

export const op_worker_close = () => {
  console.warn("Not implemented: ops.op_worker_close");
}

export const op_worker_post_message = (data: messagePort.MessageData) => {
  console.warn("Not implemented: ops.op_worker_post_message");
}

export const op_worker_get_type = () => {
  console.warn("Not implemented: ops.op_worker_get_type");
  return "";
}

export const op_worker_sync_fetch = (parsedUrls: string[], notLoadedMainWorkerScript: boolean) => {
  console.warn("Not implemented: ops.op_worker_sync_fetch");
  return [];
}

export const op_http_headers = (rid: number): HeaderList => {
  console.warn("Not implemented: ops.op_http_headers");
  return [];
}
