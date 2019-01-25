import XPathLexer from "xpath-lexer";

import * as Expr from "./parsers/expr";

export default class XPathAnalyzer {
  constructor(expression) {
    this.lexer = new XPathLexer(expression);
  }

  parse() {
    var ast = Expr.parse(this.lexer);

    if (this.lexer.empty()) {
      return ast;
    } else {
      throw new Error("Unexpected token at position " + this.lexer.position());
    }
  }
}

export * from "./axis_specifier";

export * from "./expr_type";

export * from "./node_type";
