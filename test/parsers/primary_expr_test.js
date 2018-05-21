import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { FUNCTION_CALL, LITERAL, NUMBER } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as PrimaryExpr from "../../lib/parsers/primary_expr";

describe("PrimaryExpr", function () {
  describe("parse()", function () {
    it("should parse integers", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("123"));

      Assert.deepEqual(ast, {
        type: NUMBER,
        number: 123
      });
    });

    it("should parse floating numbers", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("123.123"));

      Assert.deepEqual(ast, {
        type: NUMBER,
        number: 123.123
      });
    });

    it("should parse literals", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("'foo'"));

      Assert.deepEqual(ast, {
        type: LITERAL,
        string: "foo"
      });
    });

    it("should parse groups", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("('foo')"));

      Assert.deepEqual(ast, {
        type: LITERAL,
        string: "foo"
      });
    });

    it("should parse function calls", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("id()"));

      Assert.deepEqual(ast, {
        type: FUNCTION_CALL,
        name: "id"
      });
    });

    it("should not parse node type tests", function () {
      var ast = PrimaryExpr.parse(Expr, new XPathLexer("comment()"));

      Assert.equal(ast, undefined);
    });
  });
});
