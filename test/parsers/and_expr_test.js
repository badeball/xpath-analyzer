import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { AND, NUMBER } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as AndExpr from "../../lib/parsers/and_expr";

describe("AndExpr", function () {
  describe("parse()", function () {
    it("should parse or expressions", function () {
      var ast = AndExpr.parse(Expr, new XPathLexer("1 and 2"));

      Assert.deepEqual(ast, {
        type: AND,
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
