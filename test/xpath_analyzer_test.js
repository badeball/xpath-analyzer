import * as Assert from "assert";

import XPathAnalyzer, {
  CHILD, DESCENDANT_OR_SELF, FOLLOWING,
  EQUALITY, FUNCTION_CALL, LITERAL, NUMBER, OR, PATH, RELATIVE_LOCATION_PATH, NODE_NAME_TEST, NODE_TYPE_TEST,
  NODE
} from "../lib/xpath_analyzer";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse nested & complex expressions", function () {
      var expression = "id('foo')//following::foo[count(bar/baz) = 1 or 5]";

      var ast = new XPathAnalyzer(expression).parse();

      Assert.deepEqual(ast, {
        type: PATH,
        filter: {
          type: FUNCTION_CALL,
          name: "id",
          args: [{
            type: LITERAL,
            string: "foo"
          }]
        },
        steps: [{
          axis: DESCENDANT_OR_SELF,
          test: {
            type: NODE_TYPE_TEST,
            name: NODE
          }
        }, {
          axis: FOLLOWING,
          test: {
            type: NODE_NAME_TEST,
            name: "foo"
          },
          predicates: [{
            type: OR,
            lhs: {
              type: EQUALITY,
              lhs: {
                type: FUNCTION_CALL,
                name: "count",
                args: [{
                  type: RELATIVE_LOCATION_PATH,
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
                      name: "baz"
                    }
                  }]
                }]
              },
              rhs: {
                type: NUMBER,
                number: 1
              }
            },
            rhs: {
              type: NUMBER,
              number: 5
            }
          }]
        }]
      });
    });
  });
});
