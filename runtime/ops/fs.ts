import { primordials } from '../../core/00_primordials.js';

const {
  SymbolIterator,
  Uint32Array,
} = primordials;

import GLib from '@girs/glib-2.0';
import Gio from '@girs/gio-2.0';
import { ExtFile } from '@gjsify/gio-2.0';

export interface FileInfoOp {
  /** The size of the file, in bytes. */
  size: number;
  /** Is null if mtime is null */
  mtimeSet: any | null;
  /** The last modification time of the file. This corresponds to the `mtime`
   * field from `stat` on Linux/Mac OS and `ftLastWriteTime` on Windows. This
   * may not be available on all platforms. */
  mtime: number | null;
  /** Is null if atime is null */
  atimeSet: any | null;
  /** The last access time of the file. This corresponds to the `atime`
   * field from `stat` on Unix and `ftLastAccessTime` on Windows. This may not
   * be available on all platforms. */
  atime: number | null;
  /** Is null if birthtime is null */
  birthtimeSet?: any | null;
  /** The creation time of the file. This corresponds to the `birthtime`
   * field from `stat` on Mac/BSD and `ftCreationTime` on Windows. This may
   * not be available on all platforms. */
  birthtime: number;
  /** ID of the device containing the file.
   *
   * _Linux/Mac OS only._ */
  dev: number;
  /** Inode number.
   *
   * _Linux/Mac OS only._ */
  ino: number;
  /** **UNSTABLE**: Match behavior with Go on Windows for `mode`.
   *
   * The underlying raw `st_mode` bits that contain the standard Unix
   * permissions for this file/directory. */
  mode: number;
  /** Number of hard links pointing to this file.
   *
   * _Linux/Mac OS only._ */
  nlink: number;
  /** User ID of the owner of this file.
   *
   * _Linux/Mac OS only._ */
  uid: number;
  /** Group ID of the owner of this file.
   *
   * _Linux/Mac OS only._ */
  gid: number;
  /** Device ID of this file.
   *
   * _Linux/Mac OS only._ */
  rdev: number;
  /** Blocksize for filesystem I/O.
   *
   * _Linux/Mac OS only._ */
  blksize: number;
  /** Number of blocks allocated to the file, in 512-byte units.
   *
   * _Linux/Mac OS only._ */
  blocks: number;

  /** True if this is info for a regular file. Mutually exclusive to
   * `FileInfo.isDirectory` and `FileInfo.isSymlink`. */
  isFile: boolean;
  /** True if this is info for a regular directory. Mutually exclusive to
   * `FileInfo.isFile` and `FileInfo.isSymlink`. */
  isDirectory: boolean;

  // Gjsify: The following are not part of Deno

  /** True if this is info for a symlink. Mutually exclusive to
   * `FileInfo.isFile` and `FileInfo.isDirectory`. */
  isSymlink: boolean;
  /**
   * File is a "special" file, such as a socket, fifo, block device, or character device.
   */
  isSpecial: boolean,
  /**
   * File is a mountable location.
   */
  isMountable: boolean,
}


export const op_open_sync = (path: string, options: Deno.OpenOptions, mode: number): number => {
  console.warn("Not implemented: ops.op_open_sync");
  return 0;
}
export const op_open_async = async (path: string, options: Deno.OpenOptions, mode: number): Promise<number> => {
  console.warn("Not implemented: ops.op_open_async");
  return 0;
}

export const op_write_file_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_write_file_sync");
}

export const op_write_file_async = async (path: string, mode: number, append: boolean, create: boolean, createNew: boolean, data: Uint8Array, cancelRid: number) => {
  console.warn("Not implemented: ops.op_write_file_async");
  // See op_sleep how to use the cancelRid
}

export const op_seek_sync = (options: { rid: number, offset: number, whence: Deno.SeekMode }): number => {
  console.warn("Not implemented: ops.op_seek_sync");
  return 0;
}

export const op_fdatasync_sync = (rid: number): void => {
  console.warn("Not implemented: ops.op_fdatasync_sync");
}

export const op_fdatasync_async = async (rid: number): Promise<void> => {
  console.warn("Not implemented: ops.op_fdatasync_async");
}

