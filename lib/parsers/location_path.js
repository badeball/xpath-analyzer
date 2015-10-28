/* eslint-env node */

"use strict";

var AbsoluteLocationPath = require("./absolute_location_path");

var RelativeLocationPath = require("./relative_location_path");

module.exports = {
  parse: function (rootParser, lexer) {
    var token = lexer.peak(),
        ch = token && token[0];

    if (ch === "/") {
      return AbsoluteLocationPath.parse(rootParser, lexer);
    } else {
      return RelativeLocationPath.parse(rootParser, lexer);
    }
  }
};
