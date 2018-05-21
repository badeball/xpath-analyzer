MOCHA := ./node_modules/.bin/_mocha
ESLINT := ./node_modules/.bin/eslint
NYC := ./node_modules/.bin/nyc

all: lint test

ci: lint test-cover

lint:
	@$(ESLINT) .

test:
	@$(MOCHA) --recursive --reporter dot

test-cover:
	@$(NYC) --temp-directory coverage/ $(MOCHA) --recursive --reporter dot
	@$(NYC) --temp-directory coverage/ report --reporter text-lcov > coverage.lcov

.PHONY: lint test test-cover
