(function() {
  angular.module('blt_view')
    .factory('viewFactory', viewFactory);
  /**
   * @ngdoc service
   * @name ViewFactory
   * @module blt_view
   * @description This factory provides basic view property information such as the current view's index and state, as well as
   * what animation classes are attached to it.
   *
   * @requires https://docs.angularjs.org/api/ngRoute/service/$route
   * @requires https://docs.angularjs.org/api/ng/service/$location
   */

  function viewFactory( $route, $location, views ) {
    var viewState = {
      lastViewIndex: undefined,
      lastAnimationClass: null
    }
    var factory = {
      getCurrentViewIndex: getCurrentViewIndex,
      getViewAnimationClass: getViewAnimationClass,
      removeLastAnimationClass: removeLastAnimationClass,
      updateViewState: updateViewState
    };
    return factory;

    /**
     * @ngdoc method
     * @name ViewFactory#getCurrentViewIndex
     * @description Gets the index of the current view.
     * @returns {number} The index of the current view.
     *
     */
    function getCurrentViewIndex() {
      var path = $route.current.$$route.originalPath;
      return getViewIndex(path);
    }

    /**
     * @ngdoc method
     * @name ViewFactory#getViewAnimationClass
     * @description Gets the animation class of the current view.
     * @param {number} currentViewIndex The index of the current view.
     * @returns {string} The animation class name.
     *
     */
    function getViewAnimationClass( currentViewIndex ) {
      var lastViewIndex = viewState.lastViewIndex;
      if ( isNaN(lastViewIndex) ) {
        return null;
      }

      var animation = views[currentViewIndex].animation;
      if ( animation ) {
        switch ( animation ) {
          case 'fade':
            return 'fade';
          case 'slide':
            if ( isNaN(currentViewIndex) || isNaN(lastViewIndex) ) {
              return null;
            } else if ( currentViewIndex < lastViewIndex ) {
              return 'slide-right';
            } else if ( currentViewIndex > lastViewIndex ) {
              return 'slide-left';
            }
        }
      }
      return null;
    }

    /**
     * @ngdoc method
     * @name ViewFactory#removeLastAnimationClass
     * @description Removes the stored lastAnimationClass from the passed element. If lastAnimationClass
     * is null or undefined, returns without doing anything.
     * @param {angular.Element} elem The element to remove the class.
     *
     */
    function removeLastAnimationClass( elem ) {
      try {
        var animationClass = viewState.lastAnimationClass;
        if ( animationClass ) {
          elem.removeClass(animationClass);
        }
      } catch( e ) {
        console.error('Could not remove animation class ' + animationClass + ' from element.', e);
      }
    }

    /**
     * @ngdoc method
     * @name ViewFactory#updateViewState
     * @description Merges updates with the viewState properties.
     * @param {Object} updates Object to merge with viewState object.
     *
     */
    function updateViewState( updates ) {
      angular.merge(viewState, updates);
    }

    /**
     * Private Functions
     */

    /**
     * @private
     */
    function getViewIndex( path ) {
      for ( var i = 0; i < views.length; i++ ) {
        var view = views[i];
        if ( view.path == path ) {
          return i;
        }
      }
      console.warn('Could not get index of view: ' + path);
      return null;
    }
  }

  viewFactory.$inject = ['$route', '$location', 'views'];
})();