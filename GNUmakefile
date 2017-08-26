SRC_DIR:=js
SRC_FILES:=$(wildcard $(SRC_DIR) $(SRC_DIR)/* $(SRC_DIR)/*/*)
TARGET_DIR:=docs
TARGET_MARKER:=$(TARGET_DIR)/index.html

build: $(TARGET_MARKER)

$(TARGET_MARKER): $(SRC_FILES)
	jsdoc -d=./$(TARGET_DIR)/ -R README.md -r ./$(SRC_DIR)/
