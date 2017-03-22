(function() {
  'use strict';

  angular.module('blt_data')
    .service('BltData', BltData);

  /**
   * @ngdoc service
   * @name BltData
   * @module blt_data
   *
   * @description
   * This service provides abstracted access to the various routes defined in
   * the `routes.json` file found in the config folder of the project directory.
   * Route and configuration data is pulled in via BltDataConfig provider.
   * Configuration and usage examples can be viewed in the Data API Guide.
   *
   * @requires https://docs.angularjs.org/api/auto/service/$timeout
   * @requires https://docs.angularjs.org/api/auto/service/$q
   * @requires https://docs.angularjs.org/api/auto/service/$injector
   * @requires BltApi
   * @requires BltDataConfig
   */
  function BltData( $timeout, $q, $injector, bltApi, bltDataConfig ) {

    var generator = undefined;
    var connectPromise = undefined;
    var disconnectPromise = undefined;
    var protocol = undefined;
    var provider = undefined;
    var subscriptions = undefined;
    var registrations = undefined;
    var connectionConfig = undefined;

    // Connection states
    var connectionStates = {
      disconnected: "disconnected",
      connecting: "connecting",
      connected: "connected",
      disconnecting: "disconnecting",
      failed: "failed"
    };

    // Initial connection state
    var connectionState = connectionStates.disconnected;

    // Protocol permissions on the API
    var apiPermissions = {};
    apiPermissions[bltDataConfig.protocolType.rest] = [
      'call'
    ];
    apiPermissions[bltDataConfig.protocolType.sqlite] = [
      'call'
    ];
    apiPermissions[bltDataConfig.protocolType.wamp] = [
      'call',
      'subscribe',
      'unsubscribe',
      'publish',
      'register',
      'unregister'
    ];

    // SQLite sub-service object
    var sqlite = {
      database: undefined
    };

    // Wamp sub-service object
    var wamp = {
      connection: undefined,
      session: undefined
    };

    // Data service public API
    var service = {
      call: call,
      connect: connect,
      disconnect: disconnect,
      isConnected: isConnected,
      publish: publish,
      register: register,
      setConnectionConfig: setConnectionConfig,
      getConnectionConfig: getConnectionConfig,
      subscribe: subscribe,
      unregister: unregister,
      unsubscribe: unsubscribe,
      /**
       * @ngdoc method
       * @name BltData#onconnect
       * @description
       * A function can be assigned to this member by the ngBoltJS developer to
       * hook the 'onconnect' event. This will be triggered any time the state
       * transitions to `connected`.
       */
      onconnect: undefined,
      /**
       * @ngdoc method
       * @name BltData#ondisconnect
       * @description
       * A function can be assigned to this member by the ngBoltJS developer to
       * hook the 'ondisconnect' event. This will be triggered any time the
       * state transitions to `disconnected`.
       */
      ondisconnect: undefined,
      /**
       * @ngdoc method
       * @name BltData#onfailed
       * @description
       * A function can be assigned to this member by the ngBoltJS developer to
       * hook the 'onfailed' event. This will be triggered any time a connection
       * attempt fails to complete successfully.
       */
      onfailed: undefined
    };

    activate();

    return service;

    ///// PUBLIC API ///////////////////////////////////////////

    /**
     * @ngdoc method
     * @name BltData#call
     * @description
     * Makes a request for the specified route name with the supplied arguments.
     *
     * @param {String} routeName The name of the route to call.
     * @param {Object} args The object containing call arguments to be extracted
     * by the route specification.
     *
     * @returns {Object} Returns a promise that resolves to an object that
     * contains the call's returned data or rejects to an object that contains
     * undefined data and description of why the call was rejected.
     *
     * @example 
     * <example> 
     *   <javascript> 
     *     var onsuccess = function(data){
     *       console.log(data);
     *     }
     *     var onfail = function(error){
     *       console.error(error);
     *     }
     *     bltData.call('example', {'foo': 'someFoo', 'bar': 'someBar'})
     *       .then(onsuccess, onfail);
     *   </javascript> 
     * </example>
     */
    function call( routeName, args ) {
      return onInvoke('call')
        .then(function() {
          return onCall(routeName, args);
        });
    }

    /**
     * @ngdoc method
     * @name BltData#connect
     * @description
     * Initializes the Data API.  Invoking this method will connect the Data API
     * to use the protocol for which it was configured, automatically handling
     * making the necessary connections and retries on failure.
     *
     * @returns {Object} A promise that resolves when the Data API successfully
     * initializes or fails to do so.  If the Data API does not successfully
     * configure, a message is logged.
     *
     */
    function connect() {
      // If we're already attempting a connection, use the existing promise.
      if ( connectPromise ) return connectPromise;

      // If we're already connected. Just resolve.
      if ( connectionState == connectionStates.connected ) return $q.resolve();

      var deferred = $q.defer();
      connectPromise = deferred.promise;
      var connectionAttempts = 1;

      if ( disconnectPromise ) {
        disconnectPromise.then(function() {
          setConnectionState(connectionStates.connecting);
          doConnect();
        });
        disconnectPromise = undefined;
      } else {
        setConnectionState(connectionStates.connecting);
        doConnect();
      }

      /**
       * Performs a connection attempt by initializing the appropriate call
       * generator for the configured data protocol.
       */
      function doConnect() {
        initializeGenerator()
          .then(function() {
            // The generator is the artifact actually handling making the
            // connection. As long as the promise it returns resolves, we've
            // connected.
            subscriptions = new Subscriptions();
            registrations = new Registrations();
            setConnectionState(connectionStates.connected);
            deferred.resolve();
            // Clear the connection promise
            connectPromise = undefined;
          })
          .catch(function( error ) {
            ++connectionAttempts;
            if ( connectionState == connectionStates.connecting ) {
              if ( bltDataConfig.retryMax >= 0 &&
                connectionAttempts > bltDataConfig.retryMax ) {
                bltApi.warn(
                  "ngBoltJS data service unable to connect.",
                  "Reached retry limit.");
                setConnectionState(connectionStates.failed);
                deferred.reject("Retry limit reached.");
                onServiceFailed();
                // Clear the connection promise
                connectPromise = undefined;
              } else if ( connectionState == connectionStates.connecting ) {
                bltApi.info(
                  "ngBoltJS data service attempting reconnect in",
                  bltDataConfig.retryDelay / 1000,
                  "seconds (attempt",
                  connectionAttempts,
                  (bltDataConfig.retryMax > 0)
                    ? "of " + bltDataConfig.retryMax + ")" : ")"
                );
                $timeout(doConnect, bltDataConfig.retryDelay);
              }
            } else {
              bltApi.warn("Connection aborted due to explicit disconnect.");
              deferred.reject();
            }
          });
      }

      return connectPromise;
    }

    /**
     * @ngdoc method
     * @name BltData#disconnect
     * @description
     * Terminates the connection to the server, if one exists, and invoke any
     * cleanup necessary to cleanly shut down the service.
     *
     * @returns {Object} A promise that will resolve on disconnect.
     */
    function disconnect() {
      if ( disconnectPromise ) {
        return disconnectPromise;
      } else if ( connectionState == connectionStates.disconnected ) {
        return $q.resolve();
      }

      var deferred = $q.defer();
      disconnectPromise = deferred.promise;

      var all = [];
      if ( connectPromise ) {
        all.push(connectPromise);
        connectPromise = undefined;
      }

      bltApi.info('ngBoltJS data service attempting to disconnect.');
      setConnectionState(connectionStates.disconnecting);

      return $q.all(all).then(terminate, terminate);

      function terminate() {
        terminateGenerator()
          .then(function() {
            setConnectionState(connectionStates.disconnected);
            deferred.resolve();
          });
      }
    }

    /**
     * @ngdoc method
     * @name BltData#isConnected
     * @description
     * Returns a promise that will resolve if/whenthe connection state is set to
     * `connected`.  If the serivce is currently in the process of connecting,
     * the connection promise will be returned, which will resolve upon the
     * resolution of the connection attempt.  Otherwise the promise is resolved
     * or rejected based upon the current connection state (resolve if the state
     * is `connected`, reject otherwise).
     *
     * @returns {Object} A promise that will resolve if the state is
     * `connected`, or when the state transitions to `connected` from
     * `connecting`. Rejects in all other states.
     */
    function isConnected() {
      if ( connectPromise ) return connectPromise;
      if ( connectionState == connectionStates.connected ) return $q.resolve();
      return $q.reject(new ResponseObject(
        "ERROR",
        undefined,
        "Not connected."));
    }

    /**
     * @ngdoc method
     * @name BltData#publish
     * @description
     * Publishes a message to a topic.  Only valid when the service is configured
     * to use the WAMP protocol.
     *
     * @returns {Object} Returns a promise that resolves to an object
     * describing that the publish call was successful or rejects to an object
     * describing why the publish failed.
     */
    function publish( topic, message, options ) {
      return onInvoke('publish')
        .then(function() {
          return onPublish(topic, message, options);
        });
    }

    /**
     * @ngdoc method
     * @name BltData#register
     * @description
     * Registers a remote procedure.  Only valid when the service is configured
     * to use the WAMP protocol.
     *
     * @returns {Object} Returns a promise that resolves to an object
     * describing that registration was successful or rejects to an object 
     * describing why the registration failed. If successful, the promise will 
     * also contain a hash that identifies the registration.
     */
    function register( endpoint, method ) {
      return onInvoke('register')
        .then(function() {
          return registrations.add(endpoint, method);
        })
    }

    /**
     * @ngdoc method
     * @name BltData#setConnectionConfig
     * @description
     * Updates the connection configuration for this instance of BltData.  If the
     * state is `connected` or `connecting`, the service is disconnected and
     * reconnected with the given configuration.  This is primarily used to
     * inject authentication configuration into the BltData connection.
     *
     * @param {Object} config An object that contains the new configuration.
     *
     * @returns {Object} A promise that resolves when the configuration has been
     * set. If a reconnect is required, the promise will resolve when the 
     * reconnection is complete.
     */
    function setConnectionConfig( config ) {
      if ( !angular.equals(config, connectionConfig) ) {
        connectionConfig = config;
        if ( isConnecting() ) {
          return disconnect()
            .then(function() {
              return connect();
            })
        } else {
          return isConnected()
            .then(function() {
              disconnect()
                .then(function() {
                  return connect();
                });
            }, function(){
              return $q.when();
            });
        }
      } else {
        return $q.when();
      }
    }

    /**
     * @ngdoc method
     * @name BltData#getConnectionConfig
     * @description
     * Gets a copy of the current connection config. Note that it is a copy and changes to the returned object will not
     * affect the data service connection config and changes to the data service connection config will not be
     * reflected in the config object returned by this function.
     *
     * @returns {Object} A copy of the current connection config object.
     */
    function getConnectionConfig() {
       return angular.copy(connectionConfig);
    }

    /**
     * @ngdoc method
     * @name BltData#subscribe
     * @description
     * Subscribe to a topic. Only valid if the service is configured to use the
     * WAMP protocol.
     *
     * @param {String} topic The topic to subscribe to.
     * @param {Function} callback The callback to invoke when a message is
     * received.
     * @param {Object} options Options to pass during subscription creation.
     *
     * @returns {Object} Returns a promise that resolves to an object describing that
     * the subscription was successful or rejects to an object describing why the 
     * subscription failed. If successful, the promise will also contain a hash that 
     * identifies the subscription.
     */
    function subscribe( topic, callback, options ) {
      return onInvoke('subscribe')
        .then(function() {
          return subscriptions.add(topic, callback, options);
        })
    }

    /**
     * @ngdoc method
     * @name BltData#unregister
     * @description
     * Unregister a remote procedure.  Only valid if the service is configured
     * to use the WAMP protocol.
     *
     * @param {String} hash The hash that identifies the remote procedure.
     *
     * @returns Returns a promise that resolves to an object describing that
     * un-registration was successful or rejcts to an object describing why the
     * un-registration of the remote procedure failed.
     */
    function unregister( hash ) {
      return onInvoke('unregister')
        .then(function() {
          return registrations.remove(hash);
        })
    }

    /**
     * @ngdoc method
     * @name BltData#unsubscribe
     * @description
     * Unsubscribe from a topic. Only valid if the service is configured to use
     * the WAMP protocol.
     *
     * @param {String} hash The hash that identifies the subscription.
     *
     * @returns {Object} Returns a promise that resolves to an object describing
     * that removing the topic subscription was successful or rejects to an
     * object describing why removing the topic subscription failed.
     */
    function unsubscribe( hash ) {
      return onInvoke('unsubscribe')
        .then(function() {
          return subscriptions.remove(hash);
        })
    }

    ///// PRIVATE API //////////////////////////////////////////

    /**
     * @name BltData#activate
     * @description
     * Activate the service.
     */
    function activate() {
      protocol = bltDataConfig.protocol;
    }

    /**
     * @name BltData#isConnecting
     * @description
     * Whether or not the service is currently attempting to establish a
     * connection to a data source.
     */
    function isConnecting() {
      return (connectPromise && connectionState == connectionStates.connecting);
    }

    /**
     * @name BltData#initializeDatabase
     * @description
     * Initialize the SQLite/WEBSql database connection.
     *
     * @returns Returns a promise that resolves to the database instance or
     * rejects to undefined.
     */
    function initializeDatabase() {
      return $q(function( resolve, reject ) {
        var config = bltDataConfig.database;
        bltApi.info("Attempting to connect to database:", config.name);
        provider = $injector.get('$cordovaSQLite');
        if ( window.cordova ) {
          bltApi.debug("Using cordovaSQL...");
          document.addEventListener('deviceready', function() {
            try {
              var location = (angular.isDefined(config.createFromLocation)) ? config.createFromLocation : 1;
              sqlite.database = provider.openDB(
                {name: config.name, createFromLocation: location});
            } catch( error ) {
              reject(error);
            }
            if ( angular.isDefined(sqlite.database) ) {
              onServiceConnect();
              resolve(sqlite.database);
            } else {
              reject("SQLite database does not exist.");
            }
          });
        } else {
          bltApi.debug("Using WebSQL...");
          sqlite.database = window.openDatabase(
            config.name, config.version, config.name, 2 * 1024 * 1024);
          if ( angular.isDefined(sqlite.database) ) {
            onServiceConnect();
            resolve();
          } else {
            reject("SQLite database does not exist.");
          }
        }
      });
    }

    /**
     * @name BltData#terminateGenerator
     * @description
     * Terminate the call generator.  The call generator executes the
     * appropriate initialization method and populates the generator object
     * based on the protocol for which the data API is configured.
     *
     * @returns Return a promise that resolves if termination of the generator
     * was successful or rejects on failure.
     */
    function terminateGenerator() {
      return $q(function( resolve, reject ) {
        provider = undefined;
        generator = undefined;
        switch ( bltDataConfig.protocol ) {
          case bltDataConfig.protocolType.wamp:
            terminateWampConnection();
            resolve();
            break;
          case bltDataConfig.protocolType.sqlite:
          case bltDataConfig.protocolType.rest:
            resolve();
            break;
          default:
            reject("Unknown protocol: " + protocol);
        }
      });
    }

    /**
     * @name BltData#initializeGenerator
     * @description
     * Initialize the call generator.  The call generator executes the
     * appropriate initialization method and populates the generator object
     * based on the protocol for which the data API is configured.
     *
     * @returns Return a promise that resolves if configuration of the generator
     * was successful or rejects on failure.
     */
    function initializeGenerator() {
      return $q(function( resolve, reject ) {
        switch ( bltDataConfig.protocol ) {
          case bltDataConfig.protocolType.wamp:
            initializeWampConnection()
              .then(function( session ) {
                provider = session;
                generator = {
                  exec: generateWampRequest,
                  type: bltDataConfig.protocolType.wamp
                };
                resolve();
              })
              .catch(function( error ) {
                reject(error);
              });
            break;
          case bltDataConfig.protocolType.sqlite:
            initializeDatabase()
              .then(function() {
                try {
                  generator = {
                    exec: generateSQLiteRequest,
                    type: bltDataConfig.protocolType.sqlite
                  };
                  resolve();
                } catch( error ) {
                  reject(error);
                }
              })
              .catch(function( error ) {
                reject(error);
              });
            break;
          case bltDataConfig.protocolType.rest:
            try {
              provider = $injector.get('$http');
              generator = {
                exec: generateHTTPRequest,
                type: bltDataConfig.protocolType.rest
              };
              resolve();
            } catch( error ) {
              reject(error);
            }
            break;
          default:
            reject("Unknown protocol: " + protocol);
        }
      });
    }

    /**
     * @name BltData#initializeWampConnection
     * @description
     * Initialize a WAMP connection.
     *
     * @returns Return a promise that resolves if the WAMP connection was
     * successfully connected or rejects on failure.
     */
    function initializeWampConnection() {
      return $q(function( resolve, reject ) {
        if ( angular.isDefined(bltDataConfig.servers) &&
          angular.isDefined(bltDataConfig.servers.wamp) ) {
          var providerConfig = bltDataConfig.servers.wamp;
          try {
            bltApi.info("Connecting to:", providerConfig.url);
            var config = {
              url: providerConfig.url,
              realm: providerConfig.realm,
              max_retries: 0
            };
            var authconfig = connectionConfig;
            if ( authconfig &&
              authconfig.authid &&
              angular.isFunction(authconfig.onchallenge) &&
              authconfig.authmethods ) {
              config.authid = authconfig.authid;
              config.authmethods = authconfig.authmethods;
              config.onchallenge = authconfig.onchallenge;
            }
            // Check to make sure Autobahn exists before trying to use it
            if ( !angular.isDefined(autobahn) ) {
              reject("Autobahn not found! Check NPM installation.");
            } else {
              wamp.connection = new autobahn.Connection(config);
              wamp.connection.onopen = function( session ) {
                bltApi.info("Connected to WAMP server:", config.url);
                wamp.session = session;
                resolve(session);
                onServiceConnect();
              };
              wamp.connection.onclose = function( reason, details ) {
                bltApi.info("Disconnected from WAMP server: " + reason, details);
                if ( details.reason === 'wamp.error.authentication_failed' ||
                     details.reason === 'wamp.error.not_authorized' ||
                     details.reason === 'wamp.error.authorization_failed') {
                  bltApi.publish('bltData', 'auth_failed');
                }
                onServiceDisconnect();
              };
              wamp.connection.open();
            }
          } catch( error ) {
            reject(error);
          }
        } else {
          bltApi.warn("Missing configuration for WAMP server!");
          resolve();
        }
      })
    }

    /**
     * @name BltData#terminateWampConnection
     * @description
     * Terminate the WAMP connection.
     *
     * @returns Return a promise that resolves if the WAMP connection was
     * successfully connected or rejects on failure.
     */
    function terminateWampConnection() {
      return $q(function( resolve ) {
        if ( wamp && wamp.connection ) {
          try {
            wamp.connection.close();
          } catch( error ) {
            console.warn("Connection already closed.");
          }
        } else {
          bltApi.warn("Missing configuration for WAMP server!");
        }
        resolve();
      })
    }

    /**
     * @name BltData#generateHTTPRequest
     * @description
     * Generate a request for the REST protocol.
     *
     * @param method The REST method type (e.g., "GET", "POST").
     * @param routeData The route data from the API configuration.
     * @param args The arguments to pass to the request.
     *
     * @returns Return a promise that resolves or rejects based on the result of
     * the HTTP request.
     */
    function generateHTTPRequest( method, routeData, args ) {
      var localArgs = angular.copy(args);
      var paramObj = {};
      var dataObj = {};
      var targetUrl = routeData.url;

      // Assign properties to paramObj and parse/replace dynamically constructed
      // URL
      if ( !angular.isUndefined(localArgs) ) {
        var regex = /(\$[a-zA-Z]+)/g;
        var match = regex.exec(targetUrl);
        // Collect capture groups into token list
        var tokens = [];
        while ( match != null ) {
          tokens.push(match[0]);
          match = regex.exec(targetUrl);
        }
        // Do the replacement
        angular.forEach(tokens, function( tok ) {
          targetUrl = targetUrl.replace(tok, localArgs[tok.substr(1)]);
          delete localArgs[tok.substr(1)]; // Remove property so it doesn't end
                                           // up being part of a query string
        });

        angular.forEach(routeData.query, function( key ) {
          if ( localArgs.hasOwnProperty(key) ) {
            paramObj[key] = localArgs[key];
          }
        });

        dataObj = args.hasOwnProperty(routeData.body)
          ? args[routeData.body]
          : {};
      }

      return provider(
        {
          method: method,
          url: targetUrl,
          params: paramObj,
          data: dataObj
        });
    }

    /**
     * Generate a SQLite/WEBSql request.
     *
     * @param routeData The route data from the API configuration.
     * @param args The arguments to pass to the request.
     *
     * @returns Returns a promise that resolves or rejects based on the result
     * of the SQLite/WEBSql request.
     */
    function generateSQLiteRequest( routeData, args ) {
      var query = null;
      var argsAry = [];

      // Likewise if we don't have a query property
      if ( routeData.hasOwnProperty('query') ) {
        query = routeData.query;
      } else {
        throw new Error('No query defined for target!');
      }

      if ( !angular.isUndefined(args) ) {
        angular.forEach(routeData.args, function( key ) {
          if ( args.hasOwnProperty(key) ) {
            argsAry.push(args[key]);
          }
        });
      }

      return provider.execute(sqlite.database, query, argsAry);
    }

    /**
     * @name BltData#generateWampRequest
     * @description
     * Generates a WAMP request.
     *
     * @param routeData The route data from the API configuration.
     * @param args The arguments to pass to the request.
     *
     * @returns Returns a promise that resolves or rejects based on the result
     * of the SQLite/WEBSql request.
     */
    function generateWampRequest( routeData, args ) {
      var argsAry = [];
      var kargsObj = {};
      var optsObj = {};

      if ( angular.isDefined(args) ) {
        angular.forEach(routeData.args, function( key ) {
          if ( args.hasOwnProperty(key) ) {
            argsAry.push(args[key]);
          }
        });
        angular.forEach(routeData.kargs, function( key ) {
          if ( args.hasOwnProperty(key) ) {
            kargsObj[key] = args[key];
          }
        });
        angular.forEach(routeData.options, function( key ) {
          if ( args.hasOwnProperty(key) ) {
            optsObj[key] = args[key];
          }
        });
      }
      return provider.call(routeData.rpc, argsAry, kargsObj, optsObj);
    }

    /**
     * @name BltData#onCall
     * @description
     * Executes the call, processes the response from the call, and builds a
     * ResponseObject that describes the result of the call.
     *
     * @param routeName The name of the route for the call.
     * @param args The arguments to be passed to the call.
     *
     * @returns Returns a promise that resolves or rejects to a ResponseObject
     * that describes the result of the call and contains the result of the
     * call, if any.
     */
    function onCall( routeName, args ) {
      var data = undefined;
      var routeData = bltDataConfig.getRouteData(routeName);

      // Build an object and a promise that the API clients will use
      return $q(function( resolve, reject ) {
        var responseObject = new ResponseObject("ERROR", undefined, "");
        responseObject.details.call = routeName;
        // If no route data exists...this is a problem - fail hard, NOW!
        if ( angular.isUndefined(routeData) ) {
          responseObject.status = data;
          responseObject.details.message =
            "No route data for '" + routeName + "' with protocol '" +
            protocol + "'";
          reject(responseObject);
        } else {
          // Get the promise that actually does the work from the generator.
          var callPromise;
          if ( protocol === bltDataConfig.protocolType.rest ) {
            callPromise = generator.exec(routeData.type, routeData, args);
          } else {
            callPromise = generator.exec(routeData, args);
          }
          // Get the return type so we can act appropriately.
          var returnType = routeData.return;
          if ( returnType === bltDataConfig.returnType.text &&
            generator.type === bltDataConfig.protocolType.sqlite ) {
            // Text return types are unsupported for sqlite.
            responseObject.data = processCallError(returnType);
            responseObject.details.message = "Text return type not supported.";
            reject(responseObject);
          } else {
            callPromise
              .then(function( response ) {
                var data =
                  processCallResponse(returnType, generator.type, response);
                if ( angular.isUndefined(data.error) ) {
                  responseObject.status = "OK";
                  responseObject.data = data.data;
                  responseObject.details.message =
                    "Processed call successfully";
                  resolve(responseObject);
                } else if ( angular.isDefined(data.error) ) {
                  responseObject.data = data.data;
                  responseObject.details.message = data.error.message;
                  responseObject.details.error = data.error.details;
                  reject(responseObject);
                }
              })
              .catch(function( error ) {
                var errorMessage = "Unknown error.";
                if ( protocol == bltDataConfig.protocolType.wamp ) {
                  errorMessage = error.error;
                } else if ( protocol == bltDataConfig.protocolType.sqlite ) {
                  errorMessage = error.message;
                } else {
                  errorMessage = error.statusText;
                }
                responseObject.data = processCallError(returnType);
                responseObject.details.message = errorMessage;
                reject(responseObject);
              });
          }
        }
      });
    }

    /**
     * @name BltData#onInvoke
     * @description
     * Checks that the Data API current protocol supports the invocation type.
     *
     * @param invocationType A string describing the invocation method.
     *
     * @returns Returns a promise that resolves if the protocol supports the
     * invocation type or rejects to an object that describes the failure.
     */
    function onInvoke( invocationType ) {
      return isConnected()
        .then(function() {
          return $q(function( resolve, reject ) {
            // If the service is connected, but not configured properly, we
            // need to notify the client and complain about it
            if ( angular.isUndefined(provider) ) {
              reject(new ResponseObject(
                "ERROR",
                undefined,
                "Call rejected: data service is mis-configured!"));
            }
            // Check the protocol and see if we're allowed to make this call
            if ( apiPermissions[protocol].indexOf(invocationType) != -1 ) {
              resolve();
            } else {
              reject(new ResponseObject(
                "ERROR",
                undefined,
                "Operation not supported using " + protocol));
            }
          });
        })
        .catch(function() {
          reject(new ResponseObject(
            "ERROR",
            undefined,
            "Call rejected: data service is not connected."));
        });
    }

    /**
     * @name BltData#onPublish
     * @description
     * Executes a publish.
     *
     * @param topic The topic on which to publish.
     * @param data The dat to publish to the topic.
     * @param options Publishing options.
     *
     * @returns Return a promise that resolves or rejects to a ResponseObject
     * that describes the result of the call and contains no data.
     */
    function onPublish( topic, data, options ) {
      var deferred = $q.defer();

      function doPublish() {
        var publishOptions = options || {};
        publishOptions.acknowledge = true;
        var publishArgs = [];
        if ( angular.isDefined(data.args) ) {
          publishArgs = data.args;
        }
        var publishKargs = {};
        if ( angular.isDefined(data.kargs) ) {
          publishKargs = data.kargs;
        }
        wamp.session.publish(topic, publishArgs, publishKargs, publishOptions)
          .then(function() {
            deferred.resolve(new ResponseObject(
              "OK",
              undefined,
              "Published message over WAMP channel."));
          })
          .catch(function( error ) {
            deferred.reject(new ResponseObject(
              "ERROR",
              undefined,
              error.message));
          });
      }

      doPublish();

      return deferred.promise;
    }

    /**
     * @name BltData#onServiceConnect
     * @description
     * Callback fired when the Data API connects to a protocol.
     */
    function onServiceConnect() {
      bltApi.info("ngBoltJS data service has connected.");
      if ( angular.isFunction(service.onconnect) ) {
        service.onconnect();
      }
      bltApi.publish('bltData', 'connected');
    }

    /**
     * @name BltData#onServiceDisconnect
     * @description
     * Callback fired when the Data API disconnects from a protocol.
     */
    function onServiceDisconnect() {
      // If we were previously connected and not trying to connect, then we
      // should do some bookkeeping and notify the client if they're interested
      if ( connectionState == connectionStates.connected ) {
        bltApi.info("ngBoltJS data service has disconnected.");
        setConnectionState(connectionStates.disconnected);
        // Blow away our subscriptions and registrations
        if ( angular.isDefined(subscriptions) ) subscriptions.clear();
        if ( angular.isDefined(registrations) ) registrations.clear();
        // Invoke the callback supplied by the client, if any
        if ( angular.isFunction(service.ondisconnect) ) service.ondisconnect();
        bltApi.publish('bltData', 'disconnected');
        // Attempt to reconnect
        connect();
      }
    }

    /**
     * @name BltData#onServiceFailed
     * @description
     * Callback fired when the Data API encounters a fatal error.
     */
    function onServiceFailed() {
      if ( angular.isFunction(service.onfailed) ) service.onfailed();
      bltApi.publish('bltData', 'failed');
    }

    /**
     * @name BltData#processCallError
     * @description
     * Process a call return that resulted in an error.
     *
     * @param returnType The return type.
     *
     * @returns Returns an empty data set that is formatted for the returnType.
     */
    function processCallError( returnType ) {
      var returnData;
      switch ( returnType ) {
        case bltDataConfig.returnType.array:
          returnData = [];
          break;
        case bltDataConfig.returnType.text:
          returnData = "";
          break;
        default:
          returnData = {};
      }

      return returnData;
    }

    /**
     * @name BltData#processCallResponse
     * @description
     * Process a call return that resulted in a success.
     *
     * @param returnType The return type.
     * @param generatorType The generator type.
     * @param response The response from the call.
     *
     * @returns {Object} Returns a data set that is formatted for the returnType
     * and optionally an error if the a data type conversion error occurs.
     */
    function processCallResponse( returnType, generatorType, response ) {
      var returnData = {
        error: undefined,
        data: undefined
      };
      switch ( returnType ) {
        case bltDataConfig.returnType.array:
          returnData.data = [];
          switch ( generatorType ) {
            case bltDataConfig.protocolType.sqlite:
              // Copy the rows
              if ( response.rows.length > 0 ) {
                if ( angular.isFunction(response.rows.item) ) {
                  for ( var idx = 0; idx < response.rows.length; idx++ ) {
                    returnData.data.push(response.rows.item(idx));
                  }
                } else {
                  angular.forEach(response.rows, function( row ) {
                    returnData.data.push(row);
                  });
                }
              }
              break;
            case bltDataConfig.protocolType.rest:
              // Assumes we're receiving a JSON array
              angular.forEach(response.data, function( element ) {
                returnData.data.push(element);
              });
              break;
            case bltDataConfig.protocolType.wamp:
              if ( angular.isDefined(response) && response !== null ) {
                if ( Array.isArray(response) ) {
                  returnData.data = response;
                } else if ( typeof(response) === 'string' ) {
                  var parsed = JSON.parse(response);
                  if ( Array.isArray(parsed) ) {
                    angular.forEach(parsed, function( element ) {
                      returnData.data.push(element);
                    });
                  } else {
                    bltApi.warn("Could not convert parsed string data to array type.");
                    returnData.error = {
                      details: undefined,
                      message: "Could not convert parsed string data to array type."
                    }
                    returnData.data = parsed;
                  }
                } else if ( response && response.hasOwnProperty("args") && response.hasOwnProperty("kwargs")
                  && Array.isArray(response.args) ) {
                  returnData.data = response.args;
                } else {
                  returnData.data = [response];
                }
              }
              break;
          }
          break;
        case bltDataConfig.returnType.text:
          switch ( generatorType ) {
            case bltDataConfig.protocolType.rest:
              returnData.data = response.data;
              break;
            case bltDataConfig.protocolType.wamp:
              if ( typeof(response) === Object ) {
                returnData.data = JSON.stringify(response);
              } else {
                returnData.data = response;
              }
              break;
          }
          break;
        case bltDataConfig.returnType.void:
          break;
        default:
          switch ( generatorType ) {
            case bltDataConfig.protocolType.sqlite:
              try {
                if ( response.rows && response.rows.length > 0 ) {
                  if ( angular.isFunction(response.rows.item) ) {
                    returnData.data = response.rows.item(0);
                  } else {
                    returnData.data = response.rows[0];
                  }
                } else {
                  returnData.data = response;
                }
              } catch( error ) {
                bltApi.error("Query returned undefined.", error);
                returnData.error = {
                  details: error,
                  message: "Query returned undefined."
                }
                returnData.data = response;
              }
              break;
            case bltDataConfig.protocolType.rest:
              returnData.data = response.data;
              break;
            case bltDataConfig.protocolType.wamp:
              if ( angular.isDefined(response) && response !== null ) {
                if ( typeof response === "string" ) {
                  try {
                    returnData.data = JSON.parse(response);
                  } catch( error ) {
                    bltApi.warn("Could not convert data to object!", error);
                    returnData.error = {
                      details: error,
                      message: "Could not convert data to object!"
                    };
                    returnData.data = response;
                  }
                } else if( response && response.hasOwnProperty("args") && response.hasOwnProperty("kwargs")
                  && response.kwargs instanceof Object ){
                  returnData.data = response.kwargs;
                } else {
                  returnData.data = response;
                }
              } else {
                bltApi.warn("Could not convert null/empty data to object.");
                returnData.data = response;
                returnData.error = {
                  details: undefined,
                  message: "Could not convert null/empty data to object."
                }
              }
            break;
          }
      }

      return returnData;
    }

    /**
     * @name BltData#setConnectionState
     * @description
     * Sets the connection state.
     *
     * @param state The state to set.
     */
    function setConnectionState( state ) {
      bltApi.debug("Setting connection state:", state);
      connectionState = state;
    }

    ///// PRIVATE OBJECTS //////////////////////////////////////

    /**
     * @name SubscriptionCallbackWrapper
     * @description
     * Wrapper around a user-supplied callback for subscription messages.
     *
     * @param callback The callback to wrap.
     */
    function SubscriptionCallbackWrapper( callback ) {
      return function( message ) {
        callback([], message, {});
      }
    }

    /**
     * @name Subscriptions
     * @description
     * Manages the topics to which the data service is subscribed.
     */
    function Subscriptions() {
      var hashFunction = new Hashes.SHA1;
      var subscriptions = {};

      return ({
        add: add,
        remove: remove,
        clear: clear
      });

      /**
       * @name Subscriptions#add
       * @description
       * Add a subscription to be tracked by the subscription manager.
       *
       * @param topic The topic on which to subscribe
       * @param callback The callback to invoke when a message is received on
       * the topic channel
       * @param options Any options to pass to the subscription
       *
       * @returns Return a promise that resolves to an object that describes
       * the successful addition of the subscription, or rejects on failure.
       */
      function add( topic, callback, options ) {
        return $q(function( resolve, reject ) {
          var subscription = {
            callback: wrap(callback),
            topic: topic,
            subscription: undefined
          };
          wamp.session.subscribe(topic, subscription.callback, options)
            .then(function( wampSubsciption ) {
              // Store subscription in subscriptions map using hash from topic
              // and subscription id.
              subscription.subscription = wampSubsciption;
              var hash = hashFunction.hex(topic + wampSubsciption.id);
              subscriptions[hash] = subscription;
              resolve(new ResponseObject(
                "OK",
                hash,
                "Subscribed to topic: " + topic));
            })
            .catch(function( error ) {
              bltApi.error("Error subscribing to topic!", error);
              reject(new ResponseObject(
                "ERROR",
                undefined,
                "Error subscribing to topic!"));
            });
        });
      }

      /**
       * @name Subscriptions#remove
       * @description
       * Remove a subscription, named by its hash, from the subscription
       * manager.
       *
       * @param hash The hash of the subscription to remove.
       *
       * @returns Return a promise that resolves to an object that describes
       * the successful removal of the subscription, or rejects on failure.
       */
      function remove( hash ) {
        return $q(function( resolve, reject ) {
          if ( subscriptions.hasOwnProperty(hash) ) {
            wamp.session.unsubscribe(subscriptions[hash].subscription)
              .then(function() {
                resolve(new ResponseObject(
                  "OK",
                  undefined,
                  "Successfully unsubscribed from " +
                  subscriptions[hash].topic));
                delete subscriptions[hash];
              })
              .catch(function( error ) {
                reject(
                  new ResponseObject("ERROR", undefined, error.message));
              });
          } else {
            reject(new ResponseObject(
              "ERROR",
              undefined,
              "Subscription does not exist."));
          }
        });
      }

      /**
       * @name Subscriptions#clear
       * @description
       * Clears the subscription manager of all subscriptions.
       */
      function clear() {
        subscriptions = {};
      }
    }

    /**
     * @name Registrations
     * @description
     * Manages the procedures served by the data service.
     */
    function Registrations() {
      var hashFunction = new Hashes.SHA1;
      var registrations = {};

      return ({
        add: add,
        remove: remove,
        clear: clear
      });

      /**
       * @name Registrations#add
       * @description
       * Serve a procedure.
       *
       * @param endpoint The endpoint on which to serve the procedure.
       * @param method The method to invoke.
       *
       * @returns Return a promise that resolves to an object that describes the
       * successful addition of the procedure, or rejects on failure.
       */
      function add( endpoint, method ) {
        return $q(function( resolve, reject ) {
          var registration = {
            method: wrap(method),
            endpoint: endpoint,
            registration: undefined
          };
          wamp.session.register(registration.endpoint, registration.method)
            .then(function( wampRegistration ) {
              registration.registration = wampRegistration;
              var hash = hashFunction.hex(registration.endpoint);
              registrations[hash] = registration;
              resolve(new ResponseObject(
                "OK",
                hash,
                "Registered procedure at endpoint: " + endpoint));
            })
            .catch(function( error ) {
              bltApi.error("Error registering remote procedure!", error);
              reject(new ResponseObject("ERROR", undefined, error.message));
            });
        });
      }

      /**
       * @name Registrations#remove
       * @description
       * Remove a registration, named by its hash, from the registration
       * manager.
       *
       * @param hash The hash of the registration to remove.
       *
       * @returns Return a promise that resolves to an object that describes
       * the successful removal of the registration, or rejects on failure.
       */
      function remove( hash ) {
        return $q(function( resolve, reject ) {
          if ( registrations.hasOwnProperty(hash) ) {
            wamp.session.unregister(registrations[hash].registration)
              .then(function() {
                var endpoint = angular.copy(registrations[hash].endpoint);
                delete registrations[hash];
                resolve(new ResponseObject(
                  "OK",
                  undefined,
                  "Unregistered remote procedure at endpoint: " +
                  endpoint));
              })
              .catch(function( error ) {
                reject(new ResponseObject("ERROR", undefined, error.message));
              })
          } else {
            reject(new ResponseObject(
              "ERROR",
              undefined,
              "Registration does not exist."));
          }
        });
      }

      /**
       * @name Subscriptions#clear
       * @description
       * Clears the registration manager of all registrations.
       */
      function clear() {
        registrations = {};
      }
    }

    /**
     *   function
     * @name BltData#ResponseObject
     * @description
     * Generate an object that contains the response of a call.  Encapsulates
     * the call result status, data, and details.
     *
     * @param status The status of the call result.
     * @param data The data of the call result, if any.
     * @param details The details of the call result, if any.
     *
     * @returns {Object} Return an object that encapsulates the provided data.
     */
    function ResponseObject( status, data, details ) {
      return ({
        status: status,
        data: data,
        details: {
          message: details
        }
      });
    }

    /**
     * function
     * @name BltData#wrap
     * @description Wraps the given callback in an Angular $timeout, preserving any callback arguments.
     * @param callback The callback to wrap.
     * @returns {Function} The wrapped callback function.
     */
    function wrap(callback){
      return function(){
        var cbArgs = arguments;
        var cbCaller = this;
        $timeout(function(){
          callback.apply(cbCaller, cbArgs);
        }, 0);
      }
    }
  }

  BltData.$inject = ['$timeout', '$q', '$injector', 'BltApi', 'BltDataConfig'];
})();
