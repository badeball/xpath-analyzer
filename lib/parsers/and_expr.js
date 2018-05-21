import { AND } from "../expr_type";

import * as EqualityExpr from "./equality_expr";

export function parse (rootParser, lexer) {
  var lhs = EqualityExpr.parse(rootParser, lexer);

  if (lexer.peak() === "and") {
    lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: AND,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
