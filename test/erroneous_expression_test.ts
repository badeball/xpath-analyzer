import * as Assert from "assert";

import XPathAnalyzer from "../lib/xpath_analyzer";

function itShouldThrowUponExpression (expression: string, message: string) {
  describe("when given the erroneous expression \"" + expression + "\"", function () {
    it("should throw \"" + message + "\"", function () {
      Assert.throws(function () {
        new XPathAnalyzer(expression).parse();
      }, new Error(message));
    });
  });
}

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    itShouldThrowUponExpression("foo::*", "Invalid axis specifier at position 0");
    itShouldThrowUponExpression("/foo()", "Invalid node type at position 1");
    itShouldThrowUponExpression("foo()", "Invalid function at position 0");
    itShouldThrowUponExpression("/comment(/foo)", "Invalid token at position 9, expected closing parenthesis");
    itShouldThrowUponExpression("(/foo", "Invalid token at position 5, expected closing parenthesis");
    itShouldThrowUponExpression("/foo[0", "Invalid token at position 6, expected closing bracket");
    itShouldThrowUponExpression("(/foo) 1", "Unexpected token at position 7");
  });
});
