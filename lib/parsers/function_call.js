import { FUNCTION_CALL } from "../expr_type";

export function parse (rootParser, lexer) {
  var functionCall = {
    type: FUNCTION_CALL,
    name: lexer.next()
  };

  lexer.next();

  if (lexer.peak() === ")") {
    lexer.next();
  } else {
    functionCall.args = [];

    while (lexer.peak() !== ")") {
      functionCall.args.push(rootParser.parse(lexer));

      if (lexer.peak() === ",") {
        lexer.next();
      }
    }

    lexer.next();
  }

  return functionCall;
}
