import { UNION } from "../expr_type";

import * as PathExpr from "./path_expr";

export function parse (rootParser, lexer) {
  var lhs = PathExpr.parse(rootParser, lexer);

  if (lexer.peak() === "|") {
    lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: UNION,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
