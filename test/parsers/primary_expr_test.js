/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var Expr = require("../../lib/parsers/expr");

var PrimaryExpr = require("../../lib/parsers/primary_expr");

describe("PrimaryExpr", function () {
  describe("parse()", function () {
    it("should parse integers", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("123"));

      Assert.deepEqual(ast, {
        type: ExprType.NUMBER,
        number: 123
      });
    });

    it("should parse floating numbers", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("123.123"));

      Assert.deepEqual(ast, {
        type: ExprType.NUMBER,
        number: 123.123
      });
    });

    it("should parse literals", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("'foo'"));

      Assert.deepEqual(ast, {
        type: ExprType.LITERAL,
        string: "foo"
      });
    });

    it("should parse groups", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("('foo')"));

      Assert.deepEqual(ast, {
        type: ExprType.LITERAL,
        string: "foo"
      });
    });

    it("should parse function calls", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("id()"));

      Assert.deepEqual(ast, {
        type: ExprType.FUNCTION_CALL,
        name: "id"
      });
    });

    it("should not parse node type tests", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("comment()"));

      Assert.equal(ast, undefined);
    });
  });
});
