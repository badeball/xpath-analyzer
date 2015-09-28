# xpath-analyzer

[![Build Status](https://travis-ci.org/badeball/xpath-analyzer.svg?branch=master)](https://travis-ci.org/badeball/xpath-analyzer)

An analyzer / parser for XPath 1.0 expressions.

```javascript
var XPathAnalyzer = require("xpath-analyzer");

var analyzer = new XPathAnalyzer("//foo:bar[@id='baz']");

analyzer.parse();

// { type: 'additive',
//   lhs: { type: 'number', number: 1 },
//   rhs: { type: 'number', number: 1 } }
```
