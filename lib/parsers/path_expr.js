/* eslint-env node */

"use strict";

function PathExpr (lexer) {
  this.lexer = lexer;
}

module.exports = PathExpr;

var AxisSpecifier = require("../axis_specifier");

var ExprType = require("../expr_type");

var NodeType = require("../node_type");

var FilterExpr = require("./filter_expr");

var LocationPath = require("./location_path");

var Step = require("./step");

PathExpr.prototype.parse = function () {
  if (FilterExpr.isValidOp(this.lexer)) {
    var filter = new FilterExpr(this.lexer).parse();

    if (!this.lexer.empty() && this.lexer.peak()[0] === "/") {
      var path = {
        type: ExprType.PATH,
        filter: filter,
        steps: []
      };

      while (!this.lexer.empty() && this.lexer.peak()[0] === "/") {
        if (this.lexer.next() === "//") {
          path.steps.push({
            axis: AxisSpecifier.DESCENDANT_OR_SELF,
            test: {
              type: NodeType.NODE
            }
          });
        }

        path.steps.push(new Step(this.lexer).parse());
      }

      return path;
    } else {
      return filter;
    }
  } else {
    return new LocationPath(this.lexer).parse();
  }
};
