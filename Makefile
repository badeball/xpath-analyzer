MOCHA := ./node_modules/.bin/_mocha
ESLINT := ./node_modules/.bin/eslint
ISTANBUL := ./node_modules/.bin/istanbul

all: lint test

ci: lint test-cover

lint:
	@$(ESLINT) .

test:
	@$(MOCHA) --recursive --reporter dot

test-cover:
	@$(ISTANBUL) cover --report lcov $(MOCHA) -- --recursive --reporter dot

.PHONY: lint test test-cover
