import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { DIVISIONAL, MODULUS, MULTIPLICATIVE, NUMBER } from "../../lib/expr_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse multiplicative expressions", function () {
      var ast = new XPathAnalyzer("1 * 2").parse();

      Assert.deepEqual(ast, {
        type: MULTIPLICATIVE,
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

    it("should parse divisional expressions", function () {
      var ast = new XPathAnalyzer("1 div 2").parse();

      Assert.deepEqual(ast, {
        type: DIVISIONAL,
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

    it("should parse modulus expressions", function () {
      var ast = new XPathAnalyzer("1 mod 2").parse();

      Assert.deepEqual(ast, {
        type: MODULUS,
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
