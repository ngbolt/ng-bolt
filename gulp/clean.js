var del = require('del');
var path = require('path');

module.exports = function( gulp, config ) {
  return function() {
    var cleanPaths = [config.buildDest + '/**', '!' + config.buildDest]

    for ( var i = 0; i < config.cleanIgnore.length; i++ ) {
      var ignorePath = path.join(config.buildDest, config.cleanIgnore[i]);
      var relativePath = path.relative(config.buildDest, ignorePath);
      while(relativePath != "."){
      	relativePath = path.dirname(relativePath);
      	cleanPaths.push('!' + path.join(config.buildDest, relativePath));
      }
      cleanPaths.push('!' + ignorePath);
    }

    return del.sync(cleanPaths, {force: true});
  };
};