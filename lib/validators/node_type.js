/* eslint-env node */

"use strict";

var NodeType = require("../node_type");

module.exports = {
  isValid: function (type) {
    for (var property in NodeType) {
      if (NodeType.hasOwnProperty(property) && NodeType[property] === type) {
        return true;
      }
    }

    return false;
  }
};
