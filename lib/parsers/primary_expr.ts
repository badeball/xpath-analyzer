import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { LITERAL, NUMBER } from "../expr_type";

import * as NodeTypeValidator from "../validators/node_type";

import * as FunctionCall from "./function_call";

import { FunctionNode } from "./function_call";

export interface LiteralNode {
  type: typeof LITERAL;
  string: string;
}

export interface NumberNode {
  type: typeof NUMBER;
  number: number;
}

export type PrimaryNode = LiteralNode | NumberNode | FunctionNode;

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  var token = lexer.peak(),
      ch = token && token[0];

  if (ch === "(") {
    lexer.next();

    var expr = rootParser.parse(lexer);

    if (lexer.peak() === ")") {
      lexer.next();
    } else {
      throw new Error("Invalid token at position " + lexer.position() + ", expected closing parenthesis");
    }

    return expr;
  }

  if (ch === "\"" || ch === "'") {
    lexer.next();

    return {
      type: LITERAL,
      string: token.slice(1, -1)
    };
  }

  if (ch === "$") {
    throw Error("Variable reference are not implemented");
  }

  if (/^\d+$/.test(token) || /^(\d+)?\.\d+$/.test(token)) {
    lexer.next();

    return {
      type: NUMBER,
      number: parseFloat(token)
    };
  }

  if (lexer.peak(1) === "(" && !NodeTypeValidator.isValid(lexer.peak())) {
    return FunctionCall.parse(rootParser, lexer);
  }

  throw new Error("Unexpected token at position " + lexer.position());
}

export function isValidOp (lexer: XPathLexer) {
  var token = lexer.peak(),
      ch = token && token[0];

  return ch === "(" ||
    ch === "\"" ||
    ch === "'" ||
    ch === "$" ||
    /^\d+$/.test(token) ||
    /^(\d+)?\.\d+$/.test(token) ||
    (lexer.peak(1) === "(" && !NodeTypeValidator.isValid(lexer.peak()));
}
