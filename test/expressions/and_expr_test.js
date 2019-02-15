import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { AND, NUMBER } from "../../lib/expr_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse or expressions", function () {
      var ast = new XPathAnalyzer("1 and 2").parse();

      Assert.deepEqual(ast, {
        type: AND,
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
