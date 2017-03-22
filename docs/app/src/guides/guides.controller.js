(function () {
  'use strict';

  /**
   * @ngdoc type
   * @name GuidesController
   * @module bltDocs.guides
   * 
   * @description Controller for the guides section of the
   * ngBoltJS project website.
   */
  function GuidesController(GUIDES_DATA, Shared, $scope, $timeout) {
    var ctrl = this;

    // $scope.$on('$viewContentLoaded', function(){
    //   console.log('GuidesController: routeChangeSuccess');
    //   hljs.initHighlighting();
    // })
    
    activate();

    /**
     * @private 
     * @description Initialize the controller and set the
     * current data for the sidebar menu to GUIDES_DATA
     */
    function activate(){
      Shared.sidebarData = GUIDES_DATA;
      Shared.showSidebar = true;
      Shared.currentPage = 'guides';
    }
  }

  angular
    .module('guides')
    .controller('GuidesController', GuidesController);
  
  GuidesController.$inject = ['GUIDES_DATA', 'Shared', '$scope', '$timeout'];
})();