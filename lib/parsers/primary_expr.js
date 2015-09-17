/* eslint-env node */

"use strict";

function PrimaryExpr (lexer) {
  this.lexer = lexer;
}

module.exports = PrimaryExpr;

var ExprType = require("../expr_type");

var NodeType = require("../node_type");

var Expr = require("./expr");

var FunctionCall = require("./function_call");

PrimaryExpr.prototype.parse = function () {
  var token = this.lexer.peak(),
      ch = token[0];

  if (ch === "(") {
    this.lexer.next();

    var expr = new Expr(this.lexer).parse();

    if (this.lexer.next() !== ")") {
      throw new Error("Unclosed parentheses");
    }

    return expr;
  }

  if (ch === "\"" || ch === "'") {
    this.lexer.next();

    return {
      type: ExprType.LITERAL,
      string: token.slice(1, -1)
    };
  }

  if (ch === "$") {
    throw Error("Variable reference are not implemented");
  }

  if (/^\d+$/.test(token) || /^(\d+)?\.\d+$/.test(token)) {
    this.lexer.next();

    return {
      type: ExprType.NUMBER,
      number: parseFloat(token)
    };
  }

  if (this.lexer.peak(1) === "(" && !NodeType.isValidNodeType(this.lexer.peak())) {
    return new FunctionCall(this.lexer).parse();
  }
};

PrimaryExpr.isValidOp = function (lexer) {
  var token = lexer.peak(),
      ch = token[0];

  return ch === "(" ||
    ch === "\"" ||
    ch === "'" ||
    ch === "$" ||
    /^\d+$/.test(token) ||
    /^(\d+)?\.\d+$/.test(token) ||
    (lexer.peak(1) === "(" && !NodeType.isValidNodeType(lexer.peak()));
};
