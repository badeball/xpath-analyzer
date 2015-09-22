# xpath-parser

[![Build Status](https://travis-ci.org/badeball/xpath-parser.svg?branch=master)](https://travis-ci.org/badeball/xpath-parser)

A parser for XPath 1.0 expressions.

```javascript
var XPathParser = require("xpath-parser");

var parser = new XPathParser("//foo:bar[@id='baz']");

parser.parse();

// { type: 'additive',
//   lhs: { type: 'number', number: 1 },
//   rhs: { type: 'number', number: 1 } }
```
