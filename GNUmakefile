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
WEBPACKFILE:=$(LIB_DIR)/mcbkt-client.bundle.min.js
WEBPACKCFG:=webpack.config.js
WEBPACKBIN:=webpack

.PHONY: lint forever test webpack doc

all: lint build

again: clean all

forever:
	make-forever -c $(SRC_DIR)

test:
	karma start

lint:
	@eslint $(JS_FILES)

build: webpack doc

webpack: $(WEBPACKFILE)

doc: $(DOC_REFFILE)

webpack: $(WEBPACKFILE)

$(WEBPACKFILE): $(SRC_FILES) $(WEBPACKCFG)
	$(WEBPACKBIN) --config $(WEBPACKCFG)

$(DOC_REFFILE): $(SRC_FILES) $(README_FILE)
	jsdoc -d ./$(DOC_DIR)/ -R $(README_FILE) -r ./$(SRC_DIR)/

clean:
	rm $(WEBPACKFILE) $(DOC_REFFILE)
