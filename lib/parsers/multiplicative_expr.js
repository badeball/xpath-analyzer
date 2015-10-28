/* eslint-env node */

"use strict";

var ExprType = require("../expr_type");

var UnaryExpr = require("./unary_expr");

module.exports = {
  parse: function (rootParser, lexer) {
    var lhs = UnaryExpr.parse(rootParser, lexer);

    var multiplicativeTypes = {
      "*": ExprType.MULTIPLICATIVE,
      "div": ExprType.DIVISIONAL,
      "mod": ExprType.MODULUS
    };

    if (multiplicativeTypes.hasOwnProperty(lexer.peak())) {
      var op = lexer.next();

      var rhs = module.exports.parse(rootParser, lexer);

      return {
        type: multiplicativeTypes[op],
        lhs: lhs,
        rhs: rhs
      };
    } else {
      return lhs;
    }
  }
};
