import XPathLexer from 'xpath-lexer';

const ABSOLUTE_LOCATION_PATH = "absolute-location-path";
const ADDITIVE = "additive";
const AND = "and";
const DIVISIONAL = "divisional";
const EQUALITY = "equality";
const FILTER = "filter";
const FUNCTION_CALL = "function-call";
const GREATER_THAN = "greater-than";
const GREATER_THAN_OR_EQUAL = "greater-than-or-equal";
const INEQUALITY = "inequality";
const LESS_THAN = "less-than";
const LESS_THAN_OR_EQUAL = "less-than-or-equal";
const LITERAL = "literal";
const MODULUS = "modulus";
const MULTIPLICATIVE = "multiplicative";
const NEGATION = "negation";
const NUMBER = "number";
const OR = "or";
const PATH = "path";
const RELATIVE_LOCATION_PATH = "relative-location-path";
const SUBTRACTIVE = "subtractive";
const UNION = "union";

const ANCESTOR = "ancestor";
const ANCESTOR_OR_SELF = "ancestor-or-self";
const ATTRIBUTE = "attribute";
const CHILD = "child";
const DESCENDANT = "descendant";
const DESCENDANT_OR_SELF = "descendant-or-self";
const FOLLOWING = "following";
const FOLLOWING_SIBLING = "following-sibling";
const NAMESPACE = "namespace";
const PARENT = "parent";
const PRECEDING = "preceding";
const PRECEDING_SIBLING = "preceding-sibling";
const SELF = "self";

const AXES = [
  ANCESTOR,
  ANCESTOR_OR_SELF,
  ATTRIBUTE,
  CHILD,
  DESCENDANT,
  DESCENDANT_OR_SELF,
  FOLLOWING,
  FOLLOWING_SIBLING,
  NAMESPACE,
  PARENT,
  PRECEDING,
  PRECEDING_SIBLING,
  SELF
];

const COMMENT = "comment";
const NODE = "node";
const PROCESSING_INSTRUCTION = "processing-instruction";
const TEXT = "text";

const NODE_TYPES = [
  COMMENT,
  NODE,
  PROCESSING_INSTRUCTION,
  TEXT
];

function parse (rootParser, lexer) {
  lexer.next();

  var predicate = rootParser.parse(lexer);

  if (lexer.peak() === "]") {
    lexer.next();
  } else {
    throw new Error("Invalid token at position " + lexer.position() + ", expected closing bracket");
  }

  return predicate;
}

function isValid (type) {
  return NODE_TYPES.includes(type);
}

