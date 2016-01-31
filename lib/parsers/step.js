"use strict";

var AxisSpecifier = require("../axis_specifier");

var AxisSpecifierValidator = require("../validators/axis_specifier");

var NodeType = require("../node_type");

var NodeTest = require("./node_test");

var Predicate = require("./predicate");

module.exports = {
  parse: function (rootParser, lexer) {
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

    step.test = NodeTest.parse(rootParser, lexer);

    while (lexer.peak() === "[") {
      if (!step.predicates) {
        step.predicates = [];
      }

      step.predicates.push(Predicate.parse(rootParser, lexer));
    }

    return step;
  },

  isValidOp: function (lexer) {
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
};
