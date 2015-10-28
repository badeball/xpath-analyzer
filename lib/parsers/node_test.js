/* eslint-env node */

"use strict";

var NodeType = require("../node_type");

module.exports = {
  parse: function (rootParser, lexer) {
    if (lexer.peak() === "*") {
      lexer.next();

      return {
        name: "*"
      };
    }

    if (lexer.peak(1) === "(") {
      if (NodeType.isValidNodeType(lexer.peak())) {
        var test = {
          type: lexer.next()
        };

        lexer.next();

        if (lexer.peak() === ")") {
          lexer.next();
        } else {
          test.name = lexer.next();

          lexer.next();
        }

        return test;
      } else {
        throw new Error("Unexpected token " + lexer.peak());
      }
    }

    return {
      name: lexer.next()
    };
  }
};
