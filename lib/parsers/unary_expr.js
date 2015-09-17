/* eslint-env node */

"use strict";

function UnaryExpr (lexer) {
  this.lexer = lexer;
}

module.exports = UnaryExpr;

var ExprType = require("../expr_type");

var UnionExpr = require("./union_expr");

UnaryExpr.prototype.parse = function () {
  if (this.lexer.peak() === "-") {
    this.lexer.next();

    return {
      type: ExprType.NEGATION,
      lhs: new UnaryExpr(this.lexer).parse()
    };
  } else {
    return new UnionExpr(this.lexer).parse();
  }
};
