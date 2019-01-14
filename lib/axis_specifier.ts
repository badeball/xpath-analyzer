export const ANCESTOR = "ancestor";
export const ANCESTOR_OR_SELF = "ancestor-or-self";
export const ATTRIBUTE = "attribute";
export const CHILD = "child";
export const DESCENDANT = "descendant";
export const DESCENDANT_OR_SELF = "descendant-or-self";
export const FOLLOWING = "following";
export const FOLLOWING_SIBLING = "following-sibling";
export const NAMESPACE = "namespace";
export const PARENT = "parent";
export const PRECEDING = "preceding";
export const PRECEDING_SIBLING = "preceding-sibling";
export const SELF = "self";

export type AxisSpecifier =
  typeof ANCESTOR |
  typeof ANCESTOR_OR_SELF |
  typeof ATTRIBUTE |
  typeof CHILD |
  typeof DESCENDANT |
  typeof DESCENDANT_OR_SELF |
  typeof FOLLOWING |
  typeof FOLLOWING_SIBLING |
  typeof NAMESPACE |
  typeof PARENT |
  typeof PRECEDING |
  typeof PRECEDING_SIBLING |
  typeof SELF;
