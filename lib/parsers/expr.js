import * as OrExpr from "./or_expr";

export function parse (lexer) {
  return OrExpr.parse({ parse }, lexer);
}
