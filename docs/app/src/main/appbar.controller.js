(function() {
'use strict';

  angular
    .module('main')
    .controller('AppbarController', AppbarController);

  AppbarController.$inject = ['API_DATA', 'APP_API_DATA', 'GUIDES_DATA', 'HOME_DATA'];
  function AppbarController(API_DATA, APP_API_DATA, GUIDES_DATA, HOME_DATA) {
    var ctrl = this;
    
    activate();

    function activate() { 
      ctrl.apiData = API_DATA;
      ctrl.appData = APP_API_DATA;
      ctrl.guidesData = GUIDES_DATA;
      ctrl.homeData = HOME_DATA;
    }
  }
})();