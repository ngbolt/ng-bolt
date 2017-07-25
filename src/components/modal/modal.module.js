(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_modal
   * @description ngBoltJS Modal component.
   * @since 1.0.0
   */
  angular
    .module('blt_modal', [])
    .directive('bltModal', bltModal);

  /**
   * @ngdoc directive
   * @name bltModal
   * @module blt_modal
   * @since 1.0.0
   * @restrict EA
   *
   * @description
   * The bltModal component is used for simple confirmation dialog boxes, selection menus, simple forms, or
   * larger dialogs that can contain tables, lists, and complex forms.
   *
   * Modals consist of a `.modal-overlay` element
   * that covers and darkens the rest of the application window and a `.modal` element that serves as dialog window
   * and contains the content of the modal. Both fade in and out when opening/closing. The presentation of the modal
   * options can be customized through the attributes, class elements, and modifiers supported on this component.
   *
   * <div class="note-tip">
   * **Best Practice** Keep the HTML template of your modal in an HTML partial file and load into the `.modal-content`
   * using [ng-include](https://docs.angularjs.org/api/ng/directive/ngInclude). You may optionally assign a
   * controller for your modal on the `.modal-content` element as well.
   * </div>
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   *
   * @param {string} id Required in order for you to open and close the modal using the {@link BltApi} pub/sub methods.
   * @param {string} [data-size=small] You can set the size of your modal. Valid values are `x-small`, `small`, `medium`, `large` and `full-screen`.
   * @param {expression} [data-flip] An Angular expression. If the expression evaluates to true, the modal will have a front and back side and use a flipping animation to toggle between the two.
   *
   * @classname {element} modal-content The element that contains your code for the modal. Add this inside the `blt-modal` directive opening and closing tag and use the [ng-include](https://docs.angularjs.org/api/ng/directive/ngInclude) directive to load the rest of your modal content from a HTML partial. Used on an HTML `<div>`, `<section>`, or `<form>` tag.
   *
   * @classname {element} modal-body The main content of a modal. The `.modal-body` has padding by default that can be removed by adding the `.modal-collapse` modifier - useful for modals containing menus, tables, forms, and lists. Should be used on the HTML `<div>` or `<section>` tags.
   *
   * @classname {element} [modal-header] The header of the modal containing the `.modal-title` and optional buttons or icons. The `.modal-header` element should only be used on modals that contain other components. Modals that contain a simple text message do not need a `.modal-header`. The `.modal-header` can be divided into sections using grid elements. Should be used on an HTML `<header`> tag.
   *
   * @classname {element} [modal-footer] Contains actions for the modal. Should be used on the HTML `<footer>` tag. By default the `.modal-footer` has no top border. For simple modals with only a short text message a border is not necessary, and sometimes when using menus, lists, or tables the top border was duplicated. If you need a top border on the footer element add the `.edge-top` utility class.
   *
   * @classname {element} [modal-title] The title of the modal. Must be contained inside the `.modal-header` or sectioning elements within the `.modal-header`. Should be used on an HTML `<h2>` tag.
   *
   * @classname {element} [modal-heading] A heading element for sectioning the `.modal-body` content. Should be used on an HTML `<h3>` tag. If the `.modal-body` is collapsed, add the `.grid-wrapper` modifier to add padding around the heading.
   *
   * @classname {element} [modal-text] Default text for the modal. Use this on any text content inside the `.modal-body`. Should be used on the HTML `<p>` tag. If the `.modal-body` is collapsed, add the `.grid-wrapper` modifier to add padding around the text.
   *
   * @classname {element} [modal-divider] A thick horizontal border for sectioning `.modal-body` content. Only use if not using a `.modal-heading`. Should be used on an HTML `<hr>` tag.
   *
   * @classname {element} [modal-btn-text] Default text button for modal secondary actions. Should be used on the HTML `<button>` tag. For primary actions, use `.modal-btn-text-submit`.
   *
   * @classname {element} [modal-btn-icon] Icon button for modals, most often placed in the `.modal-header` or `.modal-body`. Should be used on the HTML `<button>` tag.
   *
   * @classname {element} [modal-btn-solid] Default solid button for modal secondary actions. Should only be used in the `.modal-body`. Should be used on the HTML `<button>` tag. For primary actions, use `.modal-btn-solid-submit`.
   *
   * @classname {element} [modal-front] The front side of a flipping modal. Must be a direct child of the `.modal-content` element. **Required if `data-flip` is true.**
   *
   * @classname {element} [modal-back] The back side of a flipping modal. Must be a direct child of the `.modal-content` element. **Required if `data-flip` is true.**
   *
   * @classname {modifier} [modal-collapse] Removes padding from the `.modal-body` element.
   * @classname {modifier} [modal-overflow] Prevents absolutely positioned elements (like the options list of a searchable {@link bltDropdown} component) from being hidden by the `.modal-body` overflow or causing it to scroll. Add to the `.modal-body` element.
   *
   * @example <caption>Runnable demo of some modals</caption>
   * <example runnable="true">
   *   <javascript>
   *     angular.module("bltDocs")
   *          .controller('ModalExController', ModalExController)
   *      ;
   *      ModalExController.$inject=["BltApi"];
   *      function ModalExController(bltApi) {
   *          var ctrl = this;            
   *          
   *          ctrl.flip = function(modalId) {
   *              bltApi.publish(modalId, 'flip');
   *          }
   *      }
   *   </javascript>
   *   <html>
   * 
   *   <div ng-controller= "ModalExController as ctrl">
   * 
   *     <blt-modal id="simpleModal" data-size="x-small">
   *         <div class="modal-content">
   *             <div class="modal-body">
   *                 <p class="modal-text">Some simple content here, maybe asking for confirmation before taking an action.
   *             </div>
   *             <footer class="modal-footer">
   *                 <button class="modal-btn-text-submit" blt-close="">Confirm</button>
   *             </footer>
   *         </div>
   *     </blt-modal>  
   * 
   *     <blt-modal id="mediumModal" data-size="medium">
   *         <div class="modal-content">
   *             <header class="modal-header">
   *                 <h2 class="modal-title">Medium Modal</h2>
   *             </header>
   *             <div class="modal-body">
   *                 <p class="modal-text">The medium modal is useful for showing bigger lists, small tables or forms.
   *             </div>
   *             <footer class="modal-footer">
   *                 <button class="modal-btn-text-submit" blt-close="">Close</button>
   *             </footer>
   *         </div>
   *     </blt-modal>
   *
   *     <blt-modal id="largeModal" data-size="large">
   *         <div class="modal-content">
   *             <header class="modal-header">
   *                 <h2 class="modal-title">Large Modal</h2>
   *             </header>
   *             <div class="modal-body">
   *                 <p class="modal-text">Large modals are useful for more complex tables or forms, or displaying large amounts of content such as code.
   *             </div>
   *             <footer class="modal-footer">
   *                 <button class="modal-btn-text-submit" blt-close="">Close</button>
   *             </footer>
   *         </div>
   *     </blt-modal>
   * 
   *     <blt-modal id="fullScreenModal" data-size="full-screen">
   *         <div class="modal-content">
   *              <header class="modal-header">
   *                  <h2 class="modal-title">Full Screen Modal</h2>
   *              </header>
   *              <div class="modal-body">
   *                  <p class="modal-text">The full screen modal is essentially a floating view. It is big enough to section off and include multiple components such as menus, complex lists, tables and forms. Full screen modals expand to the full size of the window except for 1.5rem of padding around the edge to maintain the modal look.
   *              </div>
   *              <footer class="modal-footer">
   *                  <button class="modal-btn-text-submit" blt-close="">Close</button>
   *              </footer>
   *          </div>
   *     </blt-modal>  
   * 
   *     <blt-modal id="flipModal" data-flip="true" data-size="large">
   *         <div class="modal-content">
   *             <div class="modal-front">
   *                 <header class="modal-header">
   *                     <h2 class="modal-title">Flipping Modal Front</h2>
   *                 </header>
   *                 <section class="modal-body">
   *                     <p class="modal-text">Some content for the front modal here.
   *                 </section>
   *                 <footer class="modal-footer">
   *                     <button class="modal-btn-text-submit" ng-click="ctrl.flip('flipModal')">Flip Over</button>
   *                 </footer>
   *             </div>
   *             <div class="modal-back">
   *                 <header class="modal-header">
   *                     <h2 class="modal-title">Flipping Modal Back</h2>
   *                 </header>
   *                 <section class="modal-body">
   *                     <p class="modal-text">Some content for the back modal here.
   *                 </section>
   *                 <footer class="modal-footer edge-top">
   *                     <button class="modal-btn-text" ng-click="ctrl.flip('flipModal')">Flip over</button>
   *                     <button class="modal-btn-text-submit" blt-close="">Close</button>
   *                 </footer>
   *             </div>
   *         </div>
   *     </blt-modal>  
   *     
   *     <div class="btn-row-left">
   *         <button class="btn-solid-submit" blt-open="simpleModal">X-small Modal</button>
   *             <button class="btn-solid-submit" blt-open="mediumModal">Medium Modal</button>
   *             <button class="btn-solid-submit" blt-open="largeModal">Large Modal</button>
   *             <button class="btn-solid-submit" blt-open="fullScreenModal">Full Screen Modal</button>
   *             <button class="btn-solid-submit" blt-open="flipModal">Flipping Modal</button>
   *        </div>
   *   </div>
   *   </html> 
   * </example>
   *
   * @example <caption>To use the bltModal component in your ngBoltJS application, include a blt-modal
   * element in an HTML partial of your application.</caption>
   * <example>
   *   <html>
   *     <blt-modal id="myModal" data-size="small">
   *       <div class="modal-content" ng-include="'partials/module/partial.template.html'" ng-controller="MyPanelController as MyPanel"></div>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   * @example <caption>ngBoltJS has a custom directive for easily opening and closing modals and other components.
   * Simply pass the id of the modal you'd like open/close.</caption>
   * <example>
   *   <html>
   *     <button blt-open="myModal">Open</button>
   *     <button blt-close="myModal">Close</button>
   *
   *     <!--If the close button is inside the modal component, you do not have to pass the id of the modal.-->
   *     <footer class="modal-footer">
   *       <button blt-close="">Close</button>
   *     </footer>
   *   </html>
   * </example>
   *
   * @example <caption>Often you may need to do some other work/set-up in your code before opening the modal. In that case, you
   * can use the pub/sub service of the ngBoltJS API to open and close the modal instead of the blt-open and blt-close directives.</caption>
   * <example>
   *   <javascript>
   *   angular.module('myApp')
   *     .controller('MainController', MainController);
   *   // You must inject the ngBoltJS API into the controller to open and close modals via the pub/sub methods.
   *   MainController.$inject = ['BltApi'];
   *   function MainController(bltApi) {
   *     var ctrl = this;
   *
   *     ctrl.openMyModal = function(){
   *       // Do some work here first...
   *
   *       // When ready, publish the id of the modal you wish to open
   *       bltApi.publish('myModal', 'open');
   *     }
   *   }
   *   </javascript>
   * </example>
   *
   * @example <caption>When closing a modal, include any functions to reset data inside a $timeout to run after the
   * closing animation of the modal to avoid resetting data and 'flashing' the modal content as it animates out.</caption>
   * <example>
   *   <javascript>
   *   MainController.$inject = ['BltApi', '$timeout'];
   *   function MainController(bltApi, $timeout) {
   *     var ctrl = this;
   *
   *     ctrl.modal = { title: 'My Modal', pending: true };
   *
   *     ctrl.closeMyModal = function(){
   *       // publish the id of the modal you wish to close
   *       bltApi.publish('myModal', 'close');
   *
   *       // reset modal data after the closing animation
   *       $timeout(function(){
   *         ctrl.modal.title = '';
   *         ctrl.modal.pending = false;
   *       }, 350);
   *     }
   *   }
   *   </javascript>
   * </example>
   *
   * @example <caption>Most of the time, you will want to keep the markup of your modal-content  in a separate file and load it
   * as a partial. This is easily done using the ng-include directive on the modal-content element.</caption>
   * <example>
   *   <html>
   *     <!--main.template.html-->
   *     <blt-modal id="mediumModal" data-size="medium">
   *       <div class="modal-content" ng-include="'partials/main/medium-modal.template.html'"></div>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   * @example
   * <example>
   *   <html>
   *     <!--medium-modal.template.html-->
   *     <header class="modal-header">
   *       <h2 class="modal-title">Select an Item</h2>
   *     </header>
   *     <!--Modal body's have padding by default, use the .modal-collapse class to remove padding when using menus, lists, tables, etc.-->
   *     <div class="modal-body modal-collapse">
   *       <ul class="menu"> ... </ul>
   *     </div>
   *     <footer class="modal-footer">
   *       <button class="modal-btn-text" ng-click="Main.closeModal()">Close</button>
   *     </footer>
   *   </html>
   * </example>
   *
   * @example <caption>Place all content into the modal-content element. Use the modal-header, modal-body, and modal-footer
   * elements to organize your content.</caption>
   * <example>
   *   <html>
   *     <blt-modal id="myModal" data-size="small">
   *       <div class="modal-content">
   *         <header class="modal-header">
   *           <h2 class="modal-title">My Modal</h2>
   *         </header>
   *
   *         <div class="modal-body">
   *           <p class="modal-text">Some simple content here, maybe asking for confirmation before taking an action.
   *         </div>
   *
   *         <footer class="modal-footer">
   *           <button class="modal-btn-text" ng-click="Main.closeModal()">Cancel</button>
   *           <!-- Use a 'submit' button for 'primary' actions. Use regular buttons for 'secondary' actions (e.g. Cancel or Close)-->
   *           <button class="modal-btn-text-submit" ng-click="Main.confirmModal()">Confirm</button>
   *         </footer>
   *       </div>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   * @example <caption>X-small and small are good for pop-up windows or confirmation dialogs. Using headers on these 
   * sized modals is not recommended as the title is often redundant to the modal content.</caption>
   * <example>
   *   <html>
   *     <blt-modal id="xsmallModal" data-size="x-small">
   *       <div class="modal-content">
   *         <div class="modal-body">
   *           <p class="modal-text">Are you sure you want to do what you are about to do? This action can not be undone.</p>
   *         </div>
   *
   *         <footer class="modal-footer">
   *           <button class="modal-btn-text" ng-click="Main.closeModal()">Close</button>
   *           <button class="modal-btn-text-submit" ng-click="Main.confirmAction()">Delete</button>
   *         </footer>
   *       </div>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   * @example <caption>Medium modals are a good size for menus and lists.</caption>
   * <example>
   *   <html>
   *     <blt-modal id="mediumModal" data-size="medium">
   *       <div class="modal-content">
   *         <header class="modal-header">
   *           <h2 class="modal-title">Select an Item</h2>
   *         </header>
   *
   *         <!-- Modal body's have padding by default, use the .collapse class to remove padding when using menus, lists, tables, etc. -->
   *         <div class="modal-body modal-collapse">
   *           <p class="modal-text">This is some modal text. It's often useful to use the .modal-divider element to section content in a modal.</p>
   *           <hr class="modal-divider"></hr>
   *           <ul class="menu"> ... </ul>
   *         </div>
   *
   *         <!-- Use the utility class .edge-top to add a border on the top of footers for larger modals -->
   *         <footer class="modal-footer edge-top">
   *           <button class="modal-btn-text" ng-click="Main.closeModal()">Close</button>
   *         </footer>
   *       </div>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   * @example <caption>Large modals are good for more complex content, such as tables. Full screen modals expand to the full size of
   * the window except for 1.5rem of padding around the edge to maintain the modal look.</caption>
   * <example>
   *   <html>
   *     <blt-modal id="tableModal" data-size="full-screen">
   *       <div class="modal-content">
   *         <header class="modal-header">
   *           <h2 class="modal-title">Data Table</h2>
   *         </header>
   *
   *         <div class="modal-body modal-collapse">
   *           <table class="table table-collapse"> ... </table>
   *         </div>
   *
   *         <!-- Use the utility class .edge-top to add a border on the top of footers for larger modals -->
   *        <footer class="modal-footer edge-top">
   *           <button class="modal-btn-text" ng-click="Main.closeModal()">Close</button>
   *         </footer>
   *       </div>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   * @example <caption>You can place tables in modals. Add the `.table-collapse` class to any `.table` when you do so the table fills
   * up available width of the modal.</caption>
   * <example>
   *   <html>
   *     <blt-modal id="tableModal" data-size="large">
   *       <div class="modal-content">
   *         <header class="modal-header">
   *           <h2 class="modal-title">My Modal</h2>
   *         </header>
   *
   *         <!-- By default, modal bodies have padding. Add the .modal-collapse class to remove padding when adding content such as tables or menus in the modal body. -->
   *         <div class="modal-body modal-collapse">
   *           <table class="modal-table table-collapsed"> ... </table>
   *         </div>
   *
   *         <footer class="modal-footer">
   *           <button class="modal-btn-text" ng-click="Main.closeModal()">Close</button>
   *           <!-- Use a 'submit' button for 'primary' actions (e.g. 'Save', 'Done'). Use regular buttons for 'secondary' actions (e.g. 'Cancel' or 'Close')-->
   *           <button class="modal-btn-text-submit" ng-click="Main.saveModal()">Save</button>
   *         </footer>
   *       </div>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   * @example <caption>You can also divide a modal's header into sections using basic grid classes. For instance, if you wanted to add
   * a button in the header for an action that might not make sense in the footer. This is usually applicable in large
   * and full-screen modals.</caption>
   * <example>
   *   <html>
   *     <header class="modal-header">
   *       <div class="grid-block grid-align-center">
   *         <h2 class="title">My Modal</h2>
   *       </div>
   *       <div class="grid-block grid-shrink">
   *         <button class="btn-link" ng-click="Main.editModal()">Edit</button>
   *       </div>
   *     </header>
   *   </html>
   * </example>
   *
   * @example <caption>A flipping modal has a front and back that allows you to have two sections in one modal, making a great application for forms.</caption>
   * <example>
   *   <html>
   *     <!-- NOTE: In order for the flip animation to work correctly, both sides of the modal will be locked to the same height. Do not override the height value in your css as the flip animation will no longer work properly. -->
   *     <blt-modal id="flipModal" data-flip="true" data-size="x-small">
   *       <div class="modal-content">
   *
   *         <!-- Front -->
   *         <div class="modal-front">
   *           <header class="modal-header">
   *             <h2 class="modal-title">Flip Modal Front</h2>
   *           </header>
   *           <section class="modal-body">
   *             <p class="modal-text">This is the front of a flippin' modal</p>
   *           </section>
   *           <footer class="modal-footer edge-top">
   *             <button class="modal-btn-text-submit" ng-click="Main.flipModal('flipModal')">Over</button>
   *           </footer>
   *         </div>
   *
   *         <!-- Back -->
   *         <div class="modal-back">
   *           <header class="modal-header">
   *             <h2 class="modal-title">Flip Modal Back</h2>
   *           </header>
   *           <section class="modal-body">
   *             <p class="modal-text">This is the back of a flippin' modal.</p>
   *           </section>
   *           <footer class="modal-footer edge-top">
   *             <button class="modal-btn-text" ng-click="Main.flipModal('flipModal')">Back</button>
   *             <button class="modal-btn-text-submit" blt-close="">Close</button>
   *           </footer>
   *         </div>
   *       </div>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   * @example <caption>To flip a modal, pass the id of the modal in an API call in your controller.</caption>
   * <example>
   *   <javascript>
   *   function flip(modalId){
   *     bltApi.publish(modalId, 'flip');
   *   }
   *   </javascript>
   * </example>
   *
   * @example <caption>Often you may want to have a small form in a modal. In order to tap into the default AngularJS
   * functionality of validating and submitting forms, you must use the form tag on the `.modal-content` element.</caption>
   * <example>
   *   <html>
   *     <blt-modal id="myFormModal">
   *       <form class="modal-content" ng-submit="Main.submitMyModal()" novalidate>
   *         <header class="modal-header">
   *           <h2 class="modal-title">My Form Modal</h2>
   *         </header>
   *         <div class="modal-body">
   *           <!-- Some Form Controls -->
   *         </div>
   *         <footer class="modal-footer">
   *           <!-- No ng-click needed as form will submit using expression of the ng-submit direction on button click or pressing 'Enter'-->
   *           <button class="modal-btn-text-submit">Submit</button>
   *         </footer>
   *       </form>
   *     </blt-modal>
   *   </html>
   * </example>
   *
   */
  function bltModal($timeout ) {
    var subscriptions = {};
    var directive = {
      restrict: 'EA',
      scope: {
        size: '@'
      },
      templateUrl: 'components/modal/modal.template.html',
      transclude: true,
      compile: compile
    };

    return directive;

    function subscribe( name, callback ) {
      // Save subscription if it doesn't already exist
      if ( !subscriptions[name] ) {
        subscriptions[name] = [];
      }
      // Add callback to subscription
      subscriptions[name].push(callback);
      console.debug('Subscribed: ', name);
    }

    /**
     * Compile function invoked by Angular during the compilation phase. The only thing we do here is register our
     * pre and post link functions.
     *
     * @returns {{pre: preLink, post: postLink}} Our pre and post link functions.
     */
    function compile( tElem, tAttrs ) {
      var type = 'modal';

      if ( tAttrs.flip ) {
        if ( tAttrs.size == 'full-screen' ) {
          console.error('You can not use the flip animation on full-screen modals.');
        } else {
          tElem.addClass('modal-flip');
        }
      }

      return {
        pre: preLink,
        post: postLink
      };

      /**
       * Pre Link function. We use this function to analyze directive attributes and apply them to our scope or
       * warn the user about mis-use if necessary.
       *
       * @param scope - Our isolate scope.
       * @param element - The outermost element of our directive.
       * @param attrs - The raw html attributes applied to our directive.
       */
      function preLink( scope, element, attrs ) {
        attrs.$set('blt-closable', type);

        var sizes = {
          'x-small': 'modal-x-small',
          small: 'modal-small',
          medium: 'modal-medium',
          large: 'modal-large',
          'full-screen': 'modal-full'
        };

        scope.classes = [];

        scope.size = scope.size || 'small';

        scope.classes.push(sizes[scope.size]);
      }

      /**
       * Post Link function. We now set our scope state to closed and not-flipped and subscribe to the Bolt API for
       * actions on our modal.
       *
       * @param scope - Our isolate scope.
       * @param element - The outermost element of our directive.
       * @param attrs - The raw html attributes applied to our directive.
       */
      function postLink( scope, element, attrs ) {
        scope.active = false;
        scope.flipping = false;
        scope.flipped = false;

        subscribe(attrs.id, function( msg ) {
          // Update scope  - wrap in $timeout to apply update to scope
          $timeout(function() {
            if ( msg == 'open' ) {
              if ( !scope.active ) {
                scope.active = true;
              }
            } else if ( msg == 'close' ) {
              if ( scope.active ) {
                scope.active = false;
                $timeout(function() {
                  scope.flip = false;
                }, 300);
              }
            } else if ( msg == 'toggle' ) {
              scope.active = !scope.active;
            } else if ( msg == 'flip' ) {
              scope.flipping = !scope.flipping;

              if ( scope.flipping ) {
                $timeout(function() {
                  scope.flipped = !scope.flipped;
                }, 900);
              } else {
                scope.flipped = false;
              }
            }
          });
        });
      }
    }
  }

  bltModal.$inject = ['$timeout'];
})();