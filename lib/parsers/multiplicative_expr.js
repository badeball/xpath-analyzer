/* eslint-env node */

"use strict";

function MultiplicativeExpr (lexer) {
  this.lexer = lexer;
}

module.exports = MultiplicativeExpr;

var ExprType = require("../expr_type");

var UnaryExpr = require("./unary_expr");

MultiplicativeExpr.prototype.parse = function () {
  var lhs = new UnaryExpr(this.lexer).parse();

  var multiplicativeTypes = {
    "*": ExprType.MULTIPLICATIVE,
    "div": ExprType.DIVISIONAL,
    "mod": ExprType.MODULUS
  };

  if (multiplicativeTypes.hasOwnProperty(this.lexer.peak())) {
    var op = this.lexer.next();

    var rhs = new MultiplicativeExpr(this.lexer).parse();

    return {
      type: multiplicativeTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
