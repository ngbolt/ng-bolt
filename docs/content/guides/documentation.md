@ngdoc content
@module guides
@name Writing ngBoltJS Documentation
@description

# Writing ngBoltJS Documentation

ngBoltJS documentation is generated using [dgeni](https://github.com/angular/dgeni), a Javascript documentation generator written by the Angular team. Dgeni supports jsdoc style comments and uses a package called ngdoc that supports a jsdoc package that adds unique tags to a basic set of jsdoc tags. 

## Supported tags

### jsdoc tags

The jsdoc package contains definitions for a number of standard jsdoc tags including: `name`, `memberof`, `param`, `property`, `returns`, `module`, `description`, `summary`, `usage`, `example`, `animations`, `constructor`, `class`, `classdesc`, `global`, `namespace`, `method`, `type`, `kind`, `since`, `access`, `public`, `private` and `protected`. 

<div class="note-tip">
Visit [jsdoc](http://usejsdoc.org) for a description and examples for each of the supported tags.
</div>

### ngdoc tags

The ngdoc package modifies and adds new tag definitions on top of those provided by the jsdoc package that are specific to angular projects: 

| tag | description |
|-----|-------------|
| area | Specifies the area of documentation. Use 'app' to indicate documentation relating to your application. Default to 'api' for ngBoltJS documentation |
| element | The HTML element to use for a directive |
| eventType | `(emit, brodcast)` specifies whether the event is emitted or broadcast |
| module | The name of the angular.module the documented element belongs to |
| ngdoc | `(module, service, object, directive, filter, inputType, error, function, method, property, event)` The type of angular element being documented. See angular's [guide](https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation) for more details. |
| priority | specifies the documented directive's priority |
| restrict | specifies how directives should be shown in the usage section. For example, for [E]lement, [A]ttribute, and [C]lass, use `@restrict ECA` |
| scope | specifies that the documented directive will create a new scope |

### ngBoltJS tags

We've also added a few tags specific to the ngBoltJS project:

| tag | description |
|-----|-------------|
| sortorder | Specifies the order in which to display the documented element in the sidebar menu. Defaults to `100` |
| classname | Define a CSS classname for CSS components |

## Usage

You can generate documentation locally for ngBoltJS and also your application. To generate ngBoltJS documentation set the `generateBoltDocs` property to `true` in your build.json file or in the build object in a profile. You can also generate documentation for your application by setting `generateAppDocs` to `true`.

**Set documentation build settings**

```json
// ./config/build.json
{
  "generateBoltDocs": true, // generates ngBoltJS docs
  "generateAppDocs": true // generates app docs
}
```

### Options

There are a few options available that you can set for your documentation build. These options can be set in both in your `build.json` file or in the build object of your profile.

| option | default | description |
|--------|---------|-------------|
| `docsLogLevel` | warn | Sets the logging level of the documentation build. (debug, info, warn, error) |
| `docsSrc` | ./src/**/*.js | The file path of ngBoltJS src files to include. This is useful when wanting to test another set of documented source files |
| `docsBasePath` | ./src | Sets the base folder for the source files. Used in conjunction with `docsSrc` |
| `docsDest` | build/docs | Sets the file path where generated documentation will be placed |
| `docsPort` | 9001 | Sets the port number to use for serving documentation app locally |


**Override documentation build settings with build profile**

```json
// ./config/profiles/development.json
{
  "build": {
    "generateBoltDocs": true, // generates ngBoltJS docs
    "generateAppDocs": false // don't generate app docs
  }
}
```

Documentation can be viewed locally by default at `localhost:9001`

## Documentation Examples

### Angular Module

```js
/** 
 * @ngdoc module
 * @name moduleName 
 * @description Module description
 * @since 2.0.0
 * 
 * @requires BltApi
 * @requires https://docs.angularjs.org/api/ng/service/$filter
 */
```

### Angular Factories, Services, and Providers

Use `service` for both angular services and factories. Use `object` for providers.

```js
/**
 * @ngdoc service
 * @name serviceName
 * @module moduleName
 * @description Service description
 * @since 2.0.0
 *
 * @requires BltApi
 * @requires https://docs.angularjs.org/api/ng/service/$filter
 */
```

### Public Method

```js
/**
 * @ngdoc method
 * @name serviceName#methodName
 * @description Method description
 * @summary short description to be used in table of content
 * @since 2.0.0
 *
 * @param {String} param1 Param 1 description
 * @param {Boolean} [param2=false] Option param2 with default value of false
 *
 * @returns {Array} Returns description
 */
```

### Public Property

```js
/**
 * @ngdoc property
 * @name serviceName.propertyName
 * @description property description
 * @since 2.0.0
 */
```

### Angular Controller

Dgeni suggests using the `type` value for a constructor and controllers are constructors so use `type`.

```js
/**
 * @ngdoc type
 * @name ControllerName
 * @module moduleName
 * @description Controller description.
 * @since 2.0.0
 *
 * @requires BltApi
 * @requires https://docs.angularjs.org/api/ng/service/$filter
 */
```

### Angular Directive

Use `directive` for angular directives and components. Use the `@param` tag to document directive attributes.

```js
/**
 * @ngdoc directive
 * @name myDirective
 * @module moduleName
 * @description Directive description.
 * @since 2.0.0
 * @restrict E
 *
 * @param {String} attribute Attribute description
 *
 * @requires BltApi
 * @requires https://docs.angularjs.org/api/ng/service/$filter
 */
```

### ngBoltJS CSS Component

Use ngdoc type of `directive` for ngBoltJS CSS components as well as css components. Use the `@classname` tag to document css classes.

```js
/**
 * @ngdoc directive
 * @name myCssComponent
 * @module moduleName
 * @description CSS Component description.
 * @since 2.0.0
 *
 * @classname {element} appbar Classname description including the HTML `<tag>` to apply it to.
 * @classname {modifier} appbar-shrink Classname that modifies an element. Include which element `.classname` it can be applied to. 
 */
```

## Notes in Documentation

You can add `.note` styling to notes in your documentation that want to stand out from the rest of a description or example caption.
To use a note, add an html snippet in your description or example `<caption>`.

<div class="note-info">
**Note:** These are for basic notes.
</div>

```html
<div class="note-info"> ... </div>
```

<div class="note-warning">
**Warning:** These are for warning notes.
</div>

```html
<div class="note-warning"> ... </div>
```

<div class="note-tip">
**Tip:** These are for tip or best practice notes.
</div>

```html
<div class="note-tip"> ... </div>
```

## Documenting dependencies

You can use the `@requires` tag to document dependencies of a controller, service, factory, providor, directive or component by name. If the dependency is an external library use a full URL. Use a `@requires` tags for each dependency.

<div class="note-tip">

**Best Practice** Even though dependencies in an angular application are passed as parameters into a Controller, Service, etc. constructor function, it is considered best practice to document these with the `@requires` tag rather than a `@param` tag.

</div>

```js
/**
 * @requires BltApi
 * @requires https://docs.angularjs.org/api/ng/service/$filter
 */
```

## Documentation Links

Dgeni will generate links automatically for your documented symbol based on its name. To link to another documented symbol use an inline `@link` tag followed by the name of your documented symbol. For external links use markdowns link style. Refer to jsdoc's documentation on [@link](http://usejsdoc.org/tags-inline-link.html) for examples.

## Examples

Dgeni will process your documentation for any instances of `@example` tags and include content for that 
tag based upon several supported internal example tags. There are two top level tags supported: `<caption>`
and `<example>`. The `<caption>` tag can contain any standard markdown or HTML content and will be included
at the top of the example output in the resulting documentation. The `<example>` tag is where the content of 
your example will be specified. 