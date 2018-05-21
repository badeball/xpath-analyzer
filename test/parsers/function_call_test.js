import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { FUNCTION_CALL, LITERAL } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as FunctionCall from "../../lib/parsers/function_call";

describe("FunctionCall", function () {
  describe("parse()", function () {
    it("should parse function arguments", function () {
      var ast = FunctionCall.parse(Expr, new XPathLexer("id('foo')"));

      Assert.deepEqual(ast, {
        type: FUNCTION_CALL,
        name: "id",
        args: [{
          type: LITERAL,
          string: "foo"
        }]
      });
    });

    it("should parse multiple function arguments", function () {
      var ast = FunctionCall.parse(Expr, new XPathLexer("id('foo', 'bar')"));

      Assert.deepEqual(ast, {
        type: FUNCTION_CALL,
        name: "id",
        args: [{
          type: LITERAL,
          string: "foo"
        }, {
          type: LITERAL,
          string: "bar"
        }]
      });
    });
  });
});
