"use strict";

var NodeType = require("../node_type");

var NodeTypeValidator = require("../validators/node_type");

module.exports = {
  parse: function (rootParser, lexer) {
    if (lexer.peak() === "*") {
      lexer.next();

      return {
        name: "*"
      };
    }

    if (lexer.peak(1) === "(") {
      if (NodeTypeValidator.isValid(lexer.peak())) {
        var test = {
          type: lexer.next()
        };

        lexer.next();

        if (test.type === NodeType.PROCESSING_INSTRUCTION) {
          var token = lexer.peak(),
              ch = token && token[0];

          if (ch === "\"" || ch === "'") {
            test.name = lexer.next().slice(1, -1);
          } else {
            throw new Error("Invalid token at position " + lexer.position() + ", expected a literal");
          }
        }

        if (lexer.peak() !== ")") {
          throw new Error("Invalid token at position " + lexer.position() + ", expected closing parenthesis");
        } else {
          lexer.next();
        }

        return test;
      } else {
        throw new Error("Invalid node type at position " + lexer.position());
      }
    }

    return {
      name: lexer.next()
    };
  }
};
