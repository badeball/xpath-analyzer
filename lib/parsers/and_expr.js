"use strict";

var ExprType = require("../expr_type");

var EqualityExpr = require("./equality_expr");

module.exports = {
  parse: function (rootParser, lexer) {
    var lhs = EqualityExpr.parse(rootParser, lexer);

    if (lexer.peak() === "and") {
      lexer.next();

      var rhs = module.exports.parse(rootParser, lexer);

      return {
        type: ExprType.AND,
        lhs: lhs,
        rhs: rhs
      };
    } else {
      return lhs;
    }
  }
};
