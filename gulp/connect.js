var connect = require('gulp-connect');
var history = require('connect-history-api-fallback');
var path = require('path');

module.exports = function( gulp, config ) {
  return function() {
    // Set up app development server
    if ( config.serve ) {
      connect.server({
        name: 'ngBoltJS App',
        root: config.buildDest,
        port: config.port || 9000,
        livereload: true,
        middleware: function( connect, opt ) {
          return [history({})]
        }
      });
    }

    // Set up docsApp development server if port is different from build port
    if ( config.serve && config.docsPort !== config.port && (config.generateBoltDocs || config.generateAppDocs) ) {
      connect.server({
        name: 'Docs App',
        root: path.join(config.docsDest),
        port: config.docsPort || 9001,
        livereload: true,
        middleware: function( connect, opt ) {
          return [history({})]
        }
      })
    }
  };
};