/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var MultiplicativeExpr = require("../../lib/parsers/or_expr");

describe("MultiplicativeExpr", function () {
  describe("parse()", function () {
    it("should parse multiplicative expressions", function () {
      var ast = new MultiplicativeExpr(new XPathLexer("1 * 2")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.MULTIPLICATIVE,
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

    it("should parse divisional expressions", function () {
      var ast = new MultiplicativeExpr(new XPathLexer("1 div 2")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.DIVISIONAL,
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

    it("should parse modulus expressions", function () {
      var ast = new MultiplicativeExpr(new XPathLexer("1 mod 2")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.MODULUS,
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
