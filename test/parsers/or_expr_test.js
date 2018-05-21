import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { NUMBER, OR } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as OrExpr from "../../lib/parsers/or_expr";

describe("OrExpr", function () {
  describe("parse()", function () {
    it("should parse or expressions", function () {
      var ast = OrExpr.parse(Expr, new XPathLexer("1 or 2"));

      Assert.deepEqual(ast, {
        type: OR,
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
