"use strict";

import { ATTRIBUTE, CHILD, PARENT, SELF } from "../axis_specifier";

import * as AxisSpecifierValidator from "../validators/axis_specifier";

import { NODE } from "../node_type";

import * as NodeTest from "./node_test";

import * as Predicate from "./predicate";

export function parse (rootParser, lexer) {
  var step = {};

  if (lexer.peak(1) === "::") {
    if (AxisSpecifierValidator.isValid(lexer.peak())) {
      step.axis = lexer.next();

      lexer.next();
    } else {
      throw new Error("Invalid axis specifier at position " + lexer.position());
    }
  } else if (lexer.peak() === "@") {
    lexer.next();

    step.axis = ATTRIBUTE;
  } else if (lexer.peak() === "..") {
    lexer.next();

    return {
      axis: PARENT,
      test: {
        type: NODE
      }
    };
  } else if (lexer.peak() === ".") {
    lexer.next();

    return {
      axis: SELF,
      test: {
        type: NODE
      }
    };
  } else {
    step.axis = CHILD;
  }

  step.test = NodeTest.parse(rootParser, lexer);

  while (lexer.peak() === "[") {
    if (!step.predicates) {
      step.predicates = [];
    }

    step.predicates.push(Predicate.parse(rootParser, lexer));
  }

  return step;
}

export function isValidOp (lexer) {
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
