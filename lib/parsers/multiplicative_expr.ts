import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { DIVISIONAL, MODULUS, MULTIPLICATIVE } from "../expr_type";

import * as UnaryExpr from "./unary_expr";

export interface MultiplicativeNode {
  type: typeof DIVISIONAL | typeof MULTIPLICATIVE | typeof MODULUS;
  lhs: ExprNode;
  rhs: ExprNode;
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  var lhs = UnaryExpr.parse(rootParser, lexer);

  var multiplicativeTypes: {
    [index:string]: typeof DIVISIONAL | typeof MULTIPLICATIVE | typeof MODULUS
  } = {
    "*": MULTIPLICATIVE,
    "div": DIVISIONAL,
    "mod": MODULUS
  };

  if (multiplicativeTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next() as string;

    var rhs = parse(rootParser, lexer);

    return {
      type: multiplicativeTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}