function parse$1 (rootParser, lexer) {
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

function parse$2 (rootParser, lexer) {
  var token = lexer.peak(),
      ch = token && token[0];

  if (ch === "(") {
    lexer.next();

    var expr = rootParser.parse(lexer);

    if (lexer.peak() === ")") {
      lexer.next();
    } else {
      throw new Error("Invalid token at position " + lexer.position() + ", expected closing parenthesis");
    }

    return expr;
  }

  if (ch === "\"" || ch === "'") {
    lexer.next();

    return {
      type: LITERAL,
      string: token.slice(1, -1)
    };
  }

  if (ch === "$") {
    throw Error("Variable reference are not implemented");
  }

  if (/^\d+$/.test(token) || /^(\d+)?\.\d+$/.test(token)) {
    lexer.next();

    return {
      type: NUMBER,
      number: parseFloat(token)
    };
  }

  if (lexer.peak(1) === "(" && !isValid(lexer.peak())) {
    return parse$1(rootParser, lexer);
  }
}

function isValidOp (lexer) {
  var token = lexer.peak(),
      ch = token && token[0];

  return ch === "(" ||
    ch === "\"" ||
    ch === "'" ||
    ch === "$" ||
    /^\d+$/.test(token) ||
    /^(\d+)?\.\d+$/.test(token) ||
    (lexer.peak(1) === "(" && !isValid(lexer.peak()));
}

function parse$3 (rootParser, lexer) {
  var primary = parse$2(rootParser, lexer);

  if (lexer.peak() === "[") {
    var filter = {
      type: FILTER,
      primary: primary,
      predicates: []
    };

    while (lexer.peak() === "[") {
      filter.predicates.push(parse(rootParser, lexer));
    }

    return filter;
  } else {
    return primary;
  }
}

function isValidOp$1 (lexer) {
  return isValidOp(lexer);
}

function isValid$1 (specifier) {
  return AXES.includes(specifier);
}

function parse$4 (rootParser, lexer) {
  if (lexer.peak() === "*") {
    lexer.next();

    return {
      name: "*"
    };
  }

  if (lexer.peak(1) === "(") {
    if (isValid(lexer.peak())) {
      var test = {
        type: lexer.next()
      };

      lexer.next();

      if (test.type === PROCESSING_INSTRUCTION) {
        var token = lexer.peak(),
            ch = token && token[0];

        if (ch === "\"" || ch === "'") {
          test.name = lexer.next().slice(1, -1);
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

function parse$5 (rootParser, lexer) {
  var step = {};

  if (lexer.peak(1) === "::") {
    if (isValid$1(lexer.peak())) {
      step.axis = lexer.next();

      lexer.next();
    } else {
      throw new Error("Invalid axis specifier at position " + lexer.position());
    }
  } else if (lexer.peak() === "@") {
    lexer.next();

    step.axis = ATTRIBUTE;
  } else if (lexer.peak() === "..") {
    lexer.next();

    return {
      axis: PARENT,
      test: {
        type: NODE
      }
    };
  } else if (lexer.peak() === ".") {
    lexer.next();

    return {
      axis: SELF,
      test: {
        type: NODE
      }
    };
  } else {
    step.axis = CHILD;
  }

  step.test = parse$4(rootParser, lexer);

  while (lexer.peak() === "[") {
    if (!step.predicates) {
      step.predicates = [];
    }

    step.predicates.push(parse(rootParser, lexer));
  }

  return step;
}

function isValidOp$2 (lexer) {
  var token = lexer.peak();

  if (typeof token !== "string") {
    return false;
  }

  return token === "." ||
    token === ".." ||
    token === "@" ||
    token === "*" ||
    /^\w/.test(token);
}

function parse$6 (rootParser, lexer) {
  var absoluteLocation = {
    type: ABSOLUTE_LOCATION_PATH
  };

  while (!lexer.empty() && lexer.peak()[0] === "/") {
    if (!absoluteLocation.steps) {
      absoluteLocation.steps = [];
    }

    if (lexer.next() === "/") {
      if (isValidOp$2(lexer)) {
        absoluteLocation.steps.push(parse$5(rootParser, lexer));
      }
    } else {
      absoluteLocation.steps.push({
        axis: DESCENDANT_OR_SELF,
        test: {
          type: NODE
        }
      });

      absoluteLocation.steps.push(parse$5(rootParser, lexer));
    }
  }

  return absoluteLocation;
}

function parse$7 (rootParser, lexer) {
  var relativeLocation = {
    type: RELATIVE_LOCATION_PATH
  };

  relativeLocation.steps = [parse$5(rootParser, lexer)];

  while (!lexer.empty() && lexer.peak()[0] === "/") {
    if (lexer.next() === "//") {
      relativeLocation.steps.push({
        axis: DESCENDANT_OR_SELF,
        test: {
          type: NODE
        }
      });
    }

    relativeLocation.steps.push(parse$5(rootParser, lexer));
  }

  return relativeLocation;
}

function parse$8 (rootParser, lexer) {
  var token = lexer.peak(),
      ch = token && token[0];

  if (ch === "/") {
    return parse$6(rootParser, lexer);
  } else {
    return parse$7(rootParser, lexer);
  }
}

function parse$9 (rootParser, lexer) {
  if (isValidOp$1(lexer)) {
    var filter = parse$3(rootParser, lexer);

    if (!lexer.empty() && lexer.peak()[0] === "/") {
      var path = {
        type: PATH,
        filter: filter,
        steps: []
      };

      while (!lexer.empty() && lexer.peak()[0] === "/") {
        if (lexer.next() === "//") {
          path.steps.push({
            axis: DESCENDANT_OR_SELF,
            test: {
              type: NODE
            }
          });
        }

        path.steps.push(parse$5(rootParser, lexer));
      }

      return path;
    } else {
      return filter;
    }
  } else {
    return parse$8(rootParser, lexer);
  }
}

function parse$a (rootParser, lexer) {
  var lhs = parse$9(rootParser, lexer);

  if (lexer.peak() === "|") {
    lexer.next();

    var rhs = parse$a(rootParser, lexer);

    return {
      type: UNION,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}

function parse$b (rootParser, lexer) {
  if (lexer.peak() === "-") {
    lexer.next();

    return {
      type: NEGATION,
      lhs: parse$b(rootParser, lexer)
    };
  } else {
    return parse$a(rootParser, lexer);
  }
}

function parse$c (rootParser, lexer) {
  var lhs = parse$b(rootParser, lexer);

  var multiplicativeTypes = {
    "*": MULTIPLICATIVE,
    "div": DIVISIONAL,
    "mod": MODULUS
  };

  if (multiplicativeTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = parse$c(rootParser, lexer);

    return {
      type: multiplicativeTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}

function parse$d (rootParser, lexer) {
  var lhs = parse$c(rootParser, lexer);

  var additiveTypes = {
    "+": ADDITIVE,
    "-": SUBTRACTIVE
  };

  if (additiveTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = parse$d(rootParser, lexer);

    return {
      type: additiveTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}

function parse$e (rootParser, lexer) {
  var lhs = parse$d(rootParser, lexer);

  var relationalTypes = {
    "<": LESS_THAN,
    ">": GREATER_THAN,
    "<=": LESS_THAN_OR_EQUAL,
    ">=": GREATER_THAN_OR_EQUAL
  };

  if (relationalTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = parse$e(rootParser, lexer);

    return {
      type: relationalTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}

function parse$f (rootParser, lexer) {
  var lhs = parse$e(rootParser, lexer);

  var equalityTypes = {
    "=": EQUALITY,
    "!=": INEQUALITY
  };

  if (equalityTypes.hasOwnProperty(lexer.peak())) {
    var op = lexer.next();

    var rhs = parse$f(rootParser, lexer);

    return {
      type: equalityTypes[op],
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}

function parse$g (rootParser, lexer) {
  var lhs = parse$f(rootParser, lexer);

  if (lexer.peak() === "and") {
    lexer.next();

    var rhs = parse$g(rootParser, lexer);

    return {
      type: AND,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}

function parse$h (rootParser, lexer) {
  var lhs = parse$g(rootParser, lexer);

  if (lexer.peak() === "or") {
    lexer.next();

    var rhs = parse$h(rootParser, lexer);

    return {
      type: OR,
      lhs: lhs,
      rhs: rhs
    };
  } else {
    return lhs;
  }
}

function parse$i (lexer) {
  return parse$h({ parse: parse$i }, lexer);
}

function XPathAnalyzer (expression) {
  this.lexer = new XPathLexer(expression);
}

XPathAnalyzer.prototype.parse = function () {
  var ast = parse$i(this.lexer);

  if (this.lexer.empty()) {
    return ast;
  } else {
    throw new Error("Unexpected token at position " + this.lexer.position());
  }
};

export default XPathAnalyzer;
export { ANCESTOR, ANCESTOR_OR_SELF, ATTRIBUTE, CHILD, DESCENDANT, DESCENDANT_OR_SELF, FOLLOWING, FOLLOWING_SIBLING, NAMESPACE, PARENT, PRECEDING, PRECEDING_SIBLING, SELF, AXES, ABSOLUTE_LOCATION_PATH, ADDITIVE, AND, DIVISIONAL, EQUALITY, FILTER, FUNCTION_CALL, GREATER_THAN, GREATER_THAN_OR_EQUAL, INEQUALITY, LESS_THAN, LESS_THAN_OR_EQUAL, LITERAL, MODULUS, MULTIPLICATIVE, NEGATION, NUMBER, OR, PATH, RELATIVE_LOCATION_PATH, SUBTRACTIVE, UNION, COMMENT, NODE, PROCESSING_INSTRUCTION, TEXT, NODE_TYPES };
