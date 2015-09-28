/* eslint-env node */

"use strict";

var XPathLexer = require("xpath-lexer");

var AxisSpecifier = require("./axis_specifier");

var ExprType = require("./expr_type");

var NodeType = require("./node_type");

var Expr = require("./parsers/expr");

function XPathAnalyzer (expression) {
  this.lexer = new XPathLexer(expression);
}

XPathAnalyzer.AxisSpecifier = AxisSpecifier;

XPathAnalyzer.ExprType = ExprType;

XPathAnalyzer.NodeType = NodeType;

XPathAnalyzer.prototype.parse = function () {
  var ast = new Expr(this.lexer).parse();

  if (this.lexer.empty()) {
    return ast;
  } else {
    throw new Error("Unexpected token " + this.lexer.peak());
  }
};

module.exports = XPathAnalyzer;
