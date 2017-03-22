(function() {
'use strict';

  angular
    .module('home')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['HOME_DATA', 'Shared'];
  function HomeController(HOME_DATA, Shared) {
    var vm = this;
    

    activate();

    ////////////////

    function activate() {
      Shared.sidebarData = HOME_DATA;
      Shared.showSidebar = false;
      Shared.currentPage = 'home';
    }
  }
})();