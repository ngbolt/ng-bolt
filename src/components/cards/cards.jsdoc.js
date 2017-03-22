/**
 * @ngdoc module
 * @name blt_card
 * @description ngBoltJS Card module.
 *
 * @since 2.0.0
 *
 */

/**
 * @ngdoc directive
 * @name bltCard
 * @module blt_card
 * @description The bltCard component is used to display content of similar or varying data types and serves as the entry
 * point to more detailed information related to that content.
 *
 * They are also useful for displaying content whose size
 * and/or actions vary, such as photos, videos, and other media. Use cards when displaying content that:
 * + as a collection, comprises multiple data types (for example, the card collection consists of images, videos, and text)
 * + does not require direct comparison (a user is not directly comparing data between cards)
 * + supports content of highly variable length, such as comments
 * + would otherwise be in a list but needs to display more than two lines of text
 *
 * The presentation of the card options can be customized by using the class elements and modifiers supported by the
 * component.
 *
 * <div class="note-tip">**Best Practice:** Use [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat)
 * to iterate over data sets.</div>
 *
 * @usage <caption><h3>Usage</h3>
 * <p>To use the Card component in your ngBoltJS application, include the relevant classes inside an HTML
 * `<div>` element with a class of "card".</p></caption>
 * ```html
 * <div class="card" ng-repeat="item in Main.cardData">
 *      <div class="card-content">
 *          <div class="card-primary">
 *              <header class="card-header">
 *                  <h2 class="card-title">{{item.title}}</h2>
 *                  <p class="card-caption">{{item.createdDate}}</p>
 *              </header>
 *              <div class="card-body">
 *                  <p class="card-text">{{item.description}}</p>
 *                  <hr class="spacer"></hr>
 *              </div>
 *          </div>
 *      </div>
 *      <footer class="card-footer edge-top">
 *          <div class="card-actions justify-left">
 *              <button class="card-btn-icon" ng-click="Main.favoriteItem(item)><span class="fa fa-star"></span></button>
 *          </div>
 *          <div class="card-actions">
 *              <button class="card-btn-submit" ng-click="Main.openItem(item)>Open</button>
 *          </div>
 *      </footer>
 *  </div>
 * ```
 *
 * @classname {element} card The main container block. Should be used on an HTML `<div>` tag.
 * @classname {element} card-content The wrapper around sections of card content. Must be a direct child of `.card`
 * and should be used on an HTML `<div>` tag.
 * @classname {element} card-primary The primary content of a card. Could be text, image, video, etc, or a combination
 * of multiple content types. You can use [ngBoltJS Grid](https://ngbolt.github.io/#/api/blt_core/directive/bltGrid)
 * elements to further divide the layout of the primary content. Must be a direct child of a `.card-content` element
 * and should be used on an HTML `<div>` tag.
 * @classname {element} [card-secondary] Secondary content of a card such as icons (not actionable). The
 * `.card-secondary` element shrinks to the width of its content and stacks its content vertically. Must be the direct
 * child of a `.card-content` element and should be used on an HTML `<div>` tag. You can have more than one
 * `.secondary-content`.
 * @classname {element} [card-footer] The footer of a card containing any supported actions. Actions can be grouped
 * into left and right justified blocks. Optionally add a top border to the footer by adding the `.edge-top` utility
 * class. Must be a direct child of `.card` and should be used on an HTML `<footer>` tag.
 * @classname {element} [card-header] The header element inside a `.card-primary` element. Must be a direct child of
 * `.card-primary` and should be used on an HTML `<header>` tag.
 * @classname {element} [card-title] The primary text content of a card. Can be a child of `.card-header` or
 * `.card-body`. Should be used on an HTML `<h2>` tag.
 * @classname {element} [card-text] The default text content of a card. Must be a child of `.card-body` and should
 * be used on an HTML `<p>` tag.
 * @classname {element} [card-caption] Smaller, secondary text content of a card. Can be a child of `.card-header`
 * or `.card-body`. Should be used on an HTML `<p>` or `<span>` tag.
 * @classname {element} [card-body] Contains the bulk of the card content. Must be a child of `.card-primary` and
 * should be used on an HTML `<div>` tag. Modify with `.card-collapse` to remove padding around content, for instance
 * when displaying images or videos.
 * @classname {element} [card-image] Any image content inside a `.card-body`. Must be a direct child of
 * `.card-body` and used only one per `.card-body`. If displaying more than one image, use multiple `.card-body`
 * elements. Must be used on an HTML `<img>` tag.
 * @classname {element} [card-actions] A container for card action buttons. Must be a child of `.card-footer` and
 * should be used on an HTML `<div>` tag. Use more than one `.card-actions` to group action buttons in the footer.
 * @classname {element} [card-btn] Default text action button for a card. Must be a child of `.card-actions` and
 * should be used on an HTML `<button>` tag.
 * @classname {element} [card-btn-submit] Primary text action button for a card. Must be a child of `.card-actions`
 * and should be used on an HTML `<button>` tag.
 * @classname {element} [card-btn-icon] Icon action button for a card. Must be a child of `.card-actions` and
 * should be used on an HTML `<button>` tag.
 * @classname {modifier} [card-collapse] Use on `.card-body` to remove padding around content.
 * @classname {modifier} [card-wrapper] Use on `.card-header` or `.card-secondary` to add padding around content.
 *
 * @example <caption>Common Use Cases</caption>
 * <example runnable="true">
 *   <css>
 *     .card-example-container > .card{
 *       min-width: 15rem;
 *     }
 *   </css>
 *   <html>
 *     <div class="grid-block card-example-container">
 *     <!-- Basic Card with Secondary Content -->
 *     <div class="card">
 *       <div class="card-content">
 *         <div class="card-secondary card-wrapper">
 *           <span class="font-icon fa fa-file"></span>
 *         </div>
 *         <div class="card-primary">
 *           <header class="card-header">
 *             <h2 class="card-title">Basic Card</h2>
 *             <p class="card-caption">Card Id#</p>
 *           </header>
 *           <div class="card-body">
 *             <p class="card-text">Some text here</p>
 *             <p class="card-text">Some more text here.</p>
 *             <hr class="spacer"></hr>
 *           </div>
 *         </div>
 *       </div>
 *       <footer class="card-footer edge-top">
 *         <div class="card-actions justify-left">
 *           <button class="card-btn-icon"><span class="fa fa-star"></span></button>
 *         </div>
 *         <div class="card-actions">
 *           <button class="card-btn-submit">Open</button>
 *         </div>
 *       </footer>
 *     </div>
 *
 *     <!-- Displaying an image -->
 *     <div class="card">
 *       <div class="card-content">
 *         <div class="card-primary">
 *           <header class="card-header card-wrapper">
 *             <h2 class="card-title">Image Card</h2>
 *             <p class="card-caption">March 20, 2016</p>
 *           </header>
 *           <div class="card-body card-wrapper">
 *             <img class="card-image" src="assets/logo.png">
 *           </div>
 *         </div>
 *       </div>
 *       <footer class="card-footer edge-top">
 *         <div class="card-actions justify-left">
 *           <button class="card-btn-icon"><span class="fa fa-star"></span></button>
 *         </div>
 *         <div class="card-actions">
 *           <button class="card-btn-submit">Open</button>
 *         </div>
 *       </footer>
 *     </div>
 *
 *     <!-- Display a map -->
 *     <div class="card">
 *       <div class="card-content">
 *         <div class="card-primary">
 *           <header class="card-header card-wrapper">
 *             <h2 class="card-title">Map Card</h2>
 *             <p class="card-caption">State College, Pa</p>
 *           </header>
 *           <div class="card-body card-collapse">
 *             <!-- replace this image with embed code for map -->
 *             <img class="card-image" src="assets/map.jpg">
 *           </div>
 *         </div>
 *       </div>
 *       <footer class="card-footer">
 *         <div class="card-actions justify-left">
 *           <button class="card-btn-icon"><span class="fa fa-star"></span></button>
 *         </div>
 *         <div class="card-actions">
 *           <button class="card-btn-submit">Open</button>
 *         </div>
 *       </footer>
 *     </div>
 *     </div>
 *   </html>
 * </example>
 *
 *
 */