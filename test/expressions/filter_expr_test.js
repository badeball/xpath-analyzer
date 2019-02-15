import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { FILTER, FUNCTION_CALL, NUMBER } from "../../lib/expr_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse primary expressions with predicates", function () {
      var ast = new XPathAnalyzer("id()[1]").parse();

      Assert.deepEqual(ast, {
        type: FILTER,
        primary: {
          type: FUNCTION_CALL,
          name: "id"
        },
        predicates: [{
          type: NUMBER,
          number: 1
        }]
      });
    });
  });
});