export const op_fsync_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_fsync_sync");
}

export const op_fsync_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_fsync_async");
}

export const op_fstat_sync = (rid: number, outStatBuf: Uint32Array) => {
  console.warn("Not implemented: ops.op_fstat_sync");
}

export const op_fstat_async = async (rid: number) => {
  console.warn("Not implemented: ops.op_fstat_async");
}

export const op_seek_async = async (options: { rid: number, offset: number, whence: Deno.SeekMode }): Promise<number> => {
  console.warn("Not implemented: ops.op_seek_async");
  return 0;
}

export const op_flock_sync = (rid: number, exclusive: boolean) => {
  console.warn("Not implemented: ops.op_flock_sync");
}

export const op_flock_async = async (rid: number, exclusive: boolean) => {
  console.warn("Not implemented: ops.op_flock_async");
}

export const op_funlock_sync = (rid: number) => {
  console.warn("Not implemented: ops.op_funlock_sync");
}

export const op_funlock_async = async (rid: number) => {
  console.warn("Not implemented: ops.op_funlock_async");
}

export const op_umask = (...args: any[]) => {
  console.warn("Not implemented: ops.op_umask");
}

export const op_chdir = (...args: any[]) => {
  console.warn("Not implemented: ops.op_chdir");
}

export const op_mkdir_sync = (args: { path: string; recursive: boolean; mode?: number; }): void => {
  console.warn("Not implemented: ops.op_mkdir_sync");
}

export const op_mkdir_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_mkdir_async");
}

export const op_chmod_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_chmod_sync");
}

export const op_chmod_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_chmod_async");
}

export const op_chown_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_chown_sync");
}

export const op_chown_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_chown_async");
}

export const op_remove_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_remove_sync");
}

export const op_remove_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_remove_async");
}

export const op_copy_file_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_copy_file_sync");
}

export const op_copy_file_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_copy_file_async");
}

const getStatFromFileInfo = (fileInfo: Gio.FileInfo, fileType: Gio.FileType) => {
  const result: FileInfoOp = {
    atime: 0,
    atimeSet: null,
    birthtime: 0,
    blksize: 0,
    blocks: 0,
    dev: 0,
    gid: 0,
    ino: 0,
    mode: 0,
    mtime: 0,
    mtimeSet: null,
    nlink: 0,
    rdev: 0,
    size: 0,
    uid: 0,
    birthtimeSet: null,
    isDirectory: false,
    isFile: false,
    isSymlink: false,
    isSpecial: false,
    isMountable: false,
  }

  result.isSymlink = fileInfo.get_is_symlink();
  result.isDirectory = fileType === Gio.FileType.DIRECTORY;
  result.isFile = fileType === Gio.FileType.REGULAR;
  result.isSpecial = fileType === Gio.FileType.SPECIAL;
  result.isMountable = fileType === Gio.FileType.MOUNTABLE;

  result.atime = fileInfo.get_attribute_uint64(Gio.FILE_ATTRIBUTE_TIME_ACCESS) * 1000;
  result.atimeSet = !!result.atime; // TODO
  result.dev = fileInfo.get_attribute_uint32(Gio.FILE_ATTRIBUTE_UNIX_DEVICE);
  result.gid = fileInfo.get_attribute_uint32(Gio.FILE_ATTRIBUTE_UNIX_GID);
  result.ino = fileInfo.get_attribute_uint64(Gio.FILE_ATTRIBUTE_UNIX_INODE);
  result.mode = fileInfo.get_attribute_uint32(Gio.FILE_ATTRIBUTE_UNIX_MODE);
  result.mtime = fileInfo.get_attribute_uint64(Gio.FILE_ATTRIBUTE_TIME_MODIFIED) * 1000;
  result.mtimeSet = !!result.mtime; // TODO

  result.size = fileInfo.get_size();
  result.uid = fileInfo.get_attribute_uint32(Gio.FILE_ATTRIBUTE_UNIX_UID);
  result.blocks = fileInfo.get_attribute_uint64(Gio.FILE_ATTRIBUTE_UNIX_BLOCKS);
  result.nlink = fileInfo.get_attribute_uint32(Gio.FILE_ATTRIBUTE_UNIX_NLINK);

  result.rdev = fileInfo.get_attribute_uint32(Gio.FILE_ATTRIBUTE_UNIX_RDEV);
  result.birthtime = fileInfo.get_attribute_uint64(Gio.FILE_ATTRIBUTE_TIME_CREATED) * 1000;
  result.birthtimeSet = !!result.birthtime; // TODO
  result.blksize = fileInfo.get_attribute_uint32(Gio.FILE_ATTRIBUTE_UNIX_BLOCK_SIZE);

  return result;
}

