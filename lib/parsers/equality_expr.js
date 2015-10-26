/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

var RelationalExpr = require("./relational_expr");

module.exports.parse = function (lexer) {
  var lhs = RelationalExpr.parse(lexer);

  var equalityTypes = {
    "=": ExprType.EQUALITY,
    "!=": ExprType.INEQUALITY
  };

  if (equalityTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = module.exports.parse(lexer);

    return {
      type: equalityTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
