/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var PrimaryExpr = require("../../lib/parsers/primary_expr");

describe("PrimaryExpr", function () {
  describe("parse()", function () {
    it("should parse integers", function () {
      var ast = new PrimaryExpr(new XPathLexer("123")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.NUMBER,
        number: 123
      });
    });

    it("should parse floating numbers", function () {
      var ast = new PrimaryExpr(new XPathLexer("123.123")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.NUMBER,
        number: 123.123
      });
    });

    it("should parse literals", function () {
      var ast = new PrimaryExpr(new XPathLexer("'foo'")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.LITERAL,
        string: "foo"
      });
    });

    it("should parse groups", function () {
      var ast = new PrimaryExpr(new XPathLexer("('foo')")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.LITERAL,
        string: "foo"
      });
    });

    it("should parse function calls", function () {
      var ast = new PrimaryExpr(new XPathLexer("id()")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.FUNCTION_CALL,
        name: "id"
      });
    });

    it("should not parse node type tests", function () {
      var ast = new PrimaryExpr(new XPathLexer("comment()")).parse();

      Assert.equal(ast, undefined);
    });
  });
});
