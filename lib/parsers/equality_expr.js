"use strict";

var ExprType = require("../expr_type");

var RelationalExpr = require("./relational_expr");

module.exports = {
  parse: function (rootParser, lexer) {
    var lhs = RelationalExpr.parse(rootParser, lexer);

    var equalityTypes = {
      "=": ExprType.EQUALITY,
      "!=": ExprType.INEQUALITY
    };

    if (equalityTypes.hasOwnProperty(lexer.peak())) {
      var op = lexer.next();

      var rhs = module.exports.parse(rootParser, lexer);

      return {
        type: equalityTypes[op],
        lhs: lhs,
        rhs: rhs
      };
    } else {
      return lhs;
    }
  }
};
