import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { CHILD, DESCENDANT_OR_SELF } from "../../lib/axis_specifier";

import { FUNCTION_CALL, PATH, NODE_NAME_TEST, NODE_TYPE_TEST } from "../../lib/expr_type";

import { NODE } from "../../lib/node_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse filter expressions with path", function () {
      var ast = new XPathAnalyzer("id()//foo").parse();

      Assert.deepEqual(ast, {
        type: PATH,
        filter: {
          type: FUNCTION_CALL,
          name: "id"
        },
        steps: [{
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
