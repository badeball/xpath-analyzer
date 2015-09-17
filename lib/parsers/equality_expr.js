/* eslint-env node */

"use strict";

function EqualityExpr (lexer) {
  this.lexer = lexer;
}

module.exports = EqualityExpr;

var ExprType = require("../expr_type");

var RelationalExpr = require("./relational_expr");

EqualityExpr.prototype.parse = function () {
  var lhs = new RelationalExpr(this.lexer).parse();

  var equalityTypes = {
    "=": ExprType.EQUALITY,
    "!=": ExprType.INEQUALITY
  };

  if (equalityTypes.hasOwnProperty(this.lexer.peak())) {
    var op = this.lexer.next();

    var rhs = new EqualityExpr(this.lexer).parse();

    return {
      type: equalityTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
};
