/* eslint-env node */

"use strict";

module.exports = {};

var AxisSpecifier = require("../axis_specifier");

var ExprType = require("../expr_type");

var NodeType = require("../node_type");

var FilterExpr = require("./filter_expr");

var LocationPath = require("./location_path");

var Step = require("./step");

module.exports.parse = function (lexer) {
  if (FilterExpr.isValidOp(lexer)) {
    var filter = FilterExpr.parse(lexer);

    if (!lexer.empty() && lexer.peak()[0] === "/") {
      var path = {
        type: ExprType.PATH,
        filter: filter,
        steps: []
      };

      while (!lexer.empty() && lexer.peak()[0] === "/") {
        if (lexer.next() === "//") {
          path.steps.push({
            axis: AxisSpecifier.DESCENDANT_OR_SELF,
            test: {
              type: NodeType.NODE
            }
          });
        }

        path.steps.push(Step.parse(lexer));
      }

      return path;
    } else {
      return filter;
    }
  } else {
    return LocationPath.parse(lexer);
  }
};
