/* eslint-env node */

"use strict";

function UnionExpr (lexer) {
  this.lexer = lexer;
}

module.exports = UnionExpr;

var ExprType = require("../expr_type");

var PathExpr = require("./path_expr");

UnionExpr.prototype.parse = function () {
  var lhs = new PathExpr(this.lexer).parse();

  if (this.lexer.peak() === "|") {
    this.lexer.next();

    var rhs = new UnionExpr(this.lexer).parse();

    return {
      type: ExprType.UNION,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
