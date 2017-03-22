var sass = require('gulp-sass');
var rename = require('gulp-rename');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');

module.exports = function( gulp, config ) {
  var paths = config.paths.docs;

  return function() {
    return gulp.src(path.join(paths.appSrc, 'app.scss'))
      .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: [
          './src/core/scss',
          './src/components',
          path.join(process.env.INIT_CWD, '/node_modules')
        ]
      }).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(rename('docsApp.css'))
      .pipe(gulp.dest(path.join(paths.dest, 'assets')));
  }
}