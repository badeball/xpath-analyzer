/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var UnaryExpr = require("../../lib/parsers/or_expr");

describe("UnaryExpr", function () {
  describe("parse()", function () {
    it("should parse negation expressions", function () {
      var ast = new UnaryExpr(new XPathLexer("-1")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.NEGATION,
        lhs: {
          type: ExprType.NUMBER,
          number: 1
        }
      });
    });
  });
});
