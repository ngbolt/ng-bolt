(function() {
  'use strict';

  angular.module('demo.menus')
    .controller('MenusController', MenusController)
  ;

  MenusController.$inject = ['BltApi']

  function MenusController( api ) {
    var ctrl = this;

    ctrl.logout = logout;


    activate();

    function logout() {
      api.switchViews('base-styles');
      api.publish('main', 'loading');
      api.publish('bltAuth', 'logout');
    }

    function activate() {
      ctrl.openMenu = '1';
      ctrl.showFloating = false;
    }
  }

})();