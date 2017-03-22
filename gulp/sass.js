var autoprefixer = require('gulp-autoprefixer');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var gulpIf = require('gulp-if');
var jsonScss = require('gulp-json-scss');
var jsonTransform = require('gulp-json-transform');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var streamqueue = require('streamqueue');
var streamBuffer = require('./plugins/stream-buffer.js').streamBuffer;

module.exports = function( gulp, config ) {
  return function() {
    var paths = config.paths;

    return streamqueue({objectMode: true},
      streamBuffer({components: config.components})
        .pipe(jsonScss()),

      // get functions needed for compiles some variables
      gulp.src(paths.bolt + '/core/scss/_functions.scss'),

      // get build component values
      gulp.src(paths.config.styles)
        .pipe(jsonTransform(function( data ) {
          return data;
        }))
        // convert components to sass variables
        .pipe(jsonScss()),

      gulp.src(paths.app + '/app.scss')
    )

      .pipe(gulpIf(config.env == 'development', sourcemaps.init()))
      .pipe(concat('app.scss'))
      .pipe(sass({
        includePaths: paths.sass.build,
        outputStyle: 'expanded'
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie 10', 'Android >= 2.1', 'Safari >= 6.1']
      }))
      .pipe(gulpIf(config.env == 'production' && !config.beautify, cleanCss()))
      .pipe(gulpIf(config.env == 'development', sourcemaps.write()))
      .pipe(gulp.dest(config.buildDest + '/css'))
      .pipe(gulpIf(config.serve, connect.reload()));
  };
};