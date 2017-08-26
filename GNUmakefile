JS_SRC_DIR:=js
JS_FILES:=$(JS_SRC_DIR)/*.js
SRC_FILES:=$(wildcard $(JS_SRC_DIR) $(JS_SRC_DIR)/* $(JS_SRC_DIR)/*/*)
TARGET_DIR:=docs
TARGET_MARKER:=$(TARGET_DIR)/index.html

.PHONY: lint

all: lint build

lint:
	@eslint $(JS_FILES)

build: $(TARGET_MARKER)

$(TARGET_MARKER): $(SRC_FILES)
	jsdoc -d=./$(TARGET_DIR)/ -R README.md -r ./$(JS_SRC_DIR)/
