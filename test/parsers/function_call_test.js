"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var Expr = require("../../lib/parsers/expr");

var FunctionCall = require("../../lib/parsers/function_call");

describe("FunctionCall", function () {
  describe("parse()", function () {
    it("should parse function arguments", function () {
      var ast = FunctionCall.parse(Expr, new XPathLexer("id('foo')"));

      Assert.deepEqual(ast, {
        type: ExprType.FUNCTION_CALL,
        name: "id",
        args: [{
          type: ExprType.LITERAL,
          string: "foo"
        }]
      });
    });

    it("should parse multiple function arguments", function () {
      var ast = FunctionCall.parse(Expr, new XPathLexer("id('foo', 'bar')"));

      Assert.deepEqual(ast, {
        type: ExprType.FUNCTION_CALL,
        name: "id",
        args: [{
          type: ExprType.LITERAL,
          string: "foo"
        }, {
          type: ExprType.LITERAL,
          string: "bar"
        }]
      });
    });
  });
});
