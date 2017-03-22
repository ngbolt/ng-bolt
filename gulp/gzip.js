var gzip = require('gulp-gzip');
var path = require('path');

module.exports = function( gulp, config ) {
  return function() {
    if ( config.gzip ) {
      return gulp.src(path.join(config.buildDest, '/**/*'))
        .pipe(gzip());
      // TODO: Test gzip output
    } else {
      return;
    }
  }
}