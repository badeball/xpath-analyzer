import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

export type PredicateNode = ExprNode;

export function parse (rootParser: ExprParser, lexer: XPathLexer): PredicateNode {
  lexer.next();

  var predicate = rootParser.parse(lexer);

  if (lexer.peak() === "]") {
    lexer.next();
  } else {
    throw new Error("Invalid token at position " + lexer.position() + ", expected closing bracket");
  }

  return predicate;
}
