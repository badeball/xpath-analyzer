/* eslint-env node */

"use strict";

function RelationalExpr (lexer) {
  this.lexer = lexer;
}

module.exports = RelationalExpr;

var ExprType = require("../expr_type");

var AdditiveExpr = require("./additive_expr");

RelationalExpr.prototype.parse = function () {
  var lhs = new AdditiveExpr(this.lexer).parse();

  var relationalTypes = {
    "<": ExprType.LESS_THAN,
    ">": ExprType.GREATER_THAN,
    "<=": ExprType.LESS_THAN_OR_EQUAL,
    ">=": ExprType.GREATER_THAN_OR_EQUAL
  };

  if (relationalTypes.hasOwnProperty(this.lexer.peak())) {
    var op = this.lexer.next();

    var rhs = new RelationalExpr(this.lexer).parse();

    return {
      type: relationalTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
