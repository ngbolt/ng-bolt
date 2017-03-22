var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var exception = require('./plugins/exception.js');
var fs = require('fs');
var gulpIf = require('gulp-if');
var path = require('path');

module.exports = function( gulp, config ) {
  return function() {
    var paths = config.paths;
    var initCwd = process.env.INIT_CWD;

    // add any default file paths.
    var cssLibs = [];
    Array.prototype.push.apply(cssLibs, paths.sass.libs);

    // Add 'Font Aweseome' css file path if required in 'build.json'.
    if ( config.components.fontAwesome === true ) {
      cssLibs.push(path.join(initCwd, '/node_modules/font-awesome/css/font-awesome.min.css'));
    }

    // Add any other css file paths specified in 'build.json'.
    for ( var i = 0; i < config.libraries.css.length; i++ ) {
      var library = config.root + '/' + path.normalize(config.libraries.css[i]);
      var directory = path.dirname(library);

      if ( exists(directory) && cssLibs.indexOf(library) === -1 ) {
        cssLibs.push(library);
      }
    }

    function exists( directory ) {
      try {
        fs.statSync(directory);
        return true;
      } catch( e ) {
        e.message = "ERROR: Directory " + e.path + " specified in ./config.libraries.css does not exist or is incorrect. \n" + e;
        exception.error(e);
      }
    }

    // Concat all external/vendor css files into one file and add to 'build' directory.
    return gulp.src(cssLibs)
      .pipe(concat('libs.css'))
      .pipe(gulpIf(config.env == 'production' && !config.beautify, cleanCss()))
      .pipe(gulp.dest(config.buildDest + '/libs'));
  };
};