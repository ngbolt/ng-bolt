var path = require('path');
var flatten = require('gulp-flatten');

module.exports = function( gulp, config ) {
  return function() {
    return gulp.src([
      './docs/content/**/*',
      '!./docs/content/**/*.md'
    ])
      .pipe(flatten())
      .pipe(gulp.dest(path.join(config.paths.docs.dest, 'assets')));
  }
}