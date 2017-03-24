/**
 * @ngdoc module
 * @name blt_table
 * @description ngBoltJS Table component.
 * @since 2.0.0
 */

/**
 * @ngdoc directive
 * @name bltTable
 * @module blt_table
 *
 * @description
 * The bltTable component is used to display data sets with multiple columns of data. If less than three columns
 * are required, consider using the {@link bltList} component instead. The presentation of the table options can be
 * customized through the class elements and modifiers supported by this component.
 *
 * <div class="note-tip">
 * **Best Practice** Use [ng-repeat](https://docs.angularjs.org/api/ng/directive/ngRepeat) to iterate over
 * data-sets and two-way bind your data to the view.
 * </div>
 *
 * <div class="note-tip">
 * **Tip** Depending on the complexity of your dataset, you may need to write your own filter for ng-repeated
 * items. See Angular [documentation](https://docs.angularjs.org/guide/filter) on filters.
 * </div>
 *
 * @classname {element} table The main containing block. Must be placed on an HTML `<table>` tag. Can be modified with: `.table–accordion`, `.table–collapse`, `.table-simple`.
 *
 * @classname {element} table-content An element containing the content of a table cell. Use in all table cells except `table-actions`.
 *
 * @classname {element} [table-actions] A container for table actions that displays action in a row and will shrink to the width of its content. Must be used on an HTML `<td>` tag.
 *
 * @classname {element} [table-btn-icon] An icon button for triggering an action on data bound to a table row. Should be used on an HTML `<button>` tag and must be a child of the `.table-actions` element.
 *
 * @classname {element} [table-dropdown] A table cell for containing the {@link bltDropdown} component. Only use the "dropdown" type of the bltDropdown component when placed in a table cell. Must be used on an HTML `<td>` tag.
 *
 * @classname {element} [table-tag] A simple element for tagging content in a table cell. Should be used on an HTML `<span>` tag. Should be a child of a `<td>` and follow any text in the cell.
 *
 * @classname {element} [table-tag-solid] A `.table-tag` with a background.
 *
 * @classname {element} [table-link] Make a table cell clickable.
 *
 * @classname {element} [table-divider] Add a bottom border to a table row on collapsed tables. Borders are not set by default and must be declared explicitly by using this class. Must be used on an HTML `<tr>` tag and should only be used on a `.table.table-collapsed` element.
 *
 * @classname {element} [table-pending-msg] A pending message with an optional loading spinner used on a table row after some action has been triggered to give feedback to the user that something is in process. Hidden by default and visible when `.table-tr-pending` is active. Must be used on an HTML `<td>` tag with a colspan attribute set to the number of columns in the table so the table cell takes up the full width of the table row (see example).
 *
 * @classname {element} [accordion-header] Required container for the header row elements of an accordion table. Should be used on an HTML `<div>` tag and must be the direct child of an HTML `<th>` tag with a colspan of the number of columns in the table (see example).
 *
 * @classname {element} [accordion-toggle] The text to display in the header row of an accordion table. Use ng-click to hide/show the inner content of the accordion table. Should be used on an HTML `<div>` tag and optionally include a `<span class="fa fa-caret-up"></span>` before the text. Must be a direct child of the `.accordion-header` element.
 *
 * @classname {element} [accordion-actions] A container for any action buttons to include on the header row of an accordion table. The actions should be used on the entire table. Should be used on an HTML `<div>` tag and must be a direct child of the `.accordion-header` element.
 *
 * @classname {element} [table-th] Bolds a table cell in a simple table. Must use on an HTML `<td>` element and only in simple tables.
 * 
 * @classname {modifier} [table-collapse] Remove padding and margin from table rows. This is a best practice when the
 * table will be displayed in a modal or panel or on smaller screens. Must be used on the `.table` element.
 *
 * @classname {modifier} [table-shrink] Shrink the width of a table cell to the width of its content. Use on an HTML `<td>` or `<th>` tag.
 *
 * @classname {modifier} [table-tr-active] Toggle on a table row when a row has been selected and opens a side panel or modal. Use [ng-class](https://docs.angularjs.org/api/ng/directive/ngClass) to dynamically set the class (see example). Must be used on an HTML `<tr>` tag.
 *
 * @classname {modifier} [table-tr-pending] Toggle on a table row when an action has been triggered on the table row. Hides the table row content and displays the `.table-pending-msg` for that row. Use [ng-class](https://docs.angularjs.org/api/ng/directive/ngClass) to dynamically set the class (see example). Must be used on an HTML `<tr>` tag.
 *
 * @classname {modifier} [table-accordion] Makes an accordion table. The HTML `<thead>` element becomes the header for the accordion table and the `<tbody>` element becomes the inner content (see example). Must be added to a `.table element`.
 *
 * @classname {modifier} [accordion-closed] Use this to show or hide the inner content of an accordion table. Use [ng-class](https://docs.angularjs.org/api/ng/directive/ngClass) to dynamically set the class (see example). Must be used on a `.table-accordion` element.
 *
 * @classname {modifier} [table-simple] Creates a simple table with minimal formatting for use in a block of text (see example). Must be used on an HTML `<table>` tag. **Do NOT use the `.table` class when using `.table-simple`.**
 *
 * @classname {modifier} [table-fixed-header] Allows table header to remain fixed while the table content is scrolled.
 *
 * @usage <caption>To use the bltTable component in your ngBoltJS application, include the relevant
 * class elements inside an HTML <code>&lt;table&gt;</code> element in your application.</p></caption>
 * ```html
 <table class="table">
 <thead>
 <tr>
 <th>Name</th>
 <th>Description</th>
 <th>Category</th>
 <th></th>
 </tr>
 </thead>
 <tbody>
 <tr ng-repeat="item in ctrl.tableItems">
 <td><div class="table-content">{{item.name}}</div></td>
 <td><div class="table-content">{{item.description}}</div></td>
 <td><div class="table-content">{{item.category}}</div></td>
 <td class="table-actions">
 <div class="btn-row">
 <button class="table-btn-icon" ng-click="ctrl.approveItem(item.id)><span class="fa fa-check"></span></button>
 <button class="table-btn-icon" ng-click="ctrl.deleteItem(item.id)><span class="fa fa-times"></span></button>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 * ```
 *
 * @example <caption><h4>Common Use Cases</h4></caption>
 * <example runnable="true">
 *   <javascript>
 *     angular.module("bltDocs")
 *       .controller("TableExCtrl", TableExCtrl)
 *     ;
 *
 *     TableExCtrl.$inject = ['$timeout'];
 *     function TableExCtrl($timeout){
 *          var ctrl = this;
 *
 *
 *          ctrl.categories = ["one", "two", "three", "four"]
 *          ctrl.deleteItem =  deleteItem;
 *          ctrl.approveItem = approveItem;
 *
 *          activate();
 *
 *
 *          function activate(){
 *            ctrl.tableItems = items();
 *          }
 *
 *          function approveItem(itemId){
 *            var item = itemLookup(itemId);
 *            if(item){
 *              item.approved = true;
 *            }
 *          }
 *
 *          function deleteItem(itemId){
 *            var idx = itemIdxLookup(itemId);
 *            if(idx >= 0){
 *              ctrl.tableItems.splice(idx, 1);
 *            }
 *          }
 *
 *          function itemLookup(itemId){
 *            var idx = itemIdxLookup(itemId);
 *            if(idx > -1){
 *              return ctrl.tableItems[idx];
 *            }
 *          }
 *
 *          function itemIdxLookup(itemId){
 *            for(var idx in ctrl.tableItems){
 *              if(ctrl.tableItems[idx].id == itemId){
 *                return idx;
 *              }
 *            }
 *            return -1;
 *          }
 *
 *          //Normally we would use the data api to retrieve items from a data endpoint. For this example we will
 *          //just use a hard coded list of items.
 *          function items(){
 *            return [
 *              {
 *                id: "item1",
 *                comments: "comment for item 1.",
 *                category: "one",
 *                description: "description of item 1.",
 *                tags: ["cell", "item", "tag"]
 *              },
 *              {
 *                id: "item2",
 *                comments: "comment for item 2.",
 *                category: "two",
 *                description: "description of item 2.",
 *                tags: ["cell", "item", "tag"]
 *              },
 *              {
 *                id: "item3",
 *                comments: "comment for item 3.",
 *                category: "two",
 *                description: "description of item 3.",
 *                tags: ["item", "tag"]
 *              },
 *              {
 *                id: "item4",
 *                comments: "comment for item 4.",
 *                category: "one",
 *                description: "description of item 4.",
 *                tags: ["cell", "tag"]
 *              },
 *              {
 *                id: "item5",
 *                comments: "comment for item 5.",
 *                category: "one",
 *                description: "description of item 5.",
 *                tags: ["cell", "tag"]
 *              },
 *              {
 *                id: "item6",
 *                comments: "comment for item 6.",
 *                category: "one",
 *                description: "description of item 6.",
 *                tags: ["cell", "tag"]
 *              },
 *              {
 *                id: "item7",
 *                comments: "comment for item 7.",
 *                category: "one",
 *                description: "description of item 7.",
 *                tags: ["cell", "tag"]
 *              },
 *              {
 *                id: "item8",
 *                comments: "comment for item 8.",
 *                category: "one",
 *                description: "description of item 8.",
 *                tags: ["cell", "tag"]
 *              }
 *            ]
 *          }
 *       }
 *   </javascript>
 *   <html> 
 *     <div ng-controller="TableExCtrl as ctrl">
 *     <table class="table-fixed-header">
 *       <thead>
 *         <tr>
 *           <th>Description</th>
 *           <th>Comments</th>
 *           <th>Category</th>
 *           <th></th>
 *         </tr>
 *       </thead>
 *       <tbody>
 *         <!-- Using tags, dropdown, and actions -->
 *         <tr ng-repeat="item in ctrl.tableItems">
 *           <!-- To place tags under text content use the <br> tag -->
 *           <td><div class="table-content">{{item.description}}<br>
 *             <!-- use ng-repeat to iterate over multiple tags -->
 *             <span class='table-tag-solid' ng-repeat="tag in item.tags">{{tag}}</span></div>
 *           </td>
 *           <td><div class="table-content">{{item.comments}}</div></td>
 *           <td class="table-dropdown table-shrink">
 *             <!-- dropdowns must be included inside a <form> -->
 *             <form class="table-content">
 *               <blt-dropdown data-label="Category"
 *                 data-type="dropdown"
 *                 data-name="category"
 *                 data-options="ctrl.categories"
 *                 data-model="item.category">
 *               </blt-dropdown>
 *             </form>
 *           </td>
 *           <td class="table-actions">
 *             <div class="btn-row">
 *               <button class="table-btn-icon" ng-click="ctrl.approveItem(item.id)"><span class="fa fa-check"></span></button>
 *               <button class="table-btn-icon" ng-click="ctrl.deleteItem(item.id)"><span class="fa fa-times"></span></button>
 *             </div>
 *           </td>
 *         </tr>
 *       </tbody>
 *     </table>
 *     </div>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Collapsed Tables</h3>
 * <p>By default, tables are displayed as bars with spaces between each row. Table rows can be collapsed by using
 * the <code>.table-collapse</code> class. Collapsed tables are ideal for phone and tablet size screens or when
 * located inside modals or panels. Optionally use the <code>.table-divider</code> class on table rows to display
 * borders between table rows.</p></caption>
 * <example>
 *   <html>
 *     <table class="table table-collapse">
 *
 *       <!-- Add the .table-divider class to display a bottom border between table rows.-->
 *       <tr ng-repeat="item in ctrl.tableItems" class="table-divider"> ... <tr>
 *
 *       <!-- Best practice: Use ng-class to not display a bottom border on the last table row -->
 *       <tr ng-repeat="item in ctrl.tableItems" ng-class="{'table-divider': !$last}"> ... <tr>
 *     </table>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Use a dropdown in a <code>&lt;th&gt;</code> to filter or sort table rows.</h3>
 * <p>You can include a dropdown component in an HTML <code>&lt;th&gt;</code> element to filter rows in the table.
 * <p/></caption>
 * <example>
 *   <html>
 *     <table class="table">
 *       <thead>
 *           <th>Description</th>
 *           <th>Comments</th>
 *           <th>Category</th>
 *           <th class="table-dropdown">
 *               <form>
 *                   <blt-dropdown data-label="{{ctrl.tableFilter || 'Filter by'}}"
 *                       data-type="dropdown"
 *                       data-name="filter"
 *                       data-options="ctrl.tableFilters"
 *                       data-model="ctrl.tableFilter">
 *                   </blt-dropdown>
 *               </form>
 *           </th>
 *       </thead>
 *       <tbody>
 *           <tr ng-repeat="item in ctrl.tableItems | filter:ctrl.tableFilter"> ... </tr>
 *       </tbody>
 *     </table>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Toggling 'Pending' on a Table Row</h3><p>When triggering an action on data in a table,
 * there is often a delay until some background process is complete and a change in the UI is shown to the user. To give
 * the user immediate feedback that clicking on a button resulted in an action, you can use the <code>.table-tr-pending</code>
 * and <code>.table-pending-msg</code>.</p><h4>HTML Template</h4></caption>
 * <example>
 *   <html>
 *     <tr ng-repeat="item in ctrl.tableItems" ng-class="{'table-tr-pending': item.pending}">
 *       <!-- Table Row Content -->
 *       <td><div class="table-content">{{ item.name }}</div></td>
 *       <td><div class="table-content">{{ item.description }}</div></td>
 *       <td class="table-actions">
 *           <button class="table-btn-icon" ng-click="ctrl.deleteItem(item)">
 *               <span class="fa fa-times"></span>
 *           </button>
 *       </td>
 *       <!-- Pending Table Cell, colspan must equal the number of columns in the table. -->
 *       <td colspan="3" class="table-pending-mg">Pending... <span class="fa fa-spinner fa-pulse"></td>
 *     </tr>
 *   </html>
 * </example>
 *
 *
 * @example <caption><h3>Accordion Table</h3><p>Similar to the {@link bltList} component, tables
 * can contain sub-tables, creating an accordion table.</p></caption>
 * <example>
 *   <html>
 *     <table class="table table-accordion" ng-class="{'accordion-closed': ctrl.openAccordion != data.id}" ng-repeat="data in ctrl.dataset">
 *       <thead>
 *         <tr>
 *           <th colspan="4">
 *             <div class="accordion-header">
 *               <div class="accordion-toggle" ng-click="ctrl.Table = data.id">
 *                 <span class="fa fa-caret-up"></span>Accordion Table Header
 *               </div>
 *               <div class="accordion-actions">
 *                 <button class="btn-text" ng-click="ctrl.editTable(data)>Edit</button>
 *               </div>
 *             </div>
 *           </th>
 *         </tr>
 *       </thead>
 *       <tbody>
 *         <tr ng-class="{'table-divider': !$last}" ng-repeat="item in data.items">
 *           <td> ... </td>
 *           <td> ... </td>
 *           <td> ... </td>
 *           <td> ... </td>
 *         </tr>
 *       </tbody>
 *     </table>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Simple Tables</h3><p>Sometimes you just need a simple table to display small
 * sets of data with a section of text.</p></caption>
 * <example>
 *   <html>
 *     <table class="table-simple">
 *       <tr>
 *         <td class="table-th">App Name</td>
 *         <td>v1.0.0</td>
 *         <td>March 20, 2015</td>
 *       </tr>
 *       <tr>
 *         <td class="table-th">App Name 2</td>
 *         <td>v1.0.0</td>
 *         <td>March 21, 2015</td>
 *       </tr>
 *       <tr>
 *         <td class="table-th">App Name 3</td>
 *         <td>v1.0.0</td>
 *         <td>March 22, 2015</td>
 *       </tr>
 *     </table>
 *   </html>
 * </example>
 *
 * @example <caption><h3>Tables on Small Screens</h3><p>Tables automatically re-flow on smaller screens so that
 * every column is displayed as a row. In order to properly add headings to each new table cell row, add the
 * <code>data-label="[heading]"</code> to each table cell. To hide certain columns on smaller screens,
 * use the utility class <code>.hide-sm-only</code>.</p></caption>
 * <example>
 *   <html>
 *     <table class="table">
 *       <!-- The thead element will be hidden on small screen tables -->
 *       <thead>
 *         <tr>
 *           <th>Description</th>
 *           <th>Comments</th>
 *           <th>Category</th>
 *           <th>Date</th>
 *         </tr>
 *       </thead>
 *       <tbody>
 *         <tr>
 *           <!-- Use data-label for the value of the heading in order for it to be rendered on the re-flowed row. -->
 *           <td data-label="Description"> ... </td>
 *           <td data-label="Comments"> ... </td>
 *           <td data-label="Category"> ... </td>
 *
 *           <!-- This column will be hidden on small screens -->
 *           <td class="hide-sm-only"> ... </td>
 *         </tr>
 *       </tbody>
 *     </table>
 *   </html>
 * </example>
 */