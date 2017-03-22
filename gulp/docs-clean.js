var del = require('del');
var path = require('path');

module.exports = function( gulp, config ) {
  var paths = [
    path.join(config.paths.docs.dest, '**'),
    '!' + path.join(config.paths.docs.dest)
  ];

  return function( cb ) {
    del.sync(paths, {force: true});
    cb();
  }
}