/**
 *
 * @param path
 * @param lstat If `true` do not follow symlinks
 */
export const op_stat_sync = (path: string, lstat: boolean): FileInfoOp => {
  if(!lstat) {
    // Follow symlink
    path = op_realpath_sync(path);
  }

  const file = ExtFile.newForPath(path);
  const fileInfo = file.query_info("standard::*,time::*,unix::*", Gio.FileQueryInfoFlags.NONE, null);
  const fileType = file.query_file_type(Gio.FileQueryInfoFlags.NONE, null);

  return getStatFromFileInfo(fileInfo, fileType);
}

export const op_stat_async = async (options: { path: string, lstat?: boolean }): Promise<FileInfoOp> => {
  if(!options.lstat) {
    // Follow symlink
    options.path = await op_realpath_async(options.path);
  }

  const file = ExtFile.newForPath(options.path);
  const fileInfo = await file.queryInfoAsync("standard::*,time::*,unix::*", Gio.FileQueryInfoFlags.NONE);
  const fileType = file.query_file_type(Gio.FileQueryInfoFlags.NONE, null);

  return getStatFromFileInfo(fileInfo, fileType);
}

export const op_realpath_sync = (path: string): string => {
  const file = ExtFile.newForPath(path);
  const fileInfo = file.query_info("standard::*", Gio.FileQueryInfoFlags.NONE, null);
  const isSymlink = fileInfo.get_is_symlink();

  // Resolve to symlink target
  if (isSymlink) {
    const target = fileInfo.get_symlink_target();
    const targetFile = file.get_parent().resolve_relative_path(target);
    path = targetFile.get_path();
  } else {
    path = file.get_path();
  }

  return path;
}

export const op_realpath_async = async (path: string): Promise<string> => {
  const file = ExtFile.newForPath(path);
  const fileInfo = await file.queryInfoAsync("standard::*", Gio.FileQueryInfoFlags.NONE, null);
  const isSymlink = fileInfo.get_is_symlink();

  // Resolve to symlink target
  if (isSymlink) {
    const target = fileInfo.get_symlink_target();
    const targetFile = file.get_parent().resolve_relative_path(target);
    path = targetFile.get_path();
  } else {
    path = file.get_path();
  }

  return path;
}

function readdirSync(path: string) {
  const dir = ExtFile.newForPath(path);
  const fileList = dir.enumerateChildren();
  let result: Deno.DirEntry[] = [];

  for (const child of fileList) {
    const name = child.get_basename();
    const fileType = child.query_file_type(Gio.FileQueryInfoFlags.NONE, null);
    result.push({
      name,
      isFile: fileType === Gio.FileType.REGULAR,
      isDirectory: fileType === Gio.FileType.DIRECTORY,
      isSymlink: fileType === Gio.FileType.SYMBOLIC_LINK
    });
  }

  return result;
}

async function readdirAsync(path: string) {
  const dir = ExtFile.newForPath(path);
  const fileList = await dir.enumerateChildrenAsync();
  let result: Deno.DirEntry[] = [];

  for (const child of fileList) {
    const name = child.get_basename();
    const fileType = child.query_file_type(Gio.FileQueryInfoFlags.NONE, null);
    result.push({
      name,
      isFile: fileType === Gio.FileType.REGULAR,
      isDirectory: fileType === Gio.FileType.DIRECTORY,
      isSymlink: fileType === Gio.FileType.SYMBOLIC_LINK
    });
  }

  return result;
}

