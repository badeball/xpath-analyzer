/* eslint-env node */

"use strict";

function Predicate (lexer) {
  this.lexer = lexer;
}

module.exports = Predicate;

var Expr = require("./expr");

Predicate.prototype.parse = function () {
  this.lexer.next();

  var predicate = new Expr(this.lexer).parse();

  if (this.lexer.next() !== "]") {
    throw new Error("Unclosed brackets");
  }

  return predicate;
};
