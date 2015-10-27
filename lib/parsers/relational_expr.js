/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

var AdditiveExpr = require("./additive_expr");

module.exports.parse = function (rootParser, lexer) {
  var lhs = AdditiveExpr.parse(rootParser, lexer);

  var relationalTypes = {
    "<": ExprType.LESS_THAN,
    ">": ExprType.GREATER_THAN,
    "<=": ExprType.LESS_THAN_OR_EQUAL,
    ">=": ExprType.GREATER_THAN_OR_EQUAL
  };

  if (relationalTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = module.exports.parse(rootParser, lexer);

    return {
      type: relationalTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
