var gulp = require('gulp');
var fs = require('fs');
var bump = require('gulp-bump');
var git = require('gulp-git');
var args = require('get-gulp-args')();
var branch = args.b || 'staging';

gulp.task('checkout:staging', function (cb) {
  git.checkout(branch, function (err) {
    if (err) {
      throw err;
    }
    cb();
  });
});

gulp.task('bump', ['checkout:staging'], function () {
  var type = args.t;
  var version = args.rv;

  if (!type && !version) {
    console.error('A value for "type" is required or "version" is required. Pass "type" as a command line argument: "-t=<type>", or "version as "--rv=<version>"');
  } else if (type !== 'major' || type !== 'minor' || type !== 'path' || type !== 'prerelease') {
    console.error('Invalid value for "type". Valid values are "major", "minor", "patch" or "prerelease".');
  }

  if (type) {
    return gulp
      .src('./package.json')
      .pipe(bump({ type: type }))
      .pipe(gulp.dest('./'));
  } else if (version) {
    return gulp
      .src('./package.json')
      .pipe(bump({ version: version }))
      .pipe(gulp.dest('./')); 
  }
});

gulp.task('commit', ['bump'], function () {
  return gulp
    .src('./package.json')
    .pipe(git.commit('up version'));
});

gulp.task('push:staging', ['commit'], function (cb) {
  git.push('origin', branch, function (err) {
    if (err) {
      throw err;
    }
    cb();
  });
});

gulp.task('checkout:master', ['push:staging'], function (cb) {
  git.checkout('master', function (err) {
    if (err) {
      throw err;
    }
    cb();
  });
})

gulp.task('merge', ['checkout:master'], function (cb) {
  git.merge(branch, function (err) {
    if (err) {
      throw err;
    }
    cb();
  });
});

gulp.task('push:master', ['merge'], function (cb) {
  git.push('origin', 'master', function (err) {
    if (err) {
      throw err;
    }
    cb();
  });
});

gulp.task('default', ['push:master'], function (cb) {
  var json = JSON.parse(fs.readFileSync('./package.json'));
  console.log('Successfully release version ' + json.version + '. Checking out ' + branch + '.');
  git.checkout(branch, function (err) {
    if (err) {
      throw err;
    }
    cb();
  });
});