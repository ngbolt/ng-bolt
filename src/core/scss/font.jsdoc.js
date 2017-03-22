/**
 * @ngdoc directive
 * @name bltFont
 * @module blt_core
 * @since 1.0.0
 *
 * @description
 * Defines basic styles for fonts in ngBoltJS applications. ngBoltJS uses [Roboto](https://fonts.google.com/specimen/Roboto)
 * as its default font-family but falls back to Helvetica, Arial, and sans-serif.
 *
 * To use ngBoltJS Font styles in your ngBoltJS application, include the following class elements and modifiers in
 * your HTML templates.
 *
 * @classname {element} [font-title] Default title font. Can be used on any HTML heading tag `<h1> ... <h6>`, but would normally be found on an `<h1>` or `<h2>` tag. _Do not use on component titles as they have their own specific styles._
 *
 * @classname {element} [font-sub-title] The default sub-title font. Should be used after a `.font-title` but can be used on any text element for stylistic purposes. Is normally found on `<h2>` and `<h3>` tags but can be used on `<span>` tags as part of a paragraph of text.
 *
 * @classname {element} [font-body] The default text for ngBoltJS applications. Should be used on `<p>` and `<span>` tags.
 *
 * @classname {element} [font-caption] Use for smaller caption sized fonts. Should be used on `<p>` and `<span>` tags.
 *
 * @classname {element} [font-icon] Use on icons throughout your application. These are icons that are for display purposes only. If to be used on a button, use {@link bltButton `.btn-icon`} instead.
 *
 * @classname {modifier} [font-xlarge] Use on any font element child HTML tag to increase the font size by 2%. Must be used on a nested HTML tag of the containing font element.
 *
 * @classname {modifier} [font-large] Use on any font element child HTML tag to increase the font size by 1.5%. Must be used on a nested HTML tag of the containing font element.
 *
 * @classname {modifier} [font-small] Use on any font element child HTML tag to decrease the font size by .875%. Must be used on a nested HTML tag of the containing font element.
 *
 * @classname {modifier} [font-tiny] Use on any font element child HTML tag to decrease the font size by .75%. Must be used on a nested HTML tag of the containing font element.
 *
 * @classname {modifier} [font-bolder] Use on any font element child HTML tag to increase the font weight. Must be used on a nested HTML tag of the containing font element.
 *
 * @classname {modifier} [font-bolder-'bp'-'dir'] 'font-bolder' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [font-lighter] Use on any font element child HTML tag to decrease the font weight. Must be used on a nested HTML tag of the containing font element.
 *
 * @classname {modifier} [font-lighter-'bp'-'dir'] 'font-lighter' with media query support for various screen sizes where `bp` is the breakpoint (sm|md|lg|xl|xxl) and `dir` is the range (up|down|only).
 *
 * @classname {modifier} [font-code] Use on any font element to display as monospace code with a light background to offset it from it's surrounding content.
 *
 * @classname {modifier} [font-error] Use on any font element to color it red.
 *
 * @classname {modifier} [font-warning] Use on any font element to color it amber.
 *
 * @classname {modifier} [font-success] Use on any font element to color it green.
 *
 * @example <caption>Common Use Cases</caption>
 * <example runnable="true">
 *   <html>
 *     <!-- Base Font Styles -->
 *     <h1 class="font-title">Title</h1>
 *     <h2 class="font-sub-title">Sub Title</h2>
 *     <p class="font-body">This is a body of text.</p>
 *     <p class="font-caption">Caption</p>
 *
 *     <!-- Captions within text -->
 *     <h1 class="font-title">Title <span class="font-caption">caption<span></h1>
 *     <p class="font-body">This is some information from a source. <span class="font-caption">- Source Name</span></p>
 *
 *     <!-- Adjusting font size -->
 *     <h1 class="font-title"><span class="font-xlarge">Really Big Title</span></h1>
 *     <h1 class="font-title"><span class="font-tiny">Small Title</span></h1>
 *     <p class="font-body">Just make a section of text <span class="font-large">bigger</span>,
 *     or make it <span class="font-small">smaller.</span></p>
 *
 *     <!--Adjusting font weight -->
 *     <h1 class="font-title"><span class="font-bolder">Bolder Title</span></h1>
 *     <h1 class="font-title"><span class="font-lighter">Lighter Title</span></h1>
 *     <p class="font-body">Just make a section of text <span class="font-bolder">bolder</span>, or make it
 *     <span class="font-lighter">lighter.</span></p>
 *
 *     <!-- Format text as code -->
 *     <p class="font-body">To display a bit of code inline, simple use the <span class="font-code">.font-code</span>
 *     class on an HTML <span class="font-lighter"><pre><span></pre></span> tag.</p>
 *
 *     <!-- Display font as a paragraph -->
 *     <div class="font-paragraph">
 *         <h1 class="font-title">Title</h1>
 *         <h2 class="font-sub-title">Sub Title</h2>
 *         <p class="font-body">This is a body of text.</p>
 *     </div>
 *   </html>
 * </example>
 *
 * @example
 * <caption>
 * <h3>Using Media Queries</h3>
 * <p>See the {@link breakpoints Media Queries Guide} for more information on using media queries.</p>
 * </caption>
 * <example>
 *   <html>
 *      <!-- Adjusting font weight with media queries -->
 *      <!-- Bolder title for screens size medium and up -->
 *      <h1 class="font-title"><span class="font-bolder-md-up">Bolder Title</span></h1>
 *      <!-- Lighter title for small screens only -->
 *      <h1 class="font-title"><span class="font-lighter-sm-only">Lighter Title</span></h1>
 *   </html>
 * </example>
 */