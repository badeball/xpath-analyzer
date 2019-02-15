import * as Assert from "assert";

import XPathAnalyzer, {
  ATTRIBUTE, CHILD, PARENT, SELF,
  NUMBER, NODE_NAME_TEST, NODE_TYPE_TEST, RELATIVE_LOCATION_PATH,
  NODE
} from "../../lib/xpath_analyzer";

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
