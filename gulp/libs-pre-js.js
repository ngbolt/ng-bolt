var path = require('path');
var fs = require('fs');
var concat = require('gulp-concat');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var exception = require('./plugins/exception.js');

module.exports = function( gulp, config ) {
  function exists( directory ) {
    try {
      fs.statSync(directory);
      return true;
    } catch( e ) {
      e.message = "ERROR: Directory " + e.path + " specified in ./config.libraries.js does not exist or is incorrect. \n" + e;
      exception.error(e);
    }
  }

  return function() {
    var preJsLibs = []
    for ( var i = 0; i < config.libraries['pre-js'].length; i++ ) {
      var library = config.root + '/' + path.normalize(config.libraries['pre-js'][i]);
      var directory = path.dirname(library);

      if ( exists(directory) && preJsLibs.indexOf(library) === -1 ) {
        preJsLibs.push(library);
      }
    }

    // Concat all external/vendor javascript files into one file and add to 'build' directory.
    return gulp.src(preJsLibs)
      .pipe(concat('pre-libs.js'))
      .pipe(gulpIf(config.env == 'production' && !config.beautify, uglify()))
      .pipe(gulp.dest(config.buildDest + '/libs'));
  };
};
