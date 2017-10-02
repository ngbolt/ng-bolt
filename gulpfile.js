/**
 * ngBoltJS gulpfile
 *
 * Run `gulp --pr <profile>` Where profile is the name of the profile you
 * want to build with and run a complete build of an ng-bolt-app, 
 * start a local development server and rebuild on file changes.
 * 
 * Run `gulp build --pr <profile>` Where profile is the name of the profile
 * you want to build with and run a one-time build of an ng-bolt-app.
 *
 * Run `gulp deploy --pr <profile>` Where profile is the name of the profile
 * you want to build with and run a one-time build of an ng-bolt-app, 
 * minify generated assets, and optionally gzip.
 * 
 * Run `gulp <task> --pr <profile>` Where task is the name of the gulp task
 * you want run and profile is the profile you want to you use to run a single
 * task once.
 */

const gulp      = require('gulp');
const path      = require('path');
const runSequence = require('run-sequence');
const connect   = require('gulp-connect');
const watch     = require('gulp-watch');
var merge       = require('./gulp/plugins/merge.js').merge;
var config      = require('./gulp/configure.js')();


/**
 * Gets the specified gulp task module.
 * @param  {string} task - the filename of the task (.e.g. 'sass' for 'gulp-tasks/sass.js')
 * @return {function} - the task function
 */
function getTask(task) {
  return require('./gulp/' + task)(gulp, config);
}

/**
 * Delete the build output directory's content
 */
gulp.task('clean', getTask('clean'));

/**
 * List of build tasks
 */
var buildTasks = [
  'copy',
  'libs-css',
  'libs-fonts',
  'libs-pre-js',
  'libs-js',
  'sass',
  'javascript'
];

/**
 * Register build tasks
 */
buildTasks.forEach(function(task){
  gulp.task(task, getTask(task));
})

/**
 * Build the entire app once, without starting a server, optionally
 * build documentation.
 */
gulp.task('build', function(cb){
  if ((config.generateAppDocs || config.generateBoltDocs) && buildTasks.indexOf('docs') == -1) {
    buildTasks.push('docs');
  }
  runSequence('clean', buildTasks, cb);
});

/**
 * Gzip the build output.
 * TODO: test output
 */
gulp.task('gzip', ['build'], getTask('gzip'));

/**
 * Build the app and optionally documentation, minify assets and gzip.
 */
gulp.task('deploy', ['gzip'], function(){
  console.log('Deployed application successfully to ' + config.buildDest);
});

/**
 * Documentation Build Tasks
 */
var docTasks = [
  'docs-css',
  'docs-js',
  'docs-dgeni',
  'docs-static'
];

/**
 * Register Documentation Tasks
 */
gulp.task('docs-clean', getTask('docs-clean'));
docTasks.forEach(function(task){
  gulp.task(task, getTask(task));
})

/**
 * Generate documentation
 */
gulp.task('docs', function(cb){
  runSequence('docs-clean', docTasks, cb);
});

/**
 * Start development server(s)
 */
gulp.task('connect', getTask('connect'));

/** 
 * Builds the app, start a server, and reruns tasks when files change.
 */
