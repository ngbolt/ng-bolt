(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_counter
   * @description ngBoltJS Counter module.
   *
   * @since 2.0.0
   */
  angular.module('blt_counter', [])
    .component('bltCounter', bltCounter())
  ;

  /**
   * @ngdoc directive
   * @name bltCounter
   * @module blt_counter
   * @description The bltCounter component is used to collect whole number input from the user. It fulfills the role of the
   * standard HTML input [number] field with a step interval of 1. An important note is that the ngBoltJS Counter will
   * always have a value. As soon as this component initializes it will apply a default value to the model attached
   * to the component if that model is initially (or ever set to a value that is) undefined, non-numeric or violates
   * the constraints applied to this component. The default value is the closest value to zero that also adheres to
   * the min and max constraints set on this component.
   *
   * <div class="note-tip">Best Practice: The `data-` prefix is not required for ngBoltJS attributes but is highly recommended to prevent
   * conflicts with standard HTML attributes.</div>
   *
   * @example <caption>Simple counter, labeled "Counter" and bound to the scope property `MyCtrl.counter1`</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("CounterExampleCtrl", function(){
   *         var ctrl = this;
   *         ctrl.counter1 = 4;
   *         ctrl.counter2;
   *         ctrl.counter3;
   *       });
   *   </javascript>
   *   <html>
   *     <div ng-controller="CounterExampleCtrl as ctrl">
   *       <form name="ctrl.myForm" class="form" novalidate>
   *         <blt-counter data-name="myFirstCounter"
   *                    data-label="Counter"
   *                    data-model="ctrl.counter1"
   *                    data-selectOnFocus="true">
   *         </blt-counter>
   *         <blt-counter data-name="mySecondCounter"
   *                    data-label="Constrained Counter"
   *                    data-min="1" data-max="100"
   *                    data-model="ctrl.counter2">
   *         </blt-counter>
   *         <blt-counter data-name="myThirdCounter"
   *                    data-label="Custom Counter"
   *                    data-left-icon="fa-minus"
   *                    data-right-icon="fa-plus"
   *                    data-model="ctrl.counter3">
   *         </blt-counter>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   *
   * @restrict E
   *
   * @param {expression} data-model This attribute is used to bind the value of this component to a property in the
   * containing scope. Functionality is based on the Angular ngModel directive.
   * @param {string} data-name This attribute indicates the name of this form element and will be used during form
   * traversal by the ngBoltJS framework.
   * @param {boolean} [data-autofocus] Indicates whether or not this field should autofocus on page load.
   * @param {expression} [data-change] This attribute is used to bind an expression in the containing scope that will
   * be invoked any time the value of this component changes. Functionality is based on the Angular ngChange directive.
   * @param {boolean} [data-disabled] Disables the field. Any value set in this attribute will cause the field to be
   * disabled.
   * @param {string} [data-label] This attribute specifies the label for this component.
   * @param {number} [data-max] The maximum integer value of the component.
   * @param {number} [data-min] The minimum integer value of the component.
   * @param {number} [data-size] Indicates the size in characters of this field. If this is not set, the field will size
   * dynamically to contain the value entered by the user, up to 20 characters. Valid range for this is 1-20.
   * @param {string} [data-left-icon] The Font Awesome icon to use for the left icon. Defaults to 'fa-chevron-left'.
   * @param {string} [data-right-icon] The Font Awesome icon to use for the right icon. Defaults to 'fa-chevron-right'.
   * @param {expression} [data-validate] An expression that gets passed through to an instance of the bltValidate directive
   * to invoke custom validation on this component value. See documentation for Bolt Validate for more information.
   * @param {value} [data-required] Indicates whether or not this field is required.
   * @param {boolean} [data-selectOnFocus] If true, selects the contents of the counter input field on focus.
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   */
  function bltCounter() {

    return {
      require: {
        form: '^form'
      },
      templateUrl: 'components/counter/counter.template.html',
      controller: bltCounterController,
      bindings: {
        model: '=',
        name: '@',
        label: '@',
        size: '@',
        disabled: '=?',
        change: '&',
        minVal: '@min',
        maxVal: '@max',
        selectOnFocus: '@',
        required: '@',
        autofocus: '@',
        validate: '=',
        leftIcon: '@',
        rightIcon: '@'
      }
    };
  }


  /**
   * @private
   * @name bltCounterController
   * @module blt_counter
   * @description Controller for our bltCounter component
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   */
  function bltCounterController($timeout, $scope ) {

    var ctrl = this;
    var mouseState = MouseState();
    var lastAdjustedModel = undefined;
    var defaultVal = 0;
    var selectOnFocus = ctrl.selectOnFocus !== 'false' && !!(ctrl.selectOnFocus);
    //console.log(undefined !== (!!(ctrl.selectOnFocus) && 'false'));
    var adjustableSize = true;
    var tInputElem = undefined;

    ctrl.$onInit = init;
    ctrl.onChange = onChange;
    ctrl.mouseUp = mouseUp;
    ctrl.mouseDown = mouseDown;
    ctrl.mouseEnter = mouseEnter;
    ctrl.mouseLeave = mouseLeave;
    ctrl.onFocus = onFocus;
    ctrl.id = uuid();

    function uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function( c ) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    /**
     * @private
     * @description Handles the controller initialization. Confirm existence of required attributes and set default values
     * as needed.
     */
    function init() {

      //need to manipulate dom later on when figuring out textwidth, looking into alternative ways
      //noinspection JSValidateTypes
      $timeout(function() {
        tInputElem = angular.element(document.getElementById(ctrl.id));
        adjustView();
      });

      // Set input name
      if ( !ctrl.name ) {
        console.error('Missing name attribute for blt-counter. See: '
          + window.location + '/blt.counter.bltCounter.html');
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

      if ( !angular.isDefined(ctrl.model) || !(isFinite(ctrl.model) || isNaN(ctrl.model)) ) {
        ctrl.model = defaultVal;
        onChange();
      }

      // Set min
      $scope.$watch(function() {
        return ctrl.minVal;
      }, function() {
        var min;
        if ( angular.isDefined(ctrl.minVal) ) {
          min = parseFloat(ctrl.minVal);
          if ( isFinite(min) ) {
            ctrl.min = min;
            if ( min > 0 ) {
              defaultVal = min;
            } else {
              defaultVal = 0;
            }
            if ( isFinite(ctrl.model) && ctrl.model < min ) {
              ctrl.model = min;
              onChange();
            }
          } else {
            ctrl.min = undefined;
          }
        } else {
          ctrl.min = undefined;
        }
      });

      // set max
      $scope.$watch(function() {
        return ctrl.maxVal;
      }, function() {
        if ( angular.isDefined(ctrl.maxVal) ) {
          var max = parseFloat(ctrl.maxVal);
          if ( isFinite(max) ) {
            if ( !isFinite(ctrl.min) || max >= ctrl.min ) {
              ctrl.max = max;
              if ( max < defaultVal ) {
                defaultVal = max;
              }
              if ( isFinite(ctrl.model) && ctrl.model > max ) {
                ctrl.model = max;
                onChange();
              }
            } else {
              ctrl.max = undefined;
            }
          }
        } else {
          ctrl.max = undefined;
        }
      });

      if ( angular.isDefined(ctrl.size) ) {
        if ( isFinite(ctrl.size) ) {
          adjustableSize = false;
        }
      }

      // Set validator
      if ( ctrl.validate ) {
        if ( ctrl.validate.msg ) {
          ctrl.errorMsg = ctrl.validate.msg;
        } else {
          ctrl.errorMsg = 'This field is invalid.';
        }
      }

      if ( angular.isUndefined(ctrl.leftIcon) ) {
        ctrl.leftIcon = 'fa-chevron-left';
      }

      if ( angular.isUndefined(ctrl.rightIcon) ) {
        ctrl.rightIcon = 'fa-chevron-right';
      }

      $scope.$watch(function() {
        return ctrl.model;
      }, adjustView);

    }

    /**
     * @name bltCounterController#mouseUp
     * @description When the user releases the mouse button on one of our change buttons, check to see if we were in the
     * "pressed" state, which means we need to trigger a change by the value passed in, and then set the mouse state
     * to "up". If we were instead in the "holding" state we'll just set our state to up because the continuous
     * change behaviour has already changed the value.
     *
     * @param {number} changeBy The amount to change the model by when invoked.
     */
    function mouseUp( changeBy ) {
      if ( mouseState.isPressed() ) {
        changeModelBy(changeBy);
        mouseState.setStateToUp();
      } else if ( mouseState.isHolding() ) {
        mouseState.setStateToUp();
      }
    };

    /**
     * @name bltCounterController#mouseDown
     * @description When the user clicks down on one of our change buttons, put our mouse state in the pushed state and
     * then set up a listener to transition into the "holding" state.
     * @param {number} changeBy The amount to change the model by when invoked.
     * @param {object} $event The angular event representation of this mouse event.
     */
    function mouseDown( changeBy, $event ) {
      if ( $event.which == 1 ) {
        var pressedUuid = uuid();
        mouseState.setStateToPressed(pressedUuid);
        $timeout(function() {
          if ( mouseState.isPressed(pressedUuid) ) {
            mouseState.setStateToHolding($event.target);
            document.addEventListener('mouseup', onDocumentMouseUp);
            continuousChangeBy(changeBy, 300);
          }
        }, 500);
      }
    };

    /**
     * @name bltCounterController#mouseEnter
     * @description When the mouse hovers over one of our change buttons, register that with our mouse state.
     * @param {object} $event The angular event representation of this mouse event.
     */
    function mouseEnter( $event ) {
      mouseState.setOver(true, $event.target);
    };

    /**
     * @name bltCounterController#mouseLeave
     * @description When the mouse stops hovering over one of our change buttons, register that with our mouse state.
     * @param {object} $event The angular event representation of this mouse event.
     */
    function mouseLeave( $event ) {
      mouseState.setOver(false, $event.target);
    };

    /**
     * @name bltCounterController#onFocus
     * @description If selectOnFocus is true, selects the contents of the counter input field on focus.
     */
    function onFocus() {
      console.log("Element in focus");
      if ( selectOnFocus ) {
        if ( angular.isDefined(ctrl.model) ) {
          try {
            tInputElem[0].selectionStart = 0;
            tInputElem[0].selectionEnd = ctrl.model.length;
          } catch( err ) {
            tInputElem[0].select();
          }
        }
      }
    };

    /**
     * @name bltCounterController#continuousChangeBy
     * @description This function handles the case where a user is holding the mouse pressed over one of our "change"
     * buttons. We will continue to call the "change" event at a decreasing interval until they release the button,
     * move the mouse off of the button they were pressing, or reach the max or min of the control.
     *
     * @param {number} changeBy The amount to change the model value by. (Either 1 or -1)
     * @param {number} wait The amount of time to wait until the next change should be fired.
     */
    function continuousChangeBy( changeBy, wait ) {
      if ( mouseState.isOverButton() ) {
        if ( changeModelBy(changeBy) ) {
          $timeout(function() {
            if ( mouseState.isHolding() ) {
              continuousChangeBy(changeBy, Math.max(wait / 1.3, 50));
            }
          }, wait);
        }
      } else {
        $timeout(function() {
          if ( mouseState.isHolding() ) {
            continuousChangeBy(changeBy, wait);
          }
        }, wait);
      }
    };

    /**
     * @name bltCounterController#changeModelBy
     * @description Change the model by the given value, assuming the change will not cause the model value to violate any
     * constraints the user applied. (Min or Max)
     * @param {number} changeBy The amount to change by.
     * @returns {boolean} True if the change was applied, false if the change was ignored because it would violate
     * either our min or max constraint.
     */
    function changeModelBy( changeBy ) {
      if ( !ctrl.disabled ) {
        if ( isNaN(ctrl.model) ) {
          ctrl.model = defaultVal;
          onChange();
          return true;
        } else if ( (angular.isUndefined(ctrl.max) || (ctrl.model + changeBy) <= ctrl.max) &&
          (angular.isUndefined(ctrl.min) || (ctrl.model + changeBy) >= ctrl.min) ) {
          ctrl.model = ctrl.model + changeBy;
          onChange();
          return true;
        }
      }
      return false;
    };

    /**
     * @name bltCounterController#adjustView
     * @description Adjust the size of our displayed input field based on the number of characters contained in our value.
     */
    function adjustView() {
      if ( angular.isDefined(tInputElem) ) {
        if ( ctrl.model != lastAdjustedModel ) {
          lastAdjustedModel = ctrl.model;
          if ( adjustableSize ) {
            tInputElem.css({
              'width': getTextWidth(ctrl.model.toString(), css(tInputElem[0], 'font-family'),
                css(tInputElem[0], 'font-size')) + 'px'
            })
          }
          ctrl.NaN = isNaN(ctrl.model);
        }
      }
    };

    /**
     * @name bltCounterController#getTextWidth
     * @description Get the rendered width of the given text in the given font and font size.
     *
     * @param {string} text The text to measure.
     * @param {string} font The font family to render the text in.
     * @param {number} fontSize The font size in pixels.
     * @returns {number} The rendered width in pixels.
     */
    function getTextWidth( text, font, fontSize ) {
      // re-use canvas object for better performance
      var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
      var context = canvas.getContext("2d");
      context.font = fontSize + " " + font;
      var metrics = context.measureText(text);
      return Math.ceil(metrics.width) + 1;
    };

    /**
     * @name bltCounterController#css
     * @description Gets the named css value associated with the given element.
     * @param {element} element The DOM element.
     * @param {string} property The css property to check.
     * @returns {string} The css value if found.
     */
    function css( element, property ) {
      return window.getComputedStyle(element, null).getPropertyValue(property);
    };

    /**
     * @name bltCounterController#onDocumentMouseUp
     * @description Mouse up listener to add to the document in case the user clicks down on our change button and then
     * releases somewhere else on the page.
     */
    function onDocumentMouseUp() {
      ctrl.mouseUp(0);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };

    /**
     * @name bltCounterController#onDocumentMouseState
     * @description Small structure to track mouse state. This is used for monitoring mouse pressed states when the user is
     * holding one of the change buttons.
     */
    function MouseState() {
      var mouseStates = {
        up: 'up',
        pressed: 'pressed',
        holding: 'holding'
      };


      var holdingTarget = undefined;
      var overTarget = undefined;
      var mouseState = mouseStates.up;
      var pressedUuid = undefined;

      var state = {
        isUp: isUp,
        setStateToUp: setStateToUp,
        isPressed: isPressed,
        setStateToPressed: setStateToPressed,
        isHolding: isHolding,
        setStateToHolding: setStateToHolding,
        isOverButton: isOverButton,
        setOver: setOver
      };

      return state;

      function isUp() {
        return mouseState == mouseStates.up;
      }

      function setStateToUp() {
        holdingTarget = undefined;
        mouseState = mouseStates.up;
      }

      function isPressed( uuid ) {
        return (!(uuid) || (uuid == pressedUuid)) && mouseState == mouseStates.pressed;
      }

      function setStateToPressed( uuid ) {
        pressedUuid = uuid;
        holdingTarget = undefined;
        mouseState = mouseStates.pressed;
      }

      function isHolding() {
        return mouseState == mouseStates.holding;
      }

      function setStateToHolding( target ) {
        holdingTarget = target;
        mouseState = mouseStates.holding;
      }

      function isOverButton() {
        return !!(holdingTarget) && (holdingTarget == overTarget);
      }

      function setOver( over, target ) {
        if ( over ) {
          overTarget = target;
        } else {
          overTarget = undefined;
        }
      }
    };

    /**
     * @name bltCounterController#onChange
     * @description Change listener fired any time our model value changes either internally or externally.
     */
    function onChange() {
      if ( !(isFinite(ctrl.model) || isNaN(ctrl.model)) || ctrl.model === null || ctrl.model == undefined ) {
        var viewValue = ctrl.form[ctrl.name].$viewValue;
        if ( isFinite(viewValue) ) {
          if ( isFinite(ctrl.max) && viewValue > ctrl.max ) {
            ctrl.model = ctrl.max;
          } else if ( isFinite(ctrl.min) && viewValue < ctrl.min ) {
            ctrl.model = ctrl.min;
          } else {
            ctrl.model = defaultVal;
          }
        } else {
          ctrl.model = defaultVal;
        }
        ctrl.form[ctrl.name].$viewValue = ctrl.model;
      } else if ( ctrl.model != 0 && ctrl.form[ctrl.name] && ctrl.form[ctrl.name].$viewValue.toString().indexOf('0') == 0 ) {
        ctrl.form[ctrl.name].$setViewValue(ctrl.model);
        ctrl.form[ctrl.name].$render();
      }
      if ( ctrl.change ) {
        $timeout(ctrl.change, 0);
      }
    };
  }

  bltCounterController.$inject = ['$timeout', '$scope'];
})();