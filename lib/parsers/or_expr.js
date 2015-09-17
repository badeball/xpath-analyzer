/* eslint-env node */

"use strict";

function OrExpr (lexer) {
  this.lexer = lexer;
}

module.exports = OrExpr;

var ExprType = require("../expr_type");

var AndExpr = require("./and_expr");

OrExpr.prototype.parse = function () {
  var lhs = new AndExpr(this.lexer).parse();

  if (this.lexer.peak() === "or") {
    this.lexer.next();

    var rhs = new OrExpr(this.lexer).parse();

    return {
      type: ExprType.OR,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