gulp.task('default', ['build', 'connect'], function(){
  var paths = config.paths;

  if (config.generateAppDocs || config.generateBoltDocs) {
    // Watch docs build output and reload on changes.
    watch(paths.docs.dest).pipe(connect.reload());

    // Watch docsApp src files.
    // TODO: add watch paths to config.paths
    gulp.watch(['./docs/config/examples/templates/**/*.html'], ['docs-dgeni']);
    gulp.watch(['./docs/config/templates/**/*.html'], ['docs-dgeni']);
    gulp.watch(['./docs/content/**/*.md'], ['docs-dgeni']);
    gulp.watch(path.join(config.root, 'content/**/*.md'), ['docs-dgeni']);
    gulp.watch(['./docs/app/src/**/*.js'], ['docs-js']);
    gulp.watch(['./docs/app/src/**/*.scss'], ['docs-css']);

    console.log('Watching docsApp src files and reloading on changes.')
  }

  if (config.generateBoltDocs) {
    // TODO: add watch paths to config.paths
    gulp.watch(path.join(config.root, 'content/**/*.md'), ['docs-dgeni']);
    console.log('Watching ngBoltJS js src files and updating documentation.');
  }
  
  if (config.generateAppDocs) {
    // TODO: move watch paths to config.paths
    gulp.watch(path.join(config.root, config.appSrc, '**/*.js'), ['docs-dgeni']);

    console.log('Watching app js src files and updating documentation.');
  }

  // Watch build config file and profiles for changes.
  // TODO: move build watch paths to config.paths
  var buildPaths = [
    path.join(config.root, 'config/profiles/*.json'),
    paths.config.build
  ]
  gulp.watch(buildPaths, function(){
    console.log('build changes');
    // Clear out existing config and cached require files.
    for (var member in config) delete config[member];
    delete require.cache[require.resolve('./gulp/configure.js')];
    delete require.cache[require.resolve(paths.config.build)];
    if ( config.profileName ) {
      delete require.cache[require.resolve(paths.config.profile)];
    }
    // Load new config into existing config object. 
    // NOTE: We have to rebuild config in the same object because this object reference
    // has been passed into all of our other tasks. Replacing the object would result in those
    // tasks retaining an old copy of config.
    merge(config, require('./gulp/configure.js')());
    runSequence('build');
  });

  // Watch static html files and partials for changes.
  // TODO: move copy watch paths to config.paths
  var copyPaths = [
    paths.html.base,
    paths.html.partials
  ]
  gulp.watch(copyPaths, ['copy']);
  
  // Watch javascript files for changes.
  // TODO: move javascript watch paths to config.paths
  var jsPaths = [
    path.join(paths.bolt, '/**/*.js'),
    paths.js.build,
    path.join(paths.bolt, '/components/**/*.template.html'),
    paths.config.routes,
    paths.config.views
  ];
  gulp.watch(jsPaths, ['javascript']);

  // Watch Sass files for changes.
  // TODO: move sass watch paths to config.paths
  var sassPaths = [
    path.join(paths.bolt, '/**/*.scss'),
    path.join(paths.app, '/**/*.scss'),
    paths.config.styles
  ]
  gulp.watch(sassPaths, ['sass']);

  // Log success message to console when build is complete.
  console.log('Completed app build to ' + config.buildDest + (config.serve ? ' on http://localhost:' +
    config.port + ' ': '') + 'and watching for changes.');
});

/**
 * Generate documentation, start a local development server, and 
 * rerun tasks when doc src files change.
 */
gulp.task('docs-watch', ['docs', 'connect'], function(){
  var paths = config.paths;

  // Watch docs build output and reload on changes.
  watch(paths.docs.dest).pipe(connect.reload());

  // Watch docsApp src files.
  // TODO: add watch paths to config.paths
  gulp.watch(path.join(config.root, 'content/**/*.md'), ['docs-dgeni']);
  gulp.watch(['./docs/config/examples/templates/**/*.html'], ['docs-dgeni']);
  gulp.watch(['./docs/config/templates/**/*.html'], ['docs-dgeni']);
  gulp.watch(['./docs/content/**/*.md'], ['docs-dgeni']);
  gulp.watch(['./docs/app/src/**/*.js'], ['docs-js']);
  gulp.watch(['./docs/app/src/**/*.scss'], ['docs-css']);

  if (config.generateBoltDocs) {
    // TODO: add watch paths to config.paths
    gulp.watch([(config.docsSrc || './src/**/*.js')], ['docs-dgeni']);
  }
  
  if (config.generateAppDocs) {
    // TODO: move watch paths to config.paths
    gulp.watch(path.join(config.root, config.appSrc, '**/*.js'), ['docs-dgeni']);
  }

  console.log('Completed docs build. Navigate to http://localhost:' + config.docsPort + ' to view docs.');
})

/**
 * Extract sass variables and output to json file.
 * TODO: move to release task.
 */
gulp.task('sass-variables', getTask('sass-variables'));