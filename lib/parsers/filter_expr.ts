import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { PredicateNode } from "./predicate";

import { FILTER } from "../expr_type";

import * as Predicate from "./predicate";

import * as PrimaryExpr from "./primary_expr";

export interface FilterNode {
  type: typeof FILTER;
  primary: ExprNode;
  predicates: PredicateNode[];
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  var primary = PrimaryExpr.parse(rootParser, lexer);

  if (lexer.peak() === "[") {
    var filter: FilterNode = {
      type: FILTER,
      primary: primary,
      predicates: []
    };

    while (lexer.peak() === "[") {
      filter.predicates.push(Predicate.parse(rootParser, lexer));
    }

    return filter;
  } else {
    return primary;
  }
}

export function isValidOp (lexer: XPathLexer) {
  return PrimaryExpr.isValidOp(lexer);
}
