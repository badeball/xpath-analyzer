/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

var PathExpr = require("./path_expr");

module.exports.parse = function (lexer) {
  var lhs = PathExpr.parse(lexer);

  if (lexer.peak() === "|") {
    lexer.next();

    var rhs = module.exports.parse(lexer);

    return {
      type: ExprType.UNION,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
