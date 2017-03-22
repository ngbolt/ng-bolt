(function() {
  'use strict';

  angular.module('blt_view')
    .directive('bltView', bltView);

  /**
   * @ngdoc directive
   * @name bltView
   * @module blt_view
   * @restrict E
   * @since 1.11.0
   *
   * @description This directive is a wrapper for Angular's ngView directive, which contains the 'pages' of your
   * application and applies CSS classnames for the animation that was set in your app's `views.json` file.
   *
   * The current view follows the path of the URL which can be changed by using the `href` attribute of an `a` tag or
   * the [ng-href](https://docs.angularjs.org/api/ng/directive/ngHref) directive. You can change views programmatically
   * using the Angular [$location](https://docs.angularjs.org/api/ng/service/$location) service or by passing the
   * routes and params to {@link BltApi#switchViews}.
   *
   * See {@link blt_appViews} for documentation on how to define views.
   *
   * @usage
   * ```html
   * <blt-view></blt-view>
   * ```
   */
  function bltView() {
    var directive = {
      restrict: 'E',
      template: '<ng-view class="view-content blt-animate" blt-view-animate></ng-view>',
      compile: compileFn
    };

    return directive;

    function compileFn( tElem, tAttrs ) {
      tElem.addClass('view');
    }
  }
})();