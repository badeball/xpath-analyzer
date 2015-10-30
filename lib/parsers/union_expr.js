"use strict";

var ExprType = require("../expr_type");

var PathExpr = require("./path_expr");

module.exports = {
  parse: function (rootParser, lexer) {
    var lhs = PathExpr.parse(rootParser, lexer);

    if (lexer.peak() === "|") {
      lexer.next();

      var rhs = module.exports.parse(rootParser, lexer);

      return {
        type: ExprType.UNION,
        lhs: lhs,
        rhs: rhs
      };
    } else {
      return lhs;
    }
  }
};
