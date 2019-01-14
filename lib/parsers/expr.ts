import XPathLexer from "xpath-lexer";

import { OrNode } from "./or_expr";

import { AndNode } from "./and_expr";

import { EqualityNode } from "./equality_expr";

import { RelationalNode } from "./relational_expr";

import { AdditiveNode } from "./additive_expr";

import { MultiplicativeNode } from "./multiplicative_expr";

import { UnaryNode } from "./unary_expr";

import { UnionNode } from "./union_expr";

import { PathNode } from "./path_expr";

import { LocationNode } from "./location_path";

import { FilterNode } from "./filter_expr";

import { PrimaryNode } from "./primary_expr";

import * as OrExpr from "./or_expr";

export interface ExprParser {
  parse: (lexer: XPathLexer) => ExprNode;
}

export type ExprNode = OrNode | AndNode | EqualityNode | RelationalNode | AdditiveNode | MultiplicativeNode | UnaryNode | UnionNode | PathNode | LocationNode | FilterNode | PrimaryNode;

export function parse (lexer: XPathLexer):  ExprNode {
  return OrExpr.parse({ parse }, lexer);
}
