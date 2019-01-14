import XPathLexer from "xpath-lexer";

import { parse,  ExprNode } from "./parsers/expr";

export default class XPathAnalyzer {
  private lexer: XPathLexer;

  constructor(expression: string) {
    this.lexer = new XPathLexer(expression);
  }

  parse():  ExprNode {
    var ast = parse(this.lexer);

    if (this.lexer.empty()) {
      return ast;
    } else {
      throw new Error("Unexpected token at position " + this.lexer.position());
    }
  }
}

export * from "./axis_specifier";

export * from "./expr_type";

export * from "./function_name";

export * from "./node_type";
