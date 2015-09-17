/* eslint-env node */

"use strict";

function AdditiveExpr (lexer) {
  this.lexer = lexer;
}

module.exports = AdditiveExpr;

var ExprType = require("../expr_type");

var MultiplicativeExpr = require("./multiplicative_expr");

AdditiveExpr.prototype.parse = function () {
  var lhs = new MultiplicativeExpr(this.lexer).parse();

  var additiveTypes = {
    "+": ExprType.ADDITIVE,
    "-": ExprType.SUBTRACTIVE
  };

  if (additiveTypes.hasOwnProperty(this.lexer.peak())) {
    var op = this.lexer.next();

    var rhs = new AdditiveExpr(this.lexer).parse();

    return {
      type: additiveTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
