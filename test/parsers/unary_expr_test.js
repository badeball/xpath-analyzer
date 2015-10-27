/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var Expr = require("../../lib/parsers/expr");

var UnaryExpr = require("../../lib/parsers/unary_expr");

describe("UnaryExpr", function () {
  describe("parse()", function () {
    it("should parse negation expressions", function () {
      var ast = UnaryExpr.parse(Expr, new XPathLexer("-1"));

      Assert.deepEqual(ast, {
        type: ExprType.NEGATION,
        lhs: {
          type: ExprType.NUMBER,
          number: 1
        }
      });
    });
  });
});
