import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { NUMBER, OR } from "../../lib/expr_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse or expressions", function () {
      var ast = new XPathAnalyzer("1 or 2").parse();

      Assert.deepEqual(ast, {
        type: OR,
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
