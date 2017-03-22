/**
 * @ngdoc module
 * @name blt_dataRoutes
 * @module blt_dataRoutes
 * @sortorder 3
 *
 * @description
 * The routes module is automatically generated from the `routes.json` file
 * found in the `config` directory in your applications project root. It defines
 * a series of uniquely named routes that the data service will use to resolve
 * calls from application code. Since the data service acts very much like a
 * software router, this file can be considered the heart of the data service's
 * ability to correctly identify which route to select and resolve calls from
 * based on the application {@link blt_appProfile profile} specifications.
 *
 * ## Creating Routes
 *
 * Create a routes file is as simple as creating a new, specially named JSON file -
 * `routes.json` - in the 'config' directory under your application project's root.
 * The routes file is read by the Gulp build process and incorporated into the
 * application, so there is no need to distribute the routes file with your
 * application.
 *
 * <div class="note-info">
 * **Note** The routes file must define an object, `routes`, that contains all
 * application-specific routes. See the example for details and use it as a starting
 * point.
 * </div>
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `routes` | object | Collection of Routes |
 *
 * ## Defining a Route
 * Think of each route like a specification for how the data service should
 * interface with a data source, what arguments to pass to that source, and what to
 * return from the call. Each route should have a descriptive, unique name. The
 * route definition is divided into several categories that describe how to execute
 * the call, keyed by the protocol the data service is using.
 *
 * <div class="note-tip">
 * **Best Practice** Using the data service in an application data source is fairly
 * trivial. However, if you are planning on deploying to different environments that
 * will use different data sources, think **very** carefully about the format your
 * application's data sources will return. To ensure that no platform-specific code
 * needs to be written in your application, take steps to ensure that your data
 * sources will return the same type of data in an identical format. (e.g., as an
 * array, object, or plain text).
 * </div>
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `routes.<Route>` | object | A uniquely named Route |
 *
 * ---
 *
 * ### `Route.return`
 *
 * The data service can return data from a route call in several formats. Depending
 * on the data protocol, this may automatically transform data into the appropriate
 * format from the data returned from the call to the route. This may or may not be
 * allowed, depending on the protocol. See the following table for what return data
 * types are allowed with which protocols.
 *
 * | Return Value | WAMP | REST | SQLite | Description |
 * | ------------ | ---- | ---- | ------ | ----------- |
 * | `object`     | Yes  | Yes  | Yes    | Returns a JavaScript object if it was able to be parsed from the data returned from the call. **When using the `object` return type with SQLite, this will return the first returned row from the query as an object.** |
 * | `array`      | Yes  | Yes  | Yes    | This will return an array of JavaScript objects or primitives. |
 * | `text`       | Yes  | Yes  | No     | This will return plain text from the data returned from the call. **Any calls made to an SQLite route with a `text` return type will automatically fail.**
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `Route.return` | string | The return type can be one of the three values in the table above. When interacting with external data sources, the data service will make an attempt to convert the data returned from the data source to the defined return type if it can. If it cannot make the conversion, the raw data will be returned as a fallback. |
 *
 * <div class="note-info">
 * **Note** If an unknown return type is supplied to the route, the data service
 * will default to returning an object.
 * </div>
 *
 * ---
 *
 * ### `Route.<Protocol>`
 *
 * Each route also contains a category for each protocol that the route supports
 * whose names match the protocol declared in the application profile. Unused
 * protocols can be safely excluded from the route destination.
 *
 *
 * #### REST Protocol
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `rest.url` | string | The URL at which the data service should direct the request. |
 * | `rest.type` | string | The method types the data service should make. This is one of the standard HTTP method types (e.g., GET, POST, etc...). |
 * | `rest.params` | array | Array of strings that name the properties to extract from the object passed to the data service call that are to be sent as the REST request query parameters. This will extract and pass them to the REST endpoint in the order defined in the array. |
 * | `rest.body` | array | Array of strings that name the properties to extract from the object passed to the data service call that are to be sent as the REST request body. This will extract and pass them to the REST endpoint in the order defined in the array. |
 *
 * **Example REST Properties**
 * ```json
 * "rest": {
 *    "url": "/some/endpoint/url",
 *    "type": "GET",
 *    "params": ["someData"],
 *    "body": ["moreData"]
 * }
 * ```
 *
 * **Dynamic URL Generation**
 *
 * The data service also supports dynamic URL generation by substituting keywords in
 * the configuration URL with the values of properties of the object passed to the
 * call. The to-be replaced keywords must be prefixed with a `$` followed by any
 * valid object property name. The data service will attempt to extract the value of
 * a parameter contained in the passed object, replacing the keyword with the value.
 *
 * For example, say that your application made the following call:
 *
 * ```javascript
 * dataApi.call("uniquelyNamedRoute", {value: "details", field: "users", query: "username"});
 * ```
 *
 * and the route definition was defined as (abridged):
 *
 * ```json
 * "rest": {
 *    "url": "/get/$value/from/$field"
 * }
 * ```
 *
 * The data service would then extract the parameters of the object passed to the
 * call and replace the keywords in the defined URL. In this case, the data service
 * would construct the following URL and make the request against it:
 *
 * ```
 * /get/details/from/users
 * ```
 *
 * <div class="note-warning">
 * **Important** Be aware that the data service will not pass parameters as query parameters that have been used to replace keywords in the URL. For example, in the above call only the `query` property would be forwarded to the REST endpoint as a query parameter.
 * </div>
 *
 * #### WAMP Protocol
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `wamp.rpc` | string | The URL of the WAMP remote procedure endpoint at which the data service should direct the request. |
 * | `wamp.args` | array | An array of strings that name the properties to extract from the object passed to the data service call that are to be sent as an array of ordered arguments to the remote procedure. |
 * | `wamp.kargs` | array | An array of strings that name the properties to extract from the object passed to the data service call that are to be sent as part of an object containing keyword arguments to the remote procedure call. |
 *
 * **Example WAMP properties
 * ```json
 * "wamp": {
 *    "rpc": "f.some.rpc.endpoint",
 *    "args": ["someData"],
 *    "kargs": ["moreData"]
 * }
 * ```
 *
 * #### SQLite Protocol
 *
 * | Property | Type | Description |
 * | -------- | ---- | ----------- |
 * | `sqlite.query` | string | Defines the SQL query that the data service should execute. |
 * | `args` | array | An array of strings that name the properties to extract from the object passed to the data service call that are to be sent as part of the query. |
 *
 * ** Example SQLite properties
 * ```json
 * "sqlite": {
 *    "query": "INSERT INTO EXAMPLE_ROUTES (aCol, bCol) VALUES (?,?);"
 *    "args": ["someData", "moreData"]
 * }
 * ```
 *
 * ## Example Route
 *
 * Below is an example routes file that you may copy and modify to include in your
 * application.
 *
 * ```json
 * {
 *  "routes": {
 *    "uniquelyNamedExample": {
 *      "return": "object",
 *      "rest": {
 *        "url": "/some/endpoint/url",
 *        "type": "POST",
 *        "params": ["someData"],
 *        "body": ["moreData"]
 *      },
 *      "wamp": {
 *        "rpc": "f.some.rpc.endpoint",
 *        "args": ["someData"],
 *        "kargs": ["moreData"]
 *      },
 *      "sqlite": {
 *        "query": "INSERT INTO EXAMPLE_ROUTES (aCol, bCol) VALUES (?,?);"
 *        "args": ["someData", "moreData"]
 *      }
 *    }
 *  }
 * }
 * ```
 */