import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { AndNode } from "./and_expr";

import { AND } from "../expr_type";

import * as EqualityExpr from "./equality_expr";

export interface AndNode {
  type: typeof AND;
  lhs: ExprNode;
  rhs: ExprNode;
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  var lhs = EqualityExpr.parse(rootParser, lexer);

  if (lexer.peak() === "and") {
    lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: AND,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
