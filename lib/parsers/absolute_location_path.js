import { DESCENDANT_OR_SELF } from "../axis_specifier";

import { ABSOLUTE_LOCATION_PATH, NODE_TYPE_TEST } from "../expr_type";

import { NODE } from "../node_type";

import * as Step from "./step";

export function parse (rootParser, lexer) {
  var absoluteLocation = {
    type: ABSOLUTE_LOCATION_PATH
  };

  while (!lexer.empty() && lexer.peak()[0] === "/") {
    if (!absoluteLocation.steps) {
      absoluteLocation.steps = [];
    }

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
        }
      });

      absoluteLocation.steps.push(Step.parse(rootParser, lexer));
    }
  }

  return absoluteLocation;
}
