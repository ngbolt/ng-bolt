/**
 * @ngdoc module
 * @name blt_appbar
 * @description ngBoltJS Appbar component.
 * @since 1.0.0
 *
 */

/**
 * @ngdoc directive
 * @name bltAppbar
 * @module blt_appbar
 * @since 1.0.0
 * @description The bltAppbar component is the main application bar that sits at the top of the window and contains app-specific information, navigation, and global actions.
 *
 * <div class="note-tip">**Best Practice** Place the Appbar component's content in an HTML partial and load with ng-include in order to
 * minimize the amount of code in your `main.template.html` file.</div>
 *
 * @usage <caption><h3>Usage</h3>
 * <p>To use the Appbar component in your ngBoltJS application, simply add your appbar partial to the top of your
 * <i>main.template.html</i> file. The presentation of the appbar options can be customized through the class elements
 * and modifiers supported on this component.</p>
 * <p><b>Minimal Usage</b></p></caption>
 * ```html
 * <header class="appbar">
 *   <div class="appbar-section">
 *     <h1 class="appbar-title">My App</h1>
 *   </div>
 * </header>
 * ```
 *
 * @classname {element} [appbar] The main appbar container. Should be used on an HTML `<header>` tag and can include
 * `.edge-bottom` modifiers for displaying a bottom border.
 * @classname {element} [appbar-section] The basic building block of the appbar. All other elements should be
 * contained within these elements. Can be modified with `.appbar–shrink`, `.appbar–right`, `.appbar–vertical` and
 * `.appbar-collapse`.
 * @classname {element} [appbar-logo] The logo or any other image to be contained in the appbar. Must be used on
 * an HTML `<img>` tag.
 * @classname {element} [appbar-title] The main title of the application and the appbar. Can also be used to
 * indicate what section of the app the user is currently in. Should be used on an HTML `<h1>` tag.
 * @classname {element} [appbar-text] Default sized text for the appbar. Should be used on an HTML `<p>` tag.
 * @classname {element} [appbar-caption] Small-sized text for the appbar. Can either be used in conjunction with
 * `.appbar-text` or `.appbar-title` or on its own. Should be used on an HTML `<p>` or `<span>` tag and is usually
 * contained in an `.appbar-section` with a `.appbar-vertical` modifier.
 * @classname {element} [appbar-icon] Button used for global actions. Should be used on an HTML `<button>` tag and
 * should be contained in an `.appbar-section` with an `.appbar-shrink` modifier. _ngBoltJS uses
 * [Font Awesome](http://fontawesome.io/) icons._
 * @classname {element} [appbar-tab] Navigation tabs for main application navigation. Tab can contain text links or
 * icons and should be used on an HTML `<button>` tag. Usually contained in an `.appbar-section` with an
 * `.appbar-shrink` modifier.
 * @classname {element} [appbar-search] The main application search bar. Must contain the `.appbar-search-field`
 * element and optionally the `.appbar-search-clear` element. Will adjust style depending on whether the appbar
 * component has an `.edge-bottom` class or not.
 * @classname {element} [appbar-search-field] The input form control for the `.appbar-search` element. Must be
 * used on an HTML `<input type="search">` tag and bound to with the
 * [ng-model directive](https://docs.angularjs.org/api/ng/directive/ngModel).
 * @classname {element} [appbar-search-clear] A clear button for resetting the search form. To activate, use the
 * [ng-click directive](https://docs.angularjs.org/api/ng/directive/ngClick) to clear the data bound to the
 * `.appbar-search-field` with ng-model.
 * @classname {modifier} [appbar-shrink] Limits the width of an `.appbar-section` to the size of its content.
 * @classname {modifier} [appbar-shrink-'bp'-'dir'] 'appbar-shrink' with media query support for various screen sizes
 * (see example) where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [appbar-vertical] Stacks an element's content vertically.
 * @classname {modifier} [appbar-vertical-'bp'-'dir'] 'appbar-vertical' with media query support for various screen
 * sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [appbar-collapse] Removes margin from an `.appbar-section` element.
 * @classname {modifier} [appbar-collapse-'bp'-'dir'] 'appbar-collapse' with media query support for various screen
 * sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [appbar-right] Aligns the content of an `.appbar-section` to the right.
 *
 * @example <caption>Common Use Cases</caption>
 * <example runnable="true">
 *   <html>
 *     <header class="appbar">
 *       <!-- Tabs -->
 *       <div class="appbar-section appbar-shrink">
 *         <button class="appbar-tab" blt-open-view="view1">View 1</button>
 *         <button class="appbar-tab" blt-open-view="view2">View 2</button>
 *       </div>
 *
 *       <!-- Logo and Title -->
 *       <div class="appbar-section appbar-shrink">
 *         <img class="appbar-logo" src="assets/logo.png">
 *         <h1 class="appbar-title appbar-vertical">ngBoltJS
 *           <span class="appbar-caption">v2.0.0</span>
 *         </h1>
 *       </div>
 *
 *       <!-- Text -->
 *       <div class="appbar-section appbar-vertical appbar-right" ng-hide="Main.search.show">
 *         <p class="appbar-text">Front-end framework for web applications</p>
 *         <p class="appbar-caption">Built on AngularJs</p>
 *       </div>
 *
 *       <!-- Search -->
 *       <div class="appbar-search" ng-show="Main.search.show">
 *         <input class="appbar-search-field" type="search" placeholder="Search" ng-model="Main.search.keyword">
 *         <button class="appbar-search-clear" ng-show="Main.search.keyword" ng-click="Main.search.keyword = '';">
 *           <span class="fa fa-times-circle"></span>
 *         </button>
 *       </div>
 *
 *       <!-- Actions -->
 *       <div class="appbar-section appbar-shrink">
 *         <button class="appbar-icon" ng-click="Main.search.show = !Main.search.show">
 *           <span class="fa fa-search"></span>
 *         </button>
 *         <button class="appbar-icon" blt-open="createModal">
 *           <span class="fa fa-plus"></span>
 *         </button>
 *         <button class="appbar-icon" ng-click="Main.openNotifications()">
 *           <span class="fa fa-exclamation-circle"></span>
 *         </button>
 *         <button class="appbar-icon" blt-open="settingsPanel">
 *           <span class="fa fa-bars"></span>
 *         </button>
 *       </div>
 *     </header>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Using Media Queries</h3>
 * <p>See the {@link breakpoints Media Queries Guide} for more information on using media queries.
 * </p></caption>
 * <example>
 *   <html>
 *     <!-- Appbar Shrink -->
 *     <header class="appbar">
 *       <!-- This only affects small screens -->
 *       <div class="appbar-section appbar-shrink-sm-only">
 *       ...
 *       </div>
 *       <!-- Appbar Vertical -->
 *       <!-- This only affects screens size medium and smaller -->
 *       <div class="appbar-section appbar-vertical-md-down">
 *       ...
 *       </div>
 *       <!-- Appbar Collapse -->
 *       <!-- This only affects screens medium and larger -->
 *       <div class="appbar-section appbar-collapse-md-up">
 *       ...
 *       </div>
 *     </header>
 *   </html>
 * </example>
 *
 *
 */