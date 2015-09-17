# xpath-parser

A parser for XPath 1.0 expressions.

```javascript
var XPathLexer = require("xpath-lexer");

var lexer = new XPathLexer("//foo:bar[@id='baz']");

var XPathParser = require("xpath-parser");

var parser = new XPathParser(lexer);

parser.parse();

// { type: 'additive',
//   lhs: { type: 'number', number: 1 },
//   rhs: { type: 'number', number: 1 } }
```
