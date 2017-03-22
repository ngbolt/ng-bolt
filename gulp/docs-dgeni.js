var Dgeni = require('dgeni');

module.exports = function( gulp, config ) {
  return function( cb ) {
    var dgeni = new Dgeni([require('../docs/config')])

    return dgeni.generate().then(function() {
      console.log('Completed docs generation with dgeni.');
      return;
    });
  }
}