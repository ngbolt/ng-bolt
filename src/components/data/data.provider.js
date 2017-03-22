(function() {
  'use strict';

  angular.module('blt_data')
    .provider('BltDataConfig', BltDataConfig);

  /**
   * @ngdoc object
   * @name BltDataConfig
   * @module blt_data
   *
   * @description
   * This provider provides access to the configuration properties that can be
   * assigned in the active ngBoltJS Profile and route definitions defined in
   * `routes.json`.
   */
  function BltDataConfig() {
    // Local variables
    var configured = false;
    /**
     * The configured protocol. One of 'wamp', 'sqlite', or 'rest'.
     */
    var protocol = undefined;
    /**
     * The configured servers. Can contain a 'rest' and a 'wamp' member, each of
     * which contain settings relevant to each server type. Rest server settings
     * include 'url' and 'headers'. Wamp server settings include 'url' and
     * 'realm'.
     */
    var servers = undefined;
    /**
     * The configured database settings for use by the 'sqlite' protocol.
     * Defines name, version and optional `createFromLocation` property.
     */
    var database = undefined;
    /**
     * The table of routes declared and built from routes.json.
     */
    var routeTable = undefined;
    /**
     * The configured retry max. Determines the maximum times to reconnect to a
     * service before giving up. Defaults to 5.
     */
    var retryMax = 5;
    /**
     * The configured retry delay in milliseconds. Determines the amount of time
     * to wait between connection attempts. Defaults to 5000.
     */
    var retryDelay = 5000;

    /**
     * The available protocol types: 'wamp', 'sqlite', and 'rest'.
     */
    var protocolType = {
      rest: 'rest',
      sqlite: 'sqlite',
      wamp: 'wamp'
    };

    /**
     * The available returns types: 'text', 'array', 'object' and 'void'.
     */
    var returnType = {
      text: 'text',
      array: 'array',
      object: 'object',
      void: 'void'
    };

    initialize();

    // Public interface
    return ({
      $get: getBltDataConfigProvider
    });

    ////////////////////////////////////////////////////////////

    /**
     * Initialize the provider performing keyword replacement on the supplied
     * configuration, if necessary.
     */
    function initialize() {
      try {
        var $profile = angular.injector(['blt_appProfile']);
        var $routes = angular.injector(['blt_dataRoutes']);
      } catch( error ) {
        console.error("Unable to init ngBoltJS data provider!", error);
      }
      try {
        protocol = $profile.get('data').protocol;
      } catch( error ) {
        throw new Error("Configuration does not specify a data protocol!");
      }

      try {
        retryMax = $profile.get('data').retryMax;
        retryDelay = $profile.get('data').retryDelay;
      } catch( error ) {
        console.warn("Using default values for retry attempts.");
      }
      try {
        if ( protocol === protocolType.sqlite ) {
          database = angular.copy($profile.get('database'));
        } else {
          servers = angular.copy($profile.get('servers'));
          var server = servers.wamp;
          if ( server.url.indexOf('$local') > -1 ) {
            var $window = angular.injector(['ng']).get('$window');
            server.url = server.url.replace("$local", $window.location.hostname);
          }
          if ( server.url.indexOf('$port') > -1 ) {
            var $window = angular.injector(['ng']).get('$window');
            server.url = server.url.replace("$port", $window.location.port ||
              ( $window.location.protocol === "https:" ? 443 : 80 ) );
          }
        }
      } catch( error ) {
        var msg = (protocol === protocolType.sqlite)
          ? "Missing configuration for database."
          : "Missing configuration for servers.";
        console.warn(msg);
      }
      try {
        routeTable = angular.copy($routes.get('routes'));
        configured = true;
      } catch( error ) {
        throw new Error("Configuration does not specify any routes!");
      }
    }

    function getBltDataConfigProvider() {
      return ({
        get configured()   { return configured; },
        get protocol()     { return protocol; },
        get servers()      { return servers; },
        get database()     { return database; },
        get protocolType() { return protocolType; },
        get returnType()   { return returnType; },
        get retryMax()     { return retryMax; },
        get retryDelay()   { return retryDelay; },
        getRouteData : getRouteData
      });

      /**
       * Get the data object from the routeTable that matches the named route.
       */
      function getRouteData( routeName ) {
        var routeData = undefined;
        if ( angular.isUndefined(routeTable) ) {
          throw new Error("Configuration is not loaded or doesn't exist!");
        } else {
          if ( angular.isDefined(routeTable[routeName]) ) {
            if ( angular.isDefined(routeTable[routeName][protocol]) ) {
              routeData = angular.copy(routeTable[routeName][protocol]);
              routeData['return'] = routeTable[routeName].return;
            }
          }
        }

        return routeData;
      }
    }
  }
})();
