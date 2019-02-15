import XPathLexer from "xpath-lexer";

import { ExprParser, ExprNode } from "./expr";

import { StepNode } from "./step";

import { DESCENDANT_OR_SELF } from "../axis_specifier";

import { PATH, NODE_TYPE_TEST } from "../expr_type";

import { NODE } from "../node_type";

import * as FilterExpr from "./filter_expr";

import * as LocationPath from "./location_path";

import * as Step from "./step";

export interface PathNode {
  type: typeof PATH;
  filter: ExprNode;
  steps: StepNode[];
}

export function parse (rootParser: ExprParser, lexer: XPathLexer): ExprNode {
  if (FilterExpr.isValidOp(lexer)) {
    var filter = FilterExpr.parse(rootParser, lexer);

    if (!lexer.empty() && lexer.peak()[0] === "/") {
      var path: PathNode = {
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
            },
            predicates: []
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
