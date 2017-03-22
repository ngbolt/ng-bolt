(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_auth
   * @description ngBoltJS Authentication module.
   *
   * @since 2.0.0
   *
   */
  angular.module('blt_auth', ['blt_data'])
    .factory('BltAuth', BltAuth)
    .factory('BltAuthStorageService', BltAuthStorageService)
  ;

  /**
   * @ngdoc service
   * @name BltAuth
   * @module blt_auth
   * @description This service provides an API to facilitate user authentication in ngBoltJS applications.
   *
   * To use this service,
   * enable the auth component in `build.json` and then include this service in any
   * application services, factories, controllers, etc, where an awareness of authentication states and/or user
   * information is needed.
   * This service is set up to act as a generic layer between the application developer's code
   * and the actual authentication service implementation that is used. When this service initializes, it reviews the
   * auth configuration from the loaded profile and loads an internal service that is specified in that configuration.
   * ```
   * "auth": {
   *   "authService": "DevAuthService"
   * }
   * ```
   *
   * The service specified in this configuration property will handle the actual work of user authentication and is
   * referred to as the 'internal' authentication service. Two pre-built internal authentication services are included
   * in ngBoltJS for your convenience:
   * {@link WampAuthService} and {@link DevAuthService}. Please see
   * service specific documentation for usage.
   *
   * To support custom authentication to a custom back end service, you can provide your own implementation of the
   * internal authentication service in this configuration property.
   *
   * For more details on authentication configuration and detailed usage please review the
   * {@link authentication Authentication Guide}.
   *
   * @requires BltApi
   * @requires BltData
   * @requires https://docs.angularjs.org/api/auto/service/$injector
   * @requires https://docs.angularjs.org/api/ng/service/$q
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   */
  function BltAuth( bltApi, bltData, $injector, $q, $timeout ) {

    var authService = {};
    var connectedDefer;
    var isConnected = false;
    var requiresDataConnection = false;
    var requiredProtocolAvailable = false;

    var srvc = {
      login: login,
      logout: logout,
      hasCredentials: hasCredentials,
      connect: connect,
      available: available,
      /**
       * @description This BltAuth member function can be assigned by the user to hook the authentication event. Every time
       * the authentication state flips from unauthenticated to authentication, this function will be invoked.
       *
       */
      onauthenticate: undefined
    }

    activate();

    return srvc;

    /**
     * @ngdoc method
     * @name BltAuth#login
     * @description This function is called from the ngBoltJS login component when the user clicks the login button on the login
     * page.
     * @param {String} username The username for the login attempt.
     * @param {String} password The password for the login attempt.
     * @returns {Object} A promise that will resolve on the success and reject on the failure of the login attempt.
     *
     */
    function login( username, password ) {
      return authService.login(username, password);
    }

    /**
     * @ngdoc method
     * @name BltAuth#hasCredentials
     * @description This function returns a promise that resolves or rejects based on whether or not the current authentication
     * session has data available to log a user in. The specifics of this implementation are defined in the internal
     * auth service.
     * @returns {Object} A promise that will resolve/reject based on the credential state.
     *
     */
    function hasCredentials() {
      return authService.hasCredentials();
    }

    /**
     * @ngdoc method
     * @name BltAuth#isAuthenticated
     * @description This function returns a promise that resolves or rejects based on the current authentication state of the
     * auth service.
     * @returns {Object} A promise that will resolve/reject based on the authentication state.
     *
     */
    function isAuthenticated() {
      return authService.isAuthenticated();
    }

    /**
     * @ngdoc method
     * @name BltAuth#logout
     * @description This function will invoke a logout callback in the internal authentication service and then reload the page
     * on completion.
     * @returns {Object} A promise that will resolve on logout completion.
     *
     */
    function logout() {
      $timeout(function() {
        location.reload(true);
      }, 500);
      return authService.logout().finally(function() {
        location.reload();
      });
    }

    function available() {
      if ( requiresDataConnection ) {
        if ( connectedDefer ) {
          return connectedDefer.promise.then(function() {
            if ( requiredProtocolAvailable ) {
              return $q.resolve();
            }
            return $q.reject();
          }, function() {
            return $q.reject();
          })
        }
        return $q.reject();
      }
      return $q.resolve();
    }

    /**
     * @ngdoc method
     * @name BltAuth#connect
     * @description This function is called to initialize the BltAuth API. This will cause the API to connect to any data
     * services necessary to check existing authentication tokens/cookies for validity and set the initial
     * authentication state.
     *
     * @returns {Object} A promise that will resolve on the success and reject on the failure of the connection attempt.
     *
     */
    function connect() {
      if ( !connectedDefer ) {
        connectedDefer = $q.defer();
        var configuredAuthService;
        try {
          var $profile = angular.injector(['blt_appProfile']);
        } catch( error ) {
          console.error("Unable to init ngBoltJS auth!", error);
        }
        var $protocol = undefined;
        try {
          var $data = $profile.get('data');
          $protocol = $data.protocol;
        } catch( error ) {
          console.warn("Data profile not defined.");
        }

        try {
          var $auth = $profile.get('auth');
          configuredAuthService = $auth.authService;
        } catch( error ) {
          console.warn("Auth Service was not explicitly defined. Defaulting to NoAuthService.");
          configuredAuthService = 'NoAuthService';
        }

        $injector.invoke([configuredAuthService, function( authServiceToInject ) {
          authService = authServiceToInject;
        }]);

        if ( authService ) {
          if ( angular.isFunction(authService.requiresDataProtocol) ) {
            var required = authService.requiresDataProtocol();
            if ( angular.isDefined(required) ) {
              requiresDataConnection = true;
              if ( $protocol != required ) {
                bltApi.error("Auth service initialization unavailable. Configured auth service requires '" +
                  required + "' but the following data protocol is configured: '" + $protocol + "'.");
              } else {
                requiredProtocolAvailable = true;
              }
            }
          } else {
            requiredProtocolAvailable = true;
          }
          if ( angular.isFunction(authService.activate) ) {
            authService.activate().then(function() {
              bltData.connect().then(function() {
                  connectedDefer.resolve();
                },
                function() {
                  // Required data connection failed.
                  if ( requiresDataConnection && requiredProtocolAvailable ) {
                    bltApi.publish('bltAuth', 'unavailable');
                  }
                  connectedDefer.reject();
                });
            }, function() {
              connectedDefer.reject();
            });
          } else {
            bltData.connect().then(function() {
                connectedDefer.resolve();
              },
              function() {
                connectedDefer.reject();
              });
          }
        } else {
          connectedDefer.reject();
          return $q.reject();
        }
      }
      return connectedDefer.promise;
    }

    // Private Functions
    function evaluateLoginState() {
      authService.hasCredentials().then(function() {
        bltApi.publish('login', 'hide');
      }, function() {
        bltApi.publish('login', 'show');
      });
    }

    function onAuthMessage( msg ) {
      if ( msg == 'logout' ) {
        logout();
      } else if ( msg == 'fireauthenticated' ) {
        if(isConnected || !requiresDataConnection) {
          fireOnAuthenticationCallback();
        }
      } else if ( msg != 'authenticated' ) {
        evaluateLoginState();
      }
    }

    function fireOnAuthenticationCallback() {
      if ( authService.authenticated ) {
        if ( angular.isFunction(srvc.onauthenticate) ) {
          srvc.onauthenticate();
        }
        bltApi.publish('bltAuth', 'authenticated');
      }
    }

    function activate() {
      bltApi.subscribe('bltData', onBltDataMsg);
      bltApi.subscribe("bltAuth", onAuthMessage);
    }

    function onBltDataMsg( msg ) {
      if ( msg == 'connected' ) {
        isConnected = true;
        fireOnAuthenticationCallback();
      } else if ( msg == 'disconnected' ) {
        isConnected = false;
      }
    }

  }

  BltAuth.$inject = ['BltApi', 'BltData', '$injector', '$q', '$timeout'];

  /**
   * @ngdoc service
   * @name BltAuthStorageService
   * @module blt_auth
   * @description Storage API for stashing and retrieving login tokens/cookies.
   *
   * If cookie storage is available, key/value
   * pairs will be stored as cookies. Otherwise `window.localStorage` will be used.
   * @requires https://docs.angularjs.org/api/ng/service/$window
   */
  function BltAuthStorageService( $window ) {

    var useCookieStorage = true;
    var parser;

    var srv = {
      store: store,
      retrieve: retrieve,
      remove: remove
    }

    activate();

    return srv;

    ////////////////////////////////////////////////
    // Public Service Functions
    ////////////////////////////////////////////////


    function activate() {
      parser = document.createElement('a');
      parser.href = $window.location.href;
      useCookieStorage = testCookies();
    }

    /**
     * @ngdoc method
     * @name BltAuthStorageService#retrieve
     * @description Retrieves the value assigned to the given key.
     * @param {String} key The key to retrieve the value for.
     * @return {String} The value assigned to the given key, if found, undefined otherwise.
     */
    function retrieve( key ) {
      if ( useCookieStorage ) {
        return getCookie(key);
      }
      return $window.localStorage[key];
    }

    /**
     * @ngdoc method
     * @name BltAuthStorageService#store
     * @description Stores the given value in the given key for the given duration.
     * @param {String} key The key to assign the value to.
     * @param {String} value The value to store.
     * @param {Number} [duration=60] The duration in minutes to store the given value. -1 will cause value to never
     * expire.
     */
    function store( key, value, duration ) {
      if ( useCookieStorage ) {
        setCookie(key, value, duration || 60);
      } else {
        $window.localStorage[key] = value;
      }
    }

    /**
     * @ngdoc method
     * @name BltAuthStorageService#remove
     * @description Clears the value from the given key.
     * @param {String} key The key to clear.
     */
    function remove( key ) {
      if ( useCookieStorage ) {
        clearCookie(key);
      } else {
        $window.localStorage.removeItem(key);
      }
    }

    function getCookie( cname ) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for ( var i = 0; i < ca.length; i++ ) {
        var c = ca[i];
        while ( c.charAt(0) == ' ' ) c = c.substring(1);
        if ( c.indexOf(name) == 0 ) return c.substring(name.length, c.length);
      }
      return "";
    }

    function setCookie( cname, cvalue, exminutes ) {
      var expires = "";
      if ( exminutes != -1 ) {
        var d = new Date();
        d.setTime(d.getTime() + (exminutes * 60 * 1000));
        expires = "; expires=" + d.toUTCString();
      }
      document.cookie = cname + "=" + cvalue + expires + "; path=/";
    }

    function clearCookie( cname ) {
      var d = new Date();
      d.setTime(0);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=; " + expires + "; path=/";
    }

    function testCookies() {
      setCookie('bltCT', new Date().toISOString(), 1);
      var cookiePass = !!(getCookie('bltCT'));
      clearCookie('bltCT');
      return cookiePass;
    }
  }

  BltAuthStorageService.$inject = ['$window'];
})();
