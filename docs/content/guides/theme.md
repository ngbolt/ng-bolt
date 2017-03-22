@ngdoc content
@module guides
@name Editing Themes
@sortorder 5

@description
# Editing an ngBoltJS Application's Theme

* [Overview](/#/guides/theme#overview)
* [Configuring Theme Settings](/#/guides/theme#configuring-theme-settings)

-------------------------------------------------------------------------------

## Overview

The ngBoltJS Framework is considered an 'opinionated' framework and comes with pre-styled components that are influenced by the [Material Design guidelines](https://material.io/guidelines/). However, because the theme styles are defined with [SASS](http://sass-lang.com), you can change many of the theme settings by overriding the default Sass variables in your app's `styles.json` configuration file. 

-------------------------------------------------------------------------------

## Configuring Theme Settings

To edit theme variables, simply change the desired property in the `styles.json` configuration file. When your app compiles, it will read the `styles.json` file, convert it to a `.scss` settings file, and override ngBoltJS defaults.

<div class="note-tip">
**Tip** Many of the Sass variables are set to automatically adjust in relation to other variables. For example, if you changed the `$body-bg` for the application to a dark color, all components and font colors would adjust in relation to the darker `$body-bg` to maintain contrast.
</div>

### Examples

**Change the app's `body-bg`**

```json
{
  "body-bg": "#545e64"
}
```

**Change the color used for submit buttons and links**

```json
{
  "global-link-color": "#f39c12"
}
```

**Change the default `font-family`**

```json
{
  "global-font-family": "Arial, sans-serif"
}
```

**Change the minimum width of menus**

```json
{
  "menu-min-width": "300px"
}
```