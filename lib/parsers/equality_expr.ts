import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { EqualityNode } from "./equality_expr";

import { EQUALITY, INEQUALITY } from "../expr_type";

import * as RelationalExpr from "./relational_expr";

export interface EqualityNode {
  type: typeof EQUALITY | typeof INEQUALITY;
  lhs: ExprNode;
  rhs: ExprNode;
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  var lhs = RelationalExpr.parse(rootParser, lexer);

  var equalityTypes: {
    [index:string]: typeof EQUALITY | typeof INEQUALITY
  } = {
    "=": EQUALITY,
    "!=": INEQUALITY
  };

  if (equalityTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next() as string;

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
