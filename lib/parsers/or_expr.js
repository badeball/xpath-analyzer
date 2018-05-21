import { OR } from "../expr_type";

import * as AndExpr from "./and_expr";

export function parse (rootParser, lexer) {
  var lhs = AndExpr.parse(rootParser, lexer);

  if (lexer.peak() === "or") {
    lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: OR,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
