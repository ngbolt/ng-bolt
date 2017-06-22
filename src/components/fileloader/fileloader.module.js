(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_fileloader
   * @description ngBoltJS File Loader module.
   *
   * @since 2.0.0
   *
   */
  angular.module('blt_fileloader', [])
    .component('bltFileloader', bltFileloader())
    .directive('bltFilemodel', bltFilemodel)
  ;

  /**
   * @ngdoc directive
   * @name bltFileloader
   * @module blt_fileloader
   *
   * @description The bltFileloader provides simple file selection capability. Upon selection, a JavaScript
   * [File](https://developer.mozilla.org/en-US/docs/Web/API/File) object representing the selected file will be set
   * into the controller model specified in the `data-model` attribute.
   *
   * <div class="note-tip">**BEST PRACTICE** The `data-` prefix is not required for ngBoltJS attributes, but is highly
   * recommended to prevent conflicts with standard HTML attributes.</div>
   *
   * @example <caption>Basic Usage</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module('bltDocs')
   *       .controller("FileExCtrl", function(){
   *         var ctrl = this;
   *         ctrl.file = undefined;
   *       });
   *   </javascript>
   *   <html>
   *     <div ng-controller="FileExCtrl as ctrl">
   *       <form name="ctrl.myForm" class="form" novalidate>
   *           <blt-fileloader data-name="fileloader"
   *                           data-model="ctrl.file">
   *           </blt-fileloader>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   *
   * @restrict E
   *
   * @param {boolean} [data-autofocus] Indicates whether or not this field should autofocus on page load.
   * @param {expression} [data-change] This attribute is used to bind an expression in the containing scope that
   * will be invoked any time the value of this component changes. Functionality is based on the Angular ngChange
   * directive.
   * @param {boolean} [data-disabled] Disables the field. Any value set in this attribute will cause the field to be
   * disabled.
   * @param {string} data-label This attribute specifies the label for this component.
   * @param {string} data-name This attribute indicates the name of this form element and will be used during form
   * traversal by the ngBoltJS framework.
   * @param {value} [data-required] Indicates whether or not this field is required.
   * @param {value} [data-tabindex] Specifies the tab order of an element
   * @param {expression} [data-validate] An expression that gets passed through to an instance of the bltValidate
   * directive to invoke custom validation on this component value. See documentation for bltValidate for more
   * information.
   *
   * @requires BltApi
   */
  function bltFileloader() {
    return {
      require: {
        form: '^form'
      },
      controller: bltFileloaderController,
      controllerAs: 'File',
      templateUrl: 'components/fileloader/fileloader.template.html',
      bindings: {
        autofocus: '<',
        change: '&',
        data: '=model',
        disabled: '<',
        label: '@',
        name: '@',
        required: '<',
        tabindex: '<',
        validate: '<'
      }
    };
  }

  /**
   * @private
   * @name bltFileloaderController
   * @module blt_fileloader
   *
   * @description bltFileloader controller for providing display functionality to the template.
   *
   * @requires BltApi
   *
   */
  function bltFileloaderController( api ) {

    var ctrl = this;
    ctrl.$onInit = init;
    ctrl.getFileExtension = getFileExtension;
    ctrl.onChange = onChange;
    ctrl.data = null;
    ctrl.fileExt = '';
    ctrl.charsLimit = 30;


    /**
     * @private
     * @description Handles the controller initialization. Confirm existence of required attributes and set default values
     * as needed.
     */
    function init() {
      // check input name
      if ( angular.isUndefined(ctrl.name) ) {
        api.error('missing name attribute for blt-fileloader. See: '
          + window.location + '/blt.fileloader.bltFileloader.html');
      }
    }

    /**
     * @name bltFileloaderController#getFileExtension
     * @description Get extension from currently selected file, beginning at first '.'
     */
    function getFileExtension() {
      // Make Sure There Is A File Selected
      if ( ctrl.data ) {
        // Don't Show Extension If File Name Doesn't Overflow
        if ( ctrl.data.name.length > ctrl.charsLimit ) {
          return ctrl.data.name.split(".")[ctrl.data.name.split(".").length - 1];
        } else {
          return "";
        }
      }
    };

    /**
     * @name bltFileloaderController#onChange
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

  /**
   * @name bltFilemodel
   * @module blt_fileloader
   * @description Internal file model directive. This directive provides a binding to the event that fires when a user selects
   * a file using the standard file chooser dialog provided by their browser.
   *
   * @restrict A
   *
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   */
  function bltFilemodel( $timeout ) {

    var open = false;
    var everOpened = false;
    var isInitialFileChooserSessionOpen = false;

    var directive = {
      require: ['^bltFileloader', 'ngModel'],
      restrict: 'A',
      link: link
    };

    return directive;

    /**
     * @private
     * @description Linking function to be invoked by Angular during the linking phase. We use this to attach a change listener
     * to the element this directive is attached to. (Our file input element) When the change event fires, we
     * perform some work on the selected file to pass the file information to the controller.
     *
     * @param {element} element The angular directive element
     * @param {object} ctrls The file controller that is containing this directive.
     */
    function link( scope, element, attrs, ctrls ) {

      var fileCtrl = ctrls[0];
      var ngModelCtrl = ctrls[1];
      fileCtrl.modelCtrl = ngModelCtrl;

      element.on('blur', function() {
        if ( !open ) {
          ngModelCtrl.$setTouched();
        } else if ( isInitialFileChooserSessionOpen ) {
          $timeout(function() {
            ngModelCtrl.$setUntouched();
          })
        }
      });
      element.on('click', function() {
        if ( !everOpened ) {
          everOpened = true;
          isInitialFileChooserSessionOpen = true;
        }
        document.body.onfocus = dialogClosed;
        open = true;
      });
      element.on('change', function() {
        $timeout(function() {
          ngModelCtrl.$setViewValue(element[0].files[0]);
          ngModelCtrl.$render();
          fileCtrl.fileExt = fileCtrl.getFileExtension();
        });
      });

      /**
       * @private
       * @description When the dialog is closed, we clear our document onfocus listener, and set our model controller to
       * touched so that the required validation is triggered.
       */
      function dialogClosed() {
        open = false;
        isInitialFileChooserSessionOpen = false;
        document.body.onfocus = null;
        $timeout(function() {
          ngModelCtrl.$setTouched();
        }, 50);
      }
    }
  }

  bltFilemodel.$inject = ['$timeout'];
  bltFileloaderController.$inject = ['BltApi'];
})();
