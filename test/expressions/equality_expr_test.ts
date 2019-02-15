import * as Assert from "assert";

import XPathAnalyzer, {
  EQUALITY, INEQUALITY, NUMBER
} from "../../lib/xpath_analyzer";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse equality expressions", function () {
      var ast = new XPathAnalyzer("1 = 2").parse();

      Assert.deepEqual(ast, {
        type: EQUALITY,
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

    it("should parse inequality expressions", function () {
      var ast = new XPathAnalyzer("1 != 2").parse();

      Assert.deepEqual(ast, {
        type: INEQUALITY,
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
