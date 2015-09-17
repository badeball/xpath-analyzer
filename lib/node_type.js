/* eslint-env node */

"use strict";

module.exports = {
  COMMENT: "comment",
  NODE: "node",
  PROCESSING_INSTRUCTION: "processing-instruction",
  TEXT: "text",

  isValidNodeType: function (nodeType) {
    for (var property in this) {
      if (this.hasOwnProperty(property) && this[property] === nodeType) {
        return true;
      }
    }

    return false;
  }
};
