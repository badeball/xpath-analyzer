/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

var AndExpr = require("./and_expr");

module.exports.parse = function (lexer) {
  var lhs = AndExpr.parse(lexer);

  if (lexer.peak() === "or") {
    lexer.next();

    var rhs = module.exports.parse(lexer);

    return {
      type: ExprType.OR,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
