/**
 * @ngdoc module
 * @name blt_tab
 * @description ngBoltJS Tab component.
 *
 * @since 2.0.0
 */

/**
 * @ngdoc directive
 * @name bltTab
 * @module blt_tab
 * @description The bltTab component is primarily used for navigation within the application and is displayed as a
 * horizontal row of tabs.
 *
 * Can be placed under the appbar for global navigation, at the top of a view for
 * navigating sections within a view, or at the bottom of the window for global navigation in mobile applications.
 * The presentation of the menu options can be customized through the class elements and modifiers supported by this
 * component.
 *
 * To use the bltTab component in your ngBoltJS application, include the relevant class elements inside an HTML
 * `<nav>` element in your application. Use [ng-click](https://docs.angularjs.org/api/ng/directive/ngClick) to toggle
 * tab actions.
 *
 * <div class="note-tip">**Tip:** Place a `.tabs` element inside a grid element with a class of `.grid-shrink` to display correctly in your
 * layout.</div>
 *
 * @usage <caption>Minimal Usage</caption>
 * ```html
 * <div class="grid-content grid-shrink">
 *   <nav class="tabs">
 *     <button class="tabs-btn" ng-click="Main.activeTab = 1;">Tab One</button>
 *     <button class="tabs-btn" ng-click="Main.activeTab = 2;">Tab Two</button>
 *     <button class="tabs-btn" ng-click="Main.activeTab = 3;">Tab Three</button>
 *     <button class="tabs-btn" ng-click="Main.activeTab = 4;">Tab Four</button>
 *     <button class="tabs-btn" ng-click="Main.activeTab = 5;">Tab Five</button>
 *   </nav>
 * </div>
 * ```
 *
 * @classname {element} tabs The main containing element. Should be placed on an HTML `<nav>` tag.
 * @classname {element} tabs-btn The actionable item of the bltTab component. Should be placed on an HTML `<button>` tag,
 * and must be the child of the `.tabs` element.
 * @classname {element} [tabs-icon] Optional icon to add as a child of the `.tabs-btn` element. Should be placed on
 * an HTML `<span>` tag and must be a direct child of a `.tabs-btn` element. ngBoltJS supports Font Awesome for icons.
 * **Must add the `.tabs–icons` modifier to the `.tabs` element when using icons.**
 * @classname {element} [tabs-label] Adds a label to a tab with an icon. Displays as small text under the
 * icon. Should limit to one in order to work and will truncate with an ellipsis if the text overflows. Should be placed on
 * an HTML `<span>` tag and be a direct child of a `.tabs-btn` element.
 * @classname {modifier} [tabs-active] Displays an active tab. Must add to the `.tabs-btn` element.
 * @classname {modifier} [tabs-icons] Adds to the `.tabs` element when you want to use icons in your `.tab-btn`
 * elements.
 *
 * @example 
 * <caption><h3>Triggering Actions</h3><p>Use ng-click to trigger actions when clicking a <code>.tabs-btn</code>. Additionally, use the
 * <a href="https://docs.angularjs.org/api/ng/directive/ngClass">ng-class</a> directive to add the
 * <code>.tabs-active</code> class to the respective <code>.tabs-btn</code> when that tab is currently selected.
 * </p></caption>
 * <example runnable="true">
 *   <css>
 *      .tabs-example {
 *          background-color: #f4f5f6;
 *          border: 1px solid #bdc3c7;
 *          border-top: 0;
 *          padding: 2rem;
 *      }
 *   </css>  
 *  <javascript>
 *      angular.module("bltDocs")
 *          .controller('TabExController', TabExController)
 *      ;
 *      function TabExController() {
 *          var ctrl = this;
 *          ctrl.activeTab = 1
 *          ctrl.selectTab = function() {
 *              (ctrl.activeTab == 2) ? ctrl.activeTab = 1 : ctrl.activeTab = 2;
 *          }
 *      }
 *   </javascript>
 *   <html>
 *   <div ng-controller= "TabExController as ctrl">
 *      <nav class="tabs">
 *          <!-- Simple Trigger -->
 *          <button class="tabs-btn" ng-class="{'tabs-active': ctrl.activeTab == 1}" ng-click="ctrl.activeTab = 1;">Tab One</button>
 *
 *          <!-- Advanced Trigger, Run function in your controller and toggle property after some work. -->
 *          <button class="tabs-btn" ng-class="{'tabs-active': ctrl.activeTab == 2}" ng-click="ctrl.selectTab()">Tab Two</button>
 *      </nav>
 *      <div class="tabs-example">
 *          <div class="ng-hide" ng-show="ctrl.activeTab == 1">
 *              <p>Simple Trigger Tab Open</p>
 *              <p>Tab One Content</p>
 *              <p>Click Tab Two to view Tab Two content.</p>
 *          </div>
 *          <div class="ng-hide" ng-show="ctrl.activeTab == 2">
 *              <p>Advanced Trigger Tab Open</p>
 *              <p>Tab Two Content</p>
 *              <p>Click Tab One or Tab Two tab to view Tab One content.</p>
 *          </div>
 *      </div>
 *   </div>
 *   </html>
 * </example>
 *
 * @example <caption>Icons</caption>
 * <example runnable="true">
 *   <css>
 *      .tabs-icon-example {
 *          background-color: #f4f5f6;
 *          border: 1px solid #bdc3c7;
 *          border-top: 0;
 *          padding: 2rem;
 *      }
 *   </css>  
 *  <javascript>
 *      angular.module("bltDocs")
 *          .controller('TabIconExController', TabIconExController)
 *      ;
 *      function TabIconExController() {
 *          var ctrl = this;
 *          ctrl.activeIconTab = 1;
 *      }
 *      angular.module("bltDocs")
 *          .controller("MenuExCtrl", function(){
 *              var ctrl = this;
 *      });
 *  </javascript> 
 *  <html>
 *  <div ng-controller="TabIconExController as ctrl">
 *    <nav class="tabs tabs-icons"> 
 *      <!-- Icon with label -->
 *      <button class="tabs-btn" ng-class="{'tabs-active': ctrl.activeIconTab == 1}" ng-click="ctrl.activeIconTab = 1;">
 *        <span class="tabs-icon fa fa-home"></span>
 *        <span class="tabs-label">Home</span>
 *      </button>
 *
 *      <!-- Icon only -->
 *      <button class="tabs-btn" ng-class="{'tabs-active': ctrl.activeIconTab == 2}" ng-click="ctrl.activeIconTab = 2;">
 *        <span class="tabs-icon fa fa-folder"></span>
 *      </button>
 *    </nav>
 *    <div class="tabs-icon-example">
 *      <div class="ng-hide" ng-show="ctrl.activeIconTab == 1">
 *       <p>This is the Homepage</p>
 *       <p>Click on the Folders tab to view folders.</p>
 *       </div>
 *      <div class="ng-hide" ng-show="ctrl.activeIconTab == 2">
 *       <p>Folders</p>
 *      <ul class="menu" ng-controller="MenuExCtrl as ctrl">
 *          <li class="menu-item" ng-class="{'menu-active': ctrl.currentItem == 'item1'}">
 *              <button class="menu-link" ng-click="ctrl.currentItem = 'item1';"><span class="fa fa-folder"></span> Folder 1</button>
 *          </li>
 *          <li class="menu-item" ng-class="{'menu-active': ctrl.currentItem == 'item2'}">
 *              <button class="menu-link" ng-click="ctrl.currentItem = 'item2';"><span class="fa fa-folder"></span> Folder 2</button>
 *          </li>
 *          <li class="menu-item" ng-class="{'menu-active': ctrl.currentItem == 'item3'}">
 *              <button class="menu-link" ng-click="ctrl.currentItem = 'item3';"><span class="fa fa-folder"></span> Folder 3</button>
 *          </li>
 *          <li class="menu-item">
 *              <button class="menu-link" ng-click="ctrl.currentItem = 'item4';"><span class="fa fa-folder"></span> Folder 4</button>
 *          </li>
 *      </ul>
 *      </div>
 *    </div>
 *   </div>
 *   </html>
 * </example>
 *
 */