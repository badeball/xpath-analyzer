/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var Expr = require("../../lib/parsers/expr");

var AdditiveExpr = require("../../lib/parsers/additive_expr");

describe("AdditiveExpr", function () {
  describe("parse()", function () {
    it("should parse additive expressions", function () {
      var ast = AdditiveExpr.parse(Expr, new XPathLexer("1 + 2"));

      Assert.deepEqual(ast, {
        type: ExprType.ADDITIVE,
        lhs: {
          type: ExprType.NUMBER,
          number: 1
        },
        rhs: {
          type: ExprType.NUMBER,
          number: 2
        }
      });
    });

    it("should parse subtractive expressions", function () {
      var ast = AdditiveExpr.parse(Expr, new XPathLexer("1 - 2"));

      Assert.deepEqual(ast, {
        type: ExprType.SUBTRACTIVE,
        lhs: {
          type: ExprType.NUMBER,
          number: 1
        },
        rhs: {
          type: ExprType.NUMBER,
          number: 2
        }
      });
    });
  });
});
