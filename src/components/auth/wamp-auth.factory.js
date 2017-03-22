(function() {
  'use strict';

  angular.module('blt_auth')
    .factory('WampAuthService', WampAuthService)
  ;

  /**
   * @ngdoc service
   * @name WampAuthService
   * @module blt_auth
   * @description This version of the internal authentication service is built to connect to a WAMP router that exposes
   * login related RPC endpoints.
   *
   * This service can be used to provide client side authentication for users connecting
   * to WAMP routers. For a complete security model, the WAMP router that we're connecting to must provide proper role
   * restrictions and an authentication service must be available that exposes, at a minimum, login and logout
   * RPC endpoints.
   *
   * Please see the [WAMP Authentication Guide](https://ngbolt.github.io/#/guides/authentication#generic-wamp-authentication) for more information on configuration and usage.
   *
   * @requires https://docs.angularjs.org/api/ng/service/$q
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires BltApi
   * @requires BltData
   * @requires BltAuthStorageService
   *
   */
  function WampAuthService( $q, $timeout, bltApi, bltData, bltAuthStorage ) {

    var authid;
    var secret;
    var authmethod;
    var authdefer;
    var authPreconfigured = false;

    var authCookie = 'wamp_token';

    var srv = {
      login: login,
      logout: logout,
      hasCredentials: hasCredentials,
      activate: activate,
      requiresDataProtocol: requiresDataProtocol,
      /**
       * @member {Boolean} authenticated
       * @description Boolean flag representing the current authentication state of the service. Authenticated is set to true
       * any time user AuthID and token are present.
       *
       */
      authenticated: false
    }

    activate();

    return srv;

    ////////////////////////////////////////////////
    // Public Service Functions
    ////////////////////////////////////////////////

    /**
     * @ngdoc method
     * @name WampAuthService#login
     * @description This function invokes the login RPC endpoint with the `username` and `password` provided. On success of the
     * login RPC, the resulting data, which will contain an AuthID and token is persisted using the
     * BltAuthStorageService, and authentication event is triggered, the WAMP connection is reset and configured to
     * re-connect using the given authentication parameters and the login promise is resolved.
     *
     * On failure of the login RPC, the login promise is rejected with the login error.
     *
     * @param {String} username The username for login attempt.
     * @param {String} password The password for login attempt.
     * @returns {Object} A promise that will be resolved on a successful login and rejected on a failure.
     *
     */
    function login( username, password ) {
      var deferred = $q.defer();
      if ( authmethod == "ticket" ) {
        //Send secure login to CrossBar through data api.
        bltData.call('login', {"username": username, "password": password}).then(function( authtoken ) {
            bltAuthStorage.store(authCookie, angular.toJson(authtoken.data), -1);
            extractCredentialsFromToken(authtoken.data);
            setAuthenticated();
            updateAuthConnectionConfig();
            deferred.resolve();
          },
          function( error ) {
            bltApi.error("Failed to log in.", error);
            deferred.reject(error);
          });
      } else {
        authid = username;
        secret = password;
        updateAuthConnectionConfig();
      }
      return deferred.promise;
    }

    /**
     * @ngdoc method
     * @name WampAuthService#logout
     * @description This function invokes the logout RPC, clears any store authentication tokens, and clears/resets the current
     * authenticated WAMP connection.
     * @returns {Object} A promise that resolves on completion of logout process.
     *
     */
    function logout() {
      authdefer = $q.when();
      srv.authenticated = false;
      bltAuthStorage.remove(authCookie);
      authid = undefined;
      secret = undefined;
      var resolved = false;
      var resolveLogout = function() {
        if ( !resolved ) {
          resolved = true;
          bltApi.publish("bltAuth", "evaluate");
          updateAuthConnectionConfig();
        }
      };
      $timeout(resolveLogout, 500);
      return bltData.call('logout').finally(function() {
        resolveLogout();
      });
    }

    /**
     * @ngdoc method
     * @name WampAuthService#hasCredentials
     * @description Returns a promise that resolves if we currently have an AuthID and token stored that can be used to attempt
     * to establish an authenticated WAMP connection and rejects otherwise.
     * @returns {Object} A promise that will resolve or reject based on whether or not an AuthID and token are
     * currently stored.
     *
     */
    function hasCredentials() {
      if ( authmethod == "ticket" && !authPreconfigured ) {
        var storedToken = bltAuthStorage.retrieve(authCookie);
        if ( storedToken ) {
          return extractCredentialsFromToken(angular.fromJson(storedToken)).then(function() {
            if ( !srv.authenticated ) {
              setAuthenticated();
              updateAuthConnectionConfig();
            }
          }, function() {
            if ( srv.authenticated ) {
              srv.authenticated = false;
              updateAuthConnectionConfig();
            }
          });
        } else {
          if ( srv.authenticated ) {
            authid = undefined;
            secret = undefined;
            srv.authenticated = false;
            updateAuthConnectionConfig();
          }
        }
      }
      if ( authid && secret ) {
        setAuthenticated();
        return $q.resolve();
      } else {
        return $q.reject("Not authenticated.");
      }
    }

    function requiresDataProtocol() {
      return "wamp";
    }

    /**
     * @ngdoc method
     * @name WampAuthService#activate
     * @description Activates the WampAuthService, reading appropriate configuration to determine authentication
     * parameters.
     * @returns {Object} A promise that resolves on successful service initialization and rejects on failure.
     *
     */
    function activate() {
      try {
        srv.authenticated = false;
        var $profile = angular.injector(['blt_appProfile']);
        var $auth = $profile.get('auth');

        if( $auth.authCookie ){
          authCookie = $auth.authCookie;
        }

        authid = $auth.authKey;
        secret = $auth.authSecret;

        if ( authid && secret ) {
          authPreconfigured = true;
        }

        authmethod = $auth.wampAuthMethod;
        if ( !authmethod ) {
          if ( authid && secret ) {
            authmethod = "wampcra";
          } else {
            authmethod = "ticket";
          }
        }

        bltApi.subscribe('bltData', onBltDataMessage);

        if ( authPreconfigured ) {
          updateAuthConnectionConfig();
        }

        return hasCredentials().then(function() {
            return $q.resolve();
          },
          function() {
            return $q.resolve();
          });
      } catch( error ) {
        console.warn("Unable to initialize Wamp Auth.")
        return $q.reject();
      }
    }


    ////////////////////////////////////////////////
    // Private functions
    ////////////////////////////////////////////////

    function setAuthenticated() {
      if ( !srv.authenticated ) {
        srv.authenticated = true;
      }
    }

    function onChallenge( session, method, extra ) {
      if ( authmethod == "ticket" && method == "ticket" ) {
        return secret;
      } else if ( authmethod == "wampcra" && method == "wampcra" ) {
        return autobahn.auth_cra.sign(secret, extra.challenge);
      } else {
        console.error("Unable to handle challenge of type: %s", method);
      }
    }

    function extractCredentialsFromToken( token ) {
      if ( token && token.authid && token.ticket ) {
        authid = token.authid;
        secret = token.ticket;
        return $q.resolve();
      } else {
        authid = undefined;
        secret = undefined;
        return $q.reject();
      }
    }

    function updateAuthConnectionConfig() {
      if ( authid && secret ) {
        return bltData.setConnectionConfig({
          "authmethods": [authmethod],
          "authid": authid,
          "secret": secret,
          "onchallenge": onChallenge
        });
      } else {
        return bltData.setConnectionConfig();
      }
    }

    function onBltDataMessage( msg ) {
      if ( msg === 'auth_failed' ) {
        onAuthFailed();
      }
    }

    function onAuthFailed() {
      if ( !authPreconfigured ) {
        authid = undefined;
        secret = undefined;
        srv.authenticated = false;
        bltAuthStorage.remove(authCookie);
        location.reload();
      }
    }
  }

  WampAuthService.$inject = ['$q', '$timeout', 'BltApi', 'BltData', 'BltAuthStorageService'];

})();
