(function() {
  'use strict';

  angular.module('app', [
    'demo.core',

    // app modules
    'demo.main',
    'demo.forms',
    'demo.tables',
    'demo.modals',
    'demo.menus',
    'demo.components'

  ])
    .config(config)
    .run(run);


  config.$inject = ['$compileProvider', '$routeProvider', '$locationProvider', 'views', 'config'];
  function config( $compileProvider, $routeProvider, $locationProvider, views, config ) {
    $compileProvider.debugInfoEnabled(false);

    for ( var i = 0; i < views.length; i++ ) {
      $routeProvider.when(views[i].path, views[i].route);
    }

    $locationProvider.html5Mode(config.html5mode);
  }

  run.$inject = ['$route'];
  function run( $route ) {
    FastClick.attach(document.body);

    // When ng-view is inside a ng-include the instantiation is delayed and $route instantiation is delayed as well, 
    // and $route will miss the location change event (and routing will not be performed at all). To bypass this, 
    // invoke the $route update function on application initialization.
    $route.reload();
  }
})();