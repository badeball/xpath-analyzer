/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var OrExpr = require("../../lib/parsers/or_expr");

describe("OrExpr", function () {
  describe("parse()", function () {
    it("should parse or expressions", function () {
      var ast = new OrExpr(new XPathLexer("1 or 2")).parse();

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
