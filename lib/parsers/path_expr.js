import { DESCENDANT_OR_SELF } from "../axis_specifier";

import { PATH } from "../expr_type";

import { NODE } from "../node_type";

import * as FilterExpr from "./filter_expr";

import * as LocationPath from "./location_path";

import * as Step from "./step";

export function parse (rootParser, lexer) {
  if (FilterExpr.isValidOp(lexer)) {
    var filter = FilterExpr.parse(rootParser, lexer);

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

        path.steps.push(Step.parse(rootParser, lexer));
      }

      return path;
    } else {
      return filter;
    }
  } else {
    return LocationPath.parse(rootParser, lexer);
  }
}
