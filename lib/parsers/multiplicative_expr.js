import { DIVISIONAL, MODULUS, MULTIPLICATIVE } from "../expr_type";

import * as UnaryExpr from "./unary_expr";

export function parse (rootParser, lexer) {
  var lhs = UnaryExpr.parse(rootParser, lexer);

  var multiplicativeTypes = {
    "*": MULTIPLICATIVE,
    "div": DIVISIONAL,
    "mod": MODULUS
  };

  if (multiplicativeTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: multiplicativeTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
