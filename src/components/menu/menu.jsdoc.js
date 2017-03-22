/**
 * @ngdoc module
 * @name blt_menu
 * @description ngBoltJS Menu component.
 * @since 1.0.0
 */

/**
 * @ngdoc directive
 * @name bltMenu
 * @module blt_menu
 * @since 1.0.0
 *
 * @description
 * The bltMenu component is primarily used for navigation within the application or for opening and closing
 * different sections of the application. It is displayed as a vertical list of buttons and can contain sub-menus. The
 * presentation of the menu options can be customized through the class elements and modifiers supported by this
 * component.
 *
 * To use the bltMenu component in your ngBoltJS application, include the relevant class elements inside a HTML
 * `<ul>` element in your application and use the
 * [ng-click directive](https://docs.angularjs.org/api/ng/directive/ngClick) to complete some action.
 *
 * @usage <caption>Minimal Usage</caption>
 * ```html
 * <ul class="menu">
 *  <li class="menu-item">
 *      <button class="menu-link" ng-click="Main.openItem('item1')">Item 1</button>
 *  </li>
 *  <li class="menu-item">
 *      <button class="menu-link" ng-click="Main.openItem('item2')">Item 2</button>
 *  </li>
 *  <li class="menu-item">
 *      <button class="menu-link" ng-click="Main.openItem('item3')">Item 3</button>
 *  </li>
 * </ul>
 * ```
 *
 * @classname {element} menu The main containing element. Should be placed on the HTML `<ul>` tag. Can be modified with: `.menu–thin`, `.menu–wide`, `.menu–condensed`, `.menu–borders`, `.menu–icons`, `.menu–accordion`, `.menu–floating`, `.menu-hide-active`.
 *
 * @classname {element} menu-item The menu list item. Should be used on the HTML `<li>` tag. Contains the `.menu-link` element and, optionally, another menu in an accordion menu. Can be modified with `.menu-active`.
 *
 * @classname {element} menu-link The actionable content of a `.menu-item` content. Should be used on the HTML `<button>` tag and must be the child of a `.menu-item` element. Use an Angular expression on the [ng-click directive](https://docs.angularjs.org/api/ng/directive/ngClick) to trigger the action.
 *
 * @classname {element} [menu-icon] An optional icon to add to the text of a `.menu-link` element. Must be the child of a `.menu-link` and should be used on the HTML `<span>` tag.
 *
 * @classname {element} [menu-text] The text of the `.menu-link` element. Is only required when a `.menu-icon` is also present. Must be a child of a `.menu-link` element and should be used on a HTML `<span>` tag.
 *
 * @classname {element} [menu-divider] A horizontal border useful for dividing groups of `.menu-items`. Should be used on an HTML `<hr>` tag.
 *
 * @classname {element} [menu-container] A required wrapper for floating menus so the menu is positioned correctly. Should contain a button element for toggling the menu and a floating menu.
 *
 * @classname {modifier} [menu-thin] Narrows the default width of a menu component to 8rem (128px). Add to the `.menu` element.
 *
 * @classname {modifier} [menu-wide] Widens the default width of a menu component to 15rem (240px). Add to the `.menu` element.
 *
 * @classname {modifier} [menu-condensed] Lessens the padding of `.menu-item` elements to condense the height of the menu. Add to the `.menu` element.
 *
 * @classname {modifier} [menu-condensed-'bp'-'dir'] `menu-condensed` with media query support for various screen sizes (see example) where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [menu-borders] Adds a border to each `.menu-item` element and thickens the width of a `.menu-divider` border. Add to the `.menu` element.
 *
 * @classname {modifier} [menu-borders-'bp'-'dir'] `menu-borders` with media query support for various screen sizes (see example) where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [menu-icons] Narrows the width of a menu to 3rem (48px). Requires that all `.menu-link` elements use icons only and no text. Add to the `.menu` element.
 *
 * @classname {modifier} [menu-icons-'bp'-'dir'] `menu-icons` with media query support for various screen sizes (see example) where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [menu-accordion] Creates a collapsing set of menus. Sub menus have a darker background to set them apart from their parent `.menu-items`. Each `.menu-item` should contain another menu. Use the [ng-show](https://docs.angularjs.org/api/ng/directive/ngShow) and [ng-hide](https://docs.angularjs.org/api/ng/directive/ngHide) directives to show/hide the sub menus. Add to the `.menu` element.
 *
 * @classname {modifier} [menu-accordion-'bp'-'dir'] `menu-accordion` with media query support for various screen sizes (see example) where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [menu-floating] Creates an absolutely positioned menu like a simple dropdown. Use the [ng-show](https://docs.angularjs.org/api/ng/directive/ngShow) and [ng-hide](https://docs.angularjs.org/api/ng/directive/ngHide) directives to show/hide the floating menu and toggle with a `.btn-text` or `.btn-solid` component. Add to the `.menu` element. Must be the child of a `.menu-container` element.
 *
 * @classname {modifier} [menu-floating-'bp'-'dir'] `menu-floating` with media query support for various screen sizes (see example) where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [menu-left] Align a floating menu to the left. Add to a `.menu` `.menu-floating` element.
 *
 * @classname {modifier} [menu-right] Align a floating menu to the right. Add to a `.menu` `.menu-floating` element.
 *
 * @classname {modifier} [menu-active] Add this class to the selected `.menu-item` using [ng-class](https://docs.angularjs.org/api/ng/directive/ngClass). Highlights the selected `.menu-item` with the `$btn-link-color` (blue by default). Add to the `.menu-item` element.
 *
 * @classname {modifier} [menu-hide-active] Use this modifier to hide the active `.menu-item` elements. Add to the `.menu element`.
 *
 * @classname {modifier} [menu-hide-active-'bp'-'dir'] `menu-hide-active` with media query support for various screen sizes (see example) where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @example <caption><h3>Triggering Actions</h3>
 * <p>Use the <a href="https://docs.angularjs.org/api/ng/directive/ngClick">ng-click directive</a> to trigger actions
 * when clicking a <code>.menu-link</code>. Additionally, use the
 * <a href="https://docs.angularjs.org/api/ng/directive/ngClass">ng-class</a> directive to add the
 * <code>.menu-active</code> class to the respective <code>.menu-item</code> when that item is selected. Lastly,
 * you can disable a menu link by passing some expression to the
 * <a href="https://docs.angularjs.org/api/ng/directive/ngDisabled">ng-disabled</a> directive.</p></caption>
 * <example runnable="true">
 *   <javascript>
 *     angular.module("bltDocs")
 *       .controller("MenuExCtrl", function(){
 *         var ctrl = this;
 *         ctrl.disableItem4 = true;
 *       });
 *   </javascript>
 *   <html>
 *     <!-- This link will be highlighted when clicked -->
 *     <ul class="menu" ng-controller="MenuExCtrl as ctrl">
 *       <li class="menu-item" ng-class="{'menu-active': ctrl.currentItem == 'item2'}">
 *         <button class="menu-link" ng-click="ctrl.currentItem = 'item2';">Item 2</button>
 *       </li>
 *       <li class="menu-item" ng-class="{'menu-active': ctrl.currentItem == 'item3'}">
 *         <button class="menu-link" ng-click="ctrl.currentItem = 'item3';">Item 3</button>
 *       </li>
 *       <!-- This link will be disabled when the ng-disabled expression is true -->
 *       <li class="menu-item">
 *         <button class="menu-link" ng-click="ctrl.currentItem = 'item4';" ng-disabled="ctrl.disableItem4">Item 4</button>
 *       </li>
 *     </ul>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Menu Sizes</h3>
 * <p>Menus have three sizes: Default (200px), Thin (128px) and Wide (240px). Use the <code>.menu-thin</code> or
 * <code>.menu-wide</code> to adjust the size of the menu.</p></caption>
 * <example>
 *   <html>
 *     <!-- Thin Menu (128px) -->
 *     <ul class="menu menu-thin"> ... </ul>
 *
 *     <!-- Wide Menu (240px) -->
 *     <ul class="menu menu-wide"> ... </ul>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Custom Width</h3>
 * <p>To manually set the width of the menu, add an id to your <code>.menu</code> element and set the width in a
 * <code>.scss</code> or a <code>.css</code> file.</p></caption>
 * <example>
 *   <css>
 *     #customMenu{
 *       // Set the menu width to 400px;
 *       width: 25rem; //400px
 *     }
 *   </css>
 *   <html>
 *     <ul id="customMenu" class="menu"> ... </ul>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Options</h3>
 * <p>Menus have multiple display options including: <code>.menu-borders</code>, <code>.menu-condensed</code>,
 * <code>.menu-icons</code>, <code>.menu-hide-active</code>.</p></caption>
 * <example>
 *   <html>
 * <!-- Menu with borders between each menu item -->
 <ul class="menu menu-borders"> ... </ul>

 <!-- Menu with less padding between each item -->
 <ul class="menu menu-condensed"> ... </ul>

 <!-- Menu with only icons for .menu-links -->
 <ul class="menu menu-icons">
 <li class="menu-item">
 <button class="menu-link">
 <span class="menu-icon fa fa-home"></span>
 </button>
 </li>
 </ul>

 <!-- Hide active menu items -->
 <ul class="menu menu-hide-active"> ... </ul>

 <!-- Include Icons with a menu-link -->
 <button class="menu-link">
 <span class="menu-icon fa fa-home"></span>
 <span class="menu-text">Home</span>
 </button>
 </html>
 </example>
 *
 * @example <caption><h3>Grouping Menu Content</h3>
 * <p>You can make groups of <code>.menu-items</code> by using a <code>.menu-divider</code> on an empty HTML
 * <code>&lt;li&gt;</code> tag.</p></caption>
 * <example>
 *   <html>
 * <ul class="menu">
 <li class="menu-item"> ... </li>
 <li class="menu-item"> ... </li>

 <!-- use a divider to group menu items -->
 <li class="menu-divider"></li>

 <li class="menu-item"> ... </li>
 <li class="menu-item"> ... </li>
 </ul>
 </html>
 </example>
 *
 * @example <caption><h3>Accordion Menu</h3>
 * <p>Accordion menus contain at least two layers of navigation. Simply add another <code>.menu</code> element inside
 * a <code>.menu-item</code> and use <a href="https://docs.angularjs.org/api/ng/directive/ngClick">ng-click</a>,
 * <a href="https://docs.angularjs.org/api/ng/directive/ngShow">ng-show</a> and
 * <a href="https://docs.angularjs.org/api/ng/directive/ngHide">ng-hide</a> to toggle the sub-menu.</p></caption>
 * <example>
 *   <html>
 * <ul class="menu menu-accordion">
 <li class="menu-item">
 <button class="menu-link" ng-click="Main.currentMenu = 1;">Menu 1</button>
 <ul class="menu" ng-show="Main.currentMenu == 1"> ... </ul>
 </li>
 <li class="menu-item">
 <button class="menu-link" ng-click="Main.currentMenu = 2;">Menu 2</button>
 <ul class="menu" ng-show="Main.currentMenu == 2"> ... </ul>
 </li>
 </ul>
 </html>
 </example>
 *
 * @example <caption><h3>Floating Menu</h3>
 * <p>Use floating menus combined with a toggle button to create a simple dropdowns anywhere in your application.
 * (For a more robust dropdown use {@link bltDropdown}).</p></caption>
 * <example>
 *   <html>
 * <div class="menu-container">
 <button class="btn-solid" ng-click="Main.showDropdown = !Main.showDropdown">Toggle Menu</button>

 <!-- Use .menu-left to align the floating menu to the left. -->
 <ul class="menu menu-floating menu-left" ng-show="Main.showDropdown == true"> ... </ul>

 <!-- Use .menu-right to align the floating menu to the right. -->
 <ul class="menu menu-floating menu-right" ng-show="Main.showDropdown == true"> ... </ul>
 </div>
 </html>
 </example>
 *
 * @example <caption><h3>Using Media Queries</h3>
 * <p>See the {@link breakpoints Media Queries Guide} for more information on using media queries.
 * </p></caption>
 * <example>
 *   <html>
 * <!-- Condensed menu for screens medium size and smaller -->
 * <ul class="menu menu-condensed-md-down"> ... </ul>
 * <!-- Menu with borders between each item for small screens only -->
 * <ul class="menu menu-borders-sm-only"> ... </ul>
 * <!-- Menu with only icons for screens medium size and larger -->
 * <ul class="menu menu-icons-md-up"> ... </ul>
 * <!-- Accordion menu for xxl screens only -->
 * <ul class="menu menu-accordion-xxl-only"> ... </ul>
 * <!-- Floating menu for screens large and smaller -->
 * <ul class="menu menu-floating-lg-down"> ... </ul>
 * </html>
 * </example>
 *
 */