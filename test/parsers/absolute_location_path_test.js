/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XAbsoluteLocationPathLexer = require("xpath-lexer");

var AxisSpecifier = require("../../lib/axis_specifier");

var ExprType = require("../../lib/expr_type");

var NodeType = require("../../lib/node_type");

var AbsoluteLocationPathExpr = require("../../lib/parsers/or_expr");

describe("AbsoluteLocationPathExpr", function () {
  describe("parse()", function () {
    it("should parse the trivial absolute location path", function () {
      var ast = new AbsoluteLocationPathExpr(new XAbsoluteLocationPathLexer("/")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.ABSOLUTE_LOCATION_PATH,
        steps: []
      });
    });

    it("should parse more complex absolute location paths", function () {
      var ast = new AbsoluteLocationPathExpr(new XAbsoluteLocationPathLexer("/bar//foo")).parse();

      Assert.deepEqual(ast, {
        type: ExprType.ABSOLUTE_LOCATION_PATH,
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
