import * as Assert from "assert";

import XPathAnalyzer, {
  NUMBER, UNION
} from "../../lib/xpath_analyzer";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse union expressions", function () {
      var ast = new XPathAnalyzer("1 | 2").parse();

      Assert.deepEqual(ast, {
        type: UNION,
        lhs: {
          type: NUMBER,
          number: 1
        },
        rhs: {
          type: NUMBER,
          number: 2
        }
      });
    });
  });
});
