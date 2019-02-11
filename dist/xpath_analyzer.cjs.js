'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var XPathLexer = _interopDefault(require('xpath-lexer'));

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
const NODE_NAME_TEST = "node-name-test";
const NODE_TYPE_TEST = "node-type-test";
const PROCESSING_INSTRUCTION_TEST = "processing-instruction-test";

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

const COMMENT = "comment";
const NODE = "node";
const PROCESSING_INSTRUCTION = "processing-instruction";
const TEXT = "text";

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
  return type == COMMENT ||
    type == NODE ||
    type == PROCESSING_INSTRUCTION ||
    type == TEXT;
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
  return specifier == ANCESTOR ||
    specifier == ANCESTOR_OR_SELF ||
    specifier == ATTRIBUTE ||
    specifier == CHILD ||
    specifier == DESCENDANT ||
    specifier == DESCENDANT_OR_SELF ||
    specifier == FOLLOWING ||
    specifier == FOLLOWING_SIBLING ||
    specifier == NAMESPACE ||
    specifier == PARENT ||
    specifier == PRECEDING ||
    specifier == PRECEDING_SIBLING ||
    specifier == SELF;
}

function parse$4 (rootParser, lexer) {
  if (lexer.peak() === "*") {
    lexer.next();

    return {
      type: NODE_NAME_TEST,
      name: "*"
    };
  }

  if (lexer.peak(1) === "(") {
    if (isValid(lexer.peak())) {
      var test, type = lexer.next();

      lexer.next();

      if (type === PROCESSING_INSTRUCTION) {
        var token = lexer.peak(),
            ch = token && token[0];

        test = {
          type: PROCESSING_INSTRUCTION_TEST,
          name: (ch === "\"" || ch === "'") ? lexer.next().slice(1, -1) : undefined
        };
      } else {
        test = {
          type: NODE_TYPE_TEST,
          name: type
        };
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
    type: NODE_NAME_TEST,
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
        type: NODE_TYPE_TEST,
        name: NODE
      }
    };
  } else if (lexer.peak() === ".") {
    lexer.next();

    return {
      axis: SELF,
      test: {
        type: NODE_TYPE_TEST,
        name: NODE
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
          type: NODE_TYPE_TEST,
          name: NODE
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
          type: NODE_TYPE_TEST,
          name: NODE
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
              type: NODE_TYPE_TEST,
              name: NODE
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

class XPathAnalyzer {
  constructor(expression) {
    this.lexer = new XPathLexer(expression);
  }

  parse() {
    var ast = parse$i(this.lexer);

    if (this.lexer.empty()) {
      return ast;
    } else {
      throw new Error("Unexpected token at position " + this.lexer.position());
    }
  }
}

exports.default = XPathAnalyzer;
exports.ANCESTOR = ANCESTOR;
exports.ANCESTOR_OR_SELF = ANCESTOR_OR_SELF;
exports.ATTRIBUTE = ATTRIBUTE;
exports.CHILD = CHILD;
exports.DESCENDANT = DESCENDANT;
exports.DESCENDANT_OR_SELF = DESCENDANT_OR_SELF;
exports.FOLLOWING = FOLLOWING;
exports.FOLLOWING_SIBLING = FOLLOWING_SIBLING;
exports.NAMESPACE = NAMESPACE;
exports.PARENT = PARENT;
exports.PRECEDING = PRECEDING;
exports.PRECEDING_SIBLING = PRECEDING_SIBLING;
exports.SELF = SELF;
exports.ABSOLUTE_LOCATION_PATH = ABSOLUTE_LOCATION_PATH;
exports.ADDITIVE = ADDITIVE;
exports.AND = AND;
exports.DIVISIONAL = DIVISIONAL;
exports.EQUALITY = EQUALITY;
exports.FILTER = FILTER;
exports.FUNCTION_CALL = FUNCTION_CALL;
exports.GREATER_THAN = GREATER_THAN;
exports.GREATER_THAN_OR_EQUAL = GREATER_THAN_OR_EQUAL;
exports.INEQUALITY = INEQUALITY;
exports.LESS_THAN = LESS_THAN;
exports.LESS_THAN_OR_EQUAL = LESS_THAN_OR_EQUAL;
exports.LITERAL = LITERAL;
exports.MODULUS = MODULUS;
exports.MULTIPLICATIVE = MULTIPLICATIVE;
exports.NEGATION = NEGATION;
exports.NUMBER = NUMBER;
exports.OR = OR;
exports.PATH = PATH;
exports.RELATIVE_LOCATION_PATH = RELATIVE_LOCATION_PATH;
exports.SUBTRACTIVE = SUBTRACTIVE;
exports.UNION = UNION;
exports.NODE_NAME_TEST = NODE_NAME_TEST;
exports.NODE_TYPE_TEST = NODE_TYPE_TEST;
exports.PROCESSING_INSTRUCTION_TEST = PROCESSING_INSTRUCTION_TEST;
exports.COMMENT = COMMENT;
exports.NODE = NODE;
exports.PROCESSING_INSTRUCTION = PROCESSING_INSTRUCTION;
exports.TEXT = TEXT;
