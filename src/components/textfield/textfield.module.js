(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_textfield
   * @description ngBoltJS Textfield component.
   *
   *  @since 2.0.0
   */
  angular.module('blt_textfield', [])
    .component('bltTextfield', bltTextfield())
  ;

  /**
   * @ngdoc directive
   * @name bltTextField
   * @module blt_textfield
   *
   * @description The bltTextField component is used to collect text or numeric input from the user. This component is
   * essentially a combination of the standard HTML `<input>` and `<textarea>` elements along with the incorporation of
   * a label. The bltTextField component provides a clean and simple way to collect free text data.
   *
   * <div class="note-tip">
   * **Best Practice** The `data-` prefix is not required for ngBoltJS attributes, but is highly recommended to prevent
   * conflicts with standard HTML attributes.
   * </div>
   *
   * @example <caption>A simple text field labeled "Text Field" and bound to the scope property `MyCtrl.textField1.`</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("MyCtrl", function(){
   *         var ctrl = this;
   *       });
   *   </javascript>
   *   <html>
   *    <form name="MyCtrl.myForm" class="form" novalidate>
   *      <blt-textfield data-name="myFirstTextField"
   *        data-label="Text Field"
   *        data-model="MyCtrl.textField1">
   *      </blt-textfield>
   *    </form>
   *   </html>
   * </example>
   *
   * @example <caption>A more complex text field labeled "Required Text Field" and bound to the scope property
   *   `MyCtrl2.textField2`. This field is marked as required and has a pattern defined. Valid values would be ABC123,
   *   XYZ789, etc. Must click inside and then out of the text field to see red "This field is required." 
   *   text.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("MyCtrl2", function(){
   *         var ctrl = this;
   *       });
   *   </javascript>
   *   <html>
   *     <form name="MyCtrl2.myForm" class="form" novalidate>
   *       <blt-textfield data-name="mySecondTextField"
   *         data-required="true"
   *         data-pattern="[A-Z]{3}[0-9]{3}"
   *         data-label="Required Text Field"
   *         data-model="MyCtrl2.textField2">
   *       </blt-textfield>
   *     </form>
   *   </html>
   * </example>
   *
   * @example <caption>A simple numeric field labeled "Numeric Field" and bound to the scope property
   *   `MyCtrl3.numericField1`. The value must be between 0.0 and 10.0. Arrow up and arrow down keystrokes will adjust
   *   the value by 0.01. </caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("MyCtrl3", function(){
   *         var ctrl = this;
   *       });
   *   </javascript>
   *   <html>
   *    <form name="MyCtrl3.myForm" class="form" novalidate>
   *      <blt-textfield data-name="myFirstNumericField"
   *        data-type="number"
   *        data-step="0.01"
   *        data-min="0.0"
   *        data-max="10.0"
   *        data-label="Numeric Field"
   *        data-model="MyCtrl3.numericField1">
   *      </blt-textfield>
   *    </form>
   *   </html>
   * </example>
   *
   * @example <caption>An email field labeled "Email Field" and bound to the scope property `MyCtrl4.emailField1`. The
   *   value must be in valid email format.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("MyCtrl4", function(){
   *         var ctrl = this;
   *       });
   *   </javascript>
   *   <html>
   *    <form name="MyCtrl4.myForm" class="form" novalidate>
   *      <blt-textfield data-name="myFirstEmailField"
   *        data-type="email"
   *        data-label="Email Field"
   *        data-model="MyCtrl4.emailField1">
   *      </blt-textfield>
   *    </form>
   *   </html>
   * </example>
   *
   * @example <caption>A Text Area labeled "Comments Field" and bound to the scope property `MyCtrl5.commentsField1`.
   *   The max length of the input is 255 characters.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("MyCtrl5", function(){
   *         var ctrl = this;
   *       });
   *   </javascript>
   *   <html>
   *    <form name="MyCtrl5.myForm" class="form" novalidate>
   *      <blt-textfield data-name="myFirstTextArea"
   *        data-type="textarea"
   *        data-label="Comments Field"
   *        data-model="MyCtrl5.commentsField1"
   *        data-rows="5"
   *        data-max-length="255">
   *      </blt-textfield>
   *    </form>
   *   </html>
   * </example>
   *
   * @example <caption>A telephone input field labeled via the controller property `phoneLabel`. Notice the use of
   *   handlebars, which is required for any of the "Value" attributes. This field is bound to the scope property
   *   `MyCtrl6.phoneField1`.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("MyCtrl6", MyCtrl6); 
   *
   *      MyCtrl6.$inject = ['BltApi']; 
   *
   *      function MyCtrl6(api){
   *        var ctrl = this;
   *        var phoneLabel;
   *        ctrl.phoneLabel = "Telephone Field";
   *      }
   *   </javascript>
   *   <html>
   *     <div ng-controller="MyCtrl6 as ctrl">
   *      <form name="MyCtrl6.myForm" class="form" novalidate>
   *        <blt-textfield data-name="myFirstPhoneField"
   *          data-type="tel"
   *          data-label="{{ctrl.phoneLabel}}"
   *          data-model="MyCtrl6.phoneField1">
   *        </blt-textfield>
   *      </form> 
   *    </div>
   *   </html>
   * </example>
   *
   * @example <caption>A url input field labeled "URL" and bound to the scope property `MyCtrl7.urlField1`. Notice there
   *   is also a change listener attached to this field that will fire as the user changes the value of this field.
   *   </caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("MyCtrl7", function(){
   *         var ctrl = this;
   *       });
   *   </javascript>
   *   <html>
   *    <form name="MyCtrl7.myForm" class="form" novalidate>
   *      <blt-textfield data-name="myFirstURLField"
   *        data-label="URL"
   *        data-model="MyCtrl7.urlField1"
   *        data-change="MyCtrl7.onUrlChanged()">
   *      </blt-textfield>
   *    </form>
   *   </html>
   * </example>
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires https://docs.angularjs.org/api/ng/type/$rootScope.Scope
   *
   * @restrict E
   *
   * @param {string} data-name This attribute indicates the name of this form element and will be used during form
   * traversal by the ngBoltJS framework.
   * @param {string} data-label This attribute specifies the label for this component.
   * @param {boolean} [data-autofocus] Indicates whether or not this field should autofocus on page load.
   * @param {expression} [data-change] This attribute is used to bind an expression in the containing scope that
   * will be invoked any time the value of this component changes. Functionality is based on the Angular ngChange
   * directive.
   * @param {boolean} [data-disabled] Disables the field. Any value set in this attribute will cause the field to be
   * disabled.
   * @param {number} [data-max] The maximum numeric value of the component. This is only valid with `data-type="number"`.
   * It will be ignored in all other cases.
   * @param {number} [data-maxlength] The maximum number of characters to accept as valid in this component.
   * @param {number} [data-min] The minimum numeric value of the component. This is only valid with `data-type="number"`.
   * It will be ignored in all other cases.
   * @param {number} [data-minlength] The minimum number of characters to accept as valid in this component.
   * @param {expression} [data-model] This attribute is used to bind the value of this component to a property in the
   * containing scope. Functionality is based on the Angular ngModel directive.
   * @param {string} [data-pattern] Defines a pattern to use in validation of this component's value. Can be any valid
   * regular expression.
   * @param {boolean} [data-required] Indicates whether or not this field is required.
   * @param {number} [data-rows] The number of rows to present in a multi-line text area. This is only valid with
   * `data-type="textarea"`. It will be ignored in all other cases.
   * @param {number} [data-step] Defines the intervals to use when changing the value of a number component. This is
   * only valid with `data-type="number"`. It will be ignored in all other cases. See W3C documentation on step for
   * more information.
   * @param {string} [data-type] This attribute defines the type of data that will be collected in this component.
   * All HTML input types are technically supported, but the intended use case of this component includes the
   * following standard types: `text`, `password`, `tel`, `email`, `number`, and `url` with the addition of `textarea`.
   * Will default to `text` if no value is defined.
   * @param {expression} [data-validate] An expression that gets passed through to an instance of the bltValidate
   * directive to invoke custom validation on this component value. See documentation for bltValidate for more
   * information.
   * @param {boolean} [data-autocomplete] Indicates whether or not this field should autocomplete.
   * @param {boolean} [data-autocorrect] Indicates whether or not this field should have autocorrect.
   * @param {boolean} [data-spellcheck] Indicates whether or not this field should have spellcheck.
   * @param {value} [data-tabindex] Specifies the tab order of an element.
   */
  function bltTextfield() {
    return {
      require: {
        form: '^form'
      },
      templateUrl: 'components/textfield/textfield.template.html',
      controller: bltTextfieldController,
      bindings: {
        model: '=',
        name: '@',
        label: '@',
        type: '@',
        minlength: '@',
        maxlength: '@',
        min: '@',
        max: '@',
        change: '&',
        rows: '@',
        validate: '=',
        required: '@',
        autofocus: '@',
        autocomplete: '@',
        autocorrect: '@',
        spellcheck: '@',
        disabled: '=?',
        pattern: '@',
        tabindex: '@',
        step: '@'
      }
    };
  }

  /**
   * @private
   * @name bltTextfieldController
   * @module blt_textfield
   * @description Controller for our Text Field component. We use this to process the attributes applied to our component,
   * apply those attributes to our child elements when appropriate, and report errors and warnings when needed.
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires $scope
   */
  function bltTextfieldController( api, $timeout, $scope ) {

    var ctrl = this;
    ctrl.$onInit = init;
    ctrl.onChange = onChange;

    /**
     * @private
     * @description Handles the controller initialization. Confirm existence of required attributes and set default values
     * as needed.
     */
    function init() {
      api.debug('bltTextfieldController: initializing.');

      // Set input name
      if ( !ctrl.name ) {
        api.error('missing name attribute for blt-text-field. See: '
          + window.location + '/blt.textfield.bltTextfield.html');
        return;
      }

      //set default type
      if ( !ctrl.type ) {
        ctrl.type = 'text';
      }

      $scope.$watch(function() {
        return ctrl.required;
      }, function() {
        if ( angular.isDefined(ctrl.required) && ctrl.required !== 'false' ) {
          ctrl.asterisk = "*";
        } else {
          ctrl.asterisk = "";
        }
      });

      // Warn about incorrect usage of rows attribute.
      if ( angular.isDefined(ctrl.rows) && ctrl.type !== 'textarea' ) {
        api.warn("Attribute data-rows should be used in conjunction with type 'textarea', type is currently "
          + (ctrl.type ? "set to '" + ctrl.type + "'" : "undefined") + ". blt-text-field [name="
          + ctrl.name + "]. See: " + window.location + "/blt.textfield.bltTextfield.html");
      }

      // Set ng-minlength
      var min = 0;
      if ( angular.isDefined(ctrl.minlength) ) {
        min = parseInt(ctrl.minlength, 10);
        if ( !(isFinite(min) && min >= 0) ) {
          if ( isFinite(min) ) {
            api.error('attribute data-minlength must be a non-negative integer, is ' + min +
              ' instead. See: ' + window.location + '/blt.textfield.bltTextfield.html');
            return;
          } else {
            api.error("attribute data-minlength must be a non-negative integer, is '" +
              ctrl.minlength + "' instead. See: " + window.location + "/blt.textfield.bltTextfield.html");
            return;
          }
        }
      }

      // Set ng-maxlength
      if ( angular.isDefined(ctrl.maxlength) ) {
        var max = parseInt(ctrl.maxlength, 10);
        if ( !(isFinite(max) && max >= min) ) {
          if ( isFinite(max) ) {
            if ( max < 0 ) {
              api.warn('attribute data-maxlength must be a non-negative integer, is ' + max
                + ' instead. See: ' + window.location + '/blt.textfield.bltTextfield.html');
            } else if ( max < min ) {
              api.warn('attribute data-maxlength cannot be less than data-minlength, data-minlength is '
                + min + ' data-maxlength is ' + max + '. See: '
                + window.location + '/blt.textfield.bltTextfield.html');
            }
          } else {
            api.warn("attribute data-maxlength must be a non-negative integer, is '" + ctrl.maxlength + "' instead. See: "
              + window.location + "/blt.textfield.bltTextfield.html");
          }
        }
      }

      //warn about trying to use step with incorrect type
      if ( angular.isDefined(ctrl.step) ) {
        if ( ctrl.type !== 'number' ) {
          api.warn("attribute data-step can only be used when data-type is a number, data-type is '" + ctrl.type +
            "' instead. See: " + window.location + "/blt.textfield.bltTextfield.html");
        }
        var step = parseInt(ctrl.step, 10);
        if ( !(isFinite(step) && step >= 0) ) {
          if ( isFinite(step) ) {
            if ( step < 0 ) {
              api.warn('attribute data-step must be a non-negative integer, is ' + step
                + ' instead. See: ' + window.location + '/blt.textfield.bltTextfield.html');
            }
          }
        }
      }

      //warn about trying to use min with incorrect type
      if ( angular.isDefined(ctrl.min) && ctrl.type !== 'number' ) {
        api.warn("attribute data-min can only be used when data-type is a number, data-type is '" + ctrl.type +
          "' instead. See: " + window.location + "/blt.textfield.bltTextfield.html");
      }

      //warn about trying to use max with incorrect type
      if ( angular.isDefined(ctrl.max) && ctrl.type !== 'number' ) {
        api.warn("attribute data-max can only be used when data-type is a number, data-type is '" + ctrl.type +
          "' instead. See: " + window.location + "/blt.textfield.bltTextfield.html");
      }

      //If this is a number input, look for applicable number input attributes.
      if ( ctrl.type === 'number' ) {
        // Check for sane min
        var min;
        if ( angular.isDefined(ctrl.min) ) {
          min = parseFloat(ctrl.min);
          if ( !isFinite(min) ) {
            api.warn("attribute data-min must be a number, is '" + ctrl.min + "' instead. See: "
              + window.location + "/blt.textfield.bltTextfield.html");
          }
        }
        // Set max
        if ( angular.isDefined(ctrl.max) ) {
          var max = parseFloat(ctrl.max);
          if ( isFinite(max) ) {
            if ( isFinite(min) && max < min ) {
              api.warn("attribute data-max must be a greater than data-min, data-min is " + min
                + " data-max is " + max + ". Ignoring data-max. See: " + window.location +
                "/blt.textfield.bltTextfield.html");
            }
          } else {
            api.warn("attribute data-max must be a number, is '" + ctrl.max + "' instead. See: " + window.location +
              "/blt.textfield.bltTextfield.html");
          }
        }
      }

      // Set validator
      var validateAttr = ctrl.validate;
      if ( validateAttr ) {
        if ( ctrl.validate.msg ) {
          ctrl.errorMsg = ctrl.validate.msg;
        } else {
          ctrl.errorMsg = 'This field is invalid.';
        }
      }
    }

    /**
     * @name bltTextfieldController#onChange
     * @description This function will be bound to ng-change on our actual input element. When invoked, check for
     * existence of ctrl.change. If it is defined, invoke it in a $timeout, which ensures that our parent
     * model has had time to update.
     */
    function onChange() {
      if ( ctrl.change ) {
        $timeout(ctrl.change, 0);
      }
    };
  }

  bltTextfieldController.$inject = ['BltApi', '$timeout', '$scope'];
})();