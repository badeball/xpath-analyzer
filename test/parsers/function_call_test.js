/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var FunctionCall = require("../../lib/parsers/function_call");

describe("FunctionCall", function () {
  describe("parse()", function () {
    it("should parse function arguments", function () {
      var ast = FunctionCall.parse(new XPathLexer("id('foo')"));

      Assert.deepEqual(ast, {
        type: ExprType.FUNCTION_CALL,
        name: "id",
        args: [{
          type: ExprType.LITERAL,
          string: "foo"
        }]
      });
    });
  });
});
