"use strict";

var Assert = require("assert");

var XPathAnalyzer = require("../lib/xpath_analyzer");

var AxisSpecifier = require("../lib/axis_specifier");

var ExprType = require("../lib/expr_type");

var NodeType = require("../lib/node_type");

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
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
