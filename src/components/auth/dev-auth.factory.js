(function() {
  'use strict';

  angular.module('blt_auth')
    .factory('DevAuthService', DevAuthService)
  ;

  /**
   * @ngdoc service
   * @name DevAuthService
   * @module blt_auth
   * @description This is a development version of the internal authentication service that can be used to provide user
   * authentication through the BltAuth API during development and testing.
   *
   * To use this service, simply enable the
   * `auth` and `login` components in your `build.json` file and configure the following in your profile:
   * ```
   * "auth": {
   *   "authService": "DevAuthService"
   * }
   * ```
   * To log in via this service, use username 'admin' and password 'password' at the login prompt.
   *
   * @requires https://docs.angularjs.org/api/ng/service/$q
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires BltAuthStorageService
   * @requires BltApi
   *
   */
  function DevAuthService( $q, $timeout, bltAuthStorage, bltApi ) {

    const dev_auth_user = 'dev_auth_user';

    var srv = {
      login: login,
      logout: logout,
      hasCredentials: hasCredentials,
      activate: activate,
      authenticated: false
    }

    return srv;

    ////////////////////////////////////////////////
    // Public Service Functions
    ////////////////////////////////////////////////

    function login( username, password ) {
      var defer = $q.defer();
      if ( username == 'admin' && password == 'password' ) {
        bltAuthStorage.store(dev_auth_user, username, -1);
        $timeout(function() {
          defer.resolve();
          setAuthenticated();
        }, 500);
        console.log("Login success!");
      } else {
        console.log("Login failed!");
        defer.reject('Invalid username / password.');
      }

      return defer.promise;
    }

    function setAuthenticated() {
      if ( !srv.authenticated ) {
        srv.authenticated = true;
        bltApi.publish('bltAuth', 'fireauthenticated');
      }
    }

    function logout() {
      bltAuthStorage.remove(dev_auth_user);
      return $q.when();
    }

    function hasCredentials() {
      if ( !!(bltAuthStorage.retrieve(dev_auth_user)) ) {
        if ( !srv.authenticated ) {
          setAuthenticated();
        }
        return $q.resolve();
      } else {
        return $q.reject();
      }
    }

    function activate() {
      return hasCredentials().then(function() {
        setAuthenticated();
        return $q.resolve();
      }, function() {
        return $q.resolve();
      })
    }

  }

  DevAuthService.$inject = ['$q', '$timeout', 'BltAuthStorageService', 'BltApi'];

})();
