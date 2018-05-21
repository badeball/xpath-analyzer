import { ADDITIVE, SUBTRACTIVE } from "../expr_type";

import * as MultiplicativeExpr from "./multiplicative_expr";

export function parse (rootParser, lexer) {
  var lhs = MultiplicativeExpr.parse(rootParser, lexer);

  var additiveTypes = {
    "+": ADDITIVE,
    "-": SUBTRACTIVE
  };

  if (additiveTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: additiveTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
