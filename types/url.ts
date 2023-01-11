export interface UrlComponents {
  protocol: UrlComponent;
  username: UrlComponent;
  password: UrlComponent;
  hostname: UrlComponent;
  port: UrlComponent;
  pathname: UrlComponent;
  search: UrlComponent;
  hash: UrlComponent;
}

export interface UrlComponent {
  patternString: string;
  regexp: RegExp;
  groupNameList: string[];
}

export type URLPatternInput = string | URLPatternInit;
