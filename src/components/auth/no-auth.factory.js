(function() {
  'use strict';

  angular.module('blt_auth')
    .factory('NoAuthService', NoAuthService)
  ;

  NoAuthService.$inject = ['$q'];

  function NoAuthService( $q ) {

    var srv = {
      login: login,
      logout: logout,
      hasCredentials: hasCredentials,
      authenticated: false
    }

    return srv;

    ////////////////////////////////////////////////
    // Public Service Functions
    ////////////////////////////////////////////////

    function login() {
      return $q.reject('Auth disabled');
    }

    function logout() {
      return $q.reject('Auth disabled');
    }

    function hasCredentials() {
      return $q.reject('Auth disabled');
    }
  }
})();
