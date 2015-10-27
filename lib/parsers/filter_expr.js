/* eslint-env node */

"use strict";

module.exports = {};

var ExprType = require("../expr_type");

var Predicate = require("./predicate");

var PrimaryExpr = require("./primary_expr");

module.exports.parse = function (rootParser, lexer) {
  var primary = PrimaryExpr.parse(rootParser, lexer);

  if (lexer.peak() === "[") {
    var filter = {
      type: ExprType.FILTER,
      primary: primary,
      predicates: []
    };

    while (lexer.peak() === "[") {
      filter.predicates.push(Predicate.parse(rootParser, lexer));
    }

    return filter;
  } else {
    return primary;
  }
};

module.exports.isValidOp = function (lexer) {
  return PrimaryExpr.isValidOp(lexer);
};
