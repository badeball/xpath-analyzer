MOCHA := ./node_modules/.bin/_mocha
ESLINT := ./node_modules/.bin/eslint
NYC := ./node_modules/.bin/nyc
ROLLUP := ./node_modules/.bin/rollup

all: lint test

ci: ensure-built lint test-cover

lint:
	$(ESLINT) .

test:
	$(MOCHA) --require esm --recursive --reporter dot

test-cover:
	$(NYC) --temp-directory coverage/ --require esm $(MOCHA) --recursive --reporter dot
	$(NYC) --temp-directory coverage/ report --reporter text-lcov > coverage.lcov

build:
	$(ROLLUP) --config

ensure-built: build
	[ -z "$(shell git status -s dist/)" ]

.PHONY: lint test test-cover build ensure-built
