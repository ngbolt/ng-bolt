(function() {
  'use strict';

  angular
    .module('demo.core')
    .factory('TestService', TestService);

  TestService.$inject = ['BltApi'];
  /**
   * @ngdoc service
   * @area app
   * @name TestService
   * @module appCore
   */
  function TestService( BltApi ) {
    var service = {};


    service.func = func;

    BltApi.register(service, 'test');

    return service;

    ////////////////

    function func() {

    }


  }
})();