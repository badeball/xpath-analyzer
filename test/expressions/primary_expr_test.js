import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { FUNCTION_CALL, LITERAL, NUMBER } from "../../lib/expr_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse integers", function () {
      var ast = new XPathAnalyzer("123").parse();

      Assert.deepEqual(ast, {
        type: NUMBER,
        number: 123
      });
    });

    it("should parse floating numbers", function () {
      var ast = new XPathAnalyzer("123.123").parse();

      Assert.deepEqual(ast, {
        type: NUMBER,
        number: 123.123
      });
    });

    it("should parse literals", function () {
      var ast = new XPathAnalyzer("'foo'").parse();

      Assert.deepEqual(ast, {
        type: LITERAL,
        string: "foo"
      });
    });

    it("should parse groups", function () {
      var ast = new XPathAnalyzer("('foo')").parse();

      Assert.deepEqual(ast, {
        type: LITERAL,
        string: "foo"
      });
    });

    it("should parse function calls", function () {
      var ast = new XPathAnalyzer("id()").parse();

      Assert.deepEqual(ast, {
        type: FUNCTION_CALL,
        name: "id"
      });
    });
  });
});
