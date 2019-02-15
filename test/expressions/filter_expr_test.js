import * as Assert from "assert";

import XPathAnalyzer, {
  FILTER, FUNCTION_CALL, NUMBER
} from "../../lib/xpath_analyzer";

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
