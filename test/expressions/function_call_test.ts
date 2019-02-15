import * as Assert from "assert";

import XPathAnalyzer, {
  FUNCTION_CALL, LITERAL
} from "../../lib/xpath_analyzer";

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
