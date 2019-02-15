import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { ADDITIVE, NUMBER, SUBTRACTIVE } from "../../lib/expr_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse additive expressions", function () {
      var ast = new XPathAnalyzer("1 + 2").parse();

      Assert.deepEqual(ast, {
        type: ADDITIVE,
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

    it("should parse subtractive expressions", function () {
      var ast = new XPathAnalyzer("1 - 2").parse();

      Assert.deepEqual(ast, {
        type: SUBTRACTIVE,
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
