/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

module.exports.parse = function (rootParser, lexer) {
  var functionCall = {
    type: ExprType.FUNCTION_CALL,
    name: lexer.next()
  };

  lexer.next();

  if (lexer.peak() === ")") {
    lexer.next();
  } else {
    functionCall.args = [];

    while (lexer.peak() !== ")") {
      functionCall.args.push(rootParser.parse(lexer));

      if (lexer.peak() === ",") {
        lexer.next();
      }
    }

    lexer.next();
  }

  return functionCall;
};
