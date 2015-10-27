/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

var NodeType = require("../node_type");

var FunctionCall = require("./function_call");

module.exports.parse = function (rootParser, lexer) {
  var token = lexer.peak(),
      ch = token[0];

  if (ch === "(") {
    lexer.next();

    var expr = rootParser.parse(lexer);

    if (lexer.next() !== ")") {
      throw new Error("Unclosed parentheses");
    }

    return expr;
  }

  if (ch === "\"" || ch === "'") {
    lexer.next();

    return {
      type: ExprType.LITERAL,
      string: token.slice(1, -1)
    };
  }

  if (ch === "$") {
    throw Error("Variable reference are not implemented");
  }

  if (/^\d+$/.test(token) || /^(\d+)?\.\d+$/.test(token)) {
    lexer.next();

    return {
      type: ExprType.NUMBER,
      number: parseFloat(token)
    };
  }

  if (lexer.peak(1) === "(" && !NodeType.isValidNodeType(lexer.peak())) {
    return FunctionCall.parse(rootParser, lexer);
  }
};

module.exports.isValidOp = function (lexer) {
  var token = lexer.peak(),
      ch = token && token[0];

  return ch === "(" ||
    ch === "\"" ||
    ch === "'" ||
    ch === "$" ||
    /^\d+$/.test(token) ||
    /^(\d+)?\.\d+$/.test(token) ||
    (lexer.peak(1) === "(" && !NodeType.isValidNodeType(lexer.peak()));
};
