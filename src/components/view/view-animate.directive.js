(function() {
  'use strict';

  angular.module('blt_view')
    .directive('bltViewAnimate', bltViewAnimate);

  function bltViewAnimate( viewFactory ) {
    return {
      restrict: 'A',
      link: linkFn
    }

    function linkFn( scope, elem, attrs ) {
      viewFactory.removeLastAnimationClass(elem.parent());

      var currentViewIndex = viewFactory.getCurrentViewIndex();
      var animationClass = viewFactory.getViewAnimationClass(currentViewIndex);

      try {
        elem.parent().addClass(animationClass);
      } catch( e ) {
        console.warn('Could not apply animation: ' + animationClass + ' to element.', e);
      }

      var updates = {
        lastViewIndex: currentViewIndex,
        lastAnimationClass: animationClass
      }
      viewFactory.updateViewState(updates);
    }
  }

  bltViewAnimate.$inject = ['viewFactory'];
})();