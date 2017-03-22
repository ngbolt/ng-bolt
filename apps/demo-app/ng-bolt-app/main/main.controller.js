(function() {
  'use strict';

  angular.module('demo.main', [])
    .controller('MainController', MainController);

  MainController.$inject = ['$scope', '$timeout', 'BltApi', 'BltData', 'BltAuth', 'TestService', '$location'];

  function MainController( $scope, $timeout, BltApi, data, auth, test, $location ) {
    var ctrl = this;

    ctrl.notify = notify;
    ctrl.search = search;
    ctrl.logout = logout;
    ctrl.getStarted = getStarted;
    ctrl.customValidator = {
      name: 'test', // The name of your custom validator object
      type: 'sync', // The type of validator: async or sync. See the Angular docs for more information.
      msg: "We're looking for the really really really really really really really long word 'Test'.", // The error message if invalid
      validationFn: function( modelValue, viewValue ) { // The function to run to determine validity
        if ( viewValue === 'Test' ) {
          return true;
        } else {
          return false;
        }
      }
    };

    activate();

    //////////////////////////////////////////////////////

    function activate() {
      if ( $location.path() == '/' ) {
        ctrl.loading = true;
      }

      BltApi.register(ctrl, 'main');

      BltApi.log('Test App initiated');

      BltApi.subscribe('main', function( msg ) {
        if ( msg == 'resolve' ) {
          BltApi.log('resolving the alert.');
        } else if ( msg == 'loading' ) {
          ctrl.loading = true;
        }
      });

      BltApi.trace('this is a trace message');
      BltApi.log('this is a log message');
      BltApi.info('this is an info message');
      BltApi.warn('this is a warning');
      BltApi.error('this is all wrong');
      BltApi.debug('debugging the app');


      auth.onauthenticate = function() {
        BltApi.warn("onauthenticate callback fired");

      };

      auth.connect();
    }

    function getStarted() {
      BltApi.switchViews('/base-styles', {foo: 'bar'});
      ctrl.loading = false;
    }

    function notify() {
      // var alert = {
      //  text: 'This is an alert',
      //  callback: {
      //    text: 'Open',
      //    name: 'main',
      //    action: 'resolve'
      //  }
      // }

      BltApi.log('notify');
      var notification = {
        text: 'This is an alert'
      };

      BltApi.publish('notify', notification);
      BltApi.publish('get notifications', updateNotifications);
    }

    function logout() {
      BltApi.publish('bltAuth', 'logout');
    }

    function updateNotifications( notifications ) {
      ctrl.notifications = notifications;
      BltApi.log(ctrl.notifications);
    }

    function search() {
      BltApi.switchViews(null, {});
    }
  }
})();