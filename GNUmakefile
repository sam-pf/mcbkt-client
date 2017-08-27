SRC_DIR:=src
JS_FILES:=$(SRC_DIR)/*.js
README_FILE:=README.md
SRC_FILES:=$(wildcard $(SRC_DIR) $(SRC_DIR)/* $(SRC_DIR)/*/*)
DOC_DIR:=doc
DOC_REFFILE:=$(DOC_DIR)/index.html
LIB_DIR:=lib
WEBPACKFILE:=$(LIB_DIR)/mcbkt-client.bundle.min.js
WEBPACKCFG:=webpack.config.js
WEBPACKBIN:=node_modules/.bin/webpack

.PHONY: lint forever

all: lint build

again: clean all

forever:
	make-forever -c $(SRC_DIR)

lint:
	@eslint $(JS_FILES)

build: $(WEBPACKFILE) $(DOC_REFFILE)

$(WEBPACKFILE): $(SRC_FILES) $(WEBPACKCFG)
	$(WEBPACKBIN)

$(DOC_REFFILE): $(SRC_FILES) $(README_FILE)
	jsdoc -d ./$(DOC_DIR)/ -R $(README_FILE) -r ./$(SRC_DIR)/

clean:
	rm $(WEBPACKFILE) $(DOC_REFFILE)
