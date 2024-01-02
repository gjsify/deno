import '@girs/gjs';
import GLib from '@girs/glib-2.0';

import '@gjsify/deno-core/mod.js';
import './ext/web/lib.js';
import './ext/fetch/lib.ts';
import './runtime/js/99_main.js';

import { getLocale, getPid, getPpid, existsTty, getArgs, parseArgv } from '@gjsify/utils';

const args = getArgs();
const argsObj = parseArgv(args);
const hasTty = existsTty();

globalThis.bootstrap.mainRuntime({
  args,
  cpuCount: GLib.get_num_processors(),
  locale: getLocale(),
  // https://deno.land/manual/runtime/location_api
  location: argsObj.location as string || null,
  pid: getPid(),
  ppid: getPpid(),
  userAgent: (argsObj.userAgent || argsObj['user-agent'] || argsObj['useragent'] || "") as string,
  inspectFlag: argsObj.inspect as boolean || false,
  noColor: !hasTty,
  unstableFlag: argsObj.unstable as boolean || false,
  debugFlag: argsObj.debug as boolean || false,
  isTty: hasTty,
});
