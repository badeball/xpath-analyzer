import XPathLexer from "xpath-lexer";

import { NODE_NAME_TEST, NODE_TYPE_TEST, PROCESSING_INSTRUCTION_TEST } from "../expr_type";

import { ExprParser } from "./expr";

import { PROCESSING_INSTRUCTION } from "../node_type";

import * as NodeTypeValidator from "../validators/node_type";

export interface NodeNameTestNode {
  type: typeof NODE_NAME_TEST,
  name: string;
}

export interface NodeTypeTestNode {
  type: typeof NODE_TYPE_TEST,
  name: string;
}

export interface ProcessingInstructionTestNode {
  type: typeof PROCESSING_INSTRUCTION_TEST,
  name?: string
}

export type NodeTestNode = NodeNameTestNode | NodeTypeTestNode | ProcessingInstructionTestNode;

export function parse (rootParser: ExprParser, lexer: XPathLexer): NodeTestNode {
  if (lexer.peak() === "*") {
    lexer.next();

    return {
      type: NODE_NAME_TEST,
      name: "*"
    };
  }

  if (lexer.peak(1) === "(") {
    if (NodeTypeValidator.isValid(lexer.peak())) {
      var test: NodeTypeTestNode | ProcessingInstructionTestNode, type = lexer.next() as string;

      lexer.next();

      if (type === PROCESSING_INSTRUCTION) {
        var token = lexer.peak(),
            ch = token && token[0];

        test = {
          type: PROCESSING_INSTRUCTION_TEST,
          name: (ch === "\"" || ch === "'") ? (lexer.next() as string).slice(1, -1) : undefined
        };
      } else {
        test = {
          type: NODE_TYPE_TEST,
          name: type
        };
      }

      if (lexer.peak() !== ")") {
        throw new Error("Invalid token at position " + lexer.position() + ", expected closing parenthesis");
      } else {
        lexer.next();
      }

      return test;
    } else {
      throw new Error("Invalid node type at position " + lexer.position());
    }
  }

  return {
    type: NODE_NAME_TEST,
    name: lexer.next() as string
  };
}
