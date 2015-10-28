/* eslint-env node */

"use strict";

var OrExpr = require("./or_expr");

module.exports = {
  parse: function (lexer) {
    return OrExpr.parse(module.exports, lexer);
  }
};
