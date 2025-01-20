PROJECT_DIR=$TM_PROJECT_DIRECTORY
BUILD_DIR=$PROJECT_DIR/triad-puzzle.Frontend/build
WEB_DIR=$PROJECT_DIR/docs

cp $BUILD_DIR/assets/*.* $WEB_DIR/assets
cp $BUILD_DIR/assets/fonts/*.* $WEB_DIR/assets/fonts
cp $BUILD_DIR/icons/*.* $WEB_DIR
cp $BUILD_DIR/index.html $WEB_DIR
