# xpath-analyzer

[![Build Status](https://travis-ci.org/badeball/xpath-analyzer.svg?branch=master)](https://travis-ci.org/badeball/xpath-analyzer)
[![Code Climate](https://codeclimate.com/github/badeball/xpath-analyzer/badges/gpa.svg)](https://codeclimate.com/github/badeball/xpath-analyzer)
[![Test Coverage](https://codeclimate.com/github/badeball/xpath-analyzer/badges/coverage.svg)](https://codeclimate.com/github/badeball/xpath-analyzer/coverage)

An analyzer / parser for XPath 1.0 expressions.

## Installation

The package can be installed with `npm`.

```
$ npm install xpath-analyzer
```

## Usage

```javascript
var XPathAnalyzer = require("xpath-analyzer");

var analyzer = new XPathAnalyzer("1 + 1");

analyzer.parse();

// { type: 'additive',
//   lhs: { type: 'number', number: 1 },
//   rhs: { type: 'number', number: 1 } }
```
