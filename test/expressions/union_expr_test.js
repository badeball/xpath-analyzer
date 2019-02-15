import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { NUMBER, UNION } from "../../lib/expr_type";

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
