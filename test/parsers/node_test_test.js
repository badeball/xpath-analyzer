/* eslint-env mocha, node */

"use strict";

var Assert = require("assert");

var XPathLexer = require("xpath-lexer");

var NodeType = require("../../lib/node_type");

var NodeTest = require("../../lib/parsers/node_test");

describe("NodeTest", function () {
  describe("parse()", function () {
    it("should parse node tests containing a name test", function () {
      var ast = NodeTest.parse(new XPathLexer("foo"));

      Assert.deepEqual(ast, {
        name: "foo"
      });
    });

    it("should parse node tests containing an abbreviated name test *", function () {
      var ast = NodeTest.parse(new XPathLexer("*"));

      Assert.deepEqual(ast, {
        name: "*"
      });
    });

    it("should parse node tests containing a type test", function () {
      var ast = NodeTest.parse(new XPathLexer("text()"));

      Assert.deepEqual(ast, {
        type: NodeType.TEXT
      });
    });

    it("should throw upon unknown node type", function () {
      Assert.throws(function () {
        NodeTest.parse(new XPathLexer("foo()"));
      });
    });
  });
});
