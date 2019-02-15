import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { AdditiveNode } from "./additive_expr";

import { ADDITIVE, SUBTRACTIVE } from "../expr_type";

import * as MultiplicativeExpr from "./multiplicative_expr";

export interface AdditiveNode {
  type: typeof ADDITIVE | typeof SUBTRACTIVE;
  lhs: ExprNode;
  rhs: ExprNode;
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  var lhs = MultiplicativeExpr.parse(rootParser, lexer);

  var additiveTypes: {
    [index:string]: typeof ADDITIVE | typeof SUBTRACTIVE
  } = {
    "+": ADDITIVE,
    "-": SUBTRACTIVE
  };

  if (additiveTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next() as string;

    var rhs = parse(rootParser, lexer);

    return {
      type: additiveTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
