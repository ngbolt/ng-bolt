var concat = require('gulp-concat');
var ngExtender = require('gulp-angular-extender');
var path = require('path');
var uglify = require('gulp-uglify');
var ngConfig = require('gulp-ng-config');
var sq = require('streamqueue');
var ngHtml2js = require('gulp-ng-html2js');
var fs = require('fs');
var streamBuffer = require('./plugins/stream-buffer.js').streamBuffer;

module.exports = function( gulp, config ) {
  return function() {
    var paths = config.paths;

    var initCwd = process.env.INIT_CWD;

    // Get parameters for javascript task.
    var params = getParams();

    return sq({objectMode: true},
      // Build and inject config settings
      getConfigConstants()
        .pipe(ngConfig('blt_config')),

      // Build and inject profile settings
      getProfileConstants()
        .pipe(ngConfig('blt_appProfile')),

      // Convert routes file to module
      gulp.src(paths.config.routes)
        .pipe(ngConfig('blt_dataRoutes')),

      // Convert views json file to module
      gulp.src(paths.config.views)
        .pipe(ngConfig('blt_appViews')),

      // Inject required component names into ng-bolt module
      gulp.src(paths.bolt + '/core/js/ng-bolt.js')
        .pipe(ngExtender({
          "ngBolt": params.modules
        })),

      // Get required component javascript file paths.
      gulp.src(params.paths.js),

      // Compile component html templates into javascript.
      gulp.src(params.paths.templates, {base: paths.bolt + '/components'})
        .pipe(ngHtml2js({
          prefix: 'components/',
          moduleName: function( file ) {
            var pathParts = file.path.split(/\/|\\/);
            var folder = 'blt_' + pathParts[pathParts.length - 2];
            return folder.replace(/-[a-z]/g, function( match ) {
              return match.substr(1).toUpperCase();
            });
          }
        })),

      // App javascript files.
      gulp.src([
        path.join(initCwd, 'node_modules/angular-truncate-2/dist/angular-truncate-2.min.js'),
        path.join(initCwd, 'node_modules/fastclick/lib/fastclick.js'),
        // './src/core/js/ng-bolt.js',
        // './src/**/*.module.js', 
        // './src/**/*.js',
        path.join(paths.docs.appSrc, '/app.js'),
        path.join(paths.docs.appSrc, '/**/*.module.js'),
        path.join(paths.docs.appSrc, '/**/*.js')
      ])
    )
      .pipe(concat('docsApp.js'))
      // .pipe(uglify())
      .pipe(gulp.dest(path.join(paths.docs.dest, 'assets')));
  };

  /**
   * Get breakpoints from styles.json, applying defaults when necessary.
   *
   * @return {Object} The breakpoints for our blt-if-bp directive.
   */
  function getBreakpoints() {
    var styles = require(path.join(config.root, 'config/styles.json'));
    return {
      sm: getBreakpoint(styles, 'sm', 0),
      md: getBreakpoint(styles, 'md', 600),
      lg: getBreakpoint(styles, 'lg', 900),
      xl: getBreakpoint(styles, 'xl', 1200),
      xxl: getBreakpoint(styles, 'xxl', 1800)
    };
  }

  /**
   * Extract and convert the given breakpoint from the given styles, applying the given default if not found or
   * we encounter an error trying to interpret it as a number.
   *
   * @param styles {Object] The styles json.
   * @param bp {String} The breakpoint to extract.
   * @param def {Number} The default value to apply if we encounter problems.
   * @return {Number} The breakpoint value for the given breakpoint.
   */
  function getBreakpoint( styles, bp, def ) {
    var em = /em$/i;
    var num = /\d+\.?\d*/;
    var breakpoint;

    if ( styles.breakpoint !== undefined && styles.breakpoints[bp] !== undefined ) {
      try {
        if ( styles.breakpoints[bp].match(em) ) {
          breakpoint = parseFloat(styles.breakpoints[bp].match(num)[0]) * 16;
        }
        else {
          breakpoint = parseFloat(styles.breakpoints[bp].match(num)[0]);
        }
      } catch( e ) {
        console.warn("Unable to handle breakpoint size " + bp + ": " + styles.breakpoints[bp] + ". Defaulting to: " + def + ".");
      }
    }
    if ( breakpoint === undefined ) {
      breakpoint = def;
    }
    return breakpoint;
  }

  /**
   * Gets an array of required components from the build.json file.
   *
   * @return {Array} Array of component names.
   */
  function processComponentConfiguration( config ) {
    var components = [];
    for ( var component in config.components ) {
      components.push(component);
    }
    return components;
  }

  /**
   * Gets a stream containing the configuration constants.
   * @returns {Object} Stream containing configuration constants.
   */
  function getConfigConstants() {
    return streamBuffer({
      config: {
        defaultLogLevel: config.defaultLogLevel,
        debug: config.debug,
        html5mode: config.html5mode
      },
      breakpoints: getBreakpoints()
    });
  }

  /**
   * Gets a stream containing the profile constants.
   * @returns {Object} Stream containing profile constants.
   */
  function getProfileConstants() {
    var paths = config.paths;
    var profile = require(paths.config.profile);
    return streamBuffer({
      data: profile.data,
      auth: profile.auth,
      servers: profile.servers,
      database: profile.database
    });
  }

  /**
   * Gets params needed for javascript gulp task.
   *
   * @return {Object} The params for the javascript gulp task.
   */
  function getParams() {
    var paths = config.paths;
    var components = processComponentConfiguration(config);

    // Define the 'params' object.
    var params = {
      paths: {
        js: [],
        templates: []
      },
      modules: []
    };

    // Add core javascript file paths to the 'jsPaths' array.
    Array.prototype.push.apply(params.paths.js, paths.js.src);

    // Get the file paths of all required components that have javascript files.
    for ( var i = 0; i < components.length; i++ ) {
      var component = components[i];
      var moduleJs = paths.bolt + '/components/' + component + '/' + component + '.module.js';

      try {
        // Look for a module javascript file for the current component.
        fs.accessSync(moduleJs, fs.F_OK);

        // Define file paths for any module javascript files, other javascript files (e.g. directives), and the component html template.
        var componentJs = paths.bolt + '/components/' + component + '/*.js';
        var template = paths.bolt + '/components/' + component + '/*.html';

        // Add the javascript file paths to the 'jsPaths' array.
        params.paths.js.push(moduleJs, componentJs);

        // Add the template file path to the 'templatePaths' array.
        params.paths.templates.push(template);

        // Define the component module name for injection into the 'ngBolt' module.
        var module = 'blt_' + component;
        params.modules.push(module);

      } catch( e ) {
      }
    }

    return params;
  }
};