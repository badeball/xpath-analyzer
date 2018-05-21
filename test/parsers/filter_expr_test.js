import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { FILTER, FUNCTION_CALL, NUMBER } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as FilterExpr from "../../lib/parsers/filter_expr";

describe("FilterExpr", function () {
  describe("parse()", function () {
    it("should parse primary expressions with predicates", function () {
      var ast = FilterExpr.parse(Expr, new XPathLexer("id()[1]"));

      Assert.deepEqual(ast, {
        type: FILTER,
        primary: {
          type: FUNCTION_CALL,
          name: "id"
        },
        predicates: [{
          type: NUMBER,
          number: 1
        }]
      });
    });
  });
});
