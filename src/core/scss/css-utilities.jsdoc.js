/**
 * @ngdoc directive
 * @name bltCssUtilities
 * @module blt_core
 *
 * @description
 * ngBoltJS comes bundled with a few utility classes that can be applied to several components throughout your
 * application.
 *
 * To use a utility class, simply add it to the desired HTML tag in your application. Several of these utility classes
 * override default settings and should be placed as the last classname in the `class` attribute.
 *
 * @classname {element} [spacer] Adds a horizontal space between elements. Must use on an HTML `<hr>` tag.
 * @classname {element} [spacer-vertical] Adds a vertical space between elements. Must use on an HTML `<div>` tag.
 * @classname {element} [edge-top] Adds a dark border to the top of the respective element.
 * @classname {element} [edge-top-'bp'-'dir'] 'edge-top' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range of (up|down|only).
 * @classname {element} [edge-right] Adds a dark border to the right of the respective element.
 * @classname {element} [edge-right-'bp'-'dir'] 'edge-right' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {element} [edge-bottom] Adds a dark border to the bottom of the respective element.
 * @classname {element} [edge-bottom-'bp'-'dir'] 'edge-bottom' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {element} [edge-left] Adds a dark border to the left of the respective element.
 * @classname {element} [edge-left-'bp'-'dir'] 'edge-left' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {element} [edge-*-light] Adds a light border to the specified edge where `*` is (top|right|bottom|left) of the respective element.
 * @classname {element} [edge-*-light-'bp'-'dir'] 'edge-*-light' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {element} [full-screen-bg] An overlay that covers the entire window of the application and includes a message and optionally an action button. Should be used on an HTML `<div>` tag.
 * @classname {element} [full-screen-msg] The message in a `.full-screen-bg`. Should be used on an HTML `<p>` tag.
 * @classname {modifier} [collapse] Removes all padding from an element.
 * @classname {modifier} [collapse-'bp'-'dir'] 'collapse' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [wrapper] Adds 1rem (16px) of padding around an element.
 * @classname {modifier} [wrapper-'bp'-'dir'] 'wrapper' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [shrink] Shrinks the width of the element to the width of its content. Can only be used on elements with display property of 'flex'.
 * @classname {modifier} [shrink-'bp'-'dir'] 'shrink' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [text-center] Center align text. _Does not work on elements with a display property of 'flex'._
 * @classname {modifier} [text-center-'bp'-'dir'] 'text-center' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [text-left] Left align text. _Does not work on elements with a display property of 'flex'._
 * @classname {modifier} [text-left-'bp'-'dir'] 'text-left' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [text-right] Right aligned text. _Does not work on elements with a display property of 'flex'._
 * @classname {modifier} [text-right-'bp'-'dir'] 'text-right' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [justify-center] Center justify children elements. _Only works on elements with a display property of 'flex'._
 * @classname {modifier} [justify-center-'bp'-'dir'] 'justify-center' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [justify-left] Left justify children elements. _Only works on elements with a display property of 'flex'._
 * @classname {modifier} [justify-left-'bp'-'dir'] 'justify-left' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [justify-right] Right justify children elements. _Only works on elements with a display property of 'flex'._
 * @classname {modifier} [justify-right-'bp'-'dir'] 'justify-right' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [overflow-visible] Make overflowed content visible and prevent scrolling.
 *
 * @example <caption>Common Use Cases</caption>
 * <example>
 *   <html>
 *     <!-- Add a border to a panel footer -->
 *     <footer class="panel-footer edge-top"> ... </footer>
 *
 *     <!-- Add a border between a menu and a view -->
 *     <div class="grid-block">
 *         <div class="grid-block grid-shrink">
 *             <ul class="menu edge-right"> ... </ul>
 *         </div>
 *         <div class="grid-content view-container>
 *             <blt-view> ... <blt-view>
 *         </div>
 *     </div>
 *
 *     <!-- Add a horizontal space between elements in a panel-body -->
 *     <div class="panel-body">
 *         <p class="panel-text panel-wrapper">Some instructions</p>
 *         <hr class="spacer">
 *         <ul class="menu> ... </ul>
 *     </div>
 *
 *     <!-- Add a loading message on app start up -->
 *     <div class="full-screen-bg" ng-if="Main.loading">
 *         <p class="full-screen-msg">{{Main.configuringMessage || 'Configuring Application...'}}</p>
 *         <p class="full-screen-msg"><span class="font-tiny">Step {{Main.currentStep}} of {{Main.totalSteps}}</p>
 *         <button class="btn-solid-submit" ng-click="Main.open()" ng-show="Main.loadingComplete">Enter</button>
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
 *     <!-- Add a border to a panel footer for medium screens and larger -->
 *     <footer class="panel-footer edge-top-md-up"> ... </footer>
 *
 *     <!-- Shrink the grid for small screens only -->
 *     <div class="grid-block">
 *         <div class="grid-block grid-shrink-sm-only">
 *             ...
 *         </div>
 *     </div>
 *
 *     <!-- Add a horizontal space between elements in a panel-body -->
 *     <div class="panel-body">
 *         <!-- Wrapper for large screens and bigger -->
 *         <p class="panel-text panel-wrapper-lg-up">Some instructions</p>
 *         <hr class="spacer">
 *         <ul class="menu"> ... </ul>
 *     </div>
 *   </html>
 * </example>
 *
 */