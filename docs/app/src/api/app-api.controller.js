(function() {
  'use strict';

  /**
   * @ngdoc type
   * @name ApiController
   * @module bltDocs.api
   * 
   * @description The controller for the documentation 
   * section of the ngBoltJS project website
   */
  function AppApiController(Shared, APP_API_DATA) {
    var ctrl = this;

    activate();

    /**
     * @private 
     * @description Initialize the controller by setting
     * the current data for the sidebar menu to DOCS_DATA
     */
    function activate() { 
      Shared.sidebarData = APP_API_DATA;
    }
  }
  
  angular
    .module('api')
    .controller('AppApiController', AppApiController);

  AppApiController.$inject = ['Shared', 'APP_API_DATA'];
})();