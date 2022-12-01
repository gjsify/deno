export class ERR_INVALID_MODULE_SPECIFIER extends Error {
  constructor(
    request: string,
    reason: string,
    maybe_base?: string,
  ) {
    let msg = `[ERR_INVALID_MODULE_SPECIFIER] Invalid module "${request}" ${reason}`;

    if(maybe_base) {
      msg = `${msg} imported from ${maybe_base}`
    }
    super(msg)
  }
}

export class ERR_MODULE_NOT_FOUND extends Error {
  constructor(filename: string, path: string, base?: string) {
    let msg = `[ERR_MODULE_NOT_FOUND] Cannot find ${filename} "${path}"`
    if(base) {
      msg = `${msg} imported from "${base}"`
    }
    super(msg);
  }
}
