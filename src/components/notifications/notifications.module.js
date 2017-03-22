(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_notifications
   * @description ngBoltJS Notifications component.
   * @since 1.0.0
   */
  angular
    .module('blt_notifications', [])
    .component('bltNotifications', bltNotifications());

  /**
   * @ngdoc directive
   * @name bltNotifications
   * @module blt_notifications
   * @since 1.0.0
   *
   * @description The bltNotifications component is used to display
   * [toast notifications](http://developer.android.com/guide/topics/ui/notifiers/toasts.html) in the bottom left corner
   * of your ngBoltJS application. This component will subscribe to a `notify` subscription and will open as many
   * notification panels as necessary to present all current notifications. When a notification is received on that
   * subscription, a new notification panel will be presented with an `OK` button and, optionally, a callback button
   * depending on the configuration of the notification.
   *
   * <div class="note-info">
   * **Note** The {@link BltApi} must be injected into your controller in order to publish messages.
   * </div>
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   *
   * @usage
   * <caption>To use the Notifications, include the component in your `main.template.html` file or any view
   * template and publish them via the Bolt API.</caption>
   * ```html
   * <blt-notifications></blt-notifications>
   * ```
   * <caption>To publish a notification, use the ngBoltJS API {@link BltApi#publish} method, using `'notify'` as your
   * first parameter.The second argument should be your notification in the format shown below. The `text` of the
   * notification will be presented, along with an OK button that the user can click to dismiss the notification. If
   * the `callback` is defined, the `text` of the `callback` will be presented in the notification beside the `OK`
   * button. A user click of the callback button will publish the `action` on the `name` channel and close the
   * notification. If the `callback` is not defined, the notification will auto-dismiss after 5 seconds.</caption>
   *
   * ```js
   * {
   *     text: "text to be displayed",
   * 
   *     //Optional
   *     callback: { 
   *         name: "name to use when publishing this action"
   *         action: "anything. the contents of action will be passed as the second 
   *                  argument to publish when the callback is published."
   *         text: "label for button that will invoke our action function"
   *     }
   * }
   * ```
   *
   * @example
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("NotifyExCtrl", NotifyExCtrl)
   *     ;
   *     NotifyExCtrl.$inject = ["BltApi"];
   *     function NotifyExCtrl(bltApi){
   *       var ctrl = this;
   *       //Create a controller function to publish a simple notification.
   *       ctrl.simpleNotify = function(){
   *         var notification = {
   *           text: 'Successfully completed request.'
   *         }
   *         bltApi.publish('notify', notification);
   *       }
   *       //Create controller function to publish a notification with a callback.
   *       ctrl.notifyWithCallback = function(){
   *         var notification = {
   *           text: 'Failed to complete request.',
   *           callback: {
   *             name: 'notifyCallbackEx',
   *             action: {
   *               error: "Error Message"
   *             },
   *             text: 'handle error'
   *           }
   *         }
   *         bltApi.publish('notify', notification);
   *       }
   *       //Subscribe to the 'notifyCallbackEx' channel to handle notification callbacks from the above notification.
   *       bltApi.subscribe('notifyCallbackEx', function(notificationAction){
   *         alert(notificationAction.error);
   *       });
   *     }
   *   </javascript>
   *   <html>
   *     <div class="grid-block grid-center" ng-controller="NotifyExCtrl as ctrl">
   *       <button class="btn-solid" ng-click="ctrl.simpleNotify()">Simple Notification</button>
   *       <button class="btn-solid" ng-click="ctrl.notifyWithCallback()">Notify with Callback</button>
   *     </div>
   *     <blt-notifications></blt-notifications>
   *   </html>
   * </example>
   */
  function bltNotifications() {
    return {
      templateUrl: 'components/notifications/notifications.template.html',
      controller: bltNotificationsController
    };
  }

  // Inject required dependencies
  bltNotificationsController.$inject = ['BltApi', '$timeout'];

  /**
   * @private
   * @name bltNotificationsController
   * @module blt_notifications
   * @description Controller for bltNotifications component
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   *
   */
  function bltNotificationsController( api, $timeout ) {

    var ctrl = this;
    ctrl.$onInit = init;
    ctrl.$onDestroy = destroy;

    /**
     * @private
     * @desc initial function to begin process of subscribing to/creating notifications
     */
    function init() {
      // public properties
      ctrl.notifications = {};

      // public methods
      ctrl.dismiss = dismiss;
      ctrl.resolve = resolve;
      ctrl.startTimer = startTimer;

      // listen for new notifications
      api.subscribe('notify', create);
      api.subscribe('get notifications', get);
    }

    /////////////////////////////////////////////////
    // Public Functions
    /////////////////////////////////////////////////

    /**
     * @name bltNotificationsController#dismiss
     * @description Close the notification associated with the given ID.
     * @param id - The id of the notification to close.
     */
    function dismiss( id ) {
      ctrl.notifications[id].show = false;
      delete ctrl.notifications[id];
    };

    /**
     * @name bltNotificationsController#create
     * @description Create a new notification based on the given notification configuration.
     * @param notification - The notication to present. Should conform to notification data structure.
     */
    function create( notification ) {
      notification.id = api.uuid();
      notification.show = true;

      // Add to notifications array
      $timeout(function() {
        ctrl.notifications[notification.id] = notification;

        if ( notification.hasOwnProperty('callback') === -1 || notification.callback === null || notification.callback === undefined ) {
          startTimer(notification.id);
        }
      })
    };

    /**
     * @name bltNotificationsController#get
     * @description Get the current list of notification and return in callback.
     * @param callback - The function to call passed in your published message.
     */
    function get( callback ) {
      $timeout(function() {
        callback(ctrl.notifications);
      });
    };

    /**
     * @name bltNotificationsController#resolve
     * @description Publish the callback for the notification associated with the given id and dismiss the notification. This
     * method is invoked by clicking on the callback button in the notification.
     * @param id - The id of the notification to resolve.
     */
    function resolve( id ) {
      api.publish(ctrl.notifications[id].callback.name, ctrl.notifications[id].callback.action);
      dismiss(id);
    };

    /////////////////////////////////////////////////
    // Private Functions
    /////////////////////////////////////////////////

    /**
     * @private
     * @description Start a timer to auto-close the notification associated with the given id in 5 seconds.
     * @param id - The id of the notification to dismiss after 5 seconds.
     */
    function startTimer( id ) {
      $timeout(function() {
        if ( ctrl.notifications.hasOwnProperty(id) && ctrl.notifications[id].show ) {
          dismiss(id);
        }
      }, 5000);
    };

    /**
     * @private
     * @description Unsubscribe from notifications when our component is destroyed.
     */
    function destroy() {
      api.unsubscribe('notify');
      api.unsubscribe('get notifications');
      delete ctrl.notifications;
    };
  }
})();
