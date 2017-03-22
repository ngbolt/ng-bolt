var fatalLevel = require('get-gulp-args')().fatal;
var levels = ['error', 'warning'];
var util = require('gulp-util');

function onException( level, err ) {
  var chalk = (level == 'error') ? util.colors.red : util.colors.yellow;

  util.log(chalk(err.message));

  fatalLevel = fatalLevel || 'error';
  if ( levels.indexOf(level) <= levels.indexOf(fatalLevel) ) {
    process.exit(1);
  }
}

module.exports = {
  warning: function( err ) {
    onException('warning', err);
    try {
      this.emit('end');
    } catch( e ) {
    }
  },
  error: function( err ) {
    onException('error', err);
    try {
      this.emit('end');
    } catch( e ) {
    }
  }
};