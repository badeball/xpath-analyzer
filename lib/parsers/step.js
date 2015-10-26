/* eslint-env node */

"use strict";

module.exports = {};

var AxisSpecifier = require("../axis_specifier");

var NodeType = require("../node_type");

var NodeTest = require("./node_test");

var Predicate = require("./predicate");

module.exports.parse = function (lexer) {
  var step = {};

  if (lexer.peak(1) === "::") {
    var axisSpecifier = lexer.next();

    lexer.next();

    if (AxisSpecifier.isValidAxisSpecifier(axisSpecifier)) {
      step.axis = axisSpecifier;
    } else {
      throw new Error("Unexpected token " + axisSpecifier);
    }
  } else if (lexer.peak() === "@") {
    lexer.next();

    step.axis = AxisSpecifier.ATTRIBUTE;
  } else if (lexer.peak() === "..") {
    lexer.next();

    return {
      axis: AxisSpecifier.PARENT,
      test: {
        type: NodeType.NODE
      }
    };
  } else if (lexer.peak() === ".") {
    lexer.next();

    return {
      axis: AxisSpecifier.SELF,
      test: {
        type: NodeType.NODE
      }
    };
  } else {
    step.axis = AxisSpecifier.CHILD;
  }

  step.test = NodeTest.parse(lexer);

  while (lexer.peak() === "[") {
    if (!step.predicates) {
      step.predicates = [];
    }

    step.predicates.push(Predicate.parse(lexer));
  }

  return step;
};
