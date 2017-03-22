@ngdoc content
@module guides
@name Media Query Support

@description

# Media Query Support

* [Overview](/#/guides/breakpoints#overview)
* [Media Query CSS Classes](/#/guides/breakpoints#media-query-css-classes)
* [Removing Elements from the DOM at Breakpoints](/#/guides/breakpoints#removing-elements-from-the-dom-at-breakpoints)

-------------------------------------------------------------------------------

## Overview

ngBoltJS has built-in support for media queries so that your application can respond to the viewport width. Some components have predefined styles for narrow screens, but for the most part, we provide CSS classnames so that you can 'opt-in' to adjusting presentation of a component on varying size screens.

-------------------------------------------------------------------------------

## Media Query CSS Classes

The CSS classnames for supporting media queries adhere to the following naming pattern: `.base-classname-{bp}-{dir}` where `bp` is the breakpoint (viewport width) and `dir` is the range from the breakpoint the css rule will apply to. Available media query classes are documented for each component in the [API Reference](/api).

### Breakpoints

We support five breakpoints:

| Breakpoint | Description |
|------------|-------------|
| `sm`       | viewports 0px wide and up. (We follow the 'mobile first' strategy, meaning that all styles are essentialy using the `sm` breakpoint by default) |
| `md`       | viewports 600px wide and up |
| `lg`       | viewports 900px wide and up |
| `xl`       | viewports 1200px wide and up |
| `xxl`      | viewports 1800px wide and up |

<div class="note-info">
**Note** The default values of each breakpoint can be editted in the `styles.json` configuration file.
</div>

### Ranges

There are three available ranges you can use:

| Range | Description |
|-------|-------------|
| `only` | Will only apply to viewports within the current breakpoint and the next one. For example, `{class}-md-only` will only apply to viewports between 600px and 899px wide. |
| `down` | Will only apply to viewports within the current breakpoint range and down. For example, `{class}-md-down` will only apply to viewports that are 899px wide and smaller. |
| `up` | Will only apply to viewports from the current breakpoint and up. For example, `{class}-lg-up` will only apply to viewports that are 900px wide and larger. |

-------------------------------------------------------------------------------

## Removing Elements from the DOM at Breakpoints

Sometimes a component cannot be adapted to a different viewport width and it is easier to show and hide the component using the `show-{bp}-{dir}` classes. This works for most scenarios but can create problems in an Angular application when that component has data or expressions bound to it. In this scenario, the better strategy would be to remove the element from the DOM entirely. You can do this by using the {@link bltIfBp bltIfBp directive}.