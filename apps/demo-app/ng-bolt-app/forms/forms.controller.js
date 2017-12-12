(function() {
  'use strict';

  angular.module('demo.forms')
    .controller('FormsController', FormsController);

  FormsController.$inject = ['$timeout', 'BltApi', '$scope'];

  /**
   * @ngdoc type
   * @area app
   * @name FormsController
   * @module appForms
   */
  function FormsController( $timeout, api, $scope ) {
    var ctrl = this;


    ctrl.disabled = false;

    // dropdown tests
    ctrl.dropdownModel = 'dropdown4';
    ctrl.dropdownSelectModel = 'dropdown3';
    ctrl.dropdownSearchModel = 'dropdown2';
    ctrl.optionsArray = ['dropdown1', 'dropdown2', 'dropdown3', 'dropdown4', 'dropdown5', 'dropdown6', 'dropdown7'];
    ctrl.optionsModel = {
      'dropdown1': 'Dropdown 1',
      'dropdown2': 'Dropdown 2',
      'dropdown3': 'Dropdown 3',
      'dropdown4': 'Dropdown 4',
      'dropdown5': 'Dropdown 5',
      'dropdown6': 'Dropdown 6',
      'dropdown7': 'Dropdown 7'
    };

    ctrl.dropChange = function(){alert('Changed')};

    // checkbox-radio
    ctrl.checkboxTest = undefined;
    ctrl.checkboxOptions = ['none', 'checkbox1', 'checkbox2', 'checkbox3', 'checkbox4', 'checkbox5'];
    ctrl.radioTest = undefined;
    ctrl.radioOptions = ['none', 'radio1', 'radio2', 'radio3', 'radio4', 'radio5'];

    ctrl.testNgRequire = true;

    ctrl.testCheckbox = false;
    ctrl.radioTest = 'none';

    $scope.$watch(function() {
      return ctrl.dropdownSearchModel
    }, function() {
      console.info("$watch dropdownSearchModel: " + ctrl.dropdownSearchModel)
    });


    ctrl.test = {
      name: 'test',
      type: 'sync',
      msg: "We're looking for 'Test'.",
      validationFn: function( modelValue, viewValue ) {
        if ( viewValue === 'Test' ) {
          return true;
        }
        return false;
      }
    };

    ctrl.minDate = minDate;
    ctrl.maxDate = undefined;
    ctrl.selectionDate = undefined;
    ctrl.onDateSelected = onDateSelected;
    ctrl.toggle = false;
    ctrl.disableToggle = false;
    ctrl.counter1 = NaN;

    ctrl.change = change;
    ctrl.onSelectModelChange = onSelectModelChange;
    ctrl.onSelectArrayChange = onSelectArrayChange;
    ctrl.submitForm = submitForm;
    ctrl.validate = validate;

    activate();

    function activate() {

    }

    function change( name ) {
      console.log(name + ':you changed the input');
    }

    function onSelectArrayChange() {
      console.log("Select array value changed: " + ctrl.dropdownSelectModel);
    }

    function onSelectModelChange() {
      console.log("Select model value changed: " + ctrl.dropdownSearchModel);
    }

    function onDateSelected() {
      console.log("Date selected: %s", ctrl.dateModel);
      ctrl.maxDate = new Date(parseInt(ctrl.dateModel, 10) + 31536000000);
    }

    function minDate() {
      if ( ctrl.dateModel ) {
        return (parseInt(ctrl.dateModel, 10) - 31536000000) + "";
      }
    }

    function submitForm( form ) {
      console.log('checking form');
      if ( form.$invalid ) {
        form.$submitted = true;
        return;
      } else {
        console.log(form);
      }

      console.log(ctrl.testForm);
    }

    function validate( value ) {
      // var value = modelValue || viewValue;
      if ( value == 'true' ) {
        console.log(value);
      } else if ( value == 'false' ) {
        console.log(value);
      }
    }
  }

})();