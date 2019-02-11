import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { CHILD, DESCENDANT_OR_SELF } from "../../lib/axis_specifier";

import { ABSOLUTE_LOCATION_PATH, NODE_NAME_TEST, NODE_TYPE_TEST } from "../../lib/expr_type";

import { NODE } from "../../lib/node_type";

import * as Expr from "../../lib/parsers/expr";

import * as AbsoluteLocationPathExpr from "../../lib/parsers/absolute_location_path";

describe("AbsoluteLocationPathExpr", function () {
  describe("parse()", function () {
    it("should parse the trivial absolute location path without steps", function () {
      var ast = AbsoluteLocationPathExpr.parse(Expr, new XPathLexer("/"));

      Assert.deepEqual(ast, {
        type: ABSOLUTE_LOCATION_PATH,
        steps: []
      });
    });

    it("should parse absolute location paths with steps", function () {
      var ast = AbsoluteLocationPathExpr.parse(Expr, new XPathLexer("/bar/foo"));

      Assert.deepEqual(ast, {
        type: ABSOLUTE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "bar"
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

    it("should parse absolute location paths with steps (descendant)", function () {
      var ast = AbsoluteLocationPathExpr.parse(Expr, new XPathLexer("/bar//foo"));

      Assert.deepEqual(ast, {
        type: ABSOLUTE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "bar"
          }
        }, {
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
