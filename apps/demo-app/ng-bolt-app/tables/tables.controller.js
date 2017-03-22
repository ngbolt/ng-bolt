(function() {
  'use strict';

  angular.module('demo.tables')
    .controller('TablesController', TablesController);

  function TablesController() {
    var ctrl = this;

    activate();

    function activate() {
      ctrl.options = ['dropdown1', 'dropdown2', 'dropdown3', 'dropdown4', 'dropdown5', 'dropdown6', 'dropdown7'];
    }
  }
})();