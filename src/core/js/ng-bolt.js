(function() {
  'use strict';

  /**
   * @name ngBoltJS
   * @description This is the root module for ngBoltJS. It loads the core
   * module, configuration modules, and optional component modules. The
   * optional configuration modules are added to the ngBoltJS module
   * in the javascript.js gulp task during the gulp build.
   */
  angular.module('ngBolt', [
    'blt_core'
  ])
    .config(configFn)
    .run(run);

  /**
   * @function configFn
   * @description Sets configurations to the ngBoltJS module
   * @param {Object} $animateProvider The AngularJs [ngAnimate provider](https://docs.angularjs.org/api/ng/provider/$animateProvider)
   */
  function configFn( $animateProvider ) {
    // use 'blt-animate' class name on elements to animate with ngAnimate.
    $animateProvider.classNameFilter(/blt-animate/);
  }

  configFn.$inject = ['$animateProvider'];

  function run( BltApi ) {
    BltApi.debug('ngBoltJS: running.');
  }

  run.$inject = ["BltApi"];
})();
