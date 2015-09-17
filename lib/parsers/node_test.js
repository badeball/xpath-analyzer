/* eslint-env node */

"use strict";

function NodeTest (lexer) {
  this.lexer = lexer;
}

module.exports = NodeTest;

var NodeType = require("../node_type");

NodeTest.prototype.parse = function () {
  if (this.lexer.peak() === "*") {
    this.lexer.next();

    return {
      name: "*"
    };
  }

  if (this.lexer.peak(1) === "(") {
    if (NodeType.isValidNodeType(this.lexer.peak())) {
      var test = {
        type: this.lexer.next()
      };

      this.lexer.next();

      if (this.lexer.peak() === ")") {
        this.lexer.next();
      } else {
        test.name = this.lexer.next();

        this.lexer.next();
      }

      return test;
    } else {
      throw new Error("Unexpected token " + this.lexer.peak());
    }
  }

  return {
    name: this.lexer.next()
  };
};
