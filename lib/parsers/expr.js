/* eslint-env node */

"use strict";

function Expr (lexer) {
  this.lexer = lexer;
}

module.exports = Expr;

var OrExpr = require("./or_expr");

Expr.prototype.parse = function () {
  return new OrExpr(this.lexer).parse();
};
