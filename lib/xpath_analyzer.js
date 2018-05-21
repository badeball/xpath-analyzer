import XPathLexer from "xpath-lexer";

import * as Expr from "./parsers/expr";

export default function XPathAnalyzer (expression) {
  this.lexer = new XPathLexer(expression);
}

XPathAnalyzer.prototype.parse = function () {
  var ast = Expr.parse(this.lexer);

  if (this.lexer.empty()) {
    return ast;
  } else {
    throw new Error("Unexpected token at position " + this.lexer.position());
  }
};

export * from "./axis_specifier";

export * from "./expr_type";

export * from "./node_type";
