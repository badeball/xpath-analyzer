import * as Assert from "assert";

import XPathAnalyzer from "../../lib/xpath_analyzer";

import { NEGATION, NUMBER } from "../../lib/expr_type";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse negation expressions", function () {
      var ast = new XPathAnalyzer("-1").parse();

      Assert.deepEqual(ast, {
        type: NEGATION,
        lhs: {
          type: NUMBER,
          number: 1
        }
      });
    });
  });
});
