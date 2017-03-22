/**
 * @ngdoc directive
 * @name bltGrid
 * @since 1.0.0
 *
 * @module blt_core
 *
 * @description
 * The ngBoltJS Grid consists of a few elements to create the base layout of your application. Based on Foundation for
 * Apps grid, it is built on [CSS3's Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Using_CSS_flexible_boxes)
 * for advanced layouts and therefore can only be used in [modern browsers](http://caniuse.com/#search=flex%20box).
 *
 * To use the Grid in your ngBoltJS application, include the relevant classnames inside your app's `<body>`
 * tag.
 *
 * <div class="note-info">
 * **Note** Use grid elements to create the main layout of your application only. Most ngBoltJS components contain their
 * own layout properties and do not require you to use grid elements inside them. An exception to this would be the
 * large and full-screen {@link bltModal} and the {@link bltView}.
 * </div>
 *
 * <div class="note-info">
 * **Note** Always use `rem` units instead of px so components scale correctly if the user is using larger font or
 * has zoomed in or out.
 * </div>
 *
 * @classname {element} grid-frame The `.grid-frame` element is the outer-most container of your application and should be placed on the `<body>` tag of your application. If you are using the [ngBoltJS Template](https://github.com/ngbolt/ng-bolt-template) boilerplate, the `.grid-frame` is already included. _You should only have one_ `.grid-frame` _per application._
 *
 * @classname {element} grid-block The main building 'blocks' of your application. The `.grid-block` element is the primary element for creating the main layout for your application and can be configured using many of the modifiers  listed below. The `.grid-block` can contain nested `.grid-block` or `.grid-content` elements. Should be used on an HTML `<div>` or `<section>` tag.
 *
 * @classname {element} [grid-block-'bp'-'dir'] `grid-block` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {element} [grid-content] Similar to the `.grid-block` element, these can be configured with modifiers, but unlike `.grid-block` elements, the `.grid-content` is a container for default [`display: block` element content](https://developer.mozilla.org/en-US/docs/Web/CSS/display) and is meant to contain the actual content of your application. You should not place `.grid-block` elements inside a `.grid-content`, except in rare cases. Should be used on an HTML `<div>` tag.
 *
 * @classname {element} [grid-content-'bp'-'dir'] `grid-content` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [grid-vertical] The `.grid-frame` and `.grid-block` arrange their content in rows by default. To organize content vertically add the `.grid-vertical` element to any grid element. This is the default configuration for the ngBoltJS Template, for example, so that the Appbar component stacks vertically on top of the `.grid-block` containing the View component. Can only be used on `.grid-frame` and `.grid-block`.
 *
 * @classname {modifier} [grid-vertical-'bp'-'dir'] `grid-vertical` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [grid-shrink] By default, grid elements scale to fill the width (or height if their parent uses `.grid-vertical`) of their container equally. In order to shrink the element to the width of their content, use the `.grid-shrink` class. This would be useful when wanting to create a sidebar next to a {@link bltView} component, for instance. _Can only be used on `.grid-block` and `.grid-content` elements._
 *
 * @classname {modifier} [grid-shrink-'bp'-'dir'] `grid-shrink` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [grid-expand] `.grid-expand` does the opposite of `.grid-shrink` and equally expands a grid element to the width of its container. This is the default behavior of grid elements but is sometimes necessary in rare cases. For example, when multiple elements are not equally dividing the width of their parent container. Can be used on `.grid-block` and `.grid-content` elements.
 *
 * @classname {modifier} [grid-expand-'bp'-'dir'] `grid-expand` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [grid-wrapper] Adds padding to a grid element.
 *
 * @classname {modifier} [grid-wrapper-'bp'-'dir'] `grid-wrapper` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [grid-align-center] Vertically center the content of a grid element. _Can only be used on `.grid-frame` and `.grid-block` elements._
 *
 * @classname {modifier} [grid-align-center-'bp'-'dir'] `grid-align-center` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [grid-justify-center] Horizontally center the content of a grid element. Can only be used on `.grid-frame` and `.grid-block` elements.
 *
 * @classname {modifier} [grid-justify-center-'bp'-'dir'] `grid-justify-center` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [grid-center] Absolutely center (horizontally and vertically) the content of a grid element. Can only be used on `.grid-frame` and `.grid-block` elements.
 *
 * @classname {modifier} [grid-center-'bp'-'dir'] `grid-center` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [grid-no-scroll] Prevent the default behavior of scrolling vertical content of grid elements and make overflowed content visible. This is useful on grid elements that may hide a absolutely positioned child element such as a floating menu.
 *
 * @classname {modifier} [grid-no-scroll-'bp'-'dir'] `grid-no-scroll` with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @example <caption>Side Bar - Main View Layout</caption>
 * <example>
 *   <html>
 *     <body class="grid-frame grid-vertical">
 *       <!-- App Bar -->
 *       <blt-appbar> ... </blt-appbar>
 *
 *       <!-- Main Content -->
 *       <div class="grid-block">
 *         <!-- Sidebar menu -->
 *         <div class="grid-block grid-shrink>
 *           <ul class="menu"> ... </ul>
 *         </div>
 *         <!-- Views -->
 *         <blt-view id="First"> ... </blt-view>
 *         <blt-view id="Second"> ... </blt-view>
 *       </div>
 *     </body>
 *   </html>
 * </example>
 *
 * @example <caption>Side Bar - Main View - Side Bar Layout</caption>
 * <example>
 *   <html>
 *     <body class="grid-frame grid-vertical">
 *      <!-- App Bar -->
 *      <blt-appbar> ... </blt-appbar>
 *
 *      <!-- Main Content -->
 *      <div class="grid-block">
 *          <!-- Left Sidebar menu -->
 *          <div class="grid-block grid-shrink>
 *              <ul class="menu"> ... </ul>
 *          </div>
 *
 *          <!-- Views -->
 *          <blt-view id="First"> ... </blt-view>
 *          <blt-view id="Second"> ... </blt-view>
 *
 *          <!-- Right Sidebar -->
 *          <div class="grid-block grid-shrink>
 *              <!-- some other related content -->
 *          </div>
 *      </div>
 *     </body>
 *   </html>
 * </example>
 * @example <caption>Two Columns Layout</caption>
 * <example>
 *   <html>
 *     <body class="grid-frame grid-vertical">
 *      <!-- App Bar -->
 *      <blt-appbar> ... </blt-appbar>
 *
 *      <!-- Main Content -->
 *      <div class="grid-block">
 *          <!-- Left View -->
 *          <div class="grid-content">
 *             <!-- Left view content. Do not use ngBoltJS View component - we do not currently support more than one active view -->
 *          </div>
 *
 *          <!-- Right View -->
 *          <div class="grid-content">
 *              <!-- Left view content. Do not use ngBoltJS View component - we do not currently support more than one active view -->
 *          </div>
 *      </div>
 *     </body>
 *   </html>
 * <example>
 *
 * @example <caption>Multiple Columns Layout</caption>
 * <example>
 *   <html>
 *     <body class="grid-frame grid-vertical">
 *      <!-- App Bar -->
 *      <blt-appbar> ... </blt-appbar>
 *
 *      <!-- Main Content -->
 *      <div class="grid-block">
 *          <div class="grid-content">
 *             <div class="card" ng-repeat="card in Main.cards1">
 *          </div>
 *
 *          <div class="grid-content">
 *              <div class="card" ng-repeat="card in Main.cards2">
 *          </div>
 *
 *          <div class="grid-content">
 *              <div class="card" ng-repeat="card in Main.cards3">
 *          </div>
 *
 *          <div class="grid-content">
 *              <div class="card" ng-repeat="card in Main.cards4">
 *          </div>
 *      </div>
 *     </body>
 *   </html>
 * <example>
 *
 * @example <caption>Grid Layout</caption>
 * <example>
 *   <html>
 *     <body class="grid-frame grid-vertical">
 *      <!-- App Bar -->
 *      <blt-appbar> ... </blt-appbar>
 *
 *      <!-- Top Row -->
 *      <div class="grid-block">
 *          <!-- Top Left -->
 *          <div class="grid-content"> ... </div>
 *
 *          <!-- Top Right -->
 *          <div class="grid-content"> ... </div>
 *      </div>
 *
 *      <!-- Bottom Row -->
 *      <div class="grid-block">
 *          <!-- Bottom Left -->
 *          <div class="grid-content"> ... </div>
 *
 *          <!-- Bottom Right -->
 *          <div class="grid-content"> ... </div>
 *      </div>
 *     </body>
 *   </html>
 * <example>
 *
 * @example <caption>Centered Form</caption>
 * <example>
 *   <html>
 *     <body class="grid-frame">
 *
 *      <!-- Main Content -->
 *      <div class="grid-block grid-center">
 *
 *          <!-- Form -->
 *          <div class="grid-content">
 *             <form> ... </form>
 *          </div>
 *
 *      </div>
 *     </body>
 *   </html>
 * <example>
 *
 * @example <caption><h3>Custom Sizing</h3>
 * <p>To give your grid element a custom size, first add the .grid-shrink class to your grid element,
 * give the element or its containing element an id and then specify the width (or height) in your app.scss</p>
 * </caption>
 * <example>
 *   <css>
 *     // Custom width
 *     #sideNav {
 *       width: 10rem; // 160px
 *     }
 *
 *     // Custom height
 *     #topRow {
 *       height:  12.5rem; // 200px
 *     }
 *   </css>
 *   <html>
 *     <!-- Define Custom width -->
 *     <div class="grid-block">
 *       <!-- Will be the width of the child menu -->
 *       <div class="grid-block grid-shrink">
 *           <ul id="sideNav" class="menu"> ... </ul>
 *       </div>
 *
 *       <!-- Will expand to fill remaining width -->
 *       <div class="grid-content"> ... </div>
 *     </div>
 *
 *     <!-- Define custom height -->
 *     <div class="grid-block grid-vertical">
 *       <!-- Will be a height of 200px -->
 *       <div id="topRow" class="grid-content grid-shrink"> ... </div>
 *
 *       <!-- Will expand to fill remaining height -->
 *       <div class="grid-block"> ... </div>
 *     </div>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Using Media Queries</h3>
 * <p>See the {@link breakpoints Media Queries Guide} for more information on using media queries.
 * </p>
 * </caption>
 * <example>
 *   <html>
 *     <body class="grid-frame grid-vertical-xl-down">
 *       <div class="grid-block-md-down">
 *         <div class="grid-content grid-shrink-sm-only">
 *         ...
 *         </div>
 *       </div>
 *     </body>
 *   </html>
 * </example>
 *
 */