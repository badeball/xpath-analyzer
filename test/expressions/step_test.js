import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { ATTRIBUTE, CHILD, PARENT, SELF } from "../../lib/axis_specifier";

import { NUMBER, NODE_NAME_TEST, NODE_TYPE_TEST, RELATIVE_LOCATION_PATH } from "../../lib/expr_type";

import { NODE } from "../../lib/node_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse steps not containing an axis", function () {
      var ast = new XPathAnalyzer("foo").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "foo"
          }
        }]
      });
    });

    it("should parse steps containing an axis", function () {
      var ast = new XPathAnalyzer("parent::foo").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: PARENT,
          test: {
            type: NODE_NAME_TEST,
            name: "foo"
          }
        }]
      });
    });

    it("should throw upon unknown axis", function () {
      Assert.throws(function () {
        new XPathAnalyzer("bar::foo").parse();
      });
    });

    it("should parse the abbreviated axis specifier @", function () {
      var ast = new XPathAnalyzer("@foo").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: ATTRIBUTE,
          test: {
            type: NODE_NAME_TEST,
            name: "foo"
          }
        }]
      });
    });

    it("should parse the abbreviated axis specifier ..", function () {
      var ast = new XPathAnalyzer("..").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: PARENT,
          test: {
            type: NODE_TYPE_TEST,
            name: NODE
          }
        }]
      });
    });

    it("should parse the abbreviated axis specifier .", function () {
      var ast = new XPathAnalyzer(".").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: SELF,
          test: {
            type: NODE_TYPE_TEST,
            name: NODE
          }
        }]
      });
    });

    it("should parse steps containing predicates", function () {
      var ast = new XPathAnalyzer("*[1]").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "*"
          },
          predicates: [{
            type: NUMBER,
            number: 1
          }]
        }]
      });
    });
  });
});
