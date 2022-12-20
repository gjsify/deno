enum ParseStatus {
  Ok = 0,
  OkSerialization = 1,
  Err = 2
}

enum UrlSetter {
  SET_HASH = 0,
  SET_HOST = 1,
  SET_HOSTNAME = 2,
  SET_PASSWORD = 3,
  SET_PATHNAME = 4,
  SET_PORT = 5,
  SET_PROTOCOL = 6,
  SET_SEARCH = 7,
  SET_USERNAME = 8,
}

interface ModifyUrlOptions {
  hash?: string,
  host?: string,
  hostname?: string,
  password?: string,
  pathname?: string,
  port?: string,
  protocol?: string,
  search?: string,
  username?: string,
}

const NO_PORT = 65536;

const quirks = {}

function combineUrl(href: string, baseHref?: string): string {
  if(!baseHref) return href;
  // If the href is already an absolute URL, just use it as is
  const [, scheme] = href.match(/^(\w+):\/\//) || [];
  if (scheme) return href;

  // If the href is a root-relative URL, combine it with the base URL's scheme and host
  if (href.startsWith("/")) {
    const [, baseScheme, baseHost] = baseHref.match(/^(\w+):\/\/([^/]+)/) || [];
    if (!baseScheme || !baseHost) {
      throw new Error(`Invalid base href: ${baseHref}`);
    }
    return `${baseScheme}://${baseHost}${href}`;
  }

  // If the href is a query or fragment, combine it with the base URL's path
  if (href.startsWith("?") || href.startsWith("#")) {
    const [, basePath] = baseHref.match(/^[^?]+/) || [];
    return `${basePath}${href}`;
  }

  // Otherwise, the href is a relative path
  const [, basePath] = baseHref.match(/^[^?]+/) || [];
  const basePathDir = basePath.substring(0, basePath.lastIndexOf("/") + 1);
  return `${basePathDir}${href}`;
}

/**
 * `op_url_parse` and `op_url_parse_with_base` share the same implementation.
 *
 * This function is used to parse the URL and fill the `buf` with internal
 * offset values of the URL components.
 *
 * If the serialized URL is the same as the input URL, then `UrlSerialization` is
 * not set and returns `ParseStatus::Ok`.
 *
 * If the serialized URL is different from the input URL, then `UrlSerialization` is
 * set and returns `ParseStatus::OkSerialization`. JS side should check status and
 * use `op_url_get_serialization` to get the serialized URL.
 *
 * If the URL is invalid, then `UrlSerialization` is not set and returns `ParseStatus::Err`.
 *
 * ```js
 * const buf = new Uint32Array(8);
 * const status = op_url_parse("http://example.com", buf.buffer);
 * let serializedUrl = "";
 * if (status === ParseStatus.Ok) {
 *   serializedUrl = "http://example.com";
 * } else if (status === ParseStatus.OkSerialization) {
 *   serializedUrl = op_url_get_serialization();
 * }
 */
function parseUrl(
  href: string,
  baseHref: string | null,
  buf: ArrayBufferLike
): ParseStatus {

  const url = combineUrl(href, baseHref)

  // Find the position of the scheme and host components
  const schemeEnd = url.indexOf("://");
  const hostStart = schemeEnd + 3;
  const hostEnd = url.indexOf("/", hostStart);
  if (schemeEnd < 0 || hostEnd < 0) {
    console.error(new Error(`Invalid url: ${url}`));
    return ParseStatus.Err;
  }

  // Find the position of the username and password, if present
  let usernameEnd = hostStart;
  const atSignIndex = url.indexOf("@", hostStart);
  if (atSignIndex >= 0 && atSignIndex < hostEnd) {
    usernameEnd = atSignIndex;
  }

  // Find the position of the port, if present
  let port: number | null = null;
  const colonIndex = url.indexOf(":", hostStart);
  if (colonIndex >= 0 && colonIndex < hostEnd) {
    port = parseInt(url.substring(colonIndex + 1, hostEnd), 10);
  }

  // Find the positions of the path, query, and fragment
  let pathStart = hostEnd;
  let queryStart: number | null = null;
  let fragmentStart: number | null = null;
  const questionMarkIndex = url.indexOf("?", pathStart);
  if (questionMarkIndex >= 0) {
    pathStart = questionMarkIndex;
    queryStart = questionMarkIndex + 1;
    const hashIndex = url.indexOf("#", queryStart);
    if (hashIndex >= 0) {
      fragmentStart = hashIndex;
    }
  }

  const buf32 = new Uint32Array(buf, 0, 8);
  buf32[0] = schemeEnd;
  buf32[1] = usernameEnd;
  buf32[2] = hostStart;
  buf32[3] = hostEnd;
  buf32[4] = port || 0;
  buf32[5] = pathStart;
  buf32[6] = queryStart || 0;
  buf32[7] = fragmentStart || 0;

  return ParseStatus.Ok
}

function modifyUrl(url: string, options: ModifyUrlOptions): string {
  // Extract the scheme, username, password, and host
  const [, scheme, auth, host] = url.match(/^(\w+):\/\/((.+?)@)?([^:/]+)/) || [];
  if (!scheme) {
    throw new Error(`Invalid URL: ${url}`);
  }

  // Extract the port, if present
  const [, , port] = url.match(/^[^:]+:(\d+)?/) || [];

  // Extract the path, query, and fragment, if present
  const [, , path, query, fragment] = url.match(/^[^?#]+([^?#]*)(\?[^#]*)?(#.*)?$/) || [];

  // Modify the parts of the URL as requested
  const modifiedScheme = options.protocol || scheme;
  const modifiedAuth = options.username || auth;
  const modifiedPassword = options.password || auth.split(":")[1];
  const modifiedHost = options.hostname || host;
  const modifiedPort = options.port || port;
  const modifiedPath = options.pathname || path;
  const modifiedQuery = options.search || query;
  const modifiedFragment = options.hash || fragment;

  // Reassemble the URL
  return `${modifiedScheme}://${modifiedAuth}${modifiedPassword ? `:${modifiedPassword}` : ""}@${modifiedHost}${modifiedPort ? `:${modifiedPort}` : ""}${modifiedPath}${modifiedQuery}${modifiedFragment}`;
}


/**
 *
 * @param href
 * @param buf
 * @returns Returns 0 if the href has not changed, 1 if the href has changed and greater 1 if there was an error
 */
export const op_url_parse = function (href: string, buf: ArrayBufferLike): ParseStatus {
  return parseUrl(href, null, buf)
}

export const op_url_parse_with_base = (href: string, maybeBase: string, buf: ArrayBufferLike): ParseStatus => {
  console.warn("Not implemented: ops.op_url_parse_with_base");
  return ParseStatus.Err;
}

export const op_url_reparse = (href: string, setter: UrlSetter, value: any, buf: ArrayBufferLike): ParseStatus => {
  console.warn("Untested: ops.op_url_reparse");

  const options: ModifyUrlOptions = {};

  switch (setter) {
    case UrlSetter.SET_HASH:
      options.hash = value;
    break;
    case UrlSetter.SET_HOST:
      options.hash = value;
    break;
    case UrlSetter.SET_HOSTNAME:
      options.hostname = value;
    break;
    case UrlSetter.SET_PASSWORD:
      options.password = value;
    break;
    case UrlSetter.SET_PATHNAME:
      options.pathname = value;
    break;
    case UrlSetter.SET_PORT:
      options.port = value;
    break;
    case UrlSetter.SET_PROTOCOL:
      options.protocol = value;
    break;
    case UrlSetter.SET_SEARCH:
      options.search = value;
    break;
    case UrlSetter.SET_USERNAME:
      options.username = value;
    break;

    default:
      return ParseStatus.Err;
  }

  const url = modifyUrl(href, options);

  return parseUrl(url, null, buf);
}

export const op_url_parse_search_params = (a?: string | null, bytes?: Uint8Array): [string, string][] => {
  console.warn("Not implemented: ops.op_url_parse_search_params");
  return [];
}
export const op_url_stringify_search_params = (value: any): string => {
  console.warn("Not implemented: ops.op_url_stringify_search_params");
  return "";
}
