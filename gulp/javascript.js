var angularExtender = require('gulp-angular-extender');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var fs = require('fs');
var gulpIf = require('gulp-if');
var gulpNgConfig = require('gulp-ng-config');
var html2js = require('gulp-ng-html2js');
var path = require('path');
var plumber = require('gulp-plumber');
var replace = require('./plugins/replace.js').replace;
var sourcemaps = require('gulp-sourcemaps');
var streamqueue = require('streamqueue');
var streamBuffer = require('./plugins/stream-buffer.js').streamBuffer;
var uglify = require('gulp-uglify');

module.exports = function( gulp, config ) {

  return function() {
    var paths = config.paths;

    // Get parameters for javascript task.
    var params = getParams();

    return streamqueue({objectMode: true},

      // Build and inject config settings
      getConfigConstants()
        .pipe(gulpNgConfig('blt_config')),

      // Build and inject profile settings
      getProfileConstants()
        .pipe(gulpNgConfig('blt_appProfile')),

      // Convert routes file to module
      gulp.src(paths.config.routes)
        .pipe(gulpNgConfig('blt_dataRoutes')),

      // Convert views json file to module
      gulp.src(paths.config.views)
        .pipe(gulpNgConfig('blt_appViews')),

      // Inject required component names into ng-bolt module
      gulp.src(paths.bolt + '/core/js/ng-bolt.js')
        .pipe(angularExtender({
          "ngBolt": params.modules
        })),

      // Get required component javascript file paths.
      gulp.src(params.paths.js),

      // Compile component html templates into javascript.
      gulp.src(params.paths.templates, {base: paths.bolt + '/components'})
        .pipe(replace(config))
        .pipe(html2js({
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
      gulp.src(paths.js.build).pipe(replace(config))
    )
      .pipe(sourcemaps.init())
      .pipe(concat('app.js'))
      .pipe(gulpIf(config.env == 'development', sourcemaps.write()))
      .pipe(gulpIf(config.env == 'production' && !config.beautify, uglify()))
      .pipe(gulp.dest(config.buildDest + '/js'))
      .pipe(gulpIf(config.serve, connect.reload()));
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
    if ( styles.breakpoints[bp] !== undefined ) {
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
  function extractComponentsFromConfig( config ) {
    if ( config.components.login && !config.components.auth ) {
      config.components.auth = true;
    }

    var components = [];

    for ( var component in config.components ) {
      if ( config.components[component] === true ) {
        components.push(component);
      } else if ( component === 'data' && config.profileName ) {
        components.push(component);
      }
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
    var components = extractComponentsFromConfig(config);

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
