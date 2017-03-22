var exception = require('./plugins/exception.js');
var fs = require('fs');
var path = require('path');
var plumber = require('gulp-plumber');

module.exports = function( gulp, config ) {
  return function() {
    var initCwd = process.env.INIT_CWD;

    // Define an array for font file paths.
    var fontLibs = [];

    // Add Font Awesome font file paths if required in 'build.json'.
    if ( config.components.fontAwesome === true ) {
      fontLibs.push(path.join(initCwd, '/node_modules/font-awesome/fonts/fontawesome-webfont.*'));
    }

    // Add any other font file paths specified in 'build.json'.
    for ( var i = 0; i < config.libraries.fonts.length; i++ ) {
      var library = config.root + '/' + path.normalize(config.libraries.fonts[i]);
      var directory = path.dirname(library);

      if ( exists(directory) && fontLibs.indexOf(library) == -1 ) {
        fontLibs.push(library);
      }
    }

    function exists( directory ) {
      try {
        fs.statSync(directory);
        return true;
      } catch( e ) {
        e.message = "ERROR: Directory " + e.path + " specified in ./config.libraries.fonts does not exist or is incorrect. \n" + e;
        exception.error(e);
      }
    }

    // Copy all font files to 'build' fonts directory.
    return gulp.src(fontLibs)
      .pipe(gulp.dest(config.buildDest + '/fonts'));
  };
};