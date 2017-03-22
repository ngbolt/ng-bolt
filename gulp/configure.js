var args = require('get-gulp-args')();
var exception = require('./plugins/exception.js');
var merge = require('./plugins/merge.js').merge;
var path = require('path');

module.exports = function() {
  var config = getBuildConfig(args, getProfileName(args), getRoot(args));
  config.env = args.env || 'development';
  config.package = getPackage();
  return config;

  /**
   * Get the appRoot from args if it was specified. Make sure that appRoot starts with '/'. If appRoot was not
   * specified, returns the initial working directory.
   *
   * @param args Command line args.
   * @returns The absolute app root directory.
   */
  function getRoot( args ) {
    var root = process.env.INIT_CWD;
    if ( args.appRoot ) {
      root = path.join(root, args.appRoot);
    }
    if ( root.endsWith('/') || root.endsWith('\\') ) {
      root = root.slice(0, -1);
    }
    return root;
  }

  /**
   * Gets the package json for this project. Looks first for configured package json path, then in appRoot, then in
   * the initial working directory. If none are found, returns an empty object.
   * @returns {Object} The package json.
   */
  function getPackage() {
    try {
      return require(path.join(config.root, (config.packagePath || 'package.json')));
    } catch( e ) {
      try {
        return require(path.join(process.env.INIT_CWD, 'package.json'));
      } catch( e ) {
        return {};
      }
    }
  }

  /**
   * Assemble build properties from a combination of our defaults, anything in build.json and anything inside our
   * profileName build attribute.
   *
   * @param args The program arguments.
   * @returns {Object} Build properties.
   */
  function getBuildConfig( args, profileName, root ) {
    var config = defaultBuildConfig();
    config.root = root;
    config.profileName = profileName;
    config.initCwd = process.env.INIT_CWD;
    config.gulpBase = process.cwd();

    config.paths = {};

    config.paths.config = getConfigPaths(config);

    try {
      merge(config, require(config.paths.config.build));
    } catch( e ) {
      //No build.json found.
    }
    try {
      if ( config.profileName ) {
        merge(config, require(config.paths.config.profile).build)
      }
    } catch( e ) {
      //No profileName build settings found.
    }

    // Pull in any command line arguments that override build properties.
    for ( var attr in config ) {
      if ( config[attr] === null || typeof config[attr] !== 'object' ) {
        if ( args.hasOwnProperty(attr) ) {
          config[attr] = args[attr];
          if ( config[attr] && config[attr] === 'false' ) {
            config[attr] = false;
          }
        }
      }
    }

    // If the build dest isn't an absolute path, join with init CWD
    if ( !config.buildDest.startsWith('/') ) {
      config.buildDest = path.join(config.initCwd, config.buildDest);
    }

    // If the docs dest isn't an absolute path, join with init CWD
    if ( !config.docsDest.startsWith('/') ) {
      config.docsDest = path.join(config.initCwd, config.docsDest);
    }

    assembleApplicationPaths(config);

    return config;
  }

  /**
   * Get the default build properties.
   * @returns {Object} The default build properties.
   */
  function defaultBuildConfig() {
    return {
      "appSrc": "ng-bolt-app",
      "ngBoltSrc": "./node_modules/ng-bolt/src",
      "port": 9000,
      "docsPort": 9001,
      "libraries": {
        "css": [],
        "js": [],
        "fonts": [],
        "static": []
      },
      "debug": true,
      "defaultLogLevel": "debug",
      "generateBoltDocs": true,
      "generateAppDocs": false,
      "buildDest": "build/app",
      "docsDest": "build/docs",
      "html5mode": false,
      "serve": true,
      "beautify": true,
      "gzip": false,
      "target": "web",
      "autoReload": true,
      "cleanIgnore": [],
      "components": {
        "auth": false,
        "appbar": true,
        "cards": true,
        "checkboxradio": true,
        "classificationbar": true,
        "counter": true,
        "datepicker": true,
        "fileloader": true,
        "fontAwesome": true,
        "lists": true,
        "login": true,
        "menu": true,
        "modal": true,
        "notifications": true,
        "panel": true,
        "dropdown": true,
        "tables": true,
        "tabs": true,
        "textfield": true,
        "toggleswitch": true,
        "view": true,
        "data": {
          "http": true,
          "sqlite": true,
          "wamp": true
        }
      }
    }
  }

  function getConfigPaths( config ){
    return {
      app: path.join( config.root, '/config/app.json' ),
      build: path.join( config.root, '/config/build.json' ),
      styles: path.join( config.root,  '/config/styles.json' ),
      routes: config.profileName ? path.join( config.root, '/config/routes.json' ) : '',
      profile: config.profileName ? path.join( config.root, '/config/profiles/', config.profileName + '.json' ) : '',
      views: path.join( config.root, '/config/views.json')
    };
  }

  /**
   * get paths required for gulp build tasks
   * @return {object} the paths object
   * @todo reorganize paths to match gulp tasks and separate by
   * src, watch, and dest. Ex: paths.javascript = {src: [], dest: [], watch}
   *
   */
  function assembleApplicationPaths( config ) {
    var paths = config.paths;

    try {
      paths.app = config.root + '/' + config.appSrc;
    } catch( err ) {
      exception.error(err);
    }

    paths.bolt = './src';
    paths.docs = config.buildDest + '/docs';

    paths.html = {
      base: [
        paths.app + '/index.html',
        paths.app + '/**/*.*',
        paths.app + '/.htaccess',
        '!' + paths.app + '/**/*.template.html',
        '!' + paths.app + '/**/*.{scss,js}',
        '!' + paths.app + '/libs/**/*.*'
      ],
      partials: paths.app + '/**/*.template.html',
    };

    paths.sass = {
      build: [
        paths.bolt + '/core/scss',
        paths.bolt + '/components',
        paths.app,
        '!' + paths.app + '/libs/css/*.*'
      ],
      deploy: paths.bolt + '/**/**/*.scss',
      libs: [config.initCwd + '/node_modules/normalize.css/normalize.css']
    };

    paths.js = {
      deploy: [
        // TODO: make copyright generic string and concat to js and css files.
        paths.bolt + '/core/copyright.js',
        paths.bolt + '/**/*.js'
      ],
      src: [
        paths.bolt + '/core/js/*.module.js',
        paths.bolt + '/core/js/*.js',
        '!' + paths.bolt + '/core/js/ng-bolt.js',
        '!' + paths.bolt + '/core/copyright.js'
      ],
      build: [
        paths.app + '/app.js',
        paths.app + '/**/*.module.js',
        paths.app + '/**/*.js',
        '!' + paths.app + '/libs/js/*.js'
      ],
      libs: [
        config.initCwd + '/node_modules/angular/angular.js',
        config.initCwd + '/node_modules/angular-animate/angular-animate.min.js',
        config.initCwd + '/node_modules/angular-truncate-2/dist/angular-truncate-2.min.js',
        config.initCwd + '/node_modules/fastclick/lib/fastclick.js'
      ]
    };

    paths.docs = {
      dest: config.docsDest,
      appSrc: './docs/app/src'
    }

    return paths;
  }

  /**
   * Gets the data profileName ('development', 'production', etc) that is passed to the gulp command.
   * If the data service is not required, return an empty string. If it is required and no profileName
   * was passed, throw an error.
   */
  function getProfileName( args ) {
    var requireProfile = false;
    // Return profileName if data required
    if ( args.pr ) {
      return args.pr;
    } else {
      if ( requireProfile ) {
        err = {message: 'Profile is undefined!'};
        exception.error(err);
      }
    }
    return '';
  }
};
