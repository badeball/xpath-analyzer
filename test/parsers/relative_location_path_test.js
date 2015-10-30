/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var AxisSpecifier = require("../../lib/axis_specifier");

var ExprType = require("../../lib/expr_type");

var NodeType = require("../../lib/node_type");

var RelativeLocationPathExpr = require("../../lib/parsers/relative_location_path");

describe("RelativeLocationPathExpr", function () {
  describe("parse()", function () {
    it("should parse relative location paths", function () {
      var ast = new RelativeLocationPathExpr(new XPathLexer("bar//foo")).parse();

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
