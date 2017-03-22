/**
 * @ngdoc module
 * @name blt_appProfile
 * @module blt_appProfile
 * @since 1.0.0
 * @sortorder 2
 *
 * @description
 * Application profiles define settings for the {@link BltData Data API} and
 * {@link BltAuth Auth API} as well provide a mechanism for overriding global
 * build settings. Multiple profiles may be defined for an application and are
 * placed in the `config/profiles` directory in the project root. For example,
 * your application can have a `development` profile that defines a different
 * data and authentication settings than is used in a `production` environment.
 *
 * <div class="note-tip">
 * **Tip** Profiles are read by the Gulp build process and incorporated into
 * your application as an angular module, so there is no need to distribute
 * them with your application.
 * </div>
 *
 * ## Creating Profiles
 *
 * You can create a profile by adding a uniquely named JSON file in the profiles
 * directory. If you are using the ngBoltJS Boilerplate template, you will notice
 * that one named `development` has been provided.
 *
 * A profile is composed of five sections:
 *  * [data](/#/api/blt_appProfile#data)
 *  * [auth](/#/api/blt_appProfile#auth)
 *  * [servers](/#/api/blt_appProfile#servers)
 *  * [database](/#/api/blt_appProfile#database)
 *  * [build](/#/api/blt_appProfile#build) (optional)
 *
 * ## Accessing Profile Data
 *
 * You can access profile data from within your app by injecting the `blt_appProfile` module into your module, or by
 * accessing the `blt_appProfile` module directly using the angular injector interface. The following examples show
 * equivalent code to access the `auth` attribute of the profile configuration.
 *
 * ```javascript
 * angular.module('myModule', ['blt_appProfile'])
 *   .controller('MyController', MyController)
 * ;
 *
 * MyController.$inject = ['auth'];
 *
 * function MyController(auth) {
 *   ...
 * }
 * ```
 *
 * ```javascript
 * var $profile = angular.injector(['blt_appProfile']);
 * var auth = $profile.get('auth');
 * ```
 *
 * ### Data
 *
 * The data section of a configuration profile defines the data source and
 * reconnection parameters of the data service.
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `protocol` | string | This property defines which supported data source the data service will use to make requests. Allowed values are: `rest`, `wamp`, and `sqlite`. Any other values will result in a configuration error, rendering the data service inoperable. |
 * | `retryMax` | integer | Controls how many times the data service will retry when attempting to connect to a data source. Setting the property to any negative value will cause the data service to retry connecting indefinitely. |
 * | `retryDelay` | integer | Controls how long, in milliseconds, the data service will wait between retry attempts. The value supplied must be an integer equal to or greater than zero. Any other values may result in undefined behavior. |
 *
 * ### Auth
 *
 * The auth object of a profile defines the authentication service and settings
 * for the {@link BltAuth Auth API}.
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `authService` | string | The name of the angular service to use for authetication. E.g. `DevAuthService` |
 * | `wampAuthMethod` | string | (Optional) Required when using the `WampAuthService`. Allowed values are: `ticket` and `wampcra` |
 * | `authKey` | string | (Optional) A key to pass the authetication service when not using a user login form |
 * | `authSecret` | string | (Optional) A secret to pass the authentication service when not using a user login form |
 *
 * ### Servers
 *
 * The servers section of a configuration profile defines the non-database remote
 * data sources of the data service. Currently, we only support WAMP.
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `wamp` | object | The WAMP server configuration object |
 * | `wamp.url` | string | Defines the address of the remote WAMP server to which the data service will attempt to connect. E.g. `ws://some.wamp.server/` |
 * | `wamp.realm` | string | Defines the realm to which the data service should join. E.g. `some_realm` |
 *
 * ### Database
 *
 * The database configuration section defines both the SQLite and Web SQL data
 * sources.
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `name` | string | Defines the name of the database to which the data service will attempt to connect. E.g. `MY_DATABASE` |
 * | `version` | string | TODO: add description |
 * | `createFromLocation` | integer | TODO: add description |
 *
 * ### Build
 *
 * The build configuration sections allows you to override global build settings
 * for a particular profile. For example, in a production profile, you may wish
 * to minify all of the generated assets. To do so, you would set the `minify`
 * property to `true`.
 *
 * For full list of build properties, see {@link blt_config}.
 *
 * ## Example
 <caption><code>development.json</code></caption>
 ```json
 {
   "data": {
     "protocol": "wamp",
     "retryMax": 1,
     "retryDelay": 100
   },
   "auth": {
     "authService": "DevAuthService"
   },
   "servers": {
     "wamp": {
       "url": "ws://localhost:8080",
       "realm": "wamp_realm"
     }
   },
   "database": {
     "name": "EXAMPLE_DB",
     "version": "1.0",
     "createFromLocation": 1
   },
   "build": {
     "generateBoltDocs": false,
     "docsLogLevel" : "warn"
   }
 }
 ```
 *
 */