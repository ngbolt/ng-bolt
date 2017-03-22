/**
 * @ngdoc module
 * @name blt_core
 * @sortorder 1
 * @description Contains core functionality and components for ngBoltJS
 *
 * @requires https://docs.angularjs.org/api/ng/service/$animate
 * @requires https://github.com/sparkalow/angular-truncate
 * @requires bltAppProfile
 */
(function() {
  'use strict';

  angular.module('blt_core', [
    // Configuration modules
    'blt_config',
    'blt_dataRoutes',
    'blt_appProfile',
    'blt_appViews',

    // Angular modules
    'ngAnimate',

    // 3rd-party modules
    'truncate'
  ])
    .run(run);

  function run( BltApi ) {
    BltApi.debug('blt_core: running.');
  }

  run.$inject = ["BltApi"];
})();