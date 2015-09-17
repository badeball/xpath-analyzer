/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var UnionExpr = require("../../lib/parsers/or_expr");

describe("UnionExpr", function () {
  describe("parse()", function () {
    it("should parse union expressions", function () {
      var ast = new UnionExpr(new XPathLexer("1 | 2")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.UNION,
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
