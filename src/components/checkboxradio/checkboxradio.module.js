(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_checkboxradio
   * @description ngBoltJS Checkbox/Radio module.
   *
   * @since 2.0.0
   */
  angular.module('blt_checkboxradio', [])
    .component('bltCheckboxRadio', bltCheckboxRadio())
  ;

  /**
   * @ngdoc directive
   * @name bltCheckboxRadio
   * @module blt_checkboxradio
   * @description This component can be used much like a standard HTML checkbox or radio button
   * and is primarily just a thin cosmetic layer around the standard functionality.
   *
   * To use this as a checkbox, set the `data-type="checkbox"` and attach the `data-model` to a boolean attribute in
   * your controller model. Selection/deselection of a checkbox will toggle this value between true and false. If
   * `data-type` is not defined, this component will default to `checkbox`.
   *
   * When used as a radio button, this component is most often used in a group with other radio buttons. The `data-type`
   * attribute should be set to `radio` and a value should be provided in the `data-value` attribute to indicate
   * the value to be assigned to the model bound in `data-model` when this radio button is activated.
   *
   * <div class="note-tip">Best Practice: The `data-` prefix is not required for ngBoltJS attributes but is highly recommended to prevent
   * conflicts with standard HTML attributes.</div>
   *
   * @example
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("CheckboxRadioExampleCtrl", function(){
   *         var ctrl = this;
   *         ctrl.doWhenValueChanges = function(){alert(ctrl.checkbox2)};
   *         ctrl.checkboxOptions = ["Option 1", "Option 2", "Option 3"];
   *       });
   *   </javascript>
   *   <html>
   *     <div ng-controller="CheckboxRadioExampleCtrl as ctrl">
   *       <form name="MyCtrl.myForm" class="form" novalidate>
   *           <blt-checkbox-radio data-name="checkbox"
   *                               data-label="Simple Checkbox"
   *                               data-model="ctrl.checkbox1">
   *           </blt-checkbox-radio>
   *           <hr class="form-divider">
   *           <blt-checkbox-radio data-name="checkbox"
   *                               data-label="Checkbox With Change Listener"
   *                               data-model="ctrl.checkbox2"
   *                               data-change="ctrl.doWhenValueChanges()">
   *           </blt-checkbox-radio>
   *           <hr class="form-divider">
   *           <div class="form-row">
   *              <blt-checkbox-radio data-name="optionSelection"
   *                               data-label="{{option}}"
   *                               data-model="ctrl.radio1"
   *                               data-type="radio"
   *                               data-value="{{option}}"
   *                               data-required="true"
   *                               ng-repeat="option in ctrl.checkboxOptions">
   *             </blt-checkbox-radio>
   *           </div>
   *           <hr class="form-divider">
   *           <blt-checkbox-radio data-name="optionSelection"
   *                               data-label="{{option}}"
   *                               data-model="ctrl.radio2"
   *                               data-type="radio"
   *                               data-value="{{option}}"
   *                               data-required="true"
   *                               ng-repeat="option in ctrl.checkboxOptions">
   *           </blt-checkbox-radio>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   *
   * @restrict E
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   *
   * @param {String} data-label This attribute specifies the label for this component.
   * @param {Two-Way} data-model This attribute is used to bind the value of this component to a property in the
   * containing scope. Functionality is based on the Angular ngModel directive.
   * @param {Value} data-name This attribute indicates the name of this form element and will be used during
   * form traversal by the ngBoltJS framework.
   * @param {Value} [data-autofocus] Indicates whether or not this field should autofocus on page load.
   * @param {Expression} [data-change] This attribute is used to bind an expression in the containing scope that
   * will be invoked any time the value of this component changes. Functionality is based on the Angular ngChange
   * directive.
   * @param {Value} [data-required] Indicates whether or not this field is required.
   * @param {Value} [data-type] Indicates whether this should be presented as a checkbox or radio button. Valid
   * values are "checkbox" and "radio". Defaults to "checkbox" if not specified.
   * @param {Value} [data-value] Only relevant when `data-type="radio"`. Specifies the value to apply to `data-model`
   * when this radio button is selected.
   * @param {Number} [data-tabindex] Specifies the tab order of an element.
   * @param {Value} [data-disabled] Disables the field. Any value set in this attribute will cause the field to be disabled.
   */
  function bltCheckboxRadio() {
    return {
      require: '^form',
      templateUrl: 'components/checkboxradio/checkboxradio.template.html',
      controller: bltCheckboxRadioController,
      bindings: {
        model: '=',
        autofocus: '<',
        disabled: '<',
        name: '@',
        label: '@',
        type: '@',
        value: '@',
        required: '<',
        tabindex: '@',      // doesn't do what we want it to do - gets rid of all options except "check me"
        change: '&'
      }
    };
  }

  /**
   * @private
   * @name bltCheckboxRadioController
   * @module blt_checkboxradio
   * @description Controller for bltCheckboxRadio component.
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   *
   */
  function bltCheckboxRadioController( api, $timeout ) {

    var validTypes = ['checkbox', 'radio'];

    var ctrl = this;

    ctrl.toggle = toggle;
    ctrl.onChange = onChange;
    ctrl.$onInit = init;

    /**
     * @private
     * @description Handles the controller initialization. Confirm existence of required attributes and set default values
     * as needed.
     */
    function init() {
      // Confirm input name
      if ( !ctrl.name ) {
        api.error('missing name attribute for blt-checkbox-radio. See: ' + window.location + '/blt.checkboxradio.bltCheckboxRadio.html');
        return;
      }

      // Validate / set default input type
      if ( angular.isDefined(ctrl.type) ) {
        if ( validTypes.indexOf(ctrl.type) < 0 ) {
          api.error('invalid type attribute for blt-checkbox-radio: ' + ctrl.name + '. Type provided: ' + ctrl.type + '. Valid types: '
            + angular.toJson(validTypes) + '. See: ' + window.location + '/blt.checkboxradio.bltCheckboxRadio.html');
          return;
        }
      } else {
        ctrl.type = 'checkbox';
      }

      ctrl.autofocus = !!(ctrl.autofocus);
      ctrl.required = !!(ctrl.required);
    }

    /**
     * @name bltCheckboxRadioController#toggle
     * @description Toggle method used by checkboxes. Toggles the model value on spacebar keyup events.
     */
    function toggle() {
      if ( ctrl.type == 'checkbox' ) {
        //Toggle model value on keyup.
        if ( event.type == 'keyup' && event.keyCode == 13 ) {
          ctrl.model = !ctrl.model;
        }
      }
    };

    /**
     * @name bltCheckboxRadioController#onChange
     * @description OnChange method for triggering the function, if it exists, that is bound to data-change.
     */
    function onChange() {
      if ( ctrl.change ) {
        $timeout(ctrl.change, 0);
      }
    };
  }

  bltCheckboxRadioController.$inject = ['BltApi', '$timeout'];
})();