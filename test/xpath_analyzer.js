import Assert from "assert";

import XPathAnalyzer from "../lib/xpath_analyzer";

import { CHILD, DESCENDANT_OR_SELF, FOLLOWING } from "../lib/axis_specifier";

import { EQUALITY, FUNCTION_CALL, LITERAL, NUMBER, OR, PATH, RELATIVE_LOCATION_PATH, NODE_NAME_TEST, NODE_TYPE_TEST } from "../lib/expr_type";

import { NODE } from "../lib/node_type";

function itShouldThrowUponExpression (expression, message) {
  describe("when given the erroneous expression \"" + expression + "\"", function () {
    it("should throw \"" + message + "\"", function () {
      Assert.throws(function () {
        new XPathAnalyzer(expression).parse();
      }, new RegExp(message));
    });
  });
}

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    itShouldThrowUponExpression("/bar::foo", "Invalid axis specifier at position 1");
    itShouldThrowUponExpression("/child::foo()", "Invalid node type at position 8");
    itShouldThrowUponExpression("/comment(/foo", "Invalid token at position 9, expected closing parenthesis");
    itShouldThrowUponExpression("/comment('foo')", "Invalid token at position 9, expected closing parenthesis");
    itShouldThrowUponExpression("(/foo", "Invalid token at position 5, expected closing parenthesis");
    itShouldThrowUponExpression("/foo[0", "Invalid token at position 6, expected closing bracket");
    itShouldThrowUponExpression("(/foo) 1", "Unexpected token at position 7");

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
