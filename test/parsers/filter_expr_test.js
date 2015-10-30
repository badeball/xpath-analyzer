/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var ExprType = require("../../lib/expr_type");

var FilterExpr = require("../../lib/parsers/filter_expr");

describe("FilterExpr", function () {
  describe("parse()", function () {
    it("should parse filter expressions with predicates", function () {
      var ast = new FilterExpr(new XPathLexer("id()[1]")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.FILTER,
        primary: {
          type: ExprType.FUNCTION_CALL,
          name: "id"
        },
        predicates: [{
          type: ExprType.NUMBER,
          number: 1
        }]
      });
    });
  });
});
