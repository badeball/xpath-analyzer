/* eslint-env node */

"use strict";

module.exports = {
  ANCESTOR: "ancestor",
  ANCESTOR_OR_SELF: "ancestor-or-self",
  ATTRIBUTE: "attribute",
  CHILD: "child",
  DESCENDANT: "descendant",
  DESCENDANT_OR_SELF: "descendant-or-self",
  FOLLOWING: "following",
  FOLLOWING_SIBLING: "following-sibling",
  NAMESPACE: "namespace",
  PARENT: "parent",
  PRECEDING: "preceding",
  PRECEDING_SIBLING: "preceding-sibling",
  SELF: "self",

  isValidAxisSpecifier: function (axisSpecifier) {
    for (var property in this) {
      if (this.hasOwnProperty(property) && this[property] === axisSpecifier) {
        return true;
      }
    }

    return false;
  }
};
