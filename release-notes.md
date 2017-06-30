# v2.1.0 Release Notes  

## Overview  
  
This release reflects the efforts of normalizing and standardizing the component attributes of ngBolt. Each component - checkbox-radio, counter, datepicker, dropdown, fileloader, textfield and toggleswitch - has had its attributes refactored so that they utilize the ng-attr directive in their respective templates. Prior to this, attributes were initialized using directives in the*core.utilities.js*file. By switching to the use of the ng-attr directive, the attributes now take advantage of built-in angular features. The majority of the changes have to do with switching interpolated attributes to direct binding attributes; that is, changing the type of binding from `'@'` to `'<'`. These binding changes translate into **breaking changes** that developers should take careful note of if they're using component attributes in their ngBolt applications.**Additional attributes have been added to components**. In this version, we have also **fixed multiple issues** with the previous build that were opened on GitHub.

## Breaking Changes

Where possible, [binding](https://docs.angularjs.org/api/ng/service/$compile#-scope-) values have been changed to one-way bindings, denoted by `'<'`. The `@` text binding is now reserved almost strictly for attributes that are defined with a string literal and assigned via interpolation.

For example, in *textfield.module.js*, the line   
  
`minlength: '@'`  
  
has been modified into  
  
`minlength: '<'`  

In the template files, such as *textfield.template.html*, lines like  
  
`blt-minlength="{{$ctrl.minlength}}"`  
  
reflect the attribute change by being modified into  
  
`ng-attr-minlength="{{$ctrl.minlength}}"`  

**What does  this mean for developers?** Say that, in a previous version, you were implementing the minlength attribute in a textfield component. Within your blt-textfield directive, you had a line that would look similar to   
   
`data-minlength="{{ctrl.textMin}}"`   
   
(assuming that ctrl.textMin is a variable in your controller that is set to some numerical value). In this new version, minlength no longer uses the text binding that requires the use of interpolation, denoted by double braces `{{ }}`. Instead, you can use a direct binding assignment, which has no use for interpolation braces:
 
`data-minlength="ctrl.textMin"`   
  
**To summarize**: attributes that switched from `'@'` bindings to `'<'` no longer require interpolation when their values are being set in the html of your application. In datepicker, it is important to note that two of its attributes now go by different names.   

### Binding Changes from `'@'` to `'<'` in Component Attributes   
   
* Checkbox-Radio
  * autofocus
  * required
  * tabindex

* Counter 
  * size
  * min
  * max
  * selectOnFocus
  * required
  * autofocus

* Datepicker
  * autofocus
  * required
  * **Note**: Use of `data-min-date` and `data-max-date` should be changed to `data-min` and `data-max`, respectively

* Dropdown
  * autofocus
  * required
  * tabindex

* Fileloader
  * autofocus
  * required
  * tabindex

* Textfield
  * minlength
  * maxlength
  * min
  * max
  * rows
  * required
  * autofocus
  * autocomplete
  * autocorrect
  * spellcheck
  * tabindex
  * step

## Attributes Added to Certain Components 

* Counter
  * `tabindex:'<'`
  
* Datepicker
  * `tabindex:'<'`

* Fileloader
  * `change:'&'`
  * `validate:'<'`

* Toggleswitch
  * `name:'@'`
  * `tabindex:'<'`

## Issues Resolved

[Issue #30](https://github.com/ngbolt/ng-bolt/issues/30) : autofocus attribute causes chaos on the select dropdown  
[Issue #34](https://github.com/ngbolt/ng-bolt/issues/34) : "blt-required" does not update with dynamic data  
[Issue #51](https://github.com/ngbolt/ng-bolt/issues/51) : "Max length" attribute does not work on text areas