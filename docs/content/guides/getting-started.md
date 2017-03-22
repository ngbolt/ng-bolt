@ngdoc content
@module guides
@name Getting Started
@sortorder 2

@description
# Getting Started

* [Requirements](/#/guides/getting-started#requirements)
* [Quick Start](/#/guides/getting-started#quick-start)
* [Configuration](/#/guides/getting-started#configuration)
* [Start Developing](/#/guides/getting-started#start-developing)

<!-- TODO: update cli url -->
<div class="note-tip">
**Best Practice** The recommended method of getting started with a new ngBoltJS project is by installing the [ngBoltJS CLI](https://www.npmjs.com/package/ng-bolt-cli). This guide will take you through the process of installing necessary dependencies and running your first ngBoltJS project.
</div>

***

## Requirements

You'll need to have the following software installed to get started.

* [Node.js](http://nodejs.org) (LTS): Use the installer provided on the NodeJS website for your OS.
    * After Node is installed, run `npm --version`. If the version is less than 3.0, run `npm install -g npm` to update.
    * With NPM up to date, run `[sudo] npm install -g gulp` to install [GulpJs](http://gulpjs.com).
* [Git](http://git-scm.com/downloads): Use the installer for your OS.
    * Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
    * Bitbucket users can also use [SourceTree](https://www.sourcetreeapp.com) which will install `git` and give you access to ngBoltJS repos.

### Special Instructions for Windows Users

A dependency of ngBoltJS requires the node package [node-gyp](https://www.npmjs.com/package/node-gyp) which may cause [issues](https://github.com/nodejs/node-gyp/issues/629#issuecomment-153196245) for some Windows users. Follow the steps below to remedy:

1. Update npm to 3.10.8+ if necessary. NOTE: You will need to __uninstall__ and then __reinstall__ Node using the Control Panel to update NPM.

To check your current version of npm run:
```bash
npm --version
```
2. Install [VC++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools), choose **Custom Install**, and select both Windows 8.1 and Windows 10 SDKs. Windows 7 also requires [.NET Framework 4.5.1](https://www.microsoft.com/en-us/download/details.aspx?id=40779).

3. Install [Python 2.7](https://www.python.org/download/releases/2.7/) and add it to your PATH:

```bash
npm config set python python 2.7
```

4. Configure NPM:

```bash
npm config set msvs_version 2015 -  -global
```

***

## Quick Start

<!-- TODO: update cli url -->
1. Install the [ngBoltJS CLI](https://github.com/ngbolt/ng-bolt-cli) globally.
    * If you already have the ngBoltJS CLI installed globally, make sure you are running version 2.0+. If you are not, we recommend you uninstall your old version `$ npm rm ng-bolt-cli -g` and then install the current version.

2. After ngBoltJS CLI has installed successfully, run the following to start a new project.
```bash
$ bolt new
```

3. You will be asked a few questions by the installer, after which the installer will download the ngBoltJS boilerplate template and install all dependencies. When the process has completed, you are ready to run the ngBoltJS application. Do so by running the following in your command line:
```bash
$ cd [project-name]
$ bolt run
```

This will build your project, launch it in a local development server on port 9000, and watch your project source files for changes. Changes to the source code will automatically be loaded into your browser.

**[View your Application](http://localhost:9000)**

***

## Configuration

Now that you have an ngBoltJS project up and running, you can start by configuring your application. If you examine the project structure, you'll notice a directory titled `ng-bolt-app`. This is where the source of your application will be written, regardless of your deployment environment. Gulp will handle building your project source into the proper destination directory at build time. Examining the `ng-bolt-app` directory will reveal a familiar web application structure.

<div class="note-tip"> 
**Note** As you progress through the development of your application, it is highly recommended that you refer to the [Angular 1 Style Guide by John Papa](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md) for recommendations on project file structure and Angular best practices.
</div>

Before you jump in and start writing code for your application, you will need to follow a few configuration steps first. In your application directory you will find a `config` folder with the following structure:

```
config/
  - profiles/
      - development.json
  - build.json
  - routes.json
  - views.json
  - styles.json
```

These configuration files allow you to override our defaults for the application build, configure data and authentication services in your application's profile, define routes for data calls, define your application's views, and adjust the style of your app's theme.

**{@link configuration Configure your Application}**

***

## Start Developing

After completing the configuration steps, you are ready to begin writing your application's code. You will want to begin in your application's {@link bltMain main} module. The main module of your application is injected into your application's `index.html` during runtime. The index file loads your application's compiled javascript and CSS files, and initializes your AngularJS application. Generally, you won't have to make changes to the index file and instead will begin working in the `main.template.html` and `main.controller.js` found in the `main` folder. These two files serve as the main container and controller for your application. You can see that the main template that is included in the boilerplate application contains an appbar, menu, and buttons to navigate to three different views. If you're just getting started with ngBoltJS, try making small changes to the existing views and content to get a feel for the various components available in ngBoltJS.

Once you get a feel for things, you will probably want to begin adding views to your application or new features. If you choose to use the {@link bltView} component, you will need to define your views in the `views.json`configuration file, which are passed into Angular's [$route service](https://docs.angularjs.org/api/ngRoute/service/$route) at runtime. 

**{@link blt_appViews Add Views to your Application}**

**[Use ngBoltJS Components in your Application](/api)**

<div class="note-tip"> 
**Best Practice** While it may be tempting to place all of your custom code in the `main.template.html` and `main.controller.js` files as many online tutorials do, you should add new folders and files for each functional feature of your application. This will lead to a more maintainable and scalable application. For more information regarding this topic and other practices, see the [Angular 1 Style Guide by John Papa](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).
</div>