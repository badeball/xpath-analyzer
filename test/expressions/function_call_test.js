import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { FUNCTION_CALL, LITERAL } from "../../lib/expr_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse function arguments", function () {
      var ast = new XPathAnalyzer("id('foo')").parse();

      Assert.deepEqual(ast, {
        type: FUNCTION_CALL,
        name: "id",
        args: [{
          type: LITERAL,
          string: "foo"
        }]
      });
    });

    it("should parse multiple function arguments", function () {
      var ast = new XPathAnalyzer("id('foo', 'bar')").parse();

      Assert.deepEqual(ast, {
        type: FUNCTION_CALL,
        name: "id",
        args: [{
          type: LITERAL,
          string: "foo"
        }, {
          type: LITERAL,
          string: "bar"
        }]
      });
    });
  });
});
