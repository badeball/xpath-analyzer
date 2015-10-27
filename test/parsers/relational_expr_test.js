/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var Expr = require("../../lib/parsers/expr");

var RelationalExpr = require("../../lib/parsers/relational_expr");

describe("RelationalExpr", function () {
  describe("parse()", function () {
    it("should parse less-than expressions", function () {
      var ast = RelationalExpr.parse(Expr, new XPathLexer("1 < 2"));

      Assert.deepEqual(ast, {
        type: ExprType.LESS_THAN,
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

    it("should parse greater-than expressions", function () {
      var ast = RelationalExpr.parse(Expr, new XPathLexer("1 > 2"));

      Assert.deepEqual(ast, {
        type: ExprType.GREATER_THAN,
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

    it("should parse less-than-or-equal expressions", function () {
      var ast = RelationalExpr.parse(Expr, new XPathLexer("1 <= 2"));

      Assert.deepEqual(ast, {
        type: ExprType.LESS_THAN_OR_EQUAL,
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

    it("should parse greater-than-or-equal expressions", function () {
      var ast = RelationalExpr.parse(Expr, new XPathLexer("1 >= 2"));

      Assert.deepEqual(ast, {
        type: ExprType.GREATER_THAN_OR_EQUAL,
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
