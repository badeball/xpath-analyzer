import * as Assert from "assert";

import XPathAnalyzer, {
  GREATER_THAN, GREATER_THAN_OR_EQUAL, LESS_THAN, LESS_THAN_OR_EQUAL, NUMBER
} from "../../lib/xpath_analyzer";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse less-than expressions", function () {
      var ast = new XPathAnalyzer("1 < 2").parse();

      Assert.deepEqual(ast, {
        type: LESS_THAN,
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

    it("should parse greater-than expressions", function () {
      var ast = new XPathAnalyzer("1 > 2").parse();

      Assert.deepEqual(ast, {
        type: GREATER_THAN,
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

    it("should parse less-than-or-equal expressions", function () {
      var ast = new XPathAnalyzer("1 <= 2").parse();

      Assert.deepEqual(ast, {
        type: LESS_THAN_OR_EQUAL,
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

    it("should parse greater-than-or-equal expressions", function () {
      var ast = new XPathAnalyzer("1 >= 2").parse();

      Assert.deepEqual(ast, {
        type: GREATER_THAN_OR_EQUAL,
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
