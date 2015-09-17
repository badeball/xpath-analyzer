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
      var ast = new Step(new XPathLexer("foo")).parse();

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.CHILD,
        test: {
          name: "foo"
        }
      });
    });

    it("should parse steps containing an axis", function () {
      var ast = new Step(new XPathLexer("parent::foo")).parse();

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.PARENT,
        test: {
          name: "foo"
        }
      });
    });

    it("should throw upon unknown axis", function () {
      Assert.throws(function () {
        new Step(new XPathLexer("bar::foo")).parse();
      });
    });

    it("should parse the abbreviated axis specifier @", function () {
      var ast = new Step(new XPathLexer("@foo")).parse();

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.ATTRIBUTE,
        test: {
          name: "foo"
        }
      });
    });

    it("should parse the abbreviated axis specifier ..", function () {
      var ast = new Step(new XPathLexer("..")).parse();

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.PARENT,
        test: {
          type: NodeType.NODE
        }
      });
    });

    it("should parse the abbreviated axis specifier .", function () {
      var ast = new Step(new XPathLexer(".")).parse();

      Assert.deepEqual(ast, {
        axis: AxisSpecifier.SELF,
        test: {
          type: NodeType.NODE
        }
      });
    });

    it("should parse steps containing predicates", function () {
      var ast = new Step(new XPathLexer("*[1]")).parse();

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
