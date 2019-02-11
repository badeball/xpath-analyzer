import {
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
} from "../axis_specifier";

export function isValid (specifier) {
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
