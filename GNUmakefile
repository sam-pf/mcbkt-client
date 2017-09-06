SHELL:=/bin/bash
PATHREGEX:=(:|^)\./node_modules/\.bin(:|$$)
ifeq "$(shell [[ $$PATH =~ $(PATHREGEX) ]] && echo 'y' || echo 'n' )" "n"
export PATH:=./node_modules/.bin:$(PATH)
endif

SRC_DIR:=src
JS_FILES:=$(SRC_DIR)/*.js
README_FILE:=README.md
SRC_FILES:=$(wildcard $(SRC_DIR) $(SRC_DIR)/* $(SRC_DIR)/*/*)
DOC_DIR:=doc
DOC_REFFILE:=$(DOC_DIR)/index.html
LIB_DIR:=lib
WEBPACKFILE:=$(LIB_DIR)/mcbkt-client.js
WEBPACKCFG:=webpack.config.js
WEBPACKBIN:=webpack

.PHONY: lint forever test webpack doc

all: lint dev build

again: clean all

npm-install: node_modules

build: webpack doc

lint: npm-install
	@eslint $(JS_FILES)

forever:
	make-forever -c $(SRC_DIR)

start:
	NODE_ENV=start make webpack

dev:
	NODE_ENV=development make webpack

build:
	NODE_ENV=production make webpack

test:
	karma start

webpack: $(WEBPACKTIMESTAMP)
	$(WEBPACKBIN) --config $(WEBPACKCFG)

# cross-env NODE_ENV=start make webpack",
#    cross-env NODE_ENV=development make webpack",
#    cross-env NODE_ENV=production make webpack",

node_modules: package.json
	npm install

doc: $(DOC_REFFILE)

webpack: $(WEBPACKTIMESTAMP)

$(WEBPACKTIMESTAMP): $(SRC_FILES) $(WEBPACKCFG)
	$(WEBPACKBIN) --config $(WEBPACKCFG)

$(DOC_REFFILE): $(SRC_FILES) $(README_FILE)
	jsdoc -d ./$(DOC_DIR)/ -R $(README_FILE) -r ./$(SRC_DIR)/

clean:
	rm $(WEBPACKFILE) $(DOC_REFFILE)
