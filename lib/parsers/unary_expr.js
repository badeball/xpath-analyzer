import { NEGATION } from "../expr_type";

import * as UnionExpr from "./union_expr";

export function parse (rootParser, lexer) {
  if (lexer.peak() === "-") {
    lexer.next();

    return {
      type: NEGATION,
      lhs: parse(rootParser, lexer)
    };
  } else {
    return UnionExpr.parse(rootParser, lexer);
  }
}
