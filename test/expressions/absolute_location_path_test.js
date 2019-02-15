import * as Assert from "assert";

import XPathAnalyzer, {
  CHILD, DESCENDANT_OR_SELF,
  ABSOLUTE_LOCATION_PATH, NODE_NAME_TEST, NODE_TYPE_TEST,
  NODE
} from "../../lib/xpath_analyzer";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse the trivial absolute location path without steps", function () {
      var ast = new XPathAnalyzer("/").parse();

      Assert.deepEqual(ast, {
        type: ABSOLUTE_LOCATION_PATH,
        steps: []
      });
    });

    it("should parse absolute location paths with steps", function () {
      var ast = new XPathAnalyzer("/bar/foo").parse();

      Assert.deepEqual(ast, {
        type: ABSOLUTE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "bar"
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

    it("should parse absolute location paths with steps (descendant)", function () {
      var ast = new XPathAnalyzer("/bar//foo").parse();

      Assert.deepEqual(ast, {
        type: ABSOLUTE_LOCATION_PATH,
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
