/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

var EqualityExpr = require("./equality_expr");

module.exports.parse = function (lexer) {
  var lhs = EqualityExpr.parse(lexer);

  if (lexer.peak() === "and") {
    lexer.next();

    var rhs = module.exports.parse(lexer);

    return {
      type: ExprType.AND,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
