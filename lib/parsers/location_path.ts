import XPathLexer from "xpath-lexer";

import { ExprParser } from "./expr";

import * as AbsoluteLocationPath from "./absolute_location_path";

import * as RelativeLocationPath from "./relative_location_path";

import { AbsoluteLocationPathNode } from "./absolute_location_path";

import { RelativeLocationPathNode } from "./relative_location_path";

export type LocationNode = AbsoluteLocationPathNode | RelativeLocationPathNode;

export function parse (rootParser: ExprParser, lexer: XPathLexer): LocationNode {
  var token = lexer.peak(),
      ch = token && token[0];

  if (ch === "/") {
    return AbsoluteLocationPath.parse(rootParser, lexer);
  } else {
    return RelativeLocationPath.parse(rootParser, lexer);
  }
}
