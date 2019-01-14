import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL } from "../expr_type";

import * as AdditiveExpr from "./additive_expr";

export interface RelationalNode {
  type: typeof GREATER_THAN | typeof GREATER_THAN_OR_EQUAL | typeof LESS_THAN | typeof LESS_THAN_OR_EQUAL;
  lhs: ExprNode;
  rhs: ExprNode;
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  var lhs = AdditiveExpr.parse(rootParser, lexer);

  var relationalTypes: {
    [index:string]: typeof GREATER_THAN | typeof GREATER_THAN_OR_EQUAL | typeof LESS_THAN | typeof LESS_THAN_OR_EQUAL
  } = {
    "<": LESS_THAN,
    ">": GREATER_THAN,
    "<=": LESS_THAN_OR_EQUAL,
    ">=": GREATER_THAN_OR_EQUAL
  };

  if (relationalTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next() as string;

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
