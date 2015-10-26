/* eslint-env node */

"use strict";

module.exports = {};

var OrExpr = require("./or_expr");

module.exports.parse = function (lexer) {
  return OrExpr.parse(lexer);
};
