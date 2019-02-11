import Assert from "assert";

import XPathLexer from "xpath-lexer";

import { CHILD, DESCENDANT_OR_SELF } from "../../lib/axis_specifier";

import { RELATIVE_LOCATION_PATH, NODE_NAME_TEST, NODE_TYPE_TEST } from "../../lib/expr_type";

import { NODE } from "../../lib/node_type";

import * as Expr from "../../lib/parsers/expr";

import * as RelativeLocationPathExpr from "../../lib/parsers/relative_location_path";

describe("RelativeLocationPathExpr", function () {
  describe("parse()", function () {
    it("should parse relative location paths", function () {
      var ast = RelativeLocationPathExpr.parse(Expr, new XPathLexer("bar//foo"));

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
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
