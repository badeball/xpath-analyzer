import * as Assert from "assert";

import XPathAnalyzer, {
  CHILD, DESCENDANT_OR_SELF,
  FUNCTION_CALL, PATH, NODE_NAME_TEST, NODE_TYPE_TEST,
  NODE
} from "../../lib/xpath_analyzer";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse filter expressions with path", function () {
      var ast = new XPathAnalyzer("id()//foo").parse();

      Assert.deepEqual(ast, {
        type: PATH,
        filter: {
          type: FUNCTION_CALL,
          name: "id",
          args: []
        },
        steps: [{
          axis: DESCENDANT_OR_SELF,
          test: {
            type: NODE_TYPE_TEST,
            name: NODE
          },
          predicates: []
        }, {
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "foo"
          },
          predicates: []
        }]
      });
    });
  });
});
