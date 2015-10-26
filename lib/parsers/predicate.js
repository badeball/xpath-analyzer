/* eslint-env node */

"use strict";

module.exports = {};

var Expr = require("./expr");

module.exports.parse = function (lexer) {
  lexer.next();

  var predicate = Expr.parse(lexer);

  if (lexer.next() !== "]") {
    throw new Error("Unclosed brackets");
  }

  return predicate;
};
