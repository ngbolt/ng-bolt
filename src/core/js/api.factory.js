(function() {
  'use strict';

  angular.module('blt_core')
    .factory('BltApi', BltApi);

  BltApi.$inject = ['$window', 'config', '$location'];

  /**
   * @ngdoc service
   * @name BltApi
   * @module blt_core
   *
   * @description
   * Application-wide API for communicating between components and providing helper functions.
   *
   * @requires https://docs.angularjs.org/api/ng/service/$window
   * @requires https://docs.angularjs.org/api/ng/service/$location
   * @requires blt_config
   */
  function BltApi( $window, config, $location ) {

    var subscriptions = {};
    var logLevels = ['trace', 'debug', 'info', 'warn', 'error'];
    var currentLogLevel;
    var registered = {};

    var factory = {};

    factory.subscribe = subscribe;
    factory.unsubscribe = unsubscribe;
    factory.publish = publish;
    factory.switchViews = switchViews;
    factory.getCurrentView = getCurrentView;
    factory.uuid = uuid;

    factory.trace = angular.noop;
    factory.log = angular.noop;
    factory.debug = angular.noop;
    factory.info = angular.noop;
    factory.warn = angular.noop;
    factory.error = angular.noop;

    factory.setLogLevel = setLogLevel;
    factory.getLogLevel = getLogLevel;
    factory.clearLogLevel = clearLogLevel;

    factory.getMillisFromEpoch = getMillisFromEpoch;
    factory.convertToId = convertToId;
    factory.register = register;
    factory.unregister = unregister;

    init();

    return factory;

    //// PUBLIC API ///////////////////////////////////////////////////////////

    /**
     * @ngdoc method
     * @name BltApi#subscribe
     *
     * @summary Registers callbacks to a message
     *
     * @description
     * The subscribe method registers messages to trigger a function when the subscription is called. This is useful
     * when needing to set up lines of communication between controllers and directives, or when needing to complete
     * some function upon completion of an asynchronous function. Subscriptions should be made in the activate method
     * of a controller's function.
     *
     * <div class="note-info">
     * **Note** Subscription callback methods are not watched by Angular, therefore any changes to the model must be
     * wrapped in a $timeout so that they are digested by Angular and the view is updated.
     * </div>
     *
     * @param {String} name The name of the subscription. You can subscribe more than one callback to the same name.
     * If the subscription is made in a controller, the name should reflect the 
     * [controllerAs](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#controlleras-controller-syntax)
     * name of the controller (e.g. `name: 'main'` for controller 'MainController').
     *
     * @param {Function} callback The function for handling the published message.
     *
     * @example
     * <example name="subscribe">
     *   <javascript>
     *     angular.module('bltDocs')
     *       .controller('MyController', MyController)
     *     ;
     *     MyController.$inject = ['BltApi', '$timeout'];
     *     function MyController(bltApi, $timeout){
     *        var ctrl = this;
     *
     *        // Define controller methods and properties
     *        activate();
     *        function activate(){
     *            bltApi.subscribe('MyCtrl', function(msg){
     *
     *              // Handle simple string msg
     *              if( msg == 'new item'){
     *                  // Must use timeout so Angular digests changes to the model.
     *                  $timeout(function(){
     *                      ctrl.currentItem = {};
     *                      ctrl.createNewItem();
     *                  });
     *
     *              // Handle more complex message
     *              } else if( msg.action == 'edit item'){
     *                  $timeout(function(){
     *                      ctrl.currentItem = msg.data;
     *                      ctrl.editItem();
     *                  });
     *              }
     *          };
     *        }
     *     }
     *   </javascript>
     * </example>
     *
     */
    function subscribe( name, callback ) {

      // Save subscription if it doesn't already exist
      if ( !subscriptions[name] ) {
        subscriptions[name] = [];
      }

      // Add callback to subscription
      subscriptions[name].push(callback);

      factory.debug('Subscribed: ', name);
    }

    /**
     * @ngdoc method
     * @name BltApi#unsubscribe
     *
     * @summary Removes callbacks registered to a message.
     *
     * @description
     * The unsubscribe method removes all subscriptions of the provided name. When the scope of a controller or
     * directive is destroyed, it is considered best practice to unsubscribe any subscriptions made in that controller
     * or directive. They will be re-subscribed when they are added back to the scope.
     *
     * <div class="note-warning">
     * **Warning** The unsubscribe method will delete all subscriptions registered to a particular name regardless if
     * that subscription was made from the controller or directive being destroyed. To prevent the unwanted deletion of
     * subscriptions made to the same name but from a different controller/directive, use unique names on subscriptions
     * made from different controllers or directives.
     * </div>
     *
     * @param {String} name The name of the {@link BltApi#subscribe subscription} you wish to delete.
     * @param {Function} [callback] An optional callback function to run after the subscription has been deleted.
     *
     * @example
     * <example name="unsubscribe">
     *   <javascript>
     *     angular.module('bltDocs')
     *       .controller('MyController', MyController)
     *     ;
     *     MyController.$inject = ['BltApi', '$timeout', '$scope'];
     *     function MyController(bltApi, $timeout, $scope){
     *         var ctrl = this;
     *         // Define controller methods and properties
     *         activate();
     *         function activate(){
     *             // set up a subscription
     *             bltApi.subscribe('MyCtrl', function(msg){
     *                 if( msg == 'new item' ){
     *                     $timeout(function(){
     *                         ctrl.createNewItem();
     *                     });
     *                 }
     *             };
     *             // Listen to the scopes $destroy event to run clean up functions
     *             $scope.$on('$destroy', destroy);
     *         }
     *         function destroy(){
     *             // Unsubscribe subscriptions set up in activate function and run a callback function.
     *             bltApi.unsubscribe('MyCtrl', function(){
     *                 console.log("successfully unsubscribed all subscriptions to 'MyCtrl'.");
     *             });
     *             // Delete the ctrl object ('MyCtrl' would be what was set using controllerAs in the HTML template).
     *             delete $scope.MyCtrl;
     *         }
     *     }
     *   </javascript>
     * </example>
     *
     *
     */
    function unsubscribe( name, callback ) {
      if ( subscriptions[name] !== undefined ) {
        delete subscriptions[name];
      }

      factory.debug('Unsubscribed: ' + name);

      if ( typeof callback === 'function' ) {
        callback.call(this);
      }
    }

    /**
     * @ngdoc method
     * @name BltApi#publish
     *
     * @summary Publishes a message.
     *
     * @description The publish method provides a built-in ability to interact with ngBoltJS components from within a
     * controller or custom directive as well as send custom messages between ngBoltJS application modules.
     *
     * @param {String} name The name of the subscription you are publishing too. If opening a modal or panel,
     * this will be the id of the modal or panel, otherwise it will be the name you passed to
     * {@link BltApi#subscribe BltApi.subscribe}.
     *
     * @param {String|Object} msg A string or object to be passed to the callback of the subscription you are publishing to. If opening a modal or panel, `msg` will be 'open'. Likewise, if closing a panel or modal, it will be 'close'. If publishing to a custom subscription, this will be the string or object you expect to handle.
     *
     * @example
     * <example name="publish">
     *   <javascript>
     *     angular.module('bltDocs')
     *       .controller('MyController', MyController)
     *     ;
     *     MyController.$inject = ['BltApi', '$timeout'];
     *     function MyController(bltApi, $timeout){
     *       var ctrl = this;
     *       // Define controller methods and properties and activate
     *       publishExample(){
     *         // Open a modal with id of 'myModal'
     *         bltApi.publish('myModal', 'open');
     *         // Close a panel with id of 'myPanel'
     *         bltApi.publish('myPanel', 'close');
     *         // Publish a message to a custom subscription (see BltApi.subscribe below)
     *         var msg = {
     *           action: 'edit item',
     *           data: {...}
     *         }
     *         bltApi.publish('MyCtrl', msg);
     *       }
     *     }
     *   </javascript>
     * </example>
     *
     */
    function publish( name, msg ) {

      // Save the subscription as an empty array if it was not previously saved
      if ( !subscriptions[name] ) {
        subscriptions[name] = [];
      }

      // Send message in a callback
      subscriptions[name].forEach(function( cb ) {
        cb(msg);
      });

      factory.debug('Published: ' + name + '\n', msg);
    }

    /**
     * @ngdoc method
     * @name BltApi#switchViews
     *
     * @summary Updates $location.path() and/or $location.searchParams().
     *
     * @description
     * Updates $location with the provided path and searchParmas. If only `path` is provided,
     * [$location.path()](https://docs.angularjs.org/api/ng/service/$location) will be called, if `searchParams` are
     * included, [$location.url()](https://docs.angularjs.org/api/ng/service/$location) is called. If `searchParams` is
     * an emtpy object, any search parameters on the current url will be removed.
     *
     * <div class="note-info">
     * **NOTE** If the current URL has search parameters but only `path` is passed as a parameter, only the path will
     * change and the search parameters will still be applied to the URL. This can be useful when switching views when
     * filtering by some value(s).
     * </div>
     *
     * See {@link blt_appViews} for more information on defining views.
     *
     * @param {string} path The path of the view you want to open.
     * @param {object} [searchParams] Search parameters to append to the supplied path. If the object is empty, search parameters will be removed.
     *
     * @example <caption>Change view</caption>
     * <example name="switchViews1">
     *   <javascript>
     *     // Will change url to: http://example.com/some/path
     *     bltApi.switchViews('/some/path');
     *   </javascript>
     * </example>
     *
     *
     * @example <caption>Change view with search parameters</caption>
     * <example name="switchViews2">
     *   <javascript>
     *     // Will change url to: http://example.com/some/path?foo=value1&bar=value2
     *     bltApi.switchViews('/some/path', {foo: 'value1': bar: 'value2'});
     *   </javascript>
     * </example>
     *
     * @example <caption>Change view and clear search parameters</caption>
     * <example name="switchViews3">
     *   <javascript>
     *     // Given the URL: http://example.com/some/path?foo=value1&bar=value2
     *     // Will change the URL to: http://example.com/some/other/path
     *     bltApi.switchViews('some/other/path', {});
     *   </javascript>
     * </example>
     *
     * @example <caption>Change view and don't reset search parameters</caption>
     * <example name="switchViews4">
     *   <javascript>
     *     // Given the URL: http://example.com/some/path?foo=value1&bar=value2
     *     // Will change the URL to: http://example.com/some/other/path?foo=value1&bar=value2
     *     bltApi.switchViews('some/other/path');
     *   </javascript>
     * </example>
     *
     * @example <caption>Stay on current view, but reset search parameters</caption>
     * <example name="switchViews5">
     *   <javascript>
     *      // Given the URL: http://example.com/some/path?foo=value1&bar=value2
     *      // Will change the URL to: http://example.com/some/path
     *      bltApi.switchViews(null, {});
     *   </javascript>
     * </example>
     *
     */
    function switchViews( path, searchParams ) {
      if ( path === null ) {
        // Reset search parameters
        if ( searchParams && Object.keys(searchParams).length == 0 ) {
          $location.url($location.path());
          // Add or update search parameters.
        } else if ( searchParams ) {
          $location.search = searchParams
        }
      } else {
        // Switch views and reset search parameters
        if ( searchParams && Object.keys(searchParams).length == 0 ) {
          try {
            $location.url(path);
          } catch( e ) {
            factory.error('There was error trying to switch views. See localhost:9001/core.BltApi.html on how to switch views.', e);
          }
          // Switch views and add/update search parameters.
        } else if ( searchParams ) {
          try {
            $location.path(path).search(searchParams);
          } catch( e ) {
            factory.error('There was error trying to switch views. See localhost:9001/core.BltApi.html on how to switch views.', e);
          }

          // Switch views and do nothing with search parameters.
        } else {
          try {
            $location.path(path);
          } catch( e ) {
            factory.error('There was error trying to switch views. See localhost:9001/core.BltApi.html on how to switch views.', e);
          }
        }
      }

    }

    /**
     * @ngdoc method
     * @name BltApi#getCurrentView
     *
     * @summary Gets the current view information.
     *
     * @description
     * Returns the url information of the current view. Returns the absolute url if no getter is set.
     *
     * @param {string} [getter] Getter method to call from Angular's [$location](https://docs.angularjs.org/api/ng/service/$location) service.
     *
     * @returns {string} The result of the called getter method.
     */
    function getCurrentView( getter ) {
      getter = getter || 'absUrl'
      return $location[getter]();
    }

    /**
     * @ngdoc method
     * @name BltApi#uuid
     *
     * @summary Gets a UUID.
     *
     * @description Generates and returns a [Version 4 universally unique identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier) conforming to [RFC 4122](https://tools.ietf.org/html/rfc4122).
     *
     * @returns {string} Generated UUID
     */
    function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function( c ) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }

    /**
     * @ngdoc method
     * @name BltApi#setLogLevel
     *
     * @summary Sets application-wide console logging level.
     *
     * @description
     * Sets the application-wide log level, affecting the logs that are printed to the console when invoking any of the
     * following BltApi logging functions: `trace`, `debug`, `info`, `warn` and `error`. The levels are listed in
     * order of precedence from lowest to highest. When the log level is set, the log levels that are enabled include
     * that specific level and any level of higher precedence. If you set the level to 'info', the levels enabled will
     * be `info`, `warn` and `debug`.
     *
     * <div class="note-info">
     * **Note** The log level set does NOT affect the BltApi `log` function. That function will log to the console
     * regardless of the log level assigned.
     * </div>
     *
     * <div class="note-info">
     * **Note** The log level that is assigned will remain in affect until the user clears it via the
     * {@link BltApi#clearLogLevel} method. This will persist across browser and user sessions.
     * </div>
     *
     * @param {number} level The log level to assign.
     *
     * @returns {boolean} Whether or not the given log level was successfully applied.
     */
    function setLogLevel( level ) {
      if ( assignLogLevel(level) ) {
        $window.localStorage.setItem('loglevel', level);
        return true;
      }
      return false;
    }

    /**
     * @ngdoc method
     * @name BltApi#clearLogLevel
     *
     * @summary Resets the current console logging level.
     *
     * @description Clears the saved log level and re-assigns the default log level.
     */
    function clearLogLevel() {
      $window.localStorage.removeItem('loglevel');
      loadInitialLogLevel();
    }

    /**
     * @ngdoc method
     * @name BltApi#getLogLevel
     *
     * @summary Returns the current log level.
     *
     * @description Returns the current log level.
     *
     * @returns {string} The current log level.
     */
    function getLogLevel() {
      return currentLogLevel;
    }

    /**
     * @ngdoc method
     * @name BltApi#getMillisFromEpoch
     *
     * @summary Converts date to milliseconds from epoch.
     *
     * @description
     * Attempts to convert the given date parameter to milliseconds from epoch. Acceptable formats include:
     *    * `number` - will be interpreted as ms from epoch.
     *    * `string` - will attempt to interpret as a formatted string, or a string containing ms from epoch if that
     * fails
     *    * `date` - will be converted to ms from epoch using `date.getTime()`
     *    * `function` - will convert the output of the given date function to ms from epoch.
     *    * `null` - if no parameter is provided, will return current ms from epoch. `new Date().getTime()`
     *
     * @param {Object|Number|String|Function} [date] The date or date-like object to convert to ms from epoch.
     *
     * @returns {number} Milliseconds from epoch.
     */
    function getMillisFromEpoch( date ) {
      if ( angular.isUndefined(date) ) {
        return new Date().getTime();
      } else if ( angular.isDate(date) ) {
        return date.getTime();
      } else if ( angular.isNumber(date) ) {
        if ( isFinite(date) ) {
          return new Date(date).getTime();
        } else {
          factory.warn("Could not convert given number to ms from epoch: %s", date);
        }
      } else if ( angular.isString(date) ) {
        if ( isNaN(date) ) {
          try {
            return new Date(date).getTime();
          } catch( error ) {
            factory.warn("Could not convert given string to ms from epoch: %s", date);
          }
        } else {
          return new Date(parseInt(date)).getTime();
        }
      } else if ( angular.isFunction(date) ) {
        return getMillisFromEpoch(date());
      } else {
        factory.warn("Could not convert given date to ms from epoch: %s", angular.toJson(date));
      }
      return undefined;
    }

    /**
     * @ngdoc method
     * @name BltApi#convertToId
     *
     * @summary Converts string to lowercase delimited string.
     *
     * @description Generates an id as a delimited string.
     *
     * @param  {string} Text string to convert to id.
     * @param  {string} Delimeter The character to use as a delimeter.
     * @return {string} The generated id.
     */
    function convertToId( text, delimeter ) {
      if ( delimeter === undefined ) {
        delimeter = '-';
      }

      var re = new RegExp('[^a-z0-9\\' + delimeter + ']', 'gmi');
      return text.toLowerCase().replace(/ /g, delimeter).replace(re, "");
    }

    /**
     * @ngdoc method
     * @name BltApi#register
     *
     * @summary Adds component to global space.
     *
     * @description Register an angular controller, service, or factory as a global object on the window. Will only
     * succeed if the {@link blt_config config debug setting} is set to true.
     *
     * @param  {obj} obj  The object to register to the global window object.
     * @param  {string} name The name to use as the key on the window object.
     */
    function register( obj, name ) {
      if ( config.debug ) {
        if ( name === null || name === undefined ) {
          console.warn('[name] was undefined or null. %s was not registered.', obj);
        } else {
          window[name] = obj;
          registered[name] = obj;
        }
      }
    }

    /**
     * @ngdoc method
     * @name BltApi#unregister
     *
     * @summary Removes component from global space.
     *
     * @description Removes the Angular controller, service, or factory from the window if anything
     * was registered by that the given name.
     *
     * @param  {string} name The name that was used as the key on the window object.
     */
    function unregister( name ) {
      if ( config.debug ) {
        if ( name === null || name === undefined ) {
          console.warn('[name] was undefined or null. Nothing was unregistered.');
        } else if ( registered.hasOwnProperty(name) ) {
          delete registered[name];
          delete window[name];
        } else {
          console.warn('[name] was not previously registered through the BltApi. You can only unregister global objects' +
            'that were registered view the BltApi#register function. Nothing was unregistered.');
        }
      }
    }

    //// Private API //////////////////////////////////////////////////////////

    /**
     * @private
     * @function init
     * @description Initializes BltApi by disabling logging if debug is false, setting the log level and registering the api to the window global object.
     */
    function init() {
      if ( config.debug === false ) {
        disableLogging();
      }

      loadInitialLogLevel();

      register(factory, 'api');
    }

    /**
     * @private
     * @function assignLogLevel
     * @description If the given log level is one of our assignable log levels, assigns that level to the log system.
     *
     * @param level - The level to set.
     *
     * @returns {boolean} Whether or not the given log level was assigned successfully to the system.
     */
    function assignLogLevel( level ) {
      var idx = logLevels.indexOf(level);
      if ( idx >= 0 ) {
        if ( level != currentLogLevel ) {
          currentLogLevel = level;
          factory.trace = idx == 0 ? console.trace ? console.trace.bind(console) : console.debug.bind(console) : angular.noop;
          factory.debug = idx <= 1 ? console.debug.bind(console) : angular.noop;
          factory.log = idx <= 1 ? console.log.bind(console) : angular.noop;
          factory.info = idx <= 2 ? console.info.bind(console) : angular.noop;
          factory.warn = idx <= 3 ? console.warn.bind(console) : angular.noop;
          factory.error = idx <= 4 ? console.error.bind(console) : angular.noop;
        }
        return true;
      } else {
        console.warn("Invalid log level: %s. Valid levels are: %s", level, angular.toJson(logLevels));
        return false;
      }
    }

    /**
     * @private
     * @function loadInitialLogLevel
     * @description Loads the log level from either localStorage if it exists there, or from the {@link blt_config} module.
     */
    function loadInitialLogLevel() {
      var initialLogLevel = $window.localStorage.getItem('loglevel');
      if ( !initialLogLevel ) {
        initialLogLevel = config.defaultLogLevel;
        console.info("Loading default log level from profile: %s", initialLogLevel);
      } else {
        console.info("Loading previously assigned log level: %s", initialLogLevel);
      }
      assignLogLevel(initialLogLevel);
    }

    /**
     * @private
     * @function disableLogging
     * @description Disables all logging when the profile debug setting is set to false. This is best practice for production builds
     * to prevent unwanted data from being accessible from the developer tools console.
     */
    function disableLogging() {
      console.warn('Logging disabled because config.debug was false.');

      console.log(console);
      console.log = angular.noop;
      console.trace = angular.noop;
      console.debug = angular.noop;
      console.info = angular.noop;
      console.warn = angular.noop;
      console.error = angular.noop;
    }
  }
})();
