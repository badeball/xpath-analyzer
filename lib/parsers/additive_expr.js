/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

var MultiplicativeExpr = require("./multiplicative_expr");

module.exports.parse = function (rootParser, lexer) {
  var lhs = MultiplicativeExpr.parse(rootParser, lexer);

  var additiveTypes = {
    "+": ExprType.ADDITIVE,
    "-": ExprType.SUBTRACTIVE
  };

  if (additiveTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = module.exports.parse(rootParser, lexer);

    return {
      type: additiveTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
