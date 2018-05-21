import { DESCENDANT_OR_SELF } from "../axis_specifier";

import { RELATIVE_LOCATION_PATH } from "../expr_type";

import { NODE } from "../node_type";

import * as Step from "./step";

export function parse (rootParser, lexer) {
  var relativeLocation = {
    type: RELATIVE_LOCATION_PATH
  };

  relativeLocation.steps = [Step.parse(rootParser, lexer)];

  while (!lexer.empty() && lexer.peak()[0] === "/") {
    if (lexer.next() === "//") {
      relativeLocation.steps.push({
        axis: DESCENDANT_OR_SELF,
        test: {
          type: NODE
        }
      });
    }

    relativeLocation.steps.push(Step.parse(rootParser, lexer));
  }

  return relativeLocation;
}
