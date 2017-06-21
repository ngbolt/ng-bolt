(function() {
  'use-strict';

  /**
   * @ngdoc module
   * @name blt_toggleswitch
   * @description ngBoltJS Toggle Switch module.
   *
   * @since 2.0.0
   *
   */
  angular
    .module('blt_toggleswitch', [])
    .directive('bltToggleSwitch', bltToggleSwitch);

  /**
   * @ngdoc directive
   * @name bltToggleSwitch
   * @module blt_toggleswitch
   *
   * @description The bltToggleSwitch directive can be used much like a standard HTML checkbox with the presentation of a
   * switch with an 'on' and 'off' state. The toggle switch must be bound to a boolean attribute in your controller
   * model. Selection/deselection of the toggle switch will toggle this value between true and false.
   *
   * <div class="note-info">**NOTE** In order for the Toggle Switch to take input focus and support sequential keyboard navigation,
   * you must add the `tabindex="0"` attribute on the directive. Documentation on using tabindex can be found
   * [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex).</div>
   *
   * <div class="note-tip">**Best Practice** The `data-` prefix is not required for ngBoltJS attributes, but is highly recommended to prevent
   * conflicts with standard HTML attributes.</div>
   *
   * @example <caption>To use the Toggle Switch directive in your ngBoltJS application, include the `blt-toggle-switch`
   * element in your HTML template. You can optionally include it inside a form.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs").controller("ToggleExCtrl1", function(){});
   *   </javascript>
   *   <html>
   *     <div ng-controller="ToggleExCtrl1 as ctrl">
   *       <blt-toggle-switch data-model="ctrl.someBooleanValue"></blt-toggle-switch>
   *     </div>
   *   </html>
   * </example>
   *
   * @example <caption>Usage inside form with option to disable.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs").controller("ToggleExCtrl2", function(){});
   *   </javascript>
   *   <html>
   *     <div ng-controller="ToggleExCtrl2 as ctrl">
   *       <form class="form" novalidate name="toggleTest">
   *         <blt-toggle-switch data-model="ctrl.disableToggle"
   *                            data-label="Disable">
   *         </blt-toggle-switch>
   *         <blt-toggle-switch data-model="ctrl.someBooleanValue"
   *                            data-disabled="ctrl.disableToggle">
   *         </blt-toggle-switch>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   *
   * @example <caption>With a label. 
   * <div class="note-tip"> **Note** You can bind Angular expressions to your label. </div>
   * </caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs").controller("ToggleExCtrl3", function(){});
   *   </javascript>
   *   <html>
   *     <div ng-controller="ToggleExCtrl3 as ctrl">
   *       <blt-toggle-switch data-model="ctrl.someBooleanValue"
   *                          tabindex="0"
   *                          data-label="Toggle Switch: {{ctrl.someBooleanValue}}">
   *       </blt-toggle-switch>
   *     </div>
   *   </html>
   * </example>
   *
   * @example <caption>Justify right.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs").controller("ToggleExCtrl4", function(){});
   *   </javascript>
   *   <html>
   *     <div ng-controller="ToggleExCtrl4 as ctrl">
   *       <blt-toggle-switch data-model="ctrl.someBooleanValue"
   *         data-justify="right"
   *         tabindex="0"
   *         data-label="Right Justified">
   *       </blt-toggle-switch>
   *     </div>
   *   </html>
   * </example>
   *
   * @param {expression} data-model This attribute is used to bind the value of this directive to a property in the
   * containing scope. Must be a boolean value.
   * @param {boolean} [data-autofocus] Indicates whether or not this field should autofocus on page load.
   * @param {boolean} [data-disabled] Disables the switch. A property in the containing scope that will disable the
   * control if truthy. The Toggle Switch can be disabled in the off or on state.
   * @param {string} [data-label] An optional value to display a form control label above the Toggle Switch.
   * @param {string} [data-name] This attribute indicates the name of this form element and will be used during form
   * traversal by the ngBoltJS framework.
   * @param {number} [data-tabindex] Specifies the tab order of an element.
   * @param {string} [data-justify] An optional value to justify the Toggle Switch and label (if applicable) to the 'left'
   * (default), 'right', or 'center'.
   * @param {number} [data-tabindex] Specifies the tab order of an element.
   * @param {boolean} [data-autofocus] Indicates whether or not this field should autofocus on page load.
   *
   * @restrict E
   *
   */
  bltToggleSwitch.$inject = ['$timeout']
  function bltToggleSwitch($timeout) {
    var directive = {
      restrict: 'E',
      scope: {
        autofocus: '<',
        disabled: '<',
        label: '@',
        name: '@',
        model: '=',
        tabindex: "<",
        change: '&',
        tabindex: '<'
      },
      templateUrl: 'components/toggleswitch/toggleswitch.template.html',
      link: linkFn
    };

    return directive;

    /**
     * @private
     * @description Link function for our directive that will be invoked by angular during the
     * linking phase. Adds classes and attributes to the directives element
     * and attaches a keypress event listener for toggling.
     * @param  {*} scope - Our isolate scope instance.
     * @param  {*} elem  - The HTML element which our directive is attached
     * @param  {*} attrs - The raw HTML elements that are attached to our directive element.
     */
    function linkFn( scope, elem, attrs ) {
      // Public methods on the scope
      scope.toggle = toggle;

      // throw errors if required attributes are not defined
      if ( attrs.model === undefined ) {
        throw new Error("'data-model' attribute on blt-toggle-switch component is required but was undefined.");
      }

      // Add toggle-switch class to our element and set role to checkbox
      elem.addClass('toggle-switch');
      elem.attr('role', 'checkbox');

      if ( attrs.justify && attrs.justify == 'right' ) {
        elem.addClass('toggle-right');
      } else if ( attrs.justify && attrs.justify == 'center' ) {
        elem.addClass('toggle-center');
      } else if ( attrs.justify && attrs.justify == 'left' ) {
        elem.addClass('toggle-left');
      }

      // Listen for keydown events and toggle if space key is pressed.
      elem.on('keydown', function( e ) {
        var key = e.which ? e.which : e.keyCode;
        if ( key === 32 ) {
          e.preventDefault();
          scope.$apply(scope.toggle);
        }
      });

      // Toggle the model value from true to false.
      function toggle() {
        if ( !scope.disabled ) {
          scope.model = !scope.model;
          if ( scope.change ) {
            $timeout( scope.change, 0);
          }
        }
      }
    }
  }
})();
