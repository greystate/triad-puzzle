PROJECT_ROOT="$TM_PROJECT_DIRECTORY"

BUILT_ASSETS="$PROJECT_ROOT/build/assets"
WEB_ASSETS="$PROJECT_ROOT/assets"

# rm "$PROJECT_ROOT/config.codekit3"

cp "$BUILT_ASSETS/*.*" "$WEB_ASSETS"
cp "$PROJECT_ROOT/build/triad-puzzle.html" "$PROJECT_ROOT/index.html"

rm -rf "$PROJECT_ROOT/build"
