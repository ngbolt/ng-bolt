(function() {
  'use strict';

  angular
    .module('blt_core')
    .directive('bltIfBp', bltIfBp);

  bltIfBp.$inject = ['BltApi', '$window', 'breakpoints', '$compile', '$animate'];

  /**
   * @ngdoc directive
   * @name bltIfBp
   * @module blt_core
   * @restrict A
   *
   * @since 2.0.0
   *
   * @description
   * Provides [ng-if](https://docs.angularjs.org/api/ng/directive/ngIf) functionality tied to viewport width via
   * a set of defined media-query breakpoints. These breakpoints are as follows: 'sm', 'md', 'lg', 'xl', and 'xxl'.
   * Breakpoints can be used in this directive by assigning a string or model reference to the directive. The
   * assignment of a breakpoint can also include a direction: 'down', 'up' or 'only'. If no direction is defined, the
   * breakpoint is interpreted as 'only'. It is important to note that, like ng-if, the blt-if-bp directive will add or
   * remove your element from the DOM based on the breakpoint configuration and viewport width.
   *
   * @example
   * <caption>The following example demonstrates the various ways in which a breakpoint can be
   * specified. To view the various breakpoints in action, please resize your browser window.</caption>
   * <example runnable="true">
   * <javascript name="BPCtrl">
   *   angular.module('bltDocs')
   *     .controller('BPCtrl', function(){
   *       var ctrl = this;
   *       ctrl.bp = {
   *         bp: 'md',
   *         dir: 'down'
   *        }
   *     });
   * </javascript>
   * <html>
   *   <div class="grid-content text-center" ng-controller="BPCtrl as ctrl">
   *     <div blt-if-bp="ctrl.bp">
   *       <h2 class="font-title">Medium or Smaller Viewport Display</h2>
   *     </div>
   *     <div blt-if-bp="lg">
   *       <h2 class="font-title">Large Viewport Display Only</h2>
   *     </div>
   *     <div blt-if-bp='{bp: "xl", dir: "up"}'>
   *       <h2 class="font-title">Extra Large or Larger Viewport Display</h2>
   *     </div>
   *   </div>
   * </html>
   * </example>
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$window
   * @requires blt_config#breakpoints
   * @requires https://docs.angularjs.org/api/ng/service/$compile
   * @requires https://docs.angularjs.org/api/ng/service/$animate
   */
  function bltIfBp( bltApi, $window, breakpoints, $compile, $animate ) {

    // Valid breakpoint names and directions.
    var breakpointnames = ['sm', 'md', 'lg', 'xl', 'xxl'];
    var directions = {
      down: 'down',
      only: 'only',
      up: 'up'
    }

    var directive = {
      multiElement: true,
      transclude: 'element',
      priority: 601,
      terminal: true,
      restrict: 'A',
      $$tlb: true,
      scope: {
        bltIfBp: '='
      },
      link: linkFn
    };

    return directive;

    function linkFn( $scope, $element, $attr, ctrl, $transclude ) {

      var block, childScope, previousElements, mediaQuery, minWidth, maxWidth;

      if ( !$window.matchMedia || !angular.isFunction($window.matchMedia) ) {
        bltApi.warn("window.matchMedia not found. blt-if-bp functionality will not be available in this browser.");
        return;
      }

      // Determine whether the value was given inline or as part of our scope. If it's inline the attribute will be
      // a string that contains object notation '{' and '}' or is simply one of our breakpoint names. Otherwise, we'll
      // assume that it's coming from the scope.
      var fromScope = true;
      if ( !angular.isDefined($scope.bltIfBp) && breakpointnames.indexOf($attr.bltIfBp) >= 0 ||
        ($attr.bltIfBp.indexOf('{') >= 0 && $attr.bltIfBp.indexOf('}') > 0) ) {
        fromScope = false;
      }

      // Set up unregister hook.
      $scope.$on('$destroy', function() {
        if ( mediaQuery ) {
          mediaQuery.removeListener(evaluateBreakpoint);
        }
      });

      // If our value is coming from scope, set up a listener to react to changes.
      if ( fromScope ) {
        $scope.$watch(function() {
          return $scope.bltIfBp
        }, function( value ) {
          registerBreakpoint(value);

        });
      } else { // Otherwise just register the breakpoint we have set in our attribute.
        registerBreakpoint($attr.bltIfBp);
      }

      /**
       * @private
       * @function registerBreakpoint
       *
       * @description
       * Registers the given breakpoint settings with this element. Based on these settings,
       * we'll set up our min and max width values. If the browser support media queries, we'll register a media query
       * with this min and/or max value and set up a listener to respond to changes in that query. The value passed in
       * can be a simple string naming one of the predefined breakpoints, or a JSON Object or JSON String representing
       * our breakpoint settings. The breakpoint settings format is as follows:
       *
       * ```js
       * {
       *    bp: 'sm', //One of our predefined breakpoint names.
       *    dir: 'up' //One of 'down','up', or 'only'.
       * }
       * ```
       *
       * @param value The breakpoint value to register. Can be a simple string naming one of the predefined breakpoints,
       * or a JSON Object or JSON String representing our breakpoint settings.
       */
      function registerBreakpoint( value ) {
        // Convert value into object format if necessary.
        var bp = {};
        if ( angular.isObject(value) ) { // Value already is an object.
          bp = value;
        } else if ( value.indexOf('{') >= 0 && value.indexOf('}') > 0 ) { // Value appears to be a JSON string.
          //Convert to valid json string, then to a JSON object. DON'T use eval because we can guarantee safe input.
          bp = angular.fromJson(value.replace(/(['"])?([a-zA-Z0-9]+)(['"])?:/g, '"$2":'));
        } else { // If value is anything else, we'll just try to use it directly as the breakpoint.
          bp.bp = value;
        }
        // If no direction was set, default to 'only'
        bp.dir = bp.dir || 'only';

        // Evaluate min and max widths based on breakpoint settings.
        var bpIdx = breakpointnames.indexOf(bp.bp);
        if ( bpIdx >= 0 ) {
          //We'll set a max width if the direction is down or only.
          if ( bp.dir == directions.down || bp.dir == directions.only ) {
            // and we're not already on the largest breakpoint.
            if ( bpIdx < breakpointnames.length - 1 ) {
              maxWidth = breakpoints[breakpointnames[bpIdx + 1]] - 1;
            }
          }
          // We'll set a min width if the direction is up or only.
          if ( bp.dir == directions.up || bp.dir == directions.only ) {
            // and we're not already on the smallest breakpoint.
            if ( bpIdx > 0 ) {
              minWidth = breakpoints[bp.bp];
            }
          }
        }

        // If matchMedia is available, set up a media query and register for changes. Otherwise we'll depend on window
        // resize events.
        if ( $window.matchMedia && angular.isFunction($window.matchMedia) ) {
          if ( mediaQuery ) {
            mediaQuery.removeListener(evaluateBreakpoint);
          }
          var match = 'screen';
          if ( angular.isDefined(minWidth) ) {
            match += ' and (min-width: ' + minWidth + 'px)';
          }
          if ( angular.isDefined(maxWidth) ) {
            match += ' and (max-width: ' + maxWidth + 'px)';
          }
          mediaQuery = $window.matchMedia(match);
          mediaQuery.addListener(evaluateBreakpoint);
        }

        // Trigger a breakpoint evaluation.
        evaluateBreakpoint();
      }

      /**
       * @private
       * @function getBlockNodes
       *
       * @description
       * Builds a jqlite element containing all sibling elements in the given node set. Stolen from angular ng-if
       * implementation.
       *
       * @param nodes jqlite element containing a set of notes.
       * @returns {Object}
       */
      function getBlockNodes( nodes ) {
        var node = nodes[0];
        var endNode = nodes[nodes.length - 1];
        var blockNodes = [node];
        do {
          node = node.nextSibling;
          if ( !node ) break;
          blockNodes.push(node);
        } while ( node !== endNode );
        return angular.element(blockNodes);
      }

      /**
       * @private
       * @function matches
       *
       * @description Check to see if the current viewport matches our breakpoint settings.
       *
       * @returns {boolean} True if the current viewport patches our breakpoint settings. False otherwise.
       */
      function matches() {
        if ( mediaQuery ) {
          return mediaQuery.matches;
        } else {
          var px = $window.innerWidth;
          return (!angular.isDefined(minWidth) || px >= minWidth)
            && (!angular.isDefined(maxWidth) || px <= maxWidth);
        }
      }

      /**
       * @private
       * @function evaluateBreakpoint
       *
       * @description Update UI state based on breakpoint and current viewport size.
       */
      function evaluateBreakpoint() {
        if ( matches() ) {
          if ( !childScope ) {
            $transclude(function( clone, newScope ) {
              childScope = newScope;
              clone[clone.length++] = $compile.$$createComment('end bltIfBp', $attr.bltIfBp);
              // Note: We only need the first/last node of the cloned nodes.
              // However, we need to keep the reference to the jqlite wrapper as it might be changed later
              // by a directive with templateUrl when its template arrives.
              block = {
                clone: clone
              };
              $animate.enter(clone, $element.parent(), $element);
            });
          }
        } else {
          if ( previousElements ) {
            previousElements.remove();
            previousElements = null;
          }
          if ( childScope ) {
            childScope.$destroy();
            childScope = null;
          }
          if ( block ) {
            previousElements = getBlockNodes(block.clone);
            $animate.leave(previousElements).then(function() {
              previousElements = null;
            });
            block = null;
          }
        }
      }
    }
  }
})();