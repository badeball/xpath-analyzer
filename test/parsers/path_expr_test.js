import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { CHILD, DESCENDANT_OR_SELF } from "../../lib/axis_specifier";

import { FUNCTION_CALL, PATH, NODE_NAME_TEST, NODE_TYPE_TEST } from "../../lib/expr_type";

import { NODE } from "../../lib/node_type";

import * as Expr from "../../lib/parsers/expr";

import * as PathExpr from "../../lib/parsers/path_expr";

describe("PathExpr", function () {
  describe("parse()", function () {
    it("should parse filter expressions with path", function () {
      var ast = PathExpr.parse(Expr, new XPathLexer("id()//foo"));

      Assert.deepEqual(ast, {
        type: PATH,
        filter: {
          type: FUNCTION_CALL,
          name: "id"
        },
        steps: [{
          axis: DESCENDANT_OR_SELF,
          test: {
            type: NODE_TYPE_TEST,
            name: NODE
          }
        }, {
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "foo"
          }
        }]
      });
    });
  });
});
