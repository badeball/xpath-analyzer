/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var AxisSpecifier = require("../../lib/axis_specifier");

var ExprType = require("../../lib/expr_type");

var NodeType = require("../../lib/node_type");

var Step = require("../../lib/parsers/step");

describe("Step", function () {
  describe("parse()", function () {
    it("should parse steps not containing an axis", function () {
      var ast = Step.parse(new XPathLexer("foo"));

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.CHILD,
        test: {
          name: "foo"
        }
      });
    });

    it("should parse steps containing an axis", function () {
      var ast = Step.parse(new XPathLexer("parent::foo"));

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.PARENT,
        test: {
          name: "foo"
        }
      });
    });

    it("should throw upon unknown axis", function () {
      Assert.throws(function () {
        Step.parse(new XPathLexer("bar::foo"));
      });
    });

    it("should parse the abbreviated axis specifier @", function () {
      var ast = Step.parse(new XPathLexer("@foo"));

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.ATTRIBUTE,
        test: {
          name: "foo"
        }
      });
    });

    it("should parse the abbreviated axis specifier ..", function () {
      var ast = Step.parse(new XPathLexer(".."));

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.PARENT,
        test: {
          type: NodeType.NODE
        }
      });
    });

    it("should parse the abbreviated axis specifier .", function () {
      var ast = Step.parse(new XPathLexer("."));

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.SELF,
        test: {
          type: NodeType.NODE
        }
      });
    });

    it("should parse steps containing predicates", function () {
      var ast = Step.parse(new XPathLexer("*[1]"));

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.CHILD,
        test: {
          name: "*"
        },
        predicates: [{
          type: ExprType.NUMBER,
          number: 1
        }]
      });
    });
  });
});
