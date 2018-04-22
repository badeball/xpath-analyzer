"use strict";

var Assert = require("assert");

var XPathAnalyzer = require("../lib/xpath_analyzer");

var AxisSpecifier = require("../lib/axis_specifier");

var ExprType = require("../lib/expr_type");

var NodeType = require("../lib/node_type");

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
        type: ExprType.PATH,
        filter: {
          type: ExprType.FUNCTION_CALL,
          name: "id",
          args: [{
            type: ExprType.LITERAL,
            string: "foo"
          }]
        },
        steps: [{
          axis: AxisSpecifier.DESCENDANT_OR_SELF,
          test: {
            type: NodeType.NODE
          }
        }, {
          axis: AxisSpecifier.FOLLOWING,
          test: {
            name: "foo"
          },
          predicates: [{
            type: ExprType.OR,
            lhs: {
              type: ExprType.EQUALITY,
              lhs: {
                type: ExprType.FUNCTION_CALL,
                name: "count",
                args: [{
                  type: ExprType.RELATIVE_LOCATION_PATH,
                  steps: [{
                    axis: AxisSpecifier.CHILD,
                    test: {
                      name: "bar"
                    }
                  }, {
                    axis: AxisSpecifier.CHILD,
                    test: {
                      name: "baz"
                    }
                  }]
                }]
              },
              rhs: {
                type: ExprType.NUMBER,
                number: 1
              }
            },
            rhs: {
              type: ExprType.NUMBER,
              number: 5
            }
          }]
        }]
      });
    });
  });
});
