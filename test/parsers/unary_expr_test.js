import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { NEGATION, NUMBER } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as UnaryExpr from "../../lib/parsers/unary_expr";

describe("UnaryExpr", function () {
  describe("parse()", function () {
    it("should parse negation expressions", function () {
      var ast = UnaryExpr.parse(Expr, new XPathLexer("-1"));

      Assert.deepEqual(ast, {
        type: NEGATION,
        lhs: {
          type: NUMBER,
          number: 1
        }
      });
    });
  });
});
