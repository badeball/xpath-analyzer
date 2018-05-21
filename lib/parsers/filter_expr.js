import { FILTER } from "../expr_type";

import * as Predicate from "./predicate";

import * as PrimaryExpr from "./primary_expr";

export function parse (rootParser, lexer) {
  var primary = PrimaryExpr.parse(rootParser, lexer);

  if (lexer.peak() === "[") {
    var filter = {
      type: FILTER,
      primary: primary,
      predicates: []
    };

    while (lexer.peak() === "[") {
      filter.predicates.push(Predicate.parse(rootParser, lexer));
    }

    return filter;
  } else {
    return primary;
  }
}

export function isValidOp (lexer) {
  return PrimaryExpr.isValidOp(lexer);
}
