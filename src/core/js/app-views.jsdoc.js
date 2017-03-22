/**
 * @ngdoc module
 * @name blt_appViews
 * @module blt_appViews
 * @sortorder 3
 *
 * @description
 * * [Overview](#overview)
 * * [Defining Views](#defining-views)
 * * [Html5Mode](#html5mode)
 *
 * ----------------------------------------------------------------------------
 *
 * ## Overview
 *
 * The views module is automatically generated from the `views.json` configuration
 * file during the application build process. The views are added to the Angular
 * [$routeProvider](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider)
 * during run-time. Angular will use these views to load html partials into your
 * application based on the current path of the URL. For more information on how
 * Angular handles view routing, see [ngRoute](https://docs.angularjs.org/api/ngRoute).
 *
 * ----------------------------------------------------------------------------
 *
 * ## Defining Views
 *
 * You define views by adding them to the `views` array in the `views.json` configuration
 * file. Each view object has three properties:
 *
 * | Property | Type | Description |
 * |----------|------|-------------|
 * | `path`   | string | Path parameter passed to [$routeProvider#when](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider) |
 * | `route`  | object | Route parameter passed to [$routeProvider#when](https://docs.angularjs.org/api/ngRoute/provider/$routeProvider) |
 * | `animation` | string | (Optional) Animation to use when entering and leaving. Valid values are: `fade` and `slide`. |
 *
 * ### Example View Definition
 *
 * ```json
 *  "views": [
 *    {
 *      "path": "/forms",
 *      "route": {
 *         "templateUrl": "partials/forms/forms.template.html",
 *         "controller": "FormsController",
 *         "controllerAs": "ctrl"
 *      },
 *      "animation": "fade"
 *    }
 *  ]
 * ```
 *
 * <div class="note-info">
 * **Note** ngBoltJS does not currently support $routeProvider#otherwise.
 * </div>
 *
 * ----------------------------------------------------------------------------
 *
 * ## Html5Mode
 *
 * To use Angular's [$location](https://docs.angularjs.org/guide/$location) service
 * HTML5 mode you need to set the `html5mode` property in your {@link blt_config build configuration}
 * file to `true` as well as set a value for `baseUrl`.
 *
 * ### html5mode in production
 *
 * The ngBoltJS development server provides HTML5 history API functionality so refreshing will work
 * in `html5mode`. However, in production, you will need to add a configuration file or middleware
 * to redirect all requests to `index.html`.
 *
 * For example, when hosted on apache servers, you can include a `.htaccess` file at the application
 * root.
 *
 * ```
 * RewriteEngine on
 * RewriteCond %{REQUEST_FILENAME} -s [OR]
 * RewriteCond %{REQUEST_FILENAME} -l [OR]
 * RewriteCond %{REQUEST_FILENAME} -d
 * RewriteRule ^.*$ - [NC,L]
 *
 * RewriteRule ^(.*) /index.html [NC,L]
 * ```
 */