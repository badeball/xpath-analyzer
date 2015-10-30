"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var Expr = require("../../lib/parsers/expr");

var OrExpr = require("../../lib/parsers/or_expr");

describe("OrExpr", function () {
  describe("parse()", function () {
    it("should parse or expressions", function () {
      var ast = OrExpr.parse(Expr, new XPathLexer("1 or 2"));

      Assert.deepEqual(ast, {
        type: ExprType.OR,
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
