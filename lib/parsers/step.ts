import XPathLexer from "xpath-lexer";

import { ExprParser } from "./expr";

import { AxisSpecifier, ATTRIBUTE, CHILD, PARENT, SELF } from "../axis_specifier";

import * as AxisSpecifierValidator from "../validators/axis_specifier";

import { NODE_TYPE_TEST } from "../expr_type";

import { NODE } from "../node_type";

import * as NodeTest from "./node_test";

import * as Predicate from "./predicate";

import { NodeTestNode } from "./node_test";

import { PredicateNode } from "./predicate";

export interface StepNode {
  axis: AxisSpecifier;
  test: NodeTestNode;
  predicates: PredicateNode[];
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): StepNode {
  if (lexer.peak() === "..") {
    lexer.next();

    return {
      axis: PARENT,
      test: {
        type: NODE_TYPE_TEST,
        name: NODE
      },
      predicates: []
    };
  } else if (lexer.peak() === ".") {
    lexer.next();

    return {
      axis: SELF,
      test: {
        type: NODE_TYPE_TEST,
        name: NODE
      },
      predicates: []
    };
  }

  var axis: AxisSpecifier;

  if (lexer.peak(1) === "::") {
    var possiblyAxis = lexer.peak();

    if (AxisSpecifierValidator.isValid(possiblyAxis)) {
      axis = possiblyAxis;

      lexer.next();
      lexer.next();
    } else {
      throw new Error("Invalid axis specifier at position " + lexer.position());
    }
  } else if (lexer.peak() === "@") {
    lexer.next();

    axis = ATTRIBUTE;
  } else {
    axis = CHILD;
  }

  var step: StepNode = {
    axis: axis,
    test: NodeTest.parse(rootParser, lexer),
    predicates: []
  };

  while (lexer.peak() === "[") {
    step.predicates.push(Predicate.parse(rootParser, lexer));
  }

  return step;
}

export function isValidOp (lexer: XPathLexer): boolean {
  var token = lexer.peak();

  if (typeof token !== "string") {
    return false;
  }

  return token === "." ||
    token === ".." ||
    token === "@" ||
    token === "*" ||
    /^\w/.test(token);
}
