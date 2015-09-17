/* eslint-env node */

"use strict";

function AbsoluteLocationPath (lexer) {
  this.lexer = lexer;
}

module.exports = AbsoluteLocationPath;

var AxisSpecifier = require("../axis_specifier");

var ExprType = require("../expr_type");

var NodeType = require("../node_type");

var Step = require("./step");

AbsoluteLocationPath.prototype.parse = function () {
  var absoluteLocation = {
    type: ExprType.ABSOLUTE_LOCATION_PATH
  };

  while (!this.lexer.empty() && this.lexer.peak()[0] === "/") {
    if (!absoluteLocation.steps) {
      absoluteLocation.steps = [];
    }

    if (this.lexer.next() === "/") {
      var next = this.lexer.peak();

      if (!this.lexer.empty() && (next === "." || next === ".." || next === "@" || next === "*" || /(?![0-9])[\w]/.test(next))) {
        absoluteLocation.steps.push(new Step(this.lexer).parse());
      }
    } else {
      absoluteLocation.steps.push({
        axis: AxisSpecifier.DESCENDANT_OR_SELF,
        test: {
          type: NodeType.NODE
        }
      });

      absoluteLocation.steps.push(new Step(this.lexer).parse());
    }
  }

  return absoluteLocation;
};
