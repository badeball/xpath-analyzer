import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { OR } from "../expr_type";

import * as AndExpr from "./and_expr";

export interface OrNode {
  type: typeof OR;
  lhs: ExprNode;
  rhs: ExprNode;
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  var lhs = AndExpr.parse(rootParser, lexer);

  if (lexer.peak() === "or") {
    lexer.next();

    var rhs = parse(rootParser, lexer);

    return {
      type: OR,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
