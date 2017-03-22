var concat = require('gulp-concat');
var exception = require('./plugins/exception.js');
var fs = require('fs');
var gulpIf = require('gulp-if');
var path = require('path');
var uglify = require('gulp-uglify');


module.exports = function( gulp, config ) {
  return function() {
    var paths = config.paths;
    var initCwd = process.env.INIT_CWD;

    // Add any default file paths.
    var jsLibs = [];
    Array.prototype.push.apply(jsLibs, paths.js.libs);

    // Add any required data service javascript files.
    if ( config.components.data.sqlite ) {
      jsLibs.push(path.join(initCwd, '/node_modules/ng-cordova/dist/ng-cordova.min.js'));
    }
    if ( config.components.data.wamp ) {
      jsLibs.push(path.join(initCwd, '/node_modules/autobahn-js-built/autobahn.min.js'));
    }
    if ( config.profileName ) {
      jsLibs.push(path.join(initCwd, '/node_modules/jshashes/hashes.min.js'));
    }

    // Add angular-route for view
    if ( config.components.view ) {
      jsLibs.push(path.join(initCwd, '/node_modules/angular-route/angular-route.min.js'));
    }

    // Add any external javascript files specified in 'build.json'.
    for ( var i = 0; i < config.libraries.js.length; i++ ) {
      var library = config.root + '/' + path.normalize(config.libraries.js[i]);
      var directory = path.dirname(library);

      if ( exists(directory) && jsLibs.indexOf(library) === -1 ) {
        jsLibs.push(library);
      }
    }

    function exists( directory ) {
      try {
        fs.statSync(directory);
        return true;
      } catch( e ) {
        e.message = "ERROR: Directory " + e.path + " specified in ./config.libraries.js does not exist or is incorrect. \n" + e;
        exception.error(e);
      }
    }

    // Concat all external/vendor javascript files into one file and add to 'build' directory.
    return gulp.src(jsLibs)
      .pipe(concat('libs.js'))
      .pipe(gulpIf(config.env == 'production' && !config.beautify, uglify()))
      .pipe(gulp.dest(config.buildDest + '/libs'));
  };
};