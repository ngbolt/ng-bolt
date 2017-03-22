/**
 * @ngdoc directive
 * @name bltForm
 * @module blt_core
 * @since 1.0.0
 *
 * @description
 * Forms in ngBoltJS are really just HTML forms with some additional styling and built-in validation. This page
 * will cover the recommended structure for forms in an ngBoltJS application, as well as some tips and pointers on
 * handling data validation and form submission.
 *
 * To use Forms in your ngBoltJS application, simply include the required elements and form controls and bind
 * functionality and data to a controller.
 *
 * ### Best Practices and Recommendations
 * #### Submission
 * Form submission can either be triggered by binding a 'submit' action to a button in your form using
 * [ngClick](https://docs.angularjs.org/api/ng/directive/ngClick) or to the
 * [ngSubmit](https://docs.angularjs.org/api/ng/directive/ngSubmit) directive on the form element itself. In
 * the example above, we use the `ng-click` binding in our submit button. It doesn't really matter which of these you
 * use as long as you follow these guidelines regarding form buttons and form submission state:
 *
 * 1. When adding buttons to your form, please keep in mind that the first button that is encountered in the form
 * that either has no type defined, or is defined as type "submit" will be interpreted by the browser (and AngularJS)
 * as your submit button. Clicking that button will set the form state to `$submitted`, which will trigger all ngBoltJS
 * error messaging. If you attach your "submit" action to the ng-submit directive on the form, this will also invoke
 * that action. If you have buttons in your form that you do not intend to use to submit the form, you must set their
 * type to something other than "submit". (See the Cancel button in the example below.)
 *
 * 2. It is up to the developer to correctly handle form validation states in their "submit" action. This can be
 * done by checking the $invalid attribute on the form object. You can either reference the form through the name
 * bound to it in your form template html, or you could pass the form object into the submit function in your
 * ng-submit/ng-click binding. See the example below.
 *
 * <div class="note-tip">
 * **Tip** For more information on default Angular JS form behavior and validation, refer to their
 * [documentation on Forms](https://docs.angularjs.org/guide/forms).
 * </div>
 *
 * #### Validation
 *
 * Common form validation and error messaging is included by default in all ngBoltJS form components. Any supported
 * attribute (max, maxLength, pattern, etc) comes with included error messaging that will be presented any time the
 * form component has been touched or the user has attempted form submission. You can also supply custom validation
 * for a select number of our form components using the {@link bltValidate} directive.
 *
 * <div class="note-info">
 * **Note** For the best user experience when using ngBoltJS forms, we highly recommend adding the `novalidate`
 * attribute to your form, which prevents the standard HTML form validation and error messaging.
 * </div>
 *
 * @classname {element} form The main container of your form. Must be used on an HTML `<form>` tag.
 *
 * @classname {element} [form-heading] A heading to divide your form into sections. Should be used on an HTML `<h2>` or `<h3>` tag.
 *
 * @classname {element} [form-row] Combine multiple form controls into one row. Should be used on an HTML `<div>` tag.
 *
 * @classname {element} [form-col-sm-only] When viewport width is narrow, form-rows will stack.
 *
 * @classname {element} [form-divider] Add a horizontal border between form controls or form-rows. _By default, forms do not add borders to form controls but it is considered a best practice that you add them explicitly._
 *
 * @classname {element} [form-divider-vertical] Add a vertical border between form controls in a form row. _By default, forms do not add borders to form controls but it is considered a best practice that you add them explicitly._
 *
 * @classname {element} [form-spacer] Add horizontal spacing between form controls or other elements contained in a
 * form. Should be used on an HTML `<hr>` tag.
 *
 * @classname {element} [form-submit] Submit button that expands to the width of the form. _Use only if the form is
 * stand-alone and not included in a modal or panel - use the modal or panel action buttons for form submittal in
 * those cases._ Should be used on an HTML `<button>` tag.
 *
 * @example <caption>Example Form</caption>
 * <example runnable="true">
 *   <javascript>
 *      angular.module('bltDocs')
 *        .controller('FormExCtrl', FormExCtrl);
 *
 *        FormExCtrl.$inject = ['BltApi'];
 *
 *        function FormExCtrl(bltApi){
 *           var ctrl = this;
 *        
 *           ctrl.arrayOfOptions = ['Dropdown1', 'Dropdown2', 'Dropdown3', 'Dropdown4', 'Dropdown5', 
 *             'Dropdown6', 'Dropdown7'];
 *         
 *           ctrl.cancel = cancel;
 *           ctrl.submit = submit;
 *         
 *           activate();
 *        
 *           // Public Functions
 *           function cancel(){
 *               //Close the form modal / view or clear out values to signify a form reset / cancel.
 *           }
 *        
 *           function submit(){
 *               // First we check the form to ensure that it is valid.
 *               if( !ctrl.myForm.$invalid ){
 *                   // Form is valid. Do something with the data. As part of a successful submit, 
 *                   //we'll also typically switch to a new view, or close the modal that was containing the form.
 *                   console.log('form valid. submitting.');
 *               } else {
 *                   // Form is invalid. All relevant error messages will now be showing in the form.
 *                   console.log('form invalid');
 *               }
 *           }
 *         
 *           // Private Functions
 *           // Activate the controller. Initialize form values. In this example demonstrate setting them as 
 *           // undefined, hard coded values, or values pulled from a service.
 *           function activate(){
 *               //Hard coded initial value
 *               ctrl.textField = "ABC123";
 *               ctrl.checkboxFlag = true;
 *               //Undefined
 *               ctrl.option = undefined;
 *               ctrl.select = ctrl.arrayOfOptions[0];
 *           }
 *        }
 *   </javascript>
 *   <html>
 *     <div ng-controller="FormExCtrl as ctrl">
 *       <form name="ctrl.myForm" class="form" novalidate>
 *           <!-- Form titles / headings should be styled with the "form-heading" class. -->
 *           <h2 class="form-heading">Contact Info</h2>
 *           <!-- A text field, labeled "Required Text Field" and bound to the scope property ctrl.textField2".
 *           This field is marked as required and has a pattern defined. Valid values would be ABC123, XYZ789, etc. -->
 *           <blt-textfield data-name="textfield"
 *                          data-required="true"
 *                          data-pattern="[A-Z]{3}[0-9]{3}"
 *                          data-label="Required Text Field"
 *                          data-model="ctrl.textField">
 *           </blt-textfield>
 *
 *           <!-- Adds a border between form controls. -->
 *           <hr class="form-divider">
 *           <!-- A simple checkbox bound to ctrl.checkboxFlag with the label of "Checkbox". -->
 *           <blt-checkbox-radio data-name="checkbox"
 *                               data-label="Checkbox"
 *                               data-model="ctrl.checkboxFlag">
 *           </blt-checkbox-radio>
 *
 *           <!-- Use form-heading to divide groups of controls -->
 *           <h2 class="form-heading">Select an option</h2>
 *
 *           <!-- A group of three radio boxes, presented in a horizontal row. -->
 *           <div class="form-row">
 *               <blt-checkbox-radio data-name="option1"
 *                                   data-label="Option 1"
 *                                   data-model="ctrl.option"
 *                                   data-type="radio"
 *                                   data-value="option1"
 *                                   data-required="true">
 *               </blt-checkbox-radio>
 *
 *               <!-- Adds a border between form controls. -->
 *               <div class="form-divider-vertical"></div>
 *
 *               <blt-checkbox-radio data-name="option2"
 *                                   data-label="Option 2"
 *                                   data-model="ctrl.option"
 *                                   data-type="radio"
 *                                   data-value="option2"
 *                                   data-required="true">
 *               </blt-checkbox-radio>
 *
 *               <!-- Adds a border between form controls. -->
 *               <div class="form-divider-vertical"></div>
 *
 *               <blt-checkbox-radio data-name="option3"
 *                                   data-label="Option 3"
 *                                   data-model="ctrl.option"
 *                                   data-type="radio"
 *                                   data-value="option3"
 *                                   data-required="true">
 *               </blt-checkbox-radio>
 *           </div>
 *
 *           <!-- Use form-heading to divide groups of controls -->
 *           <h2 class="form-heading">Category</h2>
 *
 *           <!-- Standard select dropdown. The user will be presented with the options contained in the arrayOfOptions. -->
 *           <blt-dropdown data-type="select"
 *                         data-name="dropdown"
 *                         data-label="Select a Value"
 *                         data-options="ctrl.arrayOfOptions"
 *                         data-model="ctrl.select">
 *           </blt-dropdown>
 *
 *           <!-- Creates a section of padding between form contents and button row. -->
 *           <div class="form-spacer"></div>
 *
 *           <!-- Cancel and Submit buttons at bottom, right-justified. -->
 *           <div class="btn-row">
 *              <button type="button" class="btn-solid" ng-click="ctrl.cancel()">Cancel</button>
 *              <button type="submit" class="btn-solid-submit" ng-click="ctrl.submit()">Submit</button>
 *           </div>
 *       </form>
 *     </div>
 *   </html>
 * </example>
 *
 * @example <caption><h3>With Media Query</h3>
 * <p>See the {@link breakpoints Media Queries Guide} for more information using media queries.
 * </p>
 * </caption>
 * <example>
 *   <html>
 *      <form name="Example.myForm" class="form" novalidate>
 *          ...
 *          <div class="form-col-sm-only">
 *              <!-- Formatted for small screens only -->
 *                  ...
 *          </div>
 *      </form>
 *  </div>
 *   </html>
 * </example>
 */