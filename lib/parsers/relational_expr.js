import { GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL } from "../expr_type";

import * as AdditiveExpr from "./additive_expr";

export function parse (rootParser, lexer) {
  var lhs = AdditiveExpr.parse(rootParser, lexer);

  var relationalTypes = {
    "<": LESS_THAN,
    ">": GREATER_THAN,
    "<=": LESS_THAN_OR_EQUAL,
    ">=": GREATER_THAN_OR_EQUAL
  };

  if (relationalTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: relationalTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
