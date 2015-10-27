/* eslint-env node */

"use strict";

module.exports = {};

var AxisSpecifier = require("../axis_specifier");

var ExprType = require("../expr_type");

var NodeType = require("../node_type");

var Step = require("./step");

module.exports.parse = function (rootParser, lexer) {
  var absoluteLocation = {
    type: ExprType.ABSOLUTE_LOCATION_PATH
  };

  while (!lexer.empty() && lexer.peak()[0] === "/") {
    if (!absoluteLocation.steps) {
      absoluteLocation.steps = [];
    }

    if (lexer.next() === "/") {
      var next = lexer.peak();

      if (!lexer.empty() && (next === "." || next === ".." || next === "@" || next === "*" || /(?![0-9])[\w]/.test(next))) {
        absoluteLocation.steps.push(Step.parse(rootParser, lexer));
      }
    } else {
      absoluteLocation.steps.push({
        axis: AxisSpecifier.DESCENDANT_OR_SELF,
        test: {
          type: NodeType.NODE
        }
      });

      absoluteLocation.steps.push(Step.parse(rootParser, lexer));
    }
  }

  return absoluteLocation;
};
