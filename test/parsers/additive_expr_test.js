import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { ADDITIVE, NUMBER, SUBTRACTIVE } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as AdditiveExpr from "../../lib/parsers/additive_expr";

describe("AdditiveExpr", function () {
  describe("parse()", function () {
    it("should parse additive expressions", function () {
      var ast = AdditiveExpr.parse(Expr, new XPathLexer("1 + 2"));

      Assert.deepEqual(ast, {
        type: ADDITIVE,
        lhs: {
          type: NUMBER,
          number: 1
        },
        rhs: {
          type: NUMBER,
          number: 2
        }
      });
    });

    it("should parse subtractive expressions", function () {
      var ast = AdditiveExpr.parse(Expr, new XPathLexer("1 - 2"));

      Assert.deepEqual(ast, {
        type: SUBTRACTIVE,
        lhs: {
          type: NUMBER,
          number: 1
        },
        rhs: {
          type: NUMBER,
          number: 2
        }
      });
    });
  });
});
