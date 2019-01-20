MOCHA := ./node_modules/.bin/_mocha
NYC := ./node_modules/.bin/nyc
ROLLUP := ./node_modules/.bin/rollup

all: test

ci: ensure-built test-cover

lint:
	echo "Not yet implemented"
	false

test:
	$(MOCHA) --require esm --recursive --reporter dot

test-cover:
	$(NYC) --temp-directory coverage/ --require esm $(MOCHA) --recursive --reporter dot
	$(NYC) --temp-directory coverage/ report --reporter text-lcov > coverage.lcov

build:
	$(ROLLUP) --config

ensure-built: build
	[ -z "$(shell git status -s dist/)" ]

.PHONY: test test-cover build ensure-built
