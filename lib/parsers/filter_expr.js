/* eslint-env node */

"use strict";

function FilterExpr (lexer) {
  this.lexer = lexer;
}

module.exports = FilterExpr;

var ExprType = require("../expr_type");

var Predicate = require("./predicate");

var PrimaryExpr = require("./primary_expr");

FilterExpr.prototype.parse = function () {
  var primary = new PrimaryExpr(this.lexer).parse();

  if (this.lexer.peak() === "[") {
    var filter = {
      type: ExprType.FILTER,
      primary: primary,
      predicates: []
    };

    while (this.lexer.peak() === "[") {
      filter.predicates.push(new Predicate(this.lexer).parse());
    }

    return filter;
  } else {
    return primary;
  }
};

FilterExpr.isValidOp = function (lexer) {
  return PrimaryExpr.isValidOp(lexer);
};
