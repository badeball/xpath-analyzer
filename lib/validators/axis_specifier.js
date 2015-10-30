"use strict";

var AxisSpecifier = require("../axis_specifier");

module.exports = {
  isValid: function (specifier) {
    for (var property in AxisSpecifier) {
      if (AxisSpecifier.hasOwnProperty(property) && AxisSpecifier[property] === specifier) {
        return true;
      }
    }

    return false;
  }
};
