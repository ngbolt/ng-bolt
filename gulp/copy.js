var connect = require('gulp-connect');
var gulpIf = require('gulp-if');
var replace = require('./plugins/replace.js').replace;
var path = require('path');

module.exports = function( gulp, config ) {
  return function() {
    var paths = config.paths;
    gulp.src(paths.html.base, {base: paths.app})
      .pipe(replace(config))
      .pipe(gulp.dest(config.buildDest));

    if ( config.libraries.static ) {
      for ( var i = 0; i < config.libraries.static.length; i++ ) {
        var staticLib = config.libraries.static[i];
        var copyPath;
        var destPath;
        if ( typeof staticLib === 'string' ){
          copyPath = path.join(config.initCwd, staticLib);
          destPath = config.buildDest;
        } else if ( staticLib !== null && typeof staticLib === 'object' ){
          copyPath = path.join(config.initCwd, staticLib.src);
          destPath = path.join(config.buildDest, staticLib.dest);
        }
        gulp.src(copyPath)
          .pipe(gulp.dest(destPath));
      }
    }

    return gulp.src(paths.html.partials, {base: paths.app})
      .pipe(replace(config))
      .pipe(gulp.dest(config.buildDest + '/partials/'))
      .pipe(gulpIf(config.serve, connect.reload()));
  };


};
