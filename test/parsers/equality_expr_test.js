/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var EqualityExpr = require("../../lib/parsers/equality_expr");

describe("EqualityExpr", function () {
  describe("parse()", function () {
    it("should parse equality expressions", function () {
      var ast = new EqualityExpr(new XPathLexer("1 = 2")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.EQUALITY,
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

    it("should parse inequality expressions", function () {
      var ast = new EqualityExpr(new XPathLexer("1 != 2")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.INEQUALITY,
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