export const op_read_dir_sync = (path: string) => {
  return {
    [SymbolIterator]: (): Iterable<Deno.DirEntry> => {
      return readdirSync(path)
    }
  }
}

export const op_read_dir_async = async (path: string) => {
  return readdirAsync(path)
}

export const op_rename_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_rename_sync");
}

export const op_rename_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_rename_async");
}

export const op_link_sync = (oldpath: string, newpath: string): void => {
  console.warn("Not implemented: ops.op_link_sync");
}

export const op_link_async = async (oldpath: string, newpath: string): Promise<void> => {
  console.warn("Not implemented: ops.op_link_async");
}

export const op_symlink_sync = (oldpath: string, newpath: string, type?: "file" | "dir") => {
  const newFile = ExtFile.newForPath(newpath);

  if(type) {
    const targetFile = ExtFile.newForPath(oldpath);
    const fileType = targetFile.query_file_type(Gio.FileQueryInfoFlags.NONE, null);
    if (type === "file" && fileType !== Gio.FileType.REGULAR) {
      throw new Error(`The path "${oldpath}" is not a regular file!`);
    }

    if (type === "dir" && fileType !== Gio.FileType.DIRECTORY) {
      throw new Error(`The path "${oldpath}" is not a directory!`);
    }
  }

  newFile.make_symbolic_link(oldpath, null);
}

export const op_symlink_async = async (oldpath: string, newpath: string, type?: "file" | "dir") => {

  const newFile = ExtFile.newForPath(newpath);

  if(type) {
    const targetFile = ExtFile.newForPath(oldpath);
    const fileType = targetFile.query_file_type(Gio.FileQueryInfoFlags.NONE, null);
    if (type === "file" && fileType !== Gio.FileType.REGULAR) {
      throw new Error(`The path "${oldpath}" is not a regular file!`);
    }

    if (type === "dir" && fileType !== Gio.FileType.DIRECTORY) {
      throw new Error(`The path "${oldpath}" is not a directory!`);
    }
  }

  return newFile.makeSymbolicLinkAsync(oldpath);
}

export const op_read_link_sync = (path: string): string => {
  console.warn("Not implemented: ops.op_read_link_sync");
  return "";
}

export const op_read_link_async = async (path: string): Promise<string> => {
  console.warn("Not implemented: ops.op_read_link_async");
  return "";
}

export const op_ftruncate_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_ftruncate_sync");
}

export const op_ftruncate_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_ftruncate_async");
}

export const op_truncate_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_truncate_sync");
}

export const op_truncate_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_truncate_async");
}

export const op_make_temp_dir_sync = (options: Deno.MakeTempOptions): string => {
  console.warn("Not implemented: ops.op_make_temp_dir_sync");
  return "";
}

export const op_make_temp_dir_async = async (options: Deno.MakeTempOptions): Promise<string> => {
  console.warn("Not implemented: ops.op_make_temp_dir_async");
  return "";
}

export const op_make_temp_file_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_make_temp_file_sync");
}

export const op_make_temp_file_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_make_temp_file_async");
}

export const op_cwd = (): string => {
  return GLib.get_current_dir();
}

export const op_futime_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_futime_sync");
}

export const op_futime_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_futime_async");
}

export const op_utime_sync = (...args: any[]) => {
  console.warn("Not implemented: ops.op_utime_sync");
}

export const op_utime_async = async (...args: any[]) => {
  console.warn("Not implemented: ops.op_utime_async");
}

export const op_readfile_sync = (path: string): BufferSource => {
  console.warn("Not implemented: ops.op_readfile_sync");
  return new ArrayBuffer(0);
}

export const op_readfile_text_sync = (path: string): string => {
  console.warn("Not implemented: ops.op_readfile_text_sync");
  return "";
}

export const op_readfile_async = async (path: string, cancelRid?: number): Promise<BufferSource> => {
  console.warn("Not implemented: ops.op_readfile_async");
  return new ArrayBuffer(0);
}

export const op_readfile_text_async = async (path: string, cancelRid?: number): Promise<string> => {
  console.warn("Not implemented: ops.op_readfile_text_async");
  return "";
}

