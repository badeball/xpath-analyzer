import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { NEGATION } from "../expr_type";

import * as UnionExpr from "./union_expr";

export interface UnaryNode {
  type: typeof NEGATION;
  lhs: ExprNode;
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
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
