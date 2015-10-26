/* eslint-env node */

"use strict";

module.exports = {};

var AbsoluteLocationPath = require("./absolute_location_path");

var RelativeLocationPath = require("./relative_location_path");

module.exports.parse = function (lexer) {
  var token = lexer.peak(),
      ch = token && token[0];

  if (ch === "/") {
    return AbsoluteLocationPath.parse(lexer);
  } else {
    return RelativeLocationPath.parse(lexer);
  }
};
