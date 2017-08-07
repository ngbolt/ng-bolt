(function() {
  'use strict';

  /**
   * @ngdoc module
   * @name blt_panel
   * @description ngBoltJS Panel component.
   * @since 1.0.0
   */
  angular.module('blt_panel', ['blt_core'])
    .directive('bltPanel', bltPanel);


  /**
   * @ngdoc directive
   * @name bltPanel
   * @module blt_panel
   * @restrict EA
   * @since 1.0.0
   *
   * @description
   * The bltPanel component is used for displaying menus, forms, small tables, and related content.
   * Panels consist of two auto-generated elements: `.panel-overlay` and `.panel`. The `.panel-overlay` fades
   * in and covers and darkens the application window when the panel is open. The `.panel` slides in from the
   * right, top, left, or bottom. The presentation of the panel can be customized through the attributes,
   * class elements, and modifiers supported on the component.
   *
   * <div class="note-tip">
   * **Best Practice** Keep the HTML template of your panel in an HTML partial file and load into the
   * `.panel-content` element using [ng-include](https://docs.angularjs.org/api/ng/directive/ngInclude).
   * </div>
   *
   * You may optionally assign a controller for your panel on the `.panel-content` element as well.
   *
   * <div class="note-tip">
   * **Best Practice** Place your panel as a direct child of the `main.template.html` and give the panel its own controller.
   * </div>
   *
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   *
   * @param {string} id Required in order for you to open and close the panel using the {@link BltApi} pub/sub methods.
   * @param {string} [data-position=right] You can set the position of your panel. Valid values are: `right`, `left`, `top`, and `bottom`.
   * @param {string} [data-fixed] If the panel is nested inside a {@link bltView}, set to true to expand panel to the full height (or width if position is top or bottom) of the application window. The panel expands to the constraints of its parent.
   *
   * @classname {element} panel-content The element that contains your code for the panel. Add this inside the `blt-panel` component opening tag and closing tags. Use [ng-include](https://docs.angularjs.org/api/ng/directive/ngInclude) to load the rest of your panel content from an HTML partial. Use on an HTML `<div>`, `<section>`, or `<form>` tag.
   *
   * @classname {element} panel-body The main content of the panel. The `.panel-body` does not have padding by default. To add padding, use the `.panel-wrapper` modifier. Should be used on the HTML `<div>` or `<section>` tags.
   *
   * @classname {modifier} [panel-wrapper] The `.panel-body` has no padding by default as most components to be placed in a panel (such as forms and menus) require no padding. To add padding around text elements, add the `.panel-wrapper` class to the text element or on a containing `<div>`.
   *
   * @classname {element} [panel-header] The header of the panel containing the `.panel-title` and optional buttons or icons. Should be used on an HTML `<header>` tag.
   *
   * @classname {element} [panel-footer] Contains action buttons for the panel. Should be used on an HTML `<footer>` tag. By default, has no top-border. Menus, lists, forms, or tables used in a panel often have a border and another border on the footer would be redundant. If a border is needed, use the `.edge-top` utility class.
   *
   * @classname {element} [panel-title] The title of the panel. Must be a child of the `.panel-header` element and should be used on an HTML `<h2>` tag.
   *
   * @classname {element} [panel-heading] A heading element for sectioning content in the `.panel-body`. Should be used on an HTML `<h3>` tag. Add a `.panel-wrapper` class on the element to add padding around the heading unless the `.panel-body` already has `.panel-wrapper` on it.
   *
   * @classname {element} [panel-text] Default text for the panel. Use this on any text content inside the `.panel-body`. Should be used on the HTML `<p>` tag. If there is no `.panel-wrapper` on the `.panel-body`, use the `.panel-wrapper` class on the text to add padding.
   *
   * @classname {element} [panel-divider] A thick horizontal border for sectioning `.panel-body` content. Only use if not using a `.panel-heading`. Should be used on an HTML `<hr>` tag.
   *
   * @classname {element} [panel-btn-text] Default text button for panel secondary actions. Should be used on the HTML `<button>` tag. For primary actions use `.panel-btn-text-submit`.
   *
   * @classname {element} [panel-btn-icon] Icon button for panels, most often used in the `.panel-body`. Should be used on the HTML `<button>` tag.
   *
   * @classname {element} [panel-btn-solid] Default solid button for panel secondary actions. Should only be used in the `.panel-body`. Should be used on the HTML `<button>` tag. For primary actions, use `.panel-btn-solid-submit`.
   *
   * @example <caption>To use the Panel component in your ngBoltJS application, include a
   * `blt-panel` element in an HTML partial of your application. Most of the time, you will want to keep the markup
   * of your `.panel-content` in a separate file and load it as a partial. This is easily done using
   * [ng-include](https://docs.angularjs.org/api/ng/directive/ngInclude) on the `.panel-content element`.</caption>
   * <example>
   *   <html>
   *     <blt-panel id="myPanel" data-position="right">
   *       <div class="panel-content"
   *            ng-include="'partials/module/my-panel.template.html'"
   *            ng-controller="PanelController as ctrl"></div>
   *     </blt-panel>
   *   </html>
   * </example>
   *
   * @example <caption>The contents of your panel template: </caption>
   * <example>
   *   <html>
   *     <header class="panel-header">
   *         <h2 class="panel-title">Categories</h2>
   *     </header>
   *     <div class="panel-body">
   *         <ul class="menu"> ... </ul>
   *     </div>
   *     <footer class="panel-footer">
   *         <button class="panel-btn-text" blt-close="">Cancel</button>
   *         <button class="panel-btn-text-submit" ng-click="Main.saveCategory()">Save</button>
   *     <footer>
   *   </html>
   * </example>
   *
   * @example <caption>ngBoltJS has a custom directive for easily opening and closing panels and other components.
   * Simply pass the id of the panel you'd like to open or close.</caption>
   * <example>
   *   <html>
   *     <button blt-open="myPanel">Open</button>
   *     <button blt-close="myPanel">Close</button>
   *
   *     // If the close button is inside the modal component, you do not have to pass the id of the modal.
   *     <footer class="panel-footer">
   *       <button blt-close="">Close</button>
   *     </footer>
   *   </html>
   * </example>
   *
   * @example <caption>You may need to do some other work/setup in your code before opening the panel.
   * In that case, you can use the pub/sub methods of the {@link BltApi} to open and close the panel
   * instead of the `blt-open` and `blt-close` directives. When closing a panel, include any functions to reset data in
   * a [$timeout](https://docs.angularjs.org/api/ng/service/$timeout) to run after the closing animation of the panel
   * and to avoid resetting data and 'flashing' the panel content as it animates out.</caption>
   * <example>
   *   <javascript>
   *     angular.module('myApp')
   *        .controller('PanelController', PanelController);
   *
   *     // NOTE: You must inject the ngBoltJS API service into the controller to open and close panels via the API.
   *     PanelController.$inject = ['BltApi', '$timeout'];
   *
   *     function PanelController(bltApi, $timeout) {
   *       var ctrl = this;
   *       ctrl.panel = { title: 'My Panel', activeMenu: 1 };
   *       ctrl.openMyPanel = function(){
   *         // Do some work here first...
   *
   *         // When ready, publish the id of the panel you wish to open
   *         bltApi.publish('myPanel', 'open');
   *       }
   *
   *       ctrl.closeMyPanel = function(){
   *         // publish the id of the panel you wish to close
   *         bltApi.publish('myPanel', 'close');
   *
   *         // reset panel data after the closing animation
   *         $timeout(function(){
   *             ctrl.panel.title = '';
   *             ctrl.panel.activeMenu = -1;
   *         }, 350);
   *       }
   *     }
   *   </javascript>
   * </example>
   *
   * @example <caption>Common Use Cases</caption>
   * <example runnable="true">
   *   <html>
   *     <blt-panel id="menu" position="right">
   *         <div class="panel-content">
   *             <header class="panel-header">
   *                 <h2 class="panel-title">Table of Contents</h2>
   *             </header>
   *             <div class="panel-body">
   *                 <p class="panel-text panel-wrapper">Some instructions.</p>
   *
   *                 <!-- Use a divider to separate blocks of content -->
   *                 <hr class="panel-divider"></hr>
   *
   *                 <ul class="menu"> ... </ul>
   *
   *                 <!-- You can also use headers to divide sections of content -->
   *                 <h3 class="panel-heading panel-wrapper">Chapter 1</h3>
   *
   *                 <!-- For content such as menus do not use a wrapper -->
   *                 <ul class="menu"> ... </ul>
   *             </div>
   *             <footer class="panel-footer">
   *                 <button class="panel-btn-text" blt-close="">Close</button>
   *             </footer>
   *         </div>
   *     </blt-panel>
   *     <button blt-open="menu" class="panel-btn-text">Open</button>
   *   </html>
   * </example>
   *
   * @example <caption>MANUAL SIZING: To customize the width (vertical panels)
   * or height (horizontal panels), change the CSS width (or height) property of the
   * panel component by using its id in your `app.scss` file.</caption>
   * <example>
   *   <css>
   *     // Vertical Panels
   *     #myRightPanel{
   *         .panel{
   *             width: 12.5rem; //200px
   *         }
   *     }
   *
   *     // Horizontal Panels
   *     #myTopPanel{
   *         .panel{
   *             min-height: 10rem; //160px
   *         }
   *     }
   *   </css>
   * </example>
   *
   * @example <caption>FORMS AND PANELS: You may want to have a small form in a panel.
   * In order to utilize default AngularJS functionality of validating and submitting forms,
   * you must use the form tag on the `.panel-content` element.</caption>
   * <example>
   *   <html>
   *     <blt-panel id="myFormPanel">
   *         <form class="panel-content" ng-submit="ctrl.submitMyForm()" novalidate>
   *             <header class="panel-header">
   *                 <h2 class="panel-title">Preferences</h2>
   *             </header>
   *             <div class="panel-body">
   *                 <!-- Some Form Controls -->
   *             </div>
   *             <footer class="panel-footer">
   *                 <!-- No ng-click needed as form will submit using expression of the ng-submit directive on button click or pressing 'Enter' -->
   *                 <button class="panel-btn-text-submit">Submit</button>
   *             <footer>
   *         </form>
   *     </blt-panel>
   * </html>
   * </example>
   *
   */
  function bltPanel( api, $timeout ) {
    var directive = {
      restrict: 'EA',
      scope: {
        position: '@',
        pendingMessage: '@'
      },
      templateUrl: 'components/panel/panel.template.html',
      transclude: true,
      compile: compile
    };

    return directive;

    /**
     * Compile function. Invoked by Angular. We use this function to register our pre and post link functions.
     * @returns {{pre: preLink, post: postLink}}
     */
    function compile() {
      var type = 'panel';

      return {
        pre: preLink,
        post: postLink
      };

      /**
       * Pre Link. Invoked by Angular. We use this function to set up the position and initial state of our scope.
       * @param scope - Our isolate scope.
       * @param element - The outermost element of our directive.
       * @param attrs - Attributes attached to our directive.
       */
      function preLink( scope, element, attrs ) {
        attrs.$set('blt-closable', type);

        scope.position = (scope.position) ? 'panel-' + scope.position : 'panel-right';
        scope.positionClass = scope.position;

        if(!attrs.id) {
          api.error('Missing id attribute for blt-panel. See: '
           + window.location + '/blt.panel.bltPanel.html');
        }

      }

      /**
       * Post Link. Invoked by Angular. We use this function to register with the API publish pipeline for any
       * messages that are sent to our ID.
       *
       * @param scope - Our isolate scope.
       * @param element - The outermost element of our directive.
       * @param attrs - Attributes attached to our directive.
       */
      function postLink( scope, element, attrs ) {
        scope.active = false;

        api.subscribe(attrs.id, function( msg ) {
          // Update scope  - wrap in $timeout to apply update to scope
          $timeout(function() {
            if ( msg == 'open' ) {
              if ( !scope.active ) {
                scope.active = true;
                element.addClass('panel-active');
              }
            } else if ( msg == 'close' ) {
              if ( scope.active ) {
                scope.active = false;
                element.removeClass('panel-active');
              }
            } else if ( msg == 'toggle' ) {
              if ( scope.active ) {
                element.removeClass('panel-active');
              } else {
                element.addClass('panel-active');
              }

              scope.active = !scope.active;
            } else if ( msg == 'pending' ) {
              scope.pending = !scope.pending;
            }
          });
        });
      }
    }
  }

  bltPanel.$inject = ['BltApi', '$timeout'];
})();