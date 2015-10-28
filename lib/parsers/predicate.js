/* eslint-env node */

"use strict";

module.exports = {
  parse: function (rootParser, lexer) {
    lexer.next();

    var predicate = rootParser.parse(lexer);

    if (lexer.next() !== "]") {
      throw new Error("Unclosed brackets");
    }

    return predicate;
  }
};
