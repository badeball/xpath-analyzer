import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { CHILD, DESCENDANT_OR_SELF } from "../../lib/axis_specifier";

import { RELATIVE_LOCATION_PATH, NODE_NAME_TEST, NODE_TYPE_TEST } from "../../lib/expr_type";

import { NODE } from "../../lib/node_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse relative location paths", function () {
      var ast = new XPathAnalyzer("bar//foo").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
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
