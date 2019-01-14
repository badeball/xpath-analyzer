import XPathLexer from "xpath-lexer";

import { ExprParser } from "./expr";

import { DESCENDANT_OR_SELF } from "../axis_specifier";

import { RELATIVE_LOCATION_PATH, NODE_TYPE_TEST } from "../expr_type";

import { NODE } from "../node_type";

import * as Step from "./step";

import { StepNode } from "./step";

export interface RelativeLocationPathNode {
  type: typeof RELATIVE_LOCATION_PATH;
  steps: StepNode[];
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): RelativeLocationPathNode {
  var relativeLocation: RelativeLocationPathNode = {
    type: RELATIVE_LOCATION_PATH,
    steps: [Step.parse(rootParser, lexer)]
  };

  while (!lexer.empty() && lexer.peak()[0] === "/") {
    if (lexer.next() === "//") {
      relativeLocation.steps.push({
        axis: DESCENDANT_OR_SELF,
        test: {
          type: NODE_TYPE_TEST,
          name: NODE
        },
        predicates: []
      });
    }

    relativeLocation.steps.push(Step.parse(rootParser, lexer));
  }

  return relativeLocation;
}
