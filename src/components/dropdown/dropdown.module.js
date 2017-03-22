(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_dropdown
   * @description ngBoltJS Dropdown component.
   * @since 1.0.0
   */
  angular
    .module('blt_dropdown', [])
    .component('bltDropdown', bltDropdown());

  /**
   * @ngdoc directive
   * @name bltDropdown
   * @module blt_dropdown
   * @restrict E
   *
   * @description The bltDropdown component is used to collect input from the user from a list of known values. This
   * is an extension of the HTML `<select>` element. The presentation of the dropdown options can be customized
   * through the attributes supported on this directive.
   *
   * To use the bltDropdown component in your ngBoltJS application, you simply need to include a `blt-dropdown` element
   * inside of a form in your application.
   *
   * <div class="note-tip">
   * **Best Practice** The `data-` prefix is not required for ngBoltJS attributes, but is highly recommended to prevent
   * conflicts with standard HTML attributes.
   * </div>
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires https://docs.angularjs.org/api/ng/type/$rootScope.Scope
   *
   * @param {string} data-label  This attribute specifies the label for this component.
   * @param {expression}  data-model This attribute is used to bind the value of this component to a property in the
   *      containing scope. Functionality is based on the Angular ngModel directive.
   * @param {string} data-name This attribute indicates the name of this form element and will be used during form
   *      traversal by the ngBoltJS framework.
   * @param {expression} data-options This attribute is used to bind to a list of options that will be presented to the
   *      user. This can either be an array of options or a model of value/label pairs to use as options.
   * @param {boolean} [data-autofocus] Indicates whether or not this field should autofocus on page load.
   * @param {expression} [data-change]   This attribute is used to bind an expression in the containing scope that will
   *      be invoked any time the value of this component changes. Functionality is based on the Angular ngChange
   *      directive.
   * @param {boolean} [data-required] Indicates whether or not this field is required.
   * @param {string} [data-type] Specifies the dropdown type (dropdown, select, or searchable).
   * @param {value} [data-tabindex] Specifies the tab order of an element.
   * @param {value} [data-disabled] Disables the field. Any value set in this attribute will cause the field to be
   * disabled.
   *
   * @example <caption>Standard select dropdown. The user will be presented with the options contained in the
   * `arrayOfOptions`.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("DropdownExampleCtrl", function(){
   *         var ctrl = this;
   *         ctrl.arrayOfOptions = ["Value 1", "Value 2", "Value 3"];
   *       });
   *   </javascript>
   *   <html>
   *     <div ng-controller="DropdownExampleCtrl as ctrl">
   *       <form name="ctrl.myForm" class="form" novalidate>
   *         <blt-dropdown data-type="select"
   *                       data-name="dropdown1"
   *                       data-label="Select a Value"
   *                       data-options="ctrl.arrayOfOptions"
   *                       data-model="ctrl.dropdown1">
   *         </blt-dropdown>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   *
   * @example <caption>Searchable dropdown. The user will be presented with the options contained in the `arrayOfOptions`.
   *   When the list of options is opened for selection, the user will be able to type into the input field to
   *   filter available options.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("DropdownExampleCtrl2", function(){
   *         var ctrl = this;
   *         ctrl.arrayOfOptions = ["Value 1", "Value 2", "Value 3"];
   *       });
   *   </javascript>
   *   <html>
   *     <div ng-controller="DropdownExampleCtrl2 as ctrl">
   *       <form name="ctrl.myForm" class="form" novalidate>
   *         <blt-dropdown data-type="searchable"
   *                       data-name="dropdown2"
   *                       data-label="Select a Value"
   *                       data-options="ctrl.arrayOfOptions"
   *                       data-model="ctrl.dropdown2">
   *         </blt-dropdown>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   *
   * @example <caption>Dropdown with "dropdown" style. This will present the options contained in the `optionMap` as a
   *   clickable dropdown link. The presentation is similar to that of a dropdown menu.</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("DropdownExampleCtrl3", function(){
   *         var ctrl = this;
   *         ctrl.optionMap = {
   *           value1: "Value One",
   *           value2: "Value Two",
   *           value3: "Value Three"
   *         }
   *       });
   *   </javascript>
   *   <html>
   *     <div ng-controller="DropdownExampleCtrl3 as ctrl">
   *       <form name="ctrl.myForm" class="form" novalidate>
   *         <blt-dropdown data-type="dropdown"
   *                 data-name="dropdown3"
   *                 data-label="Select a Value"
   *                 data-options="ctrl.optionMap"
   *                 data-model="ctrl.select3">
   *         </blt-dropdown>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   */
  function bltDropdown() {
    return {
      require: {
        form: '^form'
      },
      templateUrl: 'components/dropdown/dropdown.template.html',
      controller: bltDropdownController,
      bindings: {
        model: '=',
        name: '@',
        label: '@',
        options: '<',
        change: '&',
        selectNoneLabel: "@",
        type: '@',
        required: '@',
        tabindex: '@',
        autofocus: '@',
        disabled: '=?'
      }
    };
  }

  /**
   * @private
   * @name bltDropdownController
   * @module blt_dropdown
   * @description Controller for the bltDropdown component
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires $scope
   */
  function bltDropdownController( api, $timeout, $scope ) {

    var ctrl = this;
    var types = ['select', 'dropdown', 'searchable'];

    ctrl.$onInit = init;
    ctrl.onChange = onChange;
    ctrl.closeOptions = closeOptions;
    ctrl.onSelectChange = onSelectChange;
    ctrl.onFilterUpdated = onFilterUpdated;
    ctrl.onKeyDown = onKeyDown;
    ctrl.openOptions = openOptions;
    ctrl.getLabelForValue = getLabelForValue;
    ctrl.selectOption = selectOption;
    ctrl.searchablePlaceholder = searchablePlaceholder;
    ctrl.isSelected = isSelected;
    ctrl.untouched = untouched;

    /**
     * @private
     * @description Handles the controller initialization. Confirm existence of required attributes and set default values
     * as needed.
     */
    function init() {

      if ( !ctrl.type ) {
        api.error('missing type attribute for blt-dropdown. See: '
          + window.location + '/blt.dropdown.bltDropdown.html');
      } else if ( types.indexOf(ctrl.type) === -1 ) {
        api.error("Unexpected value '" + ctrl.type + "' for blt-dropdown type attribute, expected 'select', " +
          "'dropdown', or 'searchable'. See: " + window.location + "/blt.dropdown.bltDropdown.html");
      }

      // Set input name
      if ( angular.isUndefined(ctrl.name) ) {
        api.error('missing name attribute for blt-dropdown. See: ' + window.location +
          '/blt.dropdown.bltDropdown.html');
      }

      // Perform initial setup of our directive scope. Interpret "searchable" attribute, and set up our options.
      // Bind the form control model to the scope
      ctrl.current = {index: 0};

      ctrl.searchable = (ctrl.type === 'searchable');

      //We also need to set our state appropriately so our options don't start in the "open" state
      //element.addClass('dropdown-closed');
      ctrl.open = false;

      /**
       * Activate our full directive scope functionality. Define listeners and actions to attach to the various
       * user interactions that may occur with our directive.
       *
       * Public Scope Functions
       */

      ctrl.selectNoneLabel = ctrl.selectNoneLabel || "None";
      if ( ctrl.searchable ) {
        ctrl.search = {
          model: undefined
        };
      } else {
        ctrl.select = {
          model: undefined
        };
      }

      onOptionsUpdated();

      $scope.$watch(function() {
        return ctrl.options
      }, onOptionsUpdated, true);
      $scope.$watch(function() {
        return ctrl.model
      }, updateInternalModel, true);
    }

    /**
     * @name bltDropdownController#closeOptions
     * @description Closes the options, reverting the view model to the current root scope model value if needed
     * (such as if the selection was canceled).
     */
    function closeOptions() {
      //If the view model (search.model) doesn't match the scope model at this point it's because the
      //options were closed due to something other than the user selecting an option. In this case
      //we'll reset our view model to match the scope model.
      if ( ctrl.searchable && (!getKeyedOptionForValue(ctrl.model) || ctrl.search.model !=
        getKeyedOptionForValue(ctrl.model).label) ) {
        if ( !getKeyedOptionForValue(ctrl.model) ) {
          delete ctrl.search.model;
        } else {
          ctrl.search.model = getKeyedOptionForValue(ctrl.model).label;
        }
      }
      delete ctrl.currentSelection;
      //element.addClass('dropdown-closed');
      ctrl.open = false;
      document.removeEventListener('mousedown', onDocumentClick);
      document.removeEventListener('mouseup', onDocumentClick);
    };

    /**
     * @name bltDropdownController#searchablePlaceholder
     * @description Evaluates the current scope model to determine whether or not to provide a placeholder for the
     * searchable input field. This will prevent the placeholder from showing when our parent model is already set.
     * @returns {string} The placeholder to show in the searchable input field, if any.
     */
    function searchablePlaceholder() {
      if ( angular.isUndefined(ctrl.model) ) {
        if ( ctrl.required ) {
          return ctrl.label + "*";
        }
        return ctrl.label;
      }
    };

    /**
     * @name bltDropdownController#onSelectChange
     * @description Change listener that fires when the user changes the value of the 'select' dropdown.
     */
    function onSelectChange() {
      if ( !ctrl.searchable ) {
        var keyedOption = ctrl.keyedOptionMap[ctrl.select.model];
        if ( keyedOption ) {
          ctrl.model = getOptionValue(keyedOption);
        }
      }
      onChange();
    };


    /**
     * @name bltDropdownController#onChange
     * @description Invoked when a root model change will occur. Calls the "change" function if one was bound to our
     * directive.
     */
    function onChange() {
      if ( ctrl.change ) {
        $timeout(ctrl.change, 0);
      }
    };

    /**
     * @name bltDropdownController#selectOption
     * @description Selects the give option and closes the options. Triggers the onChange function if a model change
     * is detected.
     * @param {object|string} option The displayed option to select.
     */
    function selectOption( option ) {
      var value = getOptionValue(option);
      if ( ctrl.model != value ) {
        ctrl.model = value;
        updateInternalModel();
        onChange();
      }
      if ( ctrl.open ) {
        closeOptions();
      }
    };

    /**
     * @name bltDropdownController#getLabelForValue
     * @description Safe retrieval of a label from the given value. If the value doesn't correlate to an option in our list
     * the value returned will be undefined.
     * @param {string} value The value for which a label should be retrieved.
     * @returns {string} The label for the given value.
     */
    function getLabelForValue( value ) {
      var keyedOption = getKeyedOptionForValue(value);
      if ( keyedOption ) {
        return keyedOption.label;
      }
    };

    /**
     * @name bltDropdownController#getKeyForValue
     * @description Safe retrieval of a key from the given value. If the value doesn't correlate to an option in our list
     * the value returned will be undefined.
     * @param {string} value The value for which a key should be retrieved.
     * @returns {string} The key for this value.
     */
    function getKeyForValue( value ) {
      var keyedOption = getKeyedOptionForValue(value);
      if ( keyedOption ) {
        return keyedOption.key;
      }
    };

    /**
     * @name bltDropdownController#openOptions
     * @description Opens the option list for user option selection. The view model is cleared unless the boolean
     * retainModel flagged is passed in and is truthy.
     * @param {boolean} [retainModel] If truthy will prevent the view model from being cleared upon opening options.
     */
    function openOptions( retainModel ) {
      if ( !retainModel && ctrl.searchable ) {
        delete ctrl.search.model;
        untouched();
      }
      if ( ctrl.model ) {
        ctrl.currentSelection = getKeyedOptionForValue([ctrl.model]);
      }
      ctrl.open = true;
      //element.removeClass('dropdown-closed');
      document.addEventListener('mousedown', onDocumentClick);
      document.addEventListener('mouseup', onDocumentClick);
      if ( ctrl.searchable ) {
        onFilterUpdated();
      }
    };

    /**
     * @name bltDropdownController#onFilterUpdated
     * @description Invoked when a change is made to the view model for searchable selects. Updates to this model will
     * update the filtered options that are presented to the user.
     */
    function onFilterUpdated() {
      if ( !ctrl.open ) {
        ctrl.openOptions(true);
      }
      ctrl.filteredOptions = getFilteredOptions();
      scrollCurrentSelectionIntoView();
    };

    /**
     * @name bltDropdownController#isSelected
     * @description returns boolean to add dropdown-active class if dropdown selected
     */
    function isSelected( option ) {
      if ( ctrl.currentSelection && ctrl.currentSelection.key ) {
        if ( option && option.key && ctrl.currentSelection.key === option.key ) {
          return true;
        }
      }
      return false;
    };

    /**
     * @name bltDropdownController#untouched
     * @description Sets the form input to untouched.
     */
    function untouched() {
      $timeout(function() {
        ctrl.form[ctrl.name].$setUntouched();
      })
    };

    /**
     * @name bltDropdownController#getFilteredOptions
     * @description Get the array of current options filtered by the current search model.
     * @returns {Array} The array of filtered options.
     */
    function getFilteredOptions() {
      var filtered = [];
      angular.forEach(ctrl.keyedOptions, function( option ) {
        if ( !ctrl.search.model || option.label.indexOf(ctrl.search.model) >= 0 ) {
          filtered.push(option);
        }
      });
      return filtered;
    };

    /**
     * @name bltDropdownController#onKeyDown
     * @description Watch for several key down events that we're interested in. (Arrow up, down, Esc, Enter and Tab)
     * @param {event} event The key event that we'll be evaluating.
     */
    function onKeyDown( event ) {
      switch ( event.keyCode ) {
        case 40:
          onArrowDown();
          event.preventDefault();
          break;
        case 38:
          onArrowUp();
          event.preventDefault();
          break;
        case 27:
          onEsc();
          event.preventDefault();
          break;
        case 13:
          onEnter();
          event.preventDefault();
          break;
        case 32:
          onSpace(event);
          break;
        case 9:
          ctrl.closeOptions();
          break;
        default:
          $timeout(function() {
            onFilterUpdated()
          }, 0);
      }
    };

    ///////////////////////////////////
    // Private Scope Functions
    ///////////////////////////////////

    /**
     * @private
     * @description Any time our options are updated, we need to rebuild our scope properties to reflect the new options
     * as well as review our current model for validity.
     */
    function onOptionsUpdated() {

      //Create unique keys for each option and store in a keyed map. This allows us to uniquely identify each
      //option regardless of the type of options passed in, or the potential for duplicate options in an array of
      //options.
      ctrl.keyedOptionMap = {};
      ctrl.keyedOptions = [];
      var isArray = Array.isArray(ctrl.options);

      var modelExistsInOptions = false;

      for ( var attr in ctrl.options ) {
        var keyedOption = {
          key: api.uuid(),
          value: isArray ? ctrl.options[attr] : attr,
          label: ctrl.options[attr]
        }
        if ( angular.isDefined(ctrl.model) && ctrl.model == keyedOption.value ) {
          modelExistsInOptions = true;
        }
        ctrl.keyedOptions.push(keyedOption);
        ctrl.keyedOptionMap[keyedOption.key] = keyedOption;
      }

      //Any time our options are updated, we should check to make sure the currently selected value
      //is still valid. If not, we should clear it.
      if ( !modelExistsInOptions ) {
        delete ctrl.model;
      }
      updateInternalModel();

      //If this dropdown is required, we need to make sure the value is never cleared, therefore if the
      //the current scope.model is undefined set the model to the first available option.
      if ( (ctrl.required && angular.isUndefined(ctrl.model)) ) {
        if ( ctrl.keyedOptions.length > 0 ) {
          selectOption(ctrl.keyedOptions[0]);
        }
      }

      //Update our filtered options to reflect the new options, filtering them with the current
      //search model if our options are currently open.
      if ( ctrl.open ) {
        ctrl.filteredOptions = getFilteredOptions();
      } else {
        ctrl.filteredOptions = ctrl.keyedOptions;
      }
    };

    /**
     * @private
     * @description Update our internal model (scope.search or scope.select) to match the current scope.model.
     */
    function updateInternalModel() {
      if ( ctrl.searchable ) {
        ctrl.search.model = getLabelForValue(ctrl.model);
      } else if ( ctrl.type == 'dropdown' ) {
        ctrl.select.model = ctrl.model;
      } else {
        ctrl.select.model = getKeyForValue(ctrl.model);
      }
    };

    /**
     * @private
     * @description If the options are not already open, open them. Otherwise, cycle to the previous selectable option,
     * wrapping to the bottom if necessary.
     */
    function onArrowUp() {
      if ( !ctrl.open ) {
        ctrl.openOptions();
      } else if ( ctrl.filteredOptions && ctrl.filteredOptions.length > 0 ) {
        var idx = ctrl.filteredOptions.indexOf(ctrl.currentSelection)
        if ( idx > 0 || (idx == 0 && !ctrl.required) ) {
          idx -= 1;
        } else {
          idx = ctrl.filteredOptions.length - 1;
        }
        if ( idx >= 0 ) {
          ctrl.currentSelection = ctrl.filteredOptions[idx];
        } else {
          delete ctrl.currentSelection;
        }
      } else if ( !ctrl.required ) {
        delete ctrl.currentSelection;
      }
      processSelectionChange();
    };

    /**
     * @private
     * @description If the options are not already open, open them. Otherwise, cycle to the next selectable option,
     * wrapping to the top if necessary.
     */
    function onArrowDown() {
      if ( !ctrl.open ) {
        ctrl.openOptions();
      } else if ( ctrl.filteredOptions && ctrl.filteredOptions.length > 0 ) {
        var idx = ctrl.filteredOptions.indexOf(ctrl.currentSelection)
        if ( idx >= 0 && idx < (ctrl.filteredOptions.length - 1) ) {
          idx += 1;
        } else if ( ctrl.required || idx < (ctrl.filteredOptions.length - 1) ) {
          idx = 0;
        } else {
          idx = -1;
        }
        if ( idx >= 0 ) {
          ctrl.currentSelection = ctrl.filteredOptions[idx];
        } else {
          delete ctrl.currentSelection;
        }
      } else if ( !ctrl.required ) {
        delete ctrl.currentSelection;
      }
      processSelectionChange();
    };

    /**
     * @private
     * @description Changes current search model if there has been a selection change
     */
    function processSelectionChange() {
      if ( ctrl.currentSelection ) {
        ctrl.search.model = ctrl.currentSelection.label;
      }
      scrollCurrentSelectionIntoView();
    };

    /**
     * @private
     * @description Scrolls the currently selected option into view. If the element is above the current view, it will
     * scroll up into view. If it's below, it will scroll down until the element is fully in view. We do this
     * inside of a timeout to allow the current apply cycle to finish before analyzing and applying the scroll.
     */
    function scrollCurrentSelectionIntoView() {
      $timeout(function() {
        if ( ctrl.searchable && ctrl.open ) {
          if ( ctrl.currentSelection ) {
            var active = document.getElementById(ctrl.currentSelection.key);
            if ( active && active.parentElement ) {
              active = active.parentElement;
              var scrollTop = active.parentElement.scrollTop;
              var scrollBottom = scrollTop + active.parentElement.clientHeight;
              var selectedTop = active.offsetTop;
              var selectedBottom = selectedTop + active.clientHeight;
              if ( selectedTop < (scrollTop + 4) ) { //If the top of our selected element is above the top of the
                // scroll window, shift the view up.
                active.parentElement.scrollTop = selectedTop - 4;
              } else if ( selectedBottom > (scrollBottom + 4) ) { //Else if the bottom of the selected element is
                // below the bottom of the scroll window, shift the view down
                active.parentElement.scrollTop = scrollTop + ((selectedBottom - scrollBottom) + 4);
              }
            }
          }
        }
      });
    };

    /**
     * @private
     * @description If the user hits the enter key while the list of options is open, we try to interpret their intent here.
     * If they have an option currently highlighted/selected, we'll select that. Otherwise, if they have typed
     * enough of a filter to reduce the selectable options to a single option, select that option. Otherwise,
     * select "null", which will clear their selection.
     */
    function onEnter() {
      if ( ctrl.open ) {
        if ( ctrl.currentSelection && ctrl.filteredOptions.indexOf(ctrl.currentSelection) >= 0 ) {
          ctrl.selectOption(ctrl.currentSelection);
        } else if ( ctrl.filteredOptions.length == 1 ) {
          ctrl.selectOption(ctrl.filteredOptions[0]);
        } else {
          ctrl.selectOption();
        }
      }
    };

    /**
     * @private
     * @description Behavior is the same as if the user clicked off of the list.
     */
    function onEsc() {
      if ( ctrl.open ) {
        ctrl.closeOptions();
      }
    };

    /**
     * @private
     * @description Open options on space if they aren't already opened.
     * @param {event} event The key event from the user pressing the spacebar.
     */
    function onSpace( event ) {
      if ( !ctrl.open ) {
        ctrl.openOptions(false);
        event.preventDefault();
      }
    };

    /**
     * @private
     * @description Gets the option value for the given option label.
     * @param {object} option An option from our set of options.
     * @returns {string} The value associated with the given label. Undefined if none found.
     */
    function getOptionValue( option ) {
      if ( option ) {
        return option.value;
      }
    };

    /**
     * @private
     * @description Get the "keyed" option for the given value.
     * @param {string} value The value for which a full "option" object should be retrieved.
     * @returns {object} The option that correlates to the given value. Undefined if none is found.
     */
    function getKeyedOptionForValue( value ) {
      if ( value ) {
        for ( var idx = 0; idx < ctrl.keyedOptions.length; idx++ ) {
          if ( ctrl.keyedOptions[idx].value == value ) {
            return ctrl.keyedOptions[idx];
          }
        }
      }
    };

    /**
     * @private
     * @description If the user clicks anywhere on our document outside of our directive, we'll cancel the selection.
     * @param {event} e The DOM click event.
     */
    function onDocumentClick( e ) {
      $scope.$apply(function() {
        if ( ctrl.open && e.target.name != ctrl.name
          && e.target.id != 'select-none'
          && !ctrl.keyedOptionMap.hasOwnProperty(e.target.id) ) {
          ctrl.closeOptions();
        }
      });
    };
  }

  bltDropdownController.$inject = ['BltApi', '$timeout', '$scope'];
})();
