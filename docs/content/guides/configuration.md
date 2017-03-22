@ngdoc content
@module guides
@name Configuring your App
@sortorder 3

@description
# Configuring your ngBoltJS Application

As a rapid development framework for web applications, ngBoltJS follows a _configuration over code_ philosophy. When setting up your application, there are a few configuration steps that you should take.

1. [Configure your Application's Build](/#/guides/configuration#configure-your-application-s-build)
2. [Configure Data and Authentication Services](/#/guides/configuration#configure-data-and-authentication-services)
3. [Configure your Application's Theme](/#/guides/configuration#configure-your-application-s-theme)

---

## Configure your Application's Build

### Settings

We expose several global build settings that you can set in the `build.json` configuration file, found in the config folder of your project's root directory. Additionally, you can override the global settings in your `build.json` file with properties in a `build` object in one of your {@link blt_appProfile application profiles}, allowing you to have different build settings for various application builds, such as one for development, production, and tests. 

<!-- TODO: add graphic here diagraming how build settings work -->
**{@link /#/api/blt_config Edit Build Settings}**

<!-- TODO: update CLI link -->
#### CLI flags

You can also override certain build settings with CLI flags when using the [ngBoltJS CLI](https://github.com/ngBolt/ng-bolt-cli). Those flags are:

| Flag | Description |
| ---- | ----------- |
| `-f`, `--fatal` | The error level that will exit the build process. Valid values are `error`(default), `warning`, and `off`.| 
| `-e`, `--env` | The environment for the gulp build. Valid values are `development`(default) and `production`. |
| `-s`, `--serve` | Run a server as part of a gulp build. This is default behavior when using the `bolt run` command. |
| `-b`, `--beautify` | Prevent minification of assets. |
| `-r`, `--root` | The relative path of the root directory of the ng-bolt application to build from the current directory. |

### Using Third-party Libraries

In addition to the libaries used by ngBoltJS, you can include third-party libraries in your application's build. Javascript files will be minified and concacted into a `libs.js`, and CSS libraries into `libs.css`. These are automatically linked in your app's `index.html` file. Third-party font libraries will also be copied to a fonts folder in the build directory.

<div class="note-info">
**Note** We bundle ngBoltJS dependencies like `angular.js` and deploy with your application code. If you would prefer to use a CDN for these libraries, you can comment out the `libs.*` files in your `index.html` and add the CDN links instead. A list of bundled libraries can be found {@link blt_config#libraries here}.
</div>

**{@link /#/api/blt_config#libraries Add Third-party Libraries}**

### Components

All ngBoltJS components are availabe to you by default, but you can optionally remove components source code you will not be using in your application. This is a best practice as it keeps the size of your final application code smaller and can improve application performance.

**{@link /#/api/blt_config#components Configure Components}**

---

## Configure Data and Authentication Services

The configuration for the Data and Authentication Services is defined in your application's {@link blt_appProfile profile}. When you use `$ bolt run` to build your application it is using the default `development` profile that is included with the ngBoltJS boilerplate application. You can modify the default profile and additional profiles to use when you run a build. To use custom profiles for a build, you can pass it to the `bolt run` command or as the value for the `--pr` flag to gulp. 

For example, if you created a profile named `testing.json` you could use it with the ngBoltJS CLI by running:

```bash
$ bolt run testing
```

or with gulp:

```bash
$ gulp --pr testing --gulpfile ./node_modues/ng-bolt/gulpfile.js
```

<div class="note-tip">
When not using the ngBoltJS CLI, you need to pass a value for the `--gulpfile` flag to use ngBoltJS's gulpfile.
</div>

Profiles also provide the ability to override global build settings. Therefore, you can have several profiles with unique settings for various application builds and deployments. 

**{@link /#/api/blt_appProfile Create a Profile}**

In addition to creating an application profile, you will need to define routes (endpoints) in your `routes.json` configuration file for the Data API to use.

**{@link /#/api/blt_dataRoutes Create Routes}**

For more information on the using the Auth API and Data API in your application, see:

**{@link /#/guides/authentication Authenticating your App}**

**{@link /#/guides/data-api Connecting to Data Services}**

---

## Configure your Application's Theme

Editing the theme of your ngBoltJS application can be done by changing properties in the `styles.json` configuration file. All packaged ngBoltJS components are styled using Sass variables, most of which are exposed as json properties in the `styles.json` file. During your application's build, this json file is compiled into Sass variables file and imported into ngBoltJS. Many of ngBoltJS styles are relative to the values of these variables, so if you changed the global background color the colors of severl other elements and fonts would adjust in relation to that change.

**{@link /#/guides/theme Edit your Application's Theme}**