/* eslint-env node */

"use strict";

function FunctionCall (lexer) {
  this.lexer = lexer;
}

module.exports = FunctionCall;

var ExprType = require("../expr_type");

var Expr = require("./expr");

FunctionCall.prototype.parse = function () {
  var functionCall = {
    type: ExprType.FUNCTION_CALL,
    name: this.lexer.next()
  };

  this.lexer.next();

  if (this.lexer.peak() === ")") {
    this.lexer.next();
  } else {
    functionCall.args = [];

    while (this.lexer.peak() !== ")") {
      functionCall.args.push((new Expr(this.lexer)).parse());

      if (this.lexer.peak() === ",") {
        this.lexer.next();
      }
    }

    this.lexer.next();
  }

  return functionCall;
};
