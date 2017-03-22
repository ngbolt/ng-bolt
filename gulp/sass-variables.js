var del = require('del');
var mergeJson = require('gulp-merge-json');
var octophant = require('octophant');
var sassJson = require('gulp-sass-json');

module.exports = function( gulp ) {

  var config = {};
  config.octophant = {
    src: './src/**/*.scss',
    options: {
      output: 'styles.scss',
      sort: ['global', 'grid', 'font', 'buttons', 'forms', 'base', 'textfield']
    }
  };
  config.sassToJson = {
    src: './' + config.octophant.options.output,
    dest: './src/core/scss'
  };
  config.mergeJson = {
    src: [config.sassToJson.dest + '/styles.json', './config/styles.json'],
    name: 'styles.json',
    dest: './config'
  };

  gulp.task('octophant', function( cb ) {
    octophant(config.octophant.src, config.octophant.options, cb);
  });

  gulp.task('sass-to-json', ['octophant'], function() {
    return gulp
      .src(config.sassToJson.src)
      .pipe(sassJson())
      .pipe(gulp.dest(config.sassToJson.dest));
  });

  gulp.task('merge-json', ['sass-to-json'], function() {
    return gulp
      .src(config.mergeJson.src)
      .pipe(mergeJson(config.mergeJson.name))
      .pipe(gulp.dest(config.mergeJson.dest));
  });

  gulp.task('sass-variables', ['merge-json'], function() {
    del('./' + config.octophant.options.output);
  });
}