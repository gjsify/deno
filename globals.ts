import '@gjsify/types/index';
import GLib from '@gjsify/types/GLib-2.0';
import { mainRuntime } from './runtime/js/99_main.js';
import { getLocale, getPid, getPpid, existsTty, getArgs, parseArgv, getGjsVersion } from '@gjsify/utils';

const args = getArgs();
const argsObj = parseArgv(args);
const hasTty = existsTty();

mainRuntime({
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
  denoVersion: "",
  isTty: hasTty,
  tsVersion: "0.0.0",
  v8Version: "0.0.0.0",
  gjsVersion: getGjsVersion(),
});
