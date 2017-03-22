(function() {
  'use strict';

  angular.module('demo.modals')
    .controller('ModalsController', ModalsController);

  ModalsController.$inject = ['BltApi'];
  function ModalsController( api ) {
    var ctrl = this;

    ctrl.openFullScreenModal = openFullScreenModal;
    ctrl.flip = flip;
    ctrl.togglePanel = togglePanel;

    activate();

    function activate() {
      ctrl.options = ['option1', 'option2', 'option3', 'option4', 'option5'];
    }

    function openFullScreenModal() {
      // do some stuff here

      api.publish('fullModal', 'open');
    }

    function flip( modalId ) {
      api.publish(modalId, 'flip');
    }

    function togglePanel( panelId ) {
      api.publish(panelId, 'toggle');
    }
  }

})();