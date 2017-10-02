var exception = require('./plugins/exception.js');
var fs = require('fs');
var path = require('path');
var plumber = require('gulp-plumber');

module.exports = function( gulp, config ) {
  return function() {
    // Define an array for font file paths.
    var imageLibs = [];

    // Add any other font file paths specified in 'build.json'.
    for ( var i = 0; i < config.libraries.images.length; i++ ) {
      var library = config.root + '/' + path.normalize(config.libraries.images[i]);
      var directory = path.dirname(library);

      if ( exists(directory) && imageLibs.indexOf(library) == -1 ) {
        imageLibs.push(library);
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
    return gulp.src(imageLibs)
      .pipe(gulp.dest(config.buildDest + '/images'));
  };
};
