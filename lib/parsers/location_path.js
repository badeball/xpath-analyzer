import * as AbsoluteLocationPath from "./absolute_location_path";

import * as RelativeLocationPath from "./relative_location_path";

export function parse (rootParser, lexer) {
  var token = lexer.peak(),
      ch = token && token[0];

  if (ch === "/") {
    return AbsoluteLocationPath.parse(rootParser, lexer);
  } else {
    return RelativeLocationPath.parse(rootParser, lexer);
  }
}
