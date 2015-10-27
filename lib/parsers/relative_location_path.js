/* eslint-env node */

"use strict";

module.exports = {};

var AxisSpecifier = require("../axis_specifier");

var ExprType = require("../expr_type");

var NodeType = require("../node_type");

var Step = require("./step");

module.exports.parse = function (rootParser, lexer) {
  var relativeLocation = {
    type: ExprType.RELATIVE_LOCATION_PATH
  };

  relativeLocation.steps = [Step.parse(rootParser, lexer)];

  while (!lexer.empty() && lexer.peak()[0] === "/") {
    if (lexer.next() === "/") {
      relativeLocation.steps.push(Step.parse(rootParser, lexer));
    } else {
      relativeLocation.steps.push({
          axis: AxisSpecifier.DESCENDANT_OR_SELF,
          test: {
            type: NodeType.NODE
          }
        });

      relativeLocation.steps.push(Step.parse(rootParser, lexer));
    }
  }

  return relativeLocation;
};
