import { EQUALITY, INEQUALITY } from "../expr_type";

import * as RelationalExpr from "./relational_expr";

export function parse (rootParser, lexer) {
  var lhs = RelationalExpr.parse(rootParser, lexer);

  var equalityTypes = {
    "=": EQUALITY,
    "!=": INEQUALITY
  };

  if (equalityTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: equalityTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
