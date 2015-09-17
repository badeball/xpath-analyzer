/* eslint-env node */

"use strict";

function RelativeLocationPath (lexer) {
  this.lexer = lexer;
}

module.exports = RelativeLocationPath;

var AxisSpecifier = require("../axis_specifier");

var ExprType = require("../expr_type");

var NodeType = require("../node_type");

var Step = require("./step");

RelativeLocationPath.prototype.parse = function () {
  var relativeLocation = {
    type: ExprType.RELATIVE_LOCATION_PATH
  };

  relativeLocation.steps = [new Step(this.lexer).parse()];

  while (!this.lexer.empty() && this.lexer.peak()[0] === "/") {
    if (this.lexer.next() === "/") {
      relativeLocation.steps.push(new Step(this.lexer).parse());
    } else {
      relativeLocation.steps.push({
          axis: AxisSpecifier.DESCENDANT_OR_SELF,
          test: {
            type: NodeType.NODE
          }
        });

      relativeLocation.steps.push(new Step(this.lexer).parse());
    }
  }

  return relativeLocation;
};
