/**
 * @ngdoc module
 * @name blt_config
 * @module blt_config
 * @sortorder 2
 *
 * @description
 * The `blt_config` module is generated automatically during the application gulp
 * build from the `build.json` config file and injected into ngBoltJS's core module.
 * These settings define ngBoltJS's configuration and are accessible in your
 * application from the `config` constant.
 *
 * The properties in the `build.json` file can be overriden by matching properties
 * in a `build` object in your {@link blt_appProfile application's profile}.
 * Because you can have multiple profiles, you can have different configurations
 * for each profile. This is useful when wanting to override development settings
 * when deploying to a production environment.
 *
 * The properties exposed in the build configuration are listed below.
 *
 * ## Properties
 *
 * | Property | Default | Description |
 * |----------|---------|-------------|
 * | appSrc | `ng-bolt-app` | The file path of the root directory of your application's source code. |
 * | port | `9000` | The port number on your app's local dev server. |
 * | docsPort | `9001` | The port number on the documentation app's local dev server. |
 * | debug | `true` | Toggle console logging. |
 * | defaultLogLevel | `debug` | The default logging level (`trace`, `debug`, `info`, `warn`, `error`). Log message below the set level will be turned off. E.g. if the level is 'warn' only `console.warn` and `console.error` messages will be displayed. |
 * | generateBoltDocs | `true` | Generate ngBoltJS documentation during a build. |
 * | generateAppDocs | `true` | Generate your application's documentation during a build. |
 * | buildDest | `build` | The file path to place all generated app files during a gulp build. |
 * | docsDest | `build/docs` | The file path to place all generated documenation files during a gulp build. |
 * | html5mode | `false` | Toggle Angular's [html5mode](https://docs.angularjs.org/guide/$location). |
 * | baseUrl | `'/'` | The value of the `href` attribute on the HTML `base` tag. Required when `html5mode` is true. |
 * | logoUrl | `images/logo.png` | The relative file path of your applications logo to use for the login screen. |
 * | packagePath | `./package.json` | The file path of your application's `package.json` file. |
 * | servce | `true` | Toggle a local server during the build. |
 * | gzip | `false` | Gzip generated assets during a build. |
 * | cleanIgnore | `Array` | An array of file paths to ignore when deleting files in a build directory before a build. |
 * | breakpoints | `Object` | Object of breakpoint values. |
 * | libraries | `Object` | Object of file paths of static libraries to include in the build files. |
 * | components | `Object` | An object of [components](#components) that can be set to be used in your application. |
 *
 * ## Breakpoints
 *
 * Breakpoints provide support for media queries and enable you to adjust your application's
 * layout depending on the viewport width. See {@link breakpoints Media Query Support Guide}.
 *
 * | Property | Default | Description |
 * |----------|---------|-------------|
 * | `breakpoints.sm`     | 0px     | The minimum viewport width for small screens. |
 * | `breakpoints.md`     | 600px   | The minimum viewport width for medium screens. |
 * | `breakpoints.lg`     | 900px   | The minimum viewport width for large screens. |
 * | `breakpoints.xl`     | 1200px  | The minimum viewport width for xlarge screens. |
 * | `breakpoints.xxl`    | 1800px  | The minimum viewport width for xxlarge screens. |
 *
 * ## Libraries
 *
 * Libaries allow you to bundle third-party libraries into your application's assets.
 * See the {@link configuration#using-third-party-libraries Build Configuration Guide}.
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | libraries.css | `[]` | An array of file paths of CSS libraries to include in `app.css`. |
 * | libraries.js | `[]` | An array of file paths of JS libaries to include in `app.js`. |
 * | libraries.fonts | `[]` | An array of file paths of font libraries to include in app's assets. |
 * | libraries.static | `[]` | An array of objects and/or strings. If the item is a string, it represents a file path that will copied directly into the root of your build output. If the item is an object it can contain two properties, `src` and `dest`. The `src` property is a string file path relative to your project root. The `dest` directory is a directory, relative to the root of your build output directory where the asset(s) defined in the `src` property will be copied. |
 *
 * ## Components
 *
 * Most ngBoltJS components can be optionally included in your application's compiled code. If you know you will not
 * need certain components for your application, you can set them to `false` and reduce the file size of your generated
 * application code.
 *
 * | Component | Default | Description |
 * |-----------|---------|-------------|
 * | auth | `true` | Use {@link blt_auth} module in your application. |
 * | appbar | `true` | Use {@link blt_appbar} module in your application. |
 * | cards | `true` | Use {@link blt_card} module in your application. |
 * | checkboxradio | `true` | Use {@link blt_checkboxradio} module in your application. |
 * | classificationbar | `true` | Use {@link blt_classificationbar} module in your application. |
 * | counter | `true` | Use {@link blt_counter} module in your application. |
 * | datepicker | `true` | Use {@link blt_datepicker} module in your application. |
 * | fileloader | `true` | Use {@link blt_fileloader} module in your application. |
 * | lists | `true` | Use {@link blt_list} module in your application. |
 * | login | `true` | Use {@link blt_login} module in your application. |
 * | menu | `true` | Use {@link blt_menu} module in your application. |
 * | modal | `true` | Use {@link blt_modal} module in your application. |
 * | notifications | `true` | Use {@link blt_notifications} module in your application. |
 * | panel | `true` | Use {@link blt_panel} module in your application. |
 * | dropdown | `true` | Use {@link blt_dropdown} module in your application. |
 * | tables | `true` | Use {@link blt_table} module in your application. |
 * | tabs | `true` | Use {@link blt_tab} module in your application. |
 * | textfield | `true` | Use {@link blt_textfield} module in your application. |
 * | toggleswitch | `true` | Use {@link blt_toggleswitch} module in your application. |
 * | view | `true` | Use {@link blt_view} module in your application. |
 * | data | `Object` | A list of data services to use in your application. |
 * | data.http | `true` | Use the http data service in your application. |
 * | data.sqlite | `true` | Use the sqlite data service in your application. |
 * | data.wamp | `true` | Use the wamp data service in your application. |
 */