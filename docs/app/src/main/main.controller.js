(function() {
'use strict';

  angular
    .module('main')
    .controller('MainController', MainController);

  MainController.inject = ['Shared', '$scope'];
  function MainController(Shared, $scope) {
    var ctrl = this;

    activate();

    function activate() { 
      $scope.$on('$viewContentLoaded', onRouteChange);
    }

    function onRouteChange(event, route){
      ctrl.currentPage = Shared.currentPage;
    }
  }
})();