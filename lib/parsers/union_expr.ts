import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { UNION } from "../expr_type";

import * as PathExpr from "./path_expr";

export interface UnionNode {
  type: typeof UNION;
  lhs: ExprNode;
  rhs: ExprNode;
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
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
