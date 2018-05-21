import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { DIVISIONAL, MODULUS, MULTIPLICATIVE, NUMBER } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as MultiplicativeExpr from "../../lib/parsers/multiplicative_expr";

describe("MultiplicativeExpr", function () {
  describe("parse()", function () {
    it("should parse multiplicative expressions", function () {
      var ast = MultiplicativeExpr.parse(Expr, new XPathLexer("1 * 2"));

      Assert.deepEqual(ast, {
        type: MULTIPLICATIVE,
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

    it("should parse divisional expressions", function () {
      var ast = MultiplicativeExpr.parse(Expr, new XPathLexer("1 div 2"));

      Assert.deepEqual(ast, {
        type: DIVISIONAL,
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

    it("should parse modulus expressions", function () {
      var ast = MultiplicativeExpr.parse(Expr, new XPathLexer("1 mod 2"));

      Assert.deepEqual(ast, {
        type: MODULUS,
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
