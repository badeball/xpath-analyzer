import XPathLexer from "xpath-lexer";

import { ExprParser } from "./expr";

import { DESCENDANT_OR_SELF } from "../axis_specifier";

import { ABSOLUTE_LOCATION_PATH, NODE_TYPE_TEST } from "../expr_type";

import { NODE } from "../node_type";

import * as Step from "./step";

import { StepNode } from "./step";

export interface AbsoluteLocationPathNode {
  type: typeof ABSOLUTE_LOCATION_PATH;
  steps: StepNode[];
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): AbsoluteLocationPathNode {
  var absoluteLocation: AbsoluteLocationPathNode = {
    type: ABSOLUTE_LOCATION_PATH,
    steps: []
  };

  while (!lexer.empty() && lexer.peak()[0] === "/") {
    if (lexer.next() === "/") {
      if (Step.isValidOp(lexer)) {
        absoluteLocation.steps.push(Step.parse(rootParser, lexer));
      }
    } else {
      absoluteLocation.steps.push({
        axis: DESCENDANT_OR_SELF,
        test: {
          type: NODE_TYPE_TEST,
          name: NODE
        },
        predicates: []
      });

      absoluteLocation.steps.push(Step.parse(rootParser, lexer));
    }
  }

  return absoluteLocation;
}
