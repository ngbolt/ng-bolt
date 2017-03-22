/**
 * @ngdoc directive
 * @name bltButton
 * @module blt_core
 * @since 1.0.0
 *
 * @description
 * The ngBoltJS Button component is used for triggering actions within an ngBoltJS application. The presentation of
 * the button can be customized through the class elements and modifiers supported by this component.
 *
 * To use the Button component in your ngBoltJS application, simply include the relevant classes on an HTML `<button>`
 * tag in your application and use the [ng-click](https://docs.angularjs.org/api/ng/directive/ngClick) to handle the
 * button click event.
 *
 * @classname {element} [btn-text] Default text button for secondary actions. Must be used on an HTML `<button>` tag.
 * @classname {element} [btn-text-'bp'-'dir'] 'btn-text' with media query support for various screen sizes where `bp` is
 * the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {element} [btn-solid] A text button with a color background used for secondary actions. Must be used on
 * an HTML `<button>` tag.
 * @classname {element} [btn-solid-'bp'-'dir'] 'btn-solid' with media query support for various screen sizes where `bp`
 * is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {element} [btn-icon] An icon button. Must be used on an HTML `<button>` tag.
 * @classname {element} [btn-icon-'bp'-'dir'] 'btn-icon' with media query support for various screen sizes where `bp` is
 * the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {element} [btn-link] A button that looks similar to hyperlinks without an underline. Use on an HTML
 * `<a>` tag or `<button>` tag.
 * @classname {element} [btn-link-'bp'-'dir'] 'btn-link' with media query support for various screen sizes where `bp` is
 * the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {element} [btn-row] A container for displaying buttons horizontally and justifies the buttons to the
 * right by default. Use on an HTML `<div>` tag.
 * @classname {modifier} [btn-text-submit] Colored, primary text button to use for primary actions. Must be used
 * on an HTML `<button>` tag.
 * @classname {modifier} [btn-solid-submit] Colored, primary solid button to use for primary actions. Must be used
 * on an HTML `<button>` tag.
 * @classname {modifier} [btn-block] Make a button the full width of its containers. Useful in modals, panels, or
 * forms. Must be added to a `.btn-**` element.
 * @classname {modifier} [btn-row-left] Left justify the content of a `.btn-row` element.
 * @classname {modifier} [btn-row-left-'bp'-'dir'] 'btn-row-left' with media query support for various screen sizes
 * where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 * @classname {modifier} [btn-row-center] Center justify the content of a `.btn-row` element.
 *
 * @example <caption>Common Use Cases</caption>
 * <example>
 *   <html>
 *     <!-- Text Buttons -->
 *     <button class="btn-text" blt-close="">Cancel</button>
 *     <button class="btn-text-submit" ng-click="Main.submit()">Submit</button>
 *
 *     <!-- Solid Buttons -->
 *     <button class="btn-solid" blt-close="">Canel</button>
 *     <button class="btn-solid-submit" ng-click="Main.submit()">Submit</button>
 *
 *     <!-- Icon Button -->
 *     <button class="btn-icon" ng-click="Main.approve()"><span class='fa fa-check-circle'></span></button>
 *
 *     <!-- Link Buttons -->
 *     <button class="btn-link" ng-click="Main.edit()">Edit</button>
 *     <a class="btn-link" href="http://some/url">Open</a>
 *
 *     <!-- Row of Buttons -->
 *     <div class="btn-row">
 *       <button class="btn-solid" blt-close="">Canel</button>
 *       <button class="btn-solid-submit" ng-click="Main.submit()">Submit</button>
 *     </div>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Disabled Buttons</h3><p>To disable a button, use an expression with
 * <a href="https://docs.angularjs.org/api/ng/directive/ngDisabled">ng-disabled</a> to put the button in a disabled
 * state. Disabled buttons will gray out and the cursor will be set to default.</p></caption>
 * <example>
 *   <html>
 *    <button class="btn-text-submit" ng-click="Main.submit()" ng-disabled="Main.formError == true">Submit</button>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Using Media Queries</h3><p>See the {@link breakpoints Media Queries Guide} for more information on using media queries.</p></caption>
 * <example>
 *   <html>
 *    <!-- Text Button with Media Query -->
 *    <!-- For screens size medium and smaller-->
 *    <button class="btn-text-md-down" blt-close="">Cancel</button>
 *
 *    <!-- Solid Button with Media Query -->
 *    <!-- For screens size large and smaller-->
 *    <button class="btn-solid-lg-down" blt-close="">Cancel</button>
 *
 *    <!-- Icon Button with Media Query -->
 *    <!-- For small screens only -->
 *    <button class="btn-icon-sm-only" ng-click="Main.approve()"><span class='fa fa-check-circle'></span></button>
 *
 *    <!-- Link Button with Media Query -->
 *    <!-- For screens size medium and larger -->
 *    <button class="btn-link-md-up" ng-click="Main.edit()">Edit</button>
 *   </html>
 * </example>
 *
 */