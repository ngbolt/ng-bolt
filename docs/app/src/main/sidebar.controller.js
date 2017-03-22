(function() {
'use strict';

  /**
   * @ngdoc type
   * @name SidebarController
   * @module bltDocs.main
   * 
   * @description The controller for the sidebar menu. 
   */
  function SidebarController(Shared, $scope, $location, $filter) {
    var ctrl = this;

    ctrl.activeItem = undefined;

    activate();

    /**
     * @private 
     * @description Activate the sidebar controller and load the
     * current sidebar data from the Shared service.
     */
    function activate() {
      // Handle a route change
      $scope.$on('$routeChangeSuccess', onRouteChange);
    }

    /**
     * @private
     * @description When the path of the url successfully changes, set
     * the active item using the path from the $location service
     */
    function onRouteChange(event, route){
      ctrl.activeItem = $location.path();
      ctrl.show = Shared.showSidebar;
      ctrl.list = $filter('orderBy')(Shared.sidebarData, '+order');
    }
  }
  
  angular
    .module('main')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['Shared', '$scope', '$location', '$filter'];
})();