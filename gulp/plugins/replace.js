var replaceTask = require('gulp-replace-task')

module.exports = {
  replace: replace
};

function replace( config ) {
  return replaceTask({
    patterns: [
      {match: 'baseUrl', replacement: config.html5mode || ( config.baseUrl && config.platform != 'cordova' ) ? '<base href="' + (config.baseUrl || '/') + '">' : ''},
      {match: 'title', replacement: getTitle(config.package)},
      {match: 'version', replacement: config.package.version || ''},
      {match: 'logo', replacement: config.logoUrl || 'images/logo.png'},
      {match: 'classification', replacement: config.components.classificationbar ? 'classification' : ''},
      {match: 'login', replacement: config.components.login ? '<blt-login></blt-login>' : ''},
      {match: 'cordova', replacement: config.platform == 'cordova' ? '<script src="cordova.js"></script>' : ''}
    ]
  })
}

function getTitle( package ) {
  if ( package.title ) {
    return package.title;
  }
  if ( package.name ) {
    return titleCase(package.name.replace(/-/g, ' '));
  }
  return '';
}

function titleCase( str ) {
  str = str.toLowerCase().split(' ');
  for ( var i = 0; i < str.length; i++ ) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}