import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { EQUALITY, INEQUALITY, NUMBER } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as EqualityExpr from "../../lib/parsers/equality_expr";

describe("EqualityExpr", function () {
  describe("parse()", function () {
    it("should parse equality expressions", function () {
      var ast = EqualityExpr.parse(Expr, new XPathLexer("1 = 2"));

      Assert.deepEqual(ast, {
        type: EQUALITY,
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

    it("should parse inequality expressions", function () {
      var ast = EqualityExpr.parse(Expr, new XPathLexer("1 != 2"));

      Assert.deepEqual(ast, {
        type: INEQUALITY,
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
