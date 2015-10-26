/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var AndExpr = require("../../lib/parsers/and_expr");

describe("AndExpr", function () {
  describe("parse()", function () {
    it("should parse or expressions", function () {
      var ast = AndExpr.parse(new XPathLexer("1 and 2"));

      Assert.deepEqual(ast, {
        type: ExprType.AND,
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
