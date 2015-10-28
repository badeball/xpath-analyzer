/* eslint-env node */

"use strict";

var ExprType = require("../expr_type");

var UnionExpr = require("./union_expr");

module.exports = {
  parse: function (rootParser, lexer) {
    if (lexer.peak() === "-") {
      lexer.next();

      return {
        type: ExprType.NEGATION,
        lhs: module.exports.parse(rootParser, lexer)
      };
    } else {
      return UnionExpr.parse(rootParser, lexer);
    }
  }
};
