SHELL:=/bin/bash
PATHREGEX:=(:|^)\./node_modules/\.bin(:|$$)
ifeq "$(shell [[ $$PATH =~ $(PATHREGEX) ]] && echo 'y' || echo 'n' )" "n"
export PATH:=./node_modules/.bin:$(PATH)
endif

SRC_DIR:=src
DOC_DIR:=doc
DEV_DIR:=dev
DST_DIR:=dist

SRC_JSFILES:=$(wildcard $(SRC_DIR)/*.js $(SRC_DIR)/*/*.js)
SRC_WEBPACKCFG:=webpack.config.js
SRC_MAKEFILE:=GNUmakefile
SRC_README:=README.md

SRC_JSPLUS:=$(SRC_JSFILES) $(SRC_WEBPACKCFG) $(SRC_MAKEFILE)

DOC_REFFILE:=$(DOC_DIR)/index.html
LIB_NAME:=mcbkt-client

WEBPACKBIN:=webpack

SRC_ES6:=$(SRC_DIR)/$(LIB_NAME).js
TGT_ES6:=$(DST_DIR)/$(LIB_NAME).js
TG2_ES6:=$(DEV_DIR)/$(LIB_NAME).js
TGT_DEV:=$(DEV_DIR)/$(LIB_NAME)_compiled_umd.js
TG2_DEV:=$(DEV_DIR)/$(LIB_NAME)_compiled_umd_nobp.js
TGT_DST:=$(DST_DIR)/$(LIB_NAME)_compiled_umd.js
TG2_DST:=$(DST_DIR)/$(LIB_NAME)_compiled_umd_nobp.js

.PHONY: test webpack doc

all: lint doc dev dist es6

again: clean all

lint: npm-install
	@eslint $(SRC_JSFILES)

test:
	karma start

doc: $(DOC_REFFILE)

es6: $(TGT_ES6) $(TG2_ES6)

dev: $(TGT_DEV) $(TG2_DEV)

dist: $(TGT_DST) $(TG2_DST)

forever:
	make-forever -c $(SRC_DIR)

# <<< nitty gritty stuff

$(TGT_ES6): $(SRC_ES6)
	uglifyjs --comments -m -o $@ $<
$(TG2_ES6): $(SRC_ES6)
	cp $< $@

$(TGT_DEV): $(SRC_JSPLUS)
	make webpack
$(TG2_DEV): $(SRC_JSPLUS)
	WEBPACK_TARGET=nobp make webpack

$(TGT_DST): $(SRC_JSPLUS)
	WEBPACK_TARGET=pro make webpack
$(TG2_DST): $(SRC_JSPLUS)
	WEBPACK_TARGET=nobp_pro make webpack

webpack:
	$(WEBPACKBIN) --config $(SRC_WEBPACKCFG)

npm-install: node_modules

node_modules: package.json
	npm install

$(DOC_REFFILE): $(SRC_JSPLUS) $(SRC_README)
	jsdoc -d ./$(DOC_DIR)/ -R $(SRC_README) -r ./$(SRC_DIR)/

# >>>

clean:
	ls -1 $(DST_DIR)/*.js 2>/dev/null && \
	rm $(DST_DIR)/*.js || true
	ls -1 $(DEV_DIR)/*.js 2>/dev/null && \
	rm $(DEV_DIR)/*.js || true
	ls -1 $(DOC_REFFILE) 2>/dev/null && rm $(DOC_REFFILE) || true
