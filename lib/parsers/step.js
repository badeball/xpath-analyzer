/* eslint-env node */

"use strict";

function Step (lexer) {
  this.lexer = lexer;
}

module.exports = Step;

var AxisSpecifier = require("../axis_specifier");

var NodeType = require("../node_type");

var NodeTest = require("./node_test");

var Predicate = require("./predicate");

Step.prototype.parse = function () {
  var step = {};

  if (this.lexer.peak(1) === "::") {
    var axisSpecifier = this.lexer.next();

    this.lexer.next();

    if (AxisSpecifier.isValidAxisSpecifier(axisSpecifier)) {
      step.axis = axisSpecifier;
    } else {
      throw new Error("Unexpected token " + axisSpecifier);
    }
  } else if (this.lexer.peak() === "@") {
    this.lexer.next();

    step.axis = AxisSpecifier.ATTRIBUTE;
  } else if (this.lexer.peak() === "..") {
    this.lexer.next();

    return {
      axis: AxisSpecifier.PARENT,
      test: {
        type: NodeType.NODE
      }
    };
  } else if (this.lexer.peak() === ".") {
    this.lexer.next();

    return {
      axis: AxisSpecifier.SELF,
      test: {
        type: NodeType.NODE
      }
    };
  } else {
    step.axis = AxisSpecifier.CHILD;
  }

  step.test = new NodeTest(this.lexer).parse();

  while (this.lexer.peak() === "[") {
    if (!step.predicates) {
      step.predicates = [];
    }

    step.predicates.push(new Predicate(this.lexer).parse());
  }

  return step;
};
