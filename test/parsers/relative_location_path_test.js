/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XRelativeLocationPathLexer = require("xpath-lexer");

var AxisSpecifier = require("../../lib/axis_specifier");

var ExprType = require("../../lib/expr_type");

var NodeType = require("../../lib/node_type");

var RelativeLocationPathExpr = require("../../lib/parsers/or_expr");

describe("RelativeLocationPathExpr", function () {
  describe("parse()", function () {
    it("should parse relative location paths", function () {
      var ast = new RelativeLocationPathExpr(new XRelativeLocationPathLexer("bar//foo")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.RELATIVE_LOCATION_PATH,
        steps: [{
          axis: AxisSpecifier.CHILD,
          test: {
            name: "bar"
          }
        }, {
          axis: AxisSpecifier.DESCENDANT_OR_SELF,
          test: {
            type: NodeType.NODE
          }
        }, {
          axis: AxisSpecifier.CHILD,
          test: {
            name: "foo"
          }
        }]
      });
    });
  });
});