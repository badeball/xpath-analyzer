/* eslint-env node */

"use strict";

function AndExpr (lexer) {
  this.lexer = lexer;
}

module.exports = AndExpr;

var ExprType = require("../expr_type");

var EqualityExpr = require("./equality_expr");

AndExpr.prototype.parse = function () {
  var lhs = new EqualityExpr(this.lexer).parse();

  if (this.lexer.peak() === "and") {
    this.lexer.next();

    var rhs = new AndExpr(this.lexer).parse();

    return {
      type: ExprType.AND,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
