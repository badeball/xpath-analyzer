/* eslint-env node */

"use strict";

var AxisSpecifier = require("./axis_specifier");

var ExprType = require("./expr_type");

var NodeType = require("./node_type");

var Expr = require("./parsers/expr");

function XPathParser (lexer) {
  this.lexer = lexer;
}

XPathParser.AxisSpecifier = AxisSpecifier;

XPathParser.ExprType = ExprType;

XPathParser.NodeType = NodeType;

XPathParser.prototype.parse = function () {
  var ast = new Expr(this.lexer).parse();

  if (this.lexer.empty()) {
    return ast;
  } else {
    throw new Error("Unexpected token " + this.lexer.peak());
  }
};

module.exports = XPathParser;