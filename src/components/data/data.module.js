(function() {
  'use strict';

  var injectedDependencies = ['blt_appProfile', 'blt_dataRoutes'];
  try {
    angular.module('ngCordova');
    injectedDependencies.push('ngCordova');
  } catch( error ) {
    console.warn("Not injecting ngCordova! Module not found.");
  }

  /**
   * @ngdoc module
   * @name blt_data
   *
   * @description
   * The data module provides a unified interface for interacting with various
   * data sources external to an application.
   *
   * @requires http://ngcordova.com/docs/
   * @requires https://docs.angularjs.org/api/ng/service/$http
   * @requires http://autobahn.ws/js/reference.html
   */
  angular.module('blt_data', injectedDependencies);
})();