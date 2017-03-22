(function() {
  'use strict';

  angular.module('blt_core')
    .directive('bltClose', bltClose)
    .directive('bltOpen', bltOpen)
    .directive('bltOpenView', bltOpenView)
    .directive('bltValidate', bltValidate)
    .directive('bltMain', bltMain)
    .directive('bltAutofocus', bltAttrDirective('Autofocus'))
    .directive('bltRequired', bltAttrDirective('Required'))
    .directive('bltTabindex', bltAttrDirective('Tabindex', true))
    .directive('bltMax', bltAttrDirective('Max', true))
    .directive('bltMin', bltAttrDirective('Min', true))
    .directive('bltMaxlength', bltAttrDirective('Maxlength', true))
    .directive('bltMinlength', bltAttrDirective('Minlength', true))
    .directive('bltStep', bltAttrDirective('Step', true))
    .directive('bltPattern', bltAttrDirective('Pattern', true))
    .directive('bltAutocorrect', bltAttrDirective('Autocorrect', true))
    .directive('bltAutocomplete', bltAttrDirective('Autocomplete', true))
    .directive('bltSpellcheck', bltAttrDirective('Spellcheck', true));

  /**
   * @ngdoc directive
   * @name bltClose
   * @module blt_core
   * @restrict A
   *
   * @description
   * Closes modals and panels. To close a modal or panel, pass the
   * `id` of the modal or panel as the value of the directive. This directive
   * should be used on an ngBoltJS {@link bltButton button} in place of an
   * [ng-click](https://docs.angularjs.org/api/ng/directive/ngClick).
   *
   * <div class="note-info">
   * **Note** If other functions need to be triggered when closing a component,
   * use `ng-click`. Call a function in your controller and use
   * `{@link BltApi#publish}` to close the component instead.
   * </div>
   *
   * <div class="note-tip">
   * **Tip** If the close button is a child element of a modal or panel, you do
   * not need to pass the id of the modal or panel.
   * </div>
   *
   * @requires BltApi
   *
   * @example <caption>Close a panel with an id of 'myPanel'</caption>
   * <example>
   *   <javascript>
   *      <button class="btn-text" blt-close="myPanel">Close Panel</button>
   *   </javascript>
   * </example>
   *
   * @example <caption>Close panel from within panel</caption>
   * <example>
   *   <javascript>
   *     <blt-panel>
   *     ...
   *     <button class="btn-text" blt-close="">Close</button>
   *     ...
   *     </blt-panel>
   *   </javascript>
   * </example>
   * @todo move into a separate file.
   */
  function bltClose( api ) {
    var directive = {
      restrict: 'A',
      link: linkFn
    };

    return directive;

    /**
     * @private
     * @function linkFn
     * @description Publish a close message to the `id` set on the bltClose attribute or navigate up the DOM tree
     * to get the components `id` if the bltClose attribute has no value. If the bltClose directive is
     * include on the component that it closes no id needs to be set.
     *
     * @param {object} scope Our isolate scope instance.
     * @param {angular.element} element [Angular element](https://docs.angularjs.org/api/ng/function/angular.element) of the outermost directive element
     * @param {object} attrs The raw html attributes that are attached to our directive element.
     */
    function linkFn( scope, element, attrs ) {

      var targetId = '';

      if ( attrs.bltClose ) {
        targetId = attrs.bltClose;
      } else {
        var parentElement = false;
        var tempElement = element.parent();

        while ( parentElement === false ) {
          if ( tempElement[0].nodeName == 'BODY' ) {
            parentElement = '';
          }

          if ( typeof tempElement.attr('blt-closable') !== 'undefined' && tempElement.attr('blt-closable') !== false ) {
            parentElement = tempElement;
          }

          tempElement = tempElement.parent();
        }

        targetId = parentElement.attr('id');
      }

      // Close targeted element
      element.on('click', function( e ) {
        api.publish(targetId, 'close');
        e.preventDefault();
      });
    }
  }

  bltClose.$inject = ['BltApi'];

  /**
   * @ngdoc directive
   * @name bltOpen
   * @module blt_core
   * @restrict A
   *
   * @description
   * Use `blt-open` to open modals and directives. To open a modal or panel, pass the `id` of the modal or
   * panel as the value of the directive. This directive should be used on an ngBoltJS {@link bltButton button} in place
   * of an [ng-click](https://docs.angularjs.org/api/ng/directive/ngClick).
   *
   * <div class="note-info">
   * **Note** If other functions need to be triggered when closing a component, use `ng-click`. Call a function in your
   * controller and use `{@link BltApi#publish}` to open the component instead.
   * </div>
   *
   * @requires BltApi
   *
   * @example <caption>Open a modal with an `id` of 'myModal'</caption>
   * <example>
   *   <javascript>
   *     <button class="btn-text" blt-open="myModal">Open Modal</button>
   *   </javascript>
   * </example>
   * @todo move into a separate file
   */
  function bltOpen( api ) {
    var directive = {
      restrict: 'A',
      link: linkFn
    };

    return directive;

    /**
     * @private
     * @function linkFn
     * @description Publishs an open message to open the component whose id is the value of the bltOpen attribute when clicked.
     *
     * @param {object} scope Our isolate scope instance.
     * @param {element} element [Angular element](https://docs.angularjs.org/api/ng/function/angular.element) of the outermost directive element
     * @param {object} attrs The raw html attributes that are attached to our directive element.
     */
    function linkFn( scope, element, attrs ) {
      element.on('click', function( e ) {
        api.publish(attrs.bltOpen, 'open');
        e.preventDefault();
      });

    }
  }

  bltOpen.$inject = ['BltApi'];

  /**
   * @ngdoc directive
   * @name bltOpenView
   * @module blt_core
   * @restrict A
   *
   * @description
   * Opens a new view and closes the current one. To open a view, pass the `path` of the view as the value
   * of the directive. This directive should be used on an ngBoltJS {@link bltButton button} in place of an
   * [ng-click](https://docs.angularjs.org/api/ng/directive/ngClick).
   *
   * <div class="note-info">
   * **Note** If other functions need to be triggered before opening views, or if you need to pass other paramaters to
   * the route, use `ng-click`. Call a function in your controller and use {@link BltApi#switchViews}.
   * </div>
   *
   * @requires BltApi
   *
   * @deprecated Use the `href` attribute or `ngHref` directive on an HTML `<a>` tag instead.
   *
   * @param {string} path The string of the path to pass to {@link BltApi#switchViews}.
   *
   * @example <caption>Open a view with a path of '/my-view'</caption>
   * <example>
   *   <javascript>
   *     <button class="btn-text" blt-open-view="/my-view">Open View</button>
   *   </javascript>
   * </example>
   * @todo move into a separate file
   */
  function bltOpenView( api ) {
    var directive = {
      restrict: 'A',
      link: linkFn
    };

    return directive;

    /**
     * @private
     * @function linkFn
     * @description Calls {@link BltApi#switchViews} and passes the path of the view set as the
     * value of the `bltOpenView` attribute.
     *
     * @param {object} scope Our isolate scope instance.
     * @param {element} element [Angular element](https://docs.angularjs.org/api/ng/function/angular.element) of the outermost directive element
     * @param {object} attrs The raw html attributes that are attached to our directive element.
     */
    function linkFn( scope, element, attrs ) {

      element.on('click', function( e ) {
        api.switchViews(attrs.bltOpenView);
        e.preventDefault();
      });

    }
  }

  bltOpenView.$inject = ['BltApi'];

  /**
   * @ngdoc directive
   * @name bltValidate
   * @module blt_core
   * @restrict A
   *
   * @description
   * Adds custom validators onto form controls. To add a custom validator, add a validator object
   * in your controller and pass as the value of the directive. Your validation function will be added to the
   * ngModelController async or sync validators depending on the validator type. Angular will run the validator in
   * addition to its built-in validators on form controls. For more information on custom Angular validators, see their
   * [documentation](https://docs.angularjs.org/api/ng/type/ngModel.NgModelController).
   *
   * @example
   * <example runnable="true">
   *   <javascript name="custom-validator.controller.js">
   *     angular.module("bltDocs")
   *       .controller("BltValidateCtrl", function(){
   *         var ctrl = this;
   *         ctrl.customValidator = {
   *           name: 'test', // The name of your custom validator object
   *           type: 'sync', // The type of validator: async or sync. See the Angular docs for more information.
   *           msg: "We're looking for 'Test'.", // The error message if invalid
   *           validationFn: function(modelValue, viewValue){ // The function to run to determine validity
   *             if( viewValue === 'Test' ){
   *               return true;
   *             } else {
   *               return false;
   *             }
   *           }
   *         };
   *       });
   *   </javascript>
   *   <html name="custom-validator.template.html">
   *     <div ng-controller="BltValidateCtrl as Example">
   *       <form class="form" name="myForm" novalidate>
   *           <blt-textfield data-name="validationTest"
   *                          data-label="Validation Test"
   *                          data-model="Example.myForm.validationTest"
   *                          data-type="text"
   *                          data-required="true"
   *                          data-validate="Example.customValidator">
   *           </blt-textfield>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   *
   * @todo bltValidate
   */
  function bltValidate() {
    var directive = {
      require: 'ngModel',
      restrict: 'A',
      scope: {
        validator: '=bltValidate'
      },
      link: linkFn
    };

    return directive;

    /**
     * @private
     * @function linkFn
     * @description Checks that the validator is a function and then adds it to the ngModelController async or sync validators
     * depending on type. Angular will run the validator in addtion to its built-in validators on form controls.
     *
     * @param {scope} scope Our isolate scope instance.
     * @param {element} element Angular.element of the outermost directive element
     * @param {Object} attrs The raw html attributes that are attached to our directive element.
     * @param {controller} form Reference to the ngModelController.
     */
    function linkFn( scope, element, attrs, ctrl ) {
      // Register custom validators
      if ( scope.validator ) {
        if ( typeof scope.validator.validationFn !== 'function' ) {
          // Throw error if validationFn is not a function
          throw new Error(scope.validator + ' validationFn is not a function.');
        } else {
          if ( scope.validator.type === 'sync' ) {
            // Add to $validators if not async.
            ctrl.$validators[scope.validator.name] = scope.validator.validationFn;
          } else if ( scope.validator.type === 'async' ) {
            // Add to $asyncValidators if async.
            ctrl.$asyncValidators[scope.validator.name] = scope.validator.validationFn;
          }
        }
      }
    }
  }

  /**
   * @ngdoc directive
   * @name bltMain
   * @module blt_core
   * @restrict E
   *
   * @description
   * Defines the main container of an ngBoltJS application and includes the `main.template.html` file.
   * The bltMain directive communicates with {@link bltLogin} and is displayed depending on the logged in state.
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   *
   * @todo move into separate file.
   */
  function bltMain( api, $timeout ) {
    var directive = {
      restrict: 'E',
      scope: {},
      template: '<div ng-show="show" ng-controller="MainController as Main" class="grid-frame grid-vertical" ng-include="\'partials/main/main.template.html\'"></div>',
      link: linkFn
    };

    return directive;

    /**
     * @private
     * @function linkFn
     * @todo Add description
     */
    function linkFn( scope ) {

      scope.show = false;
      var loginAnswerReceived = false;

      api.subscribe('login', onLoginMessage);

      api.publish('login', 'state_query');

      $timeout(function() {
        if ( !loginAnswerReceived ) {
          scope.show = true;
        }
      }, 250);

      function onLoginMessage( msg ) {
        if ( msg == "show" || msg == "showing" ) {
          loginAnswerReceived = true;
          $timeout(function() {
            scope.show = false;
          }, 300);
        } else if ( msg == "hide" || msg == "hidden" ) {
          loginAnswerReceived = true;
          scope.show = true;
        }
      }
    }
  }

  bltMain.$inject = ['BltApi', '$timeout'];

  /**
   * @private
   * @name bltAttrDirective
   * @module blt_core
   * @restrict A
   *
   * @description This function produces a blt attribute directive function to be returned to the .directive() function
   * during directive creation. This provides a small utility that can be used to instantiate a multitude of ngBoltJS
   * directives that will dynamically add or remove the given html attributes from the element based on the value of
   * the ngBoltJS directive attribute.
   *
   * For the html attribute to be added to the element, the value of the blt attribute must not equal False. (!== false)
   *
   * If/when the value of the attribute is not equal to false, the html attribute is added to the element. The value
   * that is assigned to the html attribute depends on the second argument to this function. If the second argument
   * is true, then the value of the ngBoltJS attribute is applied to the html attribute. Otherwise the html attribute
   * is set equal to its own name.
   *
   * @param {String} name The name of the html attribute that we're overriding.
   * @param {Boolean} useBltAttrValue If true, the value of the ngBoltJS attribute will be applied to the html attribute when it is non-false and added to the element.
   */
  function bltAttrDirective( name, useBltAttrValue ) {
    var bltAttrName = "blt" + name;
    var htmlAttrName = name.toLowerCase();

    function bltAttr( $compile, $timeout ) {

      var watchRegistered = false;

      var directive = {
        restrict: 'A',
        link: linkFn
      };

      return directive;

      /**
       * Watch the ngBoltJS attribute value and conditionally apply the corresponding html attribute to our parent
       * element, depending on that ngBoltJS attribute value. (e.g. bltTabindex corresponds to the tabindex attribute.)
       */
      function linkFn( scope, element, attr ) {
        if ( !watchRegistered ) {
          watchRegistered = true;
          scope.$watch(function() {
            return attr[bltAttrName];
          }, function() {
            assignBltAttrValue(scope, element, attr);
          })
        }
        assignBltAttrValue(scope, element, attr);
      }

      /**
       * Assign the value of the blt attribute to the html attribute if necessary. If we assign a value to the html
       * attribute, recompile the element so angular picks up the new attributes / values.
       * @param scope
       * @param element
       * @param attr
       */
      function assignBltAttrValue( scope, element, attr ) {
        if ( angular.isDefined(attr[bltAttrName]) && attr[bltAttrName] !== 'false' && attr[bltAttrName] != "" ) {
          if ( useBltAttrValue ) {
            if ( attr[htmlAttrName] != attr[bltAttrName] ) {
              element.attr(htmlAttrName, attr[bltAttrName]);
              $timeout(function() {
                $compile(element)(scope)
              });
            }
          } else if ( !attr.hasOwnProperty(htmlAttrName) ) {
            element.attr(htmlAttrName, htmlAttrName);
            $timeout(function() {
              $compile(element)(scope)
            });
          }
        } else if ( attr.hasOwnProperty(htmlAttrName) ) {
          element.removeAttr(htmlAttrName);
          $timeout(function() {
            $compile(element)(scope)
          });
        }
      }
    }

    bltAttr.$inject = ['$compile', '$timeout']

    return bltAttr;
  }

})();
