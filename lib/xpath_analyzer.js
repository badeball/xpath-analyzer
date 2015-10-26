/* eslint-env node */

"use strict";

function XPathAnalyzer (expression) {
  this.lexer = new XPathLexer(expression);
}

module.exports = XPathAnalyzer;

var XPathLexer = require("xpath-lexer");

var AxisSpecifier = require("./axis_specifier");

var ExprType = require("./expr_type");

var NodeType = require("./node_type");

var Expr = require("./parsers/expr");

XPathAnalyzer.AxisSpecifier = AxisSpecifier;

XPathAnalyzer.ExprType = ExprType;

XPathAnalyzer.NodeType = NodeType;

XPathAnalyzer.prototype.parse = function () {
  var ast = Expr.parse(this.lexer);

  if (this.lexer.empty()) {
    return ast;
  } else {
    throw new Error("Unexpected token " + this.lexer.peak());
  }
};
