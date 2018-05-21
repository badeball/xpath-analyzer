import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL, NUMBER } from "../../lib/expr_type";

import * as Expr from "../../lib/parsers/expr";

import * as RelationalExpr from "../../lib/parsers/relational_expr";

describe("RelationalExpr", function () {
  describe("parse()", function () {
    it("should parse less-than expressions", function () {
      var ast = RelationalExpr.parse(Expr, new XPathLexer("1 < 2"));

      Assert.deepEqual(ast, {
        type: LESS_THAN,
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

    it("should parse greater-than expressions", function () {
      var ast = RelationalExpr.parse(Expr, new XPathLexer("1 > 2"));

      Assert.deepEqual(ast, {
        type: GREATER_THAN,
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

    it("should parse less-than-or-equal expressions", function () {
      var ast = RelationalExpr.parse(Expr, new XPathLexer("1 <= 2"));

      Assert.deepEqual(ast, {
        type: LESS_THAN_OR_EQUAL,
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

    it("should parse greater-than-or-equal expressions", function () {
      var ast = RelationalExpr.parse(Expr, new XPathLexer("1 >= 2"));

      Assert.deepEqual(ast, {
        type: GREATER_THAN_OR_EQUAL,
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
