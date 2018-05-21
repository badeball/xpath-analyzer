import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { NUMBER, UNION } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as UnionExpr from "../../lib/parsers/union_expr";

describe("UnionExpr", function () {
  describe("parse()", function () {
    it("should parse union expressions", function () {
      var ast = UnionExpr.parse(Expr, new XPathLexer("1 | 2"));

      Assert.deepEqual(ast, {
        type: UNION,
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
