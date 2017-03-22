(function() {
'use strict';

  angular
    .module('api')
    .controller('RunnableExampleController', RunnableExampleController);

  RunnableExampleController.inject = [];
  function RunnableExampleController() {
    var ctrl = this;

    ctrl.showExample = undefined;
    ctrl.example = null;

    ctrl.setDefaultExample = setDefaultExample;

    activate();

    function activate() { 

    }

    function setDefaultExample(example) {
      ctrl.showExample = example;
    }
  }
})();