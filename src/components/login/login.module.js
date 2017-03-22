(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_login
   * @description ngBoltJS Login module.
   * @since 2.0.0
   */
  angular.module('blt_login', ['blt_core', 'blt_auth'])
    .component('bltLogin', bltLogin());

  /**
   * @ngdoc directive
   * @name bltLogin
   * @module blt_login
   * @description The bltLogin component is injected into the application `index.html` whenever the
   * bltLogin component is enabled in `build.json`. This component will handle showing and hiding the login form/page
   * based upon the current authentication/login state of the application. Note that this login page is simply a view
   * in your single page application and does not prevent inspection of the rest of your application by an
   * unauthenticated user.
   *
   * As an ngBoltJS developer, you will have very little interaction with this component. It will simply be injected and
   * work with your configured authentication service to provide a UI for user authentication.
   *
   * @restrict E
   *
   * @requires BltApi
   * @requires BltAuth
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires https://docs.angularjs.org/api/ng/service/$interval
   *
   */
  function bltLogin() {

    return {
      bindings: {},
      templateUrl: 'components/login/login.template.html',
      controller: bltLoginController
    };
  }

  /**
   * @private
   * @name bltLoginController
   * @module blt_login
   * @description Controller for the bltLogin component
   *
   * @requires BltApi
   * @requires BltAuth
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires https://docs.angularjs.org/api/ng/service/$interval
   *
   */
  function bltLoginController( bltApi, bltAuth, $timeout, $interval ) {

    var terminated = false;
    var monitorInterval = undefined;
    var pristine = true;

    var ctrl = this;
    ctrl.$onInit = init;
    ctrl.$onDestroy = terminate;
    ctrl.show = show;
    ctrl.hide = hide;
    ctrl.reload = reload;
    ctrl.available = false;
    ctrl.pristine = pristine;
    ctrl.shown = false;
    ctrl.login = {
      username: undefined,
      password: undefined
    }
    /**
     * @private
     * @description Handles the controller initialization. Confirm existence of required attributes and set default values
     * as needed.
     */
    function init() {
      bltAuth.connect().then(function() {
        bltAuth.hasCredentials().then(hide, show).finally(monitorAuthentication);
      });

      ctrl.error = {show: false, message: ""};

      bltApi.subscribe('login', function( msg ) {
        if ( msg === 'show' ) {
          show();
        } else if ( msg === 'hide' ) {
          hide();
        } else if ( msg === 'state_query' ) {
          if ( ctrl.shown ) {
            bltApi.publish('login', 'showing');
          } else {
            bltApi.publish('login', 'hidden');
          }
        }
      });

      //Wire a function to the scope submitLogin which will be linked to the login button in the UI
      ctrl.submitLogin = function() {
        bltAuth.login(ctrl.login.username, ctrl.login.password).then(
          function() {
            bltApi.publish("login", "success");
            hide();
          },
          function() {
            ctrl.error.message = 'Unable to login because the username and/or password was incorrect.';
            ctrl.error.show = true;
          }
        );
      }

      //Set up the monitor function to run every 2 seconds.
      monitorInterval = $interval(monitorAuthentication, 2000);

      bltApi.publish("bltAuth", "evaluate");

      ///////////////////
    }

    /**
     * @name bltLoginController#show
     * @description If the login UI is not currently showing, show the UI and publish an event on the bltApi to indicate
     * that the login UI has been shown.
     */
    function show() {
      if ( !ctrl.shown ) {
        if ( !pristine ) {
          $timeout(reload, 1000);
        }
        ctrl.login = {
          username: undefined,
          password: undefined
        }
        ctrl.error = {
          show: false,
          message: ""
        }
        bltAuth.available().then(function() {
          ctrl.available = true;
        }, function() {
          ctrl.available = false;
          ctrl.error.message = 'Unable to login. Authentication service is unavailable.';
          ctrl.error.show = true;
        });
        $timeout(function() {
          ctrl.shown = true;
        });
        bltApi.publish('login', 'showing');
      }
    };

    /**
     * @name bltLoginController#hide
     * @description If the login UI is currently showing, hide the UI and publish an event on the bltApi to indicate that
     * the login UI has been hidden.
     */
    function hide() {
      if ( pristine ) {
        pristine = false;
        $timeout(function() {
          ctrl.pristine = pristine;
        }, 500);
      }
      if ( ctrl.shown ) {
        $timeout(function() {
          ctrl.login = {
            username: undefined,
            password: undefined
          };
          ctrl.error = {
            show: false
          };
          ctrl.shown = false;
        }, 500);
        bltApi.publish('login', 'hidden');
      }
    };

    function reload() {
      window.location.reload(true)
    }

    /**
     * @name bltLoginController#monitorAuthentication
     * @description Checks for the existence of login credentials in the bltAuth service. If we have credentials, we should
     * hide the login UI, otherwise we should show the login UI.
     */
    function monitorAuthentication() {
      if ( !terminated ) {
        if ( ctrl.shown ) {
          bltAuth.available().then(function() {
            ctrl.available = true;
          }, function() {
            ctrl.available = false;
          })
        }
        bltAuth.hasCredentials().then(function() {
          hide();
        }, function() {
          $timeout(function() {
            if ( !ctrl.shown ) {
              show();
            }
          }, 500);
        });
      }
    };

    /**
     * @name bltLoginController#terminate
     * @description Invoked on $scope.$destroy. Sets a flag to tell the monitoring and subscriptions to shut down.
     */
    function terminate() {
      terminated = true;
      bltApi.unsubscribe('login');
      $interval.cancel(monitorInterval);
    };
  }

  bltLoginController.$inject = ['BltApi', 'BltAuth', '$timeout', '$interval'];
})();
