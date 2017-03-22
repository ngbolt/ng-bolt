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
  function ApiController(Shared, API_DATA, $window) {
    var ctrl = this;

    ctrl.scrollToTop = scrollToTop;

    activate();

    /**
     * @private 
     * @description Initialize the controller by setting
     * the current data for the sidebar menu to DOCS_DATA
     */
    function activate() { 
      Shared.sidebarData = API_DATA;
      Shared.showSidebar = true;
      Shared.currentPage = 'api';
    }

    /**
     * @private 
     * @description Scroll to the top of the page.
     */
    function scrollToTop(){
      debugger;
      
      $window.scrollTo(0,0);
    }
  }
  
  angular
    .module('api')
    .controller('ApiController', ApiController);

  ApiController.$inject = ['Shared', 'API_DATA', '$window'];
})();