/* eslint-env node */

"use strict";

function LocationPath (lexer) {
  this.lexer = lexer;
}

module.exports = LocationPath;

var AbsoluteLocationPath = require("./absolute_location_path");

var RelativeLocationPath = require("./relative_location_path");

LocationPath.prototype.parse = function () {
  var ch = this.lexer.peak()[0];

  if (ch === "/") {
    return new AbsoluteLocationPath(this.lexer).parse();
  } else {
    return new RelativeLocationPath(this.lexer).parse();
  }
};
