/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var AxisSpecifier = require("../../lib/axis_specifier");

var ExprType = require("../../lib/expr_type");

var NodeType = require("../../lib/node_type");

var PathExpr = require("../../lib/parsers/path_expr");

describe("PathExpr", function () {
  describe("parse()", function () {
    it("should parse filter expressions with path", function () {
      var ast = PathExpr.parse(new XPathLexer("id()//foo"));

      Assert.deepEqual(ast, {
        type: ExprType.PATH,
        filter: {
          type: ExprType.FUNCTION_CALL,
          name: "id"
        },
        steps: [{
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
