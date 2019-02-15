import * as Assert from "assert";

import XPathAnalyzer, {
  NODE_NAME_TEST, NODE_TYPE_TEST, PROCESSING_INSTRUCTION_TEST, RELATIVE_LOCATION_PATH,
  TEXT,
  CHILD
} from "../../lib/xpath_analyzer";

describe("XPathAnalyzer", function () {
  describe("parse()", function () {
    it("should parse node tests containing a name test", function () {
      var ast = new XPathAnalyzer("foo").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "foo"
          }
        }]
      });
    });

    it("should parse node tests containing an abbreviated name test *", function () {
      var ast = new XPathAnalyzer("*").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: NODE_NAME_TEST,
            name: "*"
          }
        }]
      });
    });

    it("should parse node tests containing a type test", function () {
      var ast = new XPathAnalyzer("text()").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: NODE_TYPE_TEST,
            name: TEXT
          }
        }]
      });
    });

    it("should parse node tests containing a type test with a literal", function () {
      var ast = new XPathAnalyzer("processing-instruction('foo')").parse();

      Assert.deepEqual(ast, {
        type: RELATIVE_LOCATION_PATH,
        steps: [{
          axis: CHILD,
          test: {
            type: PROCESSING_INSTRUCTION_TEST,
            name: "foo"
          }
        }]
      });
    });
  });
});
