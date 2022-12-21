import '@gjsify/types/index';
import GLib from '@gjsify/types/GLib-2.0';
import { getLocale, getPid, getPpid, existsTty, getArgs, parseArgv } from '@gjsify/utils';
import { mainRuntime } from './runtime/js/99_main.js';

const args = getArgs();
const argsObj = parseArgv(args.slice(2));
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
  target: "",
  tsVersion: "0.0.0",
  v8Version: "0.0.0.0",
});
