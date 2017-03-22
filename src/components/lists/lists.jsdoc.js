/**
 * @ngdoc module
 * @name blt_list
 * @description ngBoltJS List component.
 * @since 1.0.0
 */

/**
 * @ngdoc directive
 * @name bltList
 * @module blt_list
 * @since 1.0.0
 *
 * @description
 * The bltList component is used to display a set of text data in a vertical arrangement with the option
 * of performing a few actions on the list item.
 *
 * * If more than two lines of text are required to display, or images need to be displayed, use the {@link bltCard}
 * component instead.
 * * If multiple columns need to be displayed, use the {@link bltTable} component.
 *
 * The presentation of the list options can be customized by using the class elements and modifiers supported by the
 * component. To use the bltList component in your ngBoltJS application, include the relevant class elements inside
 * an HTML `<ul>` element with a class of "list".
 *
 * <div class="note-tip">
 * **Best Practice** Use [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) to iterate over
 * data-sets.
 * </div>
 *
 * @classname {element} list The main containing block. Should be placed on an HTML `<ul>` tag.
 *
 * @classname {element} list-row A wrapper element for a list item. Contains the `.list-tile` element and, optionally, a `.list-inner` if the list is an accordion list. Must be a direct child of the `.list` element. Should be placed on an HTML `<li>` tag. Can be modified by the `.list-pending` modifier.
 *
 * @classname {element} list-tile A wrapper element for the content and actions of a list item. Must be a direct child of the `.list-row` element and should be used on a HTML `<div>` tag.
 *
 * @classname {element} list-content The text content of a list item that expands to fill the available width of its parent and stacks block content vertically. Must be a direct child of the `.list-tile` element and should be used on an HTML `<div>` tag.
 *
 * @classname {element} [list-title] The title of a list item. Use an ng-click directive to select or open the list item by clicking the title. Should be used on an HTML `<h2>` tag.
 *
 * @classname {element} [list-text] The default text of a list item. Should be used on an HTML `<p>` tag.
 *
 * @classname {element} [list-caption] Small text on a list item. Can be used on an HTML `<p>` tag as its own line or on a `<span>` tag inside a `.list-text` element.
 *
 * @classname {element} [list-tag] Use to add a simple tag to the list item text. Should be used on an HTML `<span>` tag.
 *
 * @classname {element} [list-tag-solid] Use to add a tag with background color to the list item text. Should be used on an HTML `<span>` tag.
 *
 * @classname {element} [list-actions] A container for list actions that displays actions in a row and will shrink to the width of its content. You can add as many actions as you like, but on smaller screens you may want to use the `*-vertical` modifier and arrange the actions vertically. Must be a direct child of the `.list-tile` and should be used on an HTML `<div>` tag.
 *
 * @classname {element} [list-actions-vertical] The same as a `.list-actions` element except that actions are stacked vertically.
 *
 * @classname {element} [list-btn-icon] An icon button for triggering an action on data bound to a list item. Should be used on an HTML `<button>` tag and must be a child of the `.list-actions` element.
 *
 * @classname {element} [list-btn-text] A text button for triggering a list action. Should be used on an HTML `<button>` tag and must be a child of the `.list-actions` element.
 *
 * @classname {element} [list-pending-msg] A pending message with loading spinner that takes the full width of the `.list-row`. Hidden by default, it is made visible when `.list-pending` is active. Must be a direct child of a `.list-row` element and a sibling of a `.list-tile` element. Should be used on a HTML `<p>` tag.
 *
 * @classname {element} [list-toggle] Use on the outer list item to toggle an inner list item on an accordion list. Use in combination with a `.list-title` element and optionally include a `.fa-caret-down` as a child (see example).
 *
 * @classname {element} [list-inner] A sub-list in an accordion list. Must be a direct child of a `.list-row` element. Can be used on an HTML `<ul>` or `<div>` tag.
 *
 * @classname {modifier} [list-collapse] Remove padding around and between list items. This is a best practice when the list will be displayed in a modal or panel or on smaller screens. Must be used on the `.list` element.
 *
 * @classname {modifier} [list-pending] Hides the list item content and displays the list pending message instead. Must be used on the `.list-row` element and requires the `.list-pending-msg` as a child. Use ng-class to dynamically set the class (see example).
 *
 * @classname {modifier} [list-link] Use on a span of list item text to indicate a clickable item. Should use on an HTML `<span>` tag and should be the child of the `.list-text` element.
 *
 * @classname {modifier} [list-open] Shows the inner list on an accordion list. Must be used on the `.list` element and requires the `.list-inner` and `.list-toggle` elements as children. Use ng-class to dynamically set the class (see example).
 *
 * @classname {modifier} [list-actions-secondary] Add to a `.list-actions` element to hide the actions off screen and slide in when triggered by another action. This feature is useful on small screens. Requires the use of `list-actions-secondary-show` to activate (see example).
 *
 * @classname {modifier} [list-actions-secondary-`bp`-`dir`] `list-actions-secondary` with media query support for various screen sizes (see example) where `bp` is the breakpoint(sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [list-actions-secondary-show] Toggle `list-actions-secondary`.
 *
 * @example <caption>Basic Usage</caption>
 * <example runnable="true">
 *   <javascript>
 *     angular.module("bltDocs")
 *       .controller("ListExCtrl", function(){
 *         var ctrl = this;
 *         ctrl.listItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
 *       });
 *   </javascript>
 *   <html>
 *     <ul class="list" ng-controller="ListExCtrl as ctrl">
 *       <li class="list-row" ng-repeat="item in ctrl.listItems">
 *         <div class="list-tile">
 *           <div class="list-content">
 *             <h2 class="list-title" ng-click="ctrl.selectItem(item)">{{item}} Title</h2>
 *             <p class="list-text">{{item}} Text</p>
 *           </div>
 *           <div class="list-actions">
 *             <button class="list-btn-icon" ng-click="ctrl.approveItem(item)"><span class="fa fa-check"></span></button>
 *             <button class="list-btn-icon" ng-click="ctrl.deleteItem(item)"><span class="fa fa-times"></span></button>
 *           </div>
 *         </div>
 *       </li>
 *     </ul>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Common Use Cases</h3>
 * <p>Title, text, caption, and two actions:</p>
 * </caption>
 * <example runnable="true">
 *    <javascript>
 *     angular.module("bltDocs")
 *       .controller("ListExCtrl2a", function(){
 *         var ctrl = this; 
 *         ctrl.listItems = ["Item 1", "Item 2", "Item 3"]; 
 *       });
 *    </javascript>
 *   <html>
 *     <ul class="list" ng-controller="ListExCtrl2a as ctrl">
 *       <li class="list-row" ng-repeat="item in ctrl.listItems">
 *         <div class="list-tile">
 *           <div class="list-content">
 *             <h2 class="list-title">List {{item}}</h2>
 *             <p class="list-text"><span class="list-caption">timestamp</span> List item description text</p>
 *           </div>
 *           <div class="list-actions">
 *             <button class="list-btn-icon" ng-click="ctrl.approveItem(item.id)"><span class="fa fa-check"></span></button>
 *             <button class="list-btn-icon" ng-click="ctrl.deleteItem(item.id)"><span class="fa fa-times"></span></button>
 *           </div>
 *         </div>
 *       </li>
 *      </ul>
 *    </html>
 * </example>
 *
 * @example <caption>Vertical actions and clickable title:</caption>
 * <example runnable="true">
 *   <javascript>
 *     angular.module("bltDocs")
 *       .controller("ListExCtrl2b", function(){
 *         var ctrl = this; 
 *         ctrl.listItems = ["Item 1", "Item 2", "Item 3"];
 *       });
 *    </javascript>
 *    <html>
 *     <ul class="list" ng-controller="ListExCtrl2b as ctrl">
 *       <li class="list-row" ng-repeat="item in ctrl.listItems">
 *         <div class="list-tile">
 *           <div class="list-content">
 *             <h2 class="list-title" ng-click="ctrl.openItem(item.id)">List {{item}}</h2>
 *             <p class="list-text">Longer item description text that may wrap and take up two lines, making the vertical actions a better choice.</p>
 *           </div>
 *           <div class="list-actions-vertical">
 *             <button class="list-btn-icon" ng-click="ctrl.approveItem(item.id)"><span class="fa fa-check"></span></button>
 *             <button class="list-btn-icon" ng-click="ctrl.deleteItem(item.id)"><span class="fa fa-times"></span></button>
 *           </div>
 *         </div>
 *       </li>
 *     </ul>
 *   </html>
 * </example>
 *
 * @example <caption>Todo list toggle with a link in the text and tags:</caption>
 *   <example runnable="true">
 *     <javascript>
 *         angular.module("bltDocs")
 *           .controller("ListExCtrl2c", function(){
 *             var ctrl = this; 
 *             ctrl.listItems = [{id: "Item 1", done: false}, {id: "Item 2", done: false}, {id: "Item 3", done: false}];
 *           });
 *      </javascript>
 *      <html>
 *        <ul class="list" ng-controller="ListExCtrl2c as ctrl">
 *       <li class="list-row" ng-repeat="item in ctrl.listItems">
 *         <div class="list-tile">
 *           <div class="list-actions-vertical">
 *             <button class="list-btn-icon" ng-click="item.done = true;">
 *               <span class="ng-class: item.done ? 'fa fa-circle' : 'fa fa-circle-o';"></span>
 *             </button>
 *           </div>
 *           <div class="list-content">
 *             <p class="list-text">This list item contains just a small blurb of text with a contextual <a class="list-link" ng-click="ctrl.openLink()">link</a> to open a small modal window.</p>
 *             <span class="list-tag">Project1 </span> <span class="list-tag">User Name</span>
 *           </div>
 *         </div>
 *       </li>
 *     </ul>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Collapsed</h3><p>By default, lists are displayed as horizontal bars with padding and margin separating each bar. As a best
 * practice, when a list is contained within a modal or panel, or a smaller screen, collapse the bars and separate
 * list items with borders to save screen real-estate.</p></caption>
 * <example runnable="true">
 *    <javascript>
 *     angular.module("bltDocs")
 *       .controller("ListExCtrl3", function(){
 *         var ctrl = this; 
 *         ctrl.listItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
 *       });
 *    </javascript>
 *   <html>
 *     <ul class="list list-collapse" ng-controller="ListExCtrl3 as ctrl">
 *       <li class="list-row" ng-repeat="item in ctrl.listItems">{{item}}</li>
 *     </ul>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Pending Status</h3><p>Often when triggering a list item action a background process needs to complete before
 * allowing the user to continue. When this happens use the `.list-pending` modifier to give the user feedback that their requested
 * action is processing. Activate the pending class using an expression on the
 * <a href="https://docs.angularjs.org/api/ng/directive/ngClass">ng-class</a> directive.</p></caption>
 * <example runnable="true">
 *    <javascript>
 *     angular.module("bltDocs")
 *       .controller("ListExCtrl4", function(){
 *         var ctrl = this; 
 *         ctrl.listItems = [{id: "Item 1", pending: false}, {id: "Item 2", pending: true}, 
 *           {id: "Item 3", pending: true}];
 *       });
 *    </javascript>
 *   <html>
 *     <ul class="list" ng-controller="ListExCtrl4 as ctrl">
 *       <li class="list-row" ng-repeat="item in ctrl.listItems" ng-class="{'list-pending': item.pending}">
 *         <!-- List Content -->
 *         <div class="list-tile">
 *           <div class="list-content">
 *             <h2 class="list-title">{{item.id}}</h2>
 *           </div>
 *           <div class="list-actions">
 *             <button class="list-btn-icon" ng-click="ctrl.approveItem(item.id)"><span class="fa fa-check"></span></button>
 *           </div>
 *         </div>
 *
 *         <!-- Pending message -->
 *         <p class="list-pending-msg">Loading Data... <span class="fa fa-spinner fa-pulse"></span></p>
 *       </li>
 *     </ul>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Accordion Lists</h3><p>List items can contain sub-lists that are collapsible, creating an accordion list.
 * To control the accordion, keep track of the <code>$index</code> of the list item and toggle the <code>.list-open</code> class on the
 * respective <code>.list-inner</code>. Opening one list item will close any other open list item.</p></caption>
 * <example runnable="true">
 * <javascript>
 *     angular.module("bltDocs")
 *       .controller("ListExCtrl5", function(){
 *         var ctrl = this; 
 *         ctrl.listItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
 *         ctrl.subItems = ["Sub Item 1", "Sub Item 2", "Sub Item 3"];
 *       });
 * </javascript>
 * <html>
 * <ul class="list" ng-controller="ListExCtrl5 as ctrl">
 *  <li class="list-row" ng-class="{'list-open': ctrl.activeItem == $index}" ng-repeat="item in ctrl.listItems">
 *      <!-- Accordion List Toggle -->
 *      <div class="list-tile">
 *          <div class="list-content">
 *              <button class="list-title list-toggle" ng-click="ctrl.activeItem = $index;">
 *                  <span class="fa fa-caret-down"></span>{{item}}
 *              </button>
 *          </div>
 *          <!-- Actions are optional on accordion headers and could represent bulk actions for the items sublist of items.-->
 *          <div class="list-actions">
 *              <button class="list-btn-icon" ng-click="ctrl.deleteItem(item.id)">
 *                  <span class="fa fa-trash"></span>
 *              </button>
 *          </div>
 *      </div>
 *
 *      <!-- Accordion Content -->
 *      <ul class="list-inner">
 *          <li class="list-row" ng-repeat="subItem in ctrl.subItems">
 *              <div class="list-tile">
 *                  <div class="list-content">
 *                      <h2 class="list-title">{{subItem}}</h2>
 *                  </div>
 *                  <div class="list-actions">
 *                      <button class="list-btn-icon" ng-click="ctrl.approveItem(subItem.id)">
 *                          <span class="fa fa-check"></span>
 *                      </button>
 *                  </div>
 *              </div>
 *          </li>
 *      </ul>
 *  </li>
 * </ul>
 * </html>
 * </example>
 *
 * @example <caption><h3>Secondary Actions</h3><p>You can hide multiple list actions with another trigger using
 * the <code>list-actions-secondary</code> class</p></caption>
 * <example runnable="true">
 *    <javascript>
 *     angular.module("bltDocs")
 *       .controller("ListExCtrl6", function(){
 *         var ctrl = this; 
 *         ctrl.listItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
 *       });
 *    </javascript>
 *   <html>
 *     <ul class="list" ng-controller="ListExCtrl6 as ctrl">
 *       <li class="list-row" ng-repeat="item in ctrl.listItems">
 *         <div class="list-tile">
 *             <div class="list-actions">
 *               <button class="list-btn-icon" ng-click="ctrl.showListActions = true;">
 *                   <span class="fa fa-ellipsis-v"></span>
 *                  </button>
 *                 </div>
 *                 <div class="list-content">
 *                    <h2 class="list-title">{{item}}</h2>
 *           </div>
 *                  <!-- These actions will slide in from the right over the original list-actions -->
 *                   <div class="list-actions list-actions-secondary" ng-class="{'list-actions-secondary-show': ctrl.showListActions}">
 *                   <button class="list-btn-icon" ng-click="ctrl.showListActions = false;">
 *                    <span class="fa fa-check"></span>
 *                     </button>
 *                    <button class="list-btn-icon" ng-click="ctrl.showListActions = false;">
 *                      <span class="fa fa-times"></span>
 *                    </button>
 *                  </div>
 *            </div>
 *          </li>
 *       </ul>
 *   </html>
 * </example>
 *
 * @example <caption>Secondary actions with media queries. See the {@link breakpoints Media Queries Guide} for more information using media queries.</caption>
 * <example runnable="true">
 * <javascript>
 *    angular.module("bltDocs")
 *      .controller("ListExCtrl7", function(){
 *        var ctrl = this; 
 *        ctrl.listItems = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
 *      });
 * </javascript>
 *   <html>
 *     <ul class="list" ng-controller="ListExCtrl7 as ctrl">
 *       <li class="list-row" ng-repeat="item in ctrl.listItems">
 *         <div class="list-tile">
 *             <!-- These actions will hide only on small screens. -->
 *              <div class="list-actions hide-sm-only">
 *                <button class="list-btn-icon" ng-click="ctrl.showListActions = true;">
 *                    <span class="fa fa-ellipsis-v"></span>
 *                   </button>
 *                  </div>
 *                  <div class="list-content">
 *                   <h2 class="list-title">{{item}}</h2>
 *             </div>
 *                <!-- These actions will slide in from the right over the original list-actions only on small screens (less than 640px wide).
 *                 On other screens they will be visible by default -->
 *                  <div class="list-actions list-actions-secondary" ng-class="{'list-actions-secondary-show': ctrl.showListActions}">
 *                  <button class="list-btn-icon" ng-click="ctrl.showListActions = false;">
 *                   <span class="fa fa-check"></span>
 *                    </button>
 *                    <button class="list-btn-icon" ng-click="ctrl.showListActions = false;">
 *                    <span class="fa fa-times"></span>
 *                    </button>
 *                  </div>
 *              </div>
 *           </li>
 *       </ul>
 *   </html>
 * </example>
 */
