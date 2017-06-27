(function() {
  'use strict'

  /**
   * @ngdoc module
   * @name blt_datepicker
   * @description ngBoltJS Datepicker component.
   */
  angular.module('blt_datepicker', ['blt_core'])
    .filter('time', time)
    .directive('bltDatepicker', bltDatepicker);

  /**
   * @ngdoc directive
   * @name bltDatepicker
   * @module blt_datepicker
   * @since 1.0.0
   *
   * @description
   * Provides a pop-up date selection control that allows users to select year, month, day, hour, and minutes based on
   * the attributes defined on the directive.
   *
   * Use the `data-first-view` attribute to specifiy the initial granularity of the picker. For example, if you expect
   * your users to only pick days within the current month, it would make sense to set this value to `date` (valid
   * values are defined below), so the first view presented to this user would be the set of available days to pick for
   * the current month.
   *
   * Likewise, use the `data-last-view` to define the granularity to which the user must select a time. We will simply
   * end the user's selection when they've completed their selection of the given view. For example, if you are only
   * interested in the month and year of birth, you would set this value to `month`.
   *
   * You can also set a min and max date available for user selection. To set the min or max date, you simply bind one
   * of the attributes `data-min` or `data-max` to a model in your controller containing a date of some sort.
   * Valid formats include any value that can successfully be interpreted as a a date, including seconds from epoch as a
   * string or integer, or a JavaScript date object.
   *
   * @requires BltDatepickerUtils
   * @requires BltApi
   * @requires https://docs.angularjs.org/api/ng/service/$timeout
   * @requires https://docs.angularjs.org/api/ng/service/$document
   *
   * @param {string} data-model Binds the value of this form field to a property in the containing scope. Functionality is based on the Angular [ngModel](https://docs.angularjs.org/api/ng/directive/ngModel) directive.
   * @param {string} data-name Assigns a value to the name attribute of the form field that will be used during form traversal by ngBoltJS.
   * @param {string} data-label Assigns a value to the form field's label.
   * @param {boolean} [data-autofocus=false] Indicates whether or not this field should autofocus on page load.
   * @param {string} [data-change] Expression in the containing scope to invoke any time the value of this component changes. Based on the Angular [ngChange](https://docs.angularjs.org/api/ng/directive/ngChange) directive.
   * @param {string} [data-format=short] The [date filter format](https://docs.angularjs.org/api/ng/filter/date) to use.
   * @param {string} [data-first-view=year] The first calendar view to display (year|month|date|hours|minutes).
   * @param {string} [data-last-view=minutes] The last calendar view to display before closing and updating the model (year|month|date|hours|minutes).
   * @param {date} [data-max] The maximum date to display on the calendar. Any date above the specified date will be disabled.
   * @param {date} [data-min] The minimum date to display on the calendar. Any date below the specified date will be disabled. If `data-model` is null when the datepicker opens, it will open the calendar to minimum specified date.
   * @param {boolean} [data-required=false] Specifies if the form field is required.
   * @param {boolean} [data-disabled] Disables the field. Any value set in this attribute will cause the field to be disabled.
   * @param {number} [data-tabindex] Specifies the tab order of an element.
   *
   * @example
   * <example runnable="true">
   *   <css>
   *     .datepicker-example-container {
   *       overflow: visible;
   *       min-height: 16rem;
   *     }
   *   </css>
   *   <javascript>
   *     angular.module("bltDocs")
   *       .controller("DatePickerExCtrl", function(){
   *         var ctrl = this;
   *         ctrl.mindate = new Date();
   *         ctrl.firstview = "hours"
   *         ctrl.lastview = "month"
   *       });
   *   </javascript>
   *   <html>
   *     <div class="datepicker-example-container" ng-controller="DatePickerExCtrl as ctrl">
   *       <form class="form" novalidate name="dateTests">
   *         <div class="form-row">
   *           <blt-datepicker data-model="ctrl.dateModel"
   *                           data-label="Date Selection"
   *                           data-name="datepickerTest">
   *           </blt-datepicker>
   *           <div class="form-divider-vertical"></div>
   *           <blt-datepicker data-model="ctrl.dateModel2"
   *                           data-label="Date Selection with Restrictions"
   *                           data-min="ctrl.mindate"
   *                           data-first-view="{{ctrl.firstview}}"
   *                           data-name="datepickerTest2">
   *           </blt-datepicker>
   *           <div class="form-divider-vertical"></div>
   *           <blt-datepicker data-model="ctrl.dateModel3"
   *                           data-label="Date Selection Year and Month Only"
   *                           data-last-view="{{ctrl.lastview}}"
   *                           data-name="datepickerTest3"
   *                           data-format="MMMM yyyy">
   *           </blt-datepicker>
   *         </div>
   *       </form>
   *     </div>
   *   </html>
   * </example>
   *
   */
  function bltDatepicker( utils, api, $timeout, $document ) {
    var directive = {
      restrict: 'E',
      templateUrl: 'components/datepicker/datepicker.template.html',
      scope: {
        model: '=',
        name: '@',
        label: '@',
        autofocus: '<',
        change: '&',
        format: '@',
        firstView: '@',
        lastView: '@',
        max: '<',
        min: '<',
        required: '<',
        disabled: '<',
        tabindex: '<'
      },
      link: link
    }

    return directive;

    /**
     * @private
     * @function link
     * @description
     * Linking function. We'll use this function to initialize and manage the state of the date picker. We establish
     * all of our scope functions and register event callbacks.
     *
     * @param {object} scope Our directive's isolate scope.
     * @param {DOMelement} element Our directive element.
     * @param {object} attrs The raw attributes applied to our directive.
     */
    function link( scope, element, attrs ) {
      // If the user defined a minDate binding, set the initial value of our scope minDate and set up a watcher
      // to update this value as the model binding updates.
      if ( attrs.min != undefined ) {
        scope.minDate = toDate(scope.min);
        if ( angular.isFunction(scope.min) ) {
          scope.$watch(function() {
            return scope.min();
          }, onMinUpdated);
        } else {
          scope.$watch(function() {
            return scope.min;
          }, onMinUpdated);
        }
      }

      // If the user defined a maxDate binding, set the initial value of our scope maxDate and set up a watcher
      // to update this value as the model binding updates.
      if ( attrs.max != undefined ) {
        scope.maxDate = toDate(scope.max);
        if ( angular.isFunction(scope.max) ) {
          scope.$watch(function() {
            return scope.max();
          }, onMaxUpdated);
        } else {
          scope.$watch(function() {
            return scope.max;
          }, onMaxUpdated);
        }
      }


      // Public view state / model
      scope.active = false;
      scope.current = {};
      scope.current.view = scope.firstView || 'year';
      scope.format = scope.format ? scope.format : 'short';

      // Private view and date state
      var views = ['year', 'month', 'date', 'hours', 'minutes'];
      var step = 5;
      var now = new Date();
      var lastViewIndex = scope.lastView ? views.indexOf(scope.lastView) : (views.length - 1);
      var selectedDate = {};

      //// Public Methods //////////////////////

      scope.activate = activate;
      scope.canPickYear = canPickYear;
      scope.canPickMonth = canPickMonth;
      scope.canPickDay = canPickDay;
      scope.canPickHour = canPickHour;
      scope.canPickMinute = canPickMinute;
      scope.close = close;
      scope.isNow = isNow;
      scope.isSameDay = isSameDay;
      scope.isSameHour = isSameHour;
      scope.isSameMinutes = isSameMinutes;
      scope.isSameMonth = isSameMonth;
      scope.isSameYear = isSameYear;
      scope.next = next;
      scope.prev = prev;
      scope.setDate = setDate;

      /**
       * Activate the date picker on user click or 'Enter' keypress. Initialize our current.date scope model
       * and set up our selectedDate context model. Register 'esc' to cancel close the date picker session. This
       * function will be attached to the keypress and click listeners on our input field.
       */
      function activate(event) {
        if( !scope.disabled ) {
          if ( event.type == 'click' || (event.type == 'keypress' && event.keyCode == 13) ) {
            // set the current date
            if ( scope.model ) {
              scope.current.date = toDate(scope.model);
            } else {
              scope.current.date = new Date();
            }

            // If editing previously selected date, build the selected Date object
            // else build an empty selected date object.
            selectedDate.year = scope.model ? scope.current.date.getFullYear() : null;
            selectedDate.month = scope.model ? scope.current.date.getMonth() : null;
            selectedDate.date = scope.model ? scope.current.date.getDate() : null;
            selectedDate.hours = scope.model ? scope.current.date.getHours() : null;
            selectedDate.minutes = scope.model ? scope.current.date.getMinutes() : null;

            document.getElementById('blt-datepicker-input').blur();

            update();

            // add event listerner for keyup to close on esc keypress.
            $document.on('keyup', function( e ) {
              if ( e.keyCode == 27 ) {
                scope.close();
              }
            });
          }
        }
      };

      /**
       * Evaluates the given date and returns a boolean value dictating whether or not the year of the given date
       * falls between our specified min and max date years, if specified.
       *
       * @param date - The date to check. Should be a JavaScript date object.
       */
      function canPickYear( date ) {
        return inValidRange(date, 'year');
      }

      /**
       * Evaluates the given date and returns a boolean value dictating whether or not the year and month of the
       * given date date falls between specified min and max date year/month, if specified.
       *
       * @param date - The date to check. Should be a JavaScript date object.
       */
      function canPickMonth( date ) {
        return inValidRange(date, 'month');
      }

      /**
       * Evaluates the given date and returns a boolean value dictating whether or not the date falls between
       * our specified min and max dates, if specified.
       *
       * @param date - The date to check. Should be a JavaScript date object.
       */
      function canPickDay( date ) {
        return inValidRange(date, 'date') && date.getMonth() == scope.current.date.getMonth();
      }

      /**
       * Evaluates the given date and returns a boolean value dictating whether or not the date falls between
       * our specified min and max dates, if specified.
       *
       * @param date - The date to check. Should be a JavaScript date object.
       */
      function canPickHour( date ) {
        return inValidRange(date, 'hours');
      }

      /**
       * Evaluates the given date and returns a boolean value dictating whether or not the date falls between
       * our specified min and max dates, if specified.
       *
       * @param date - The date to check. Should be a JavaScript date object.
       */
      function canPickMinute( date ) {
        return inValidRange(date, 'minutes');
      }


      function inValidRange( date, view ) {
        var valid = true;
        if ( scope.minDate && scope.minDate.getTime() > date.getTime() ) {
          valid = isSame(scope.minDate, date, view);
        }
        if ( scope.maxDate && scope.maxDate.getTime() < date.getTime() ) {
          valid &= isSame(scope.maxDate, date, view);
        }
        return valid;
      }

      /**
       * Returns true if the given dates are the same, starting with the given view. For example, if the dates
       * Jan 2, 2016 13:32:10 and Jan 2, 2016 12:34:12 were passed in, the evaluations per view are as follows:
       *
       *  year - true
       *  month - true
       *  date - true
       *  hours - false
       *  minutes - false
       *
       *  For the minutes view to resolve to true, the given timestamps must be the same when rounded down to the
       *  next 5 minute interval.
       *
       * @param date1 - The first date to check.
       * @param date2 - The second date to check.
       * @param view - The view to use in the evaluation.
       * @returns {boolean} True if the given dates are the same in the context of the given view.
       */
      function isSame( date1, date2, view ) {
        var is = true;
        //noinspection FallThroughInSwitchStatementJS
        switch ( view ) {
          case 'minutes':
            is &= ~~(date1.getMinutes() / 5) === ~~(date2.getMinutes() / 5);
          /*falls through*/
          case 'hours':
            is &= date1.getHours() === date2.getHours();
          /*falls through*/
          case 'date':
            is &= date1.getDate() === date2.getDate();
          /*falls through*/
          case 'month':
            is &= date1.getMonth() === date2.getMonth();
          /*falls through*/
          case 'year':
            is &= date1.getFullYear() === date2.getFullYear();
        }
        return is;
      };

      /**
       * Sets the selectedDate context model with the given date based on the current view and open the next
       * view.
       * @param date - The date to pull a date component out of based on scope.current.view.
       */
      function setDate( date ) {

        switch ( scope.current.view ) {
          case 'minutes':
            if ( canPickMinute(date) ) {
              selectedDate.minutes = date.getMinutes();
              scope.current.date.setMinutes(date.getMinutes());
              openNextView();
            }
            break;
          case 'hours':
            if ( canPickHour(date) ) {
              selectedDate.hours = date.getHours();
              scope.current.date.setHours(date.getHours());
              openNextView();
            }
            break;
          case 'date':
            if ( canPickDay(date) ) {
              selectedDate.date = date.getDate();
              scope.current.date.setDate(date.getDate());
              openNextView();
            }
            break;
          case 'month':
            if ( canPickMonth(date) ) {
              selectedDate.month = date.getMonth();
              scope.current.date.setMonth(date.getMonth());
              openNextView();
            }
            break;
          case 'year':
            if ( canPickYear(date) ) {
              selectedDate.year = date.getFullYear();
              scope.current.date.setFullYear(date.getFullYear());
              openNextView();
            }
            break;
        }

      };

      /**
       * Closes the date picker. Returns focus to our input field and resets the current view. Deregisters the
       * keyup listener.
       */
      function close() {
        element.addClass('leave');

        // reset date picker after closing animation
        $timeout(function() {
          // deactivate
          scope.active = false;

          // reset view to first view
          scope.current.view = scope.firstView ? scope.firstView : 'year';

          // focus input field
          document.getElementById('blt-datepicker-input').focus();

          element.removeClass('leave');

          // remove keyup event listener
          $document.off('keyup');
        }, 300);
      };

      /**
       * Updates the current date component by the current delta based on the current view. Calling next(3) while
       * on the 'year' view will advance the date by 3 years.
       * @param delta - (Optional) The number to advance the date component by. Defaults to 1 if not provided.
       */
      function next( delta ) {
        var date = scope.current.date;
        delta = delta || 1;
        switch ( scope.current.view ) {
          case 'year':
            date.setFullYear(date.getFullYear() + delta);
            break;
          case 'month':
            date.setFullYear(date.getFullYear() + delta);
            break;
          case 'date':
            date.setMonth(date.getMonth() + delta);
            break;
          case 'hours':
          /*falls through*/
          case 'minutes':
            date.setHours(date.getHours() + delta);
            break;
        }
        update();
      }

      /**
       * Inverse of 'next'. Calling prev(3) while on the year view will subtract 3 from the currently selected
       * year.
       * @param delta - (Optional) The number to advance the date component by. Defaults to 1 if not provided.
       */
      function prev( delta ) {
        return scope.next(-delta || -1);
      };


      /**
       * Checks to see if the given date is after the time specified in the data-min directive attribute.
       * @param date - The date to check.
       * @returns {boolean} True if the given date is after our data-min directive attribute.
       */
      function isAfter( date ) {
        return !!(scope.minDate) && utils.isAfter(date, scope.minDate);
      };

      /**
       * Checks to see if the given date is prior to the time specified in the data-max directive attribute.
       * @param date - The date to check.
       * @returns {boolean} True if the given date is prior to our data-max directive attribute.
       */
      function isBefore( date ) {
        return !!(scope.maxDate) && utils.isBefore(date, scope.maxDate);
      };

      /**
       * Returns true if the year component of the given date match the year component of our selectedDate
       * context model.
       * @param date - The date to check.
       * @returns {boolean} True if date.getFullYear() === selectedDate.year.
       */
      function isSameYear( date ) {
        return selectedDate.year === date.getFullYear();
      };

      /**
       * Returns true if the month component of the given date match the month component of our selectedDate
       * context model.
       * @param date - The date to check.
       * @returns {boolean} True if date.getMonth() === selectedDate.month.
       */
      function isSameMonth( date ) {
        return selectedDate.month === date.getMonth();
      };

      /**
       * Returns true if the date (day) component of the given date match the date (day) component of our selectedDate
       * context model.
       * @param date - The date to check.
       * @returns {boolean} True if date.getDate() === selectedDate.date.
       */
      function isSameDay( date ) {
        return selectedDate.date === date.getDate();
      };

      /**
       * Returns true if the hours component of the given date match the hours component of our selectedDate
       * context model.
       * @param date - The date to check.
       * @returns {boolean} True if date.getHours() === selectedDate.hours.
       */
      function isSameHour( date ) {
        return selectedDate.hours === date.getHours();
      };

      /**
       * Returns true if the minutes component of the given date match the minutes component of our selectedDate
       * context model.
       * @param date - The date to check.
       * @returns {boolean} True if date.getMinutes() === selectedDate.minutes.
       */
      function isSameMinutes( date ) {
        return selectedDate.minutes === date.getMinutes();
      };

      /**
       * Returns true if the given date is the same as the current date in regards to the current view. For
       * example if the view is 'month' then this function will evaluate to true for any date that is within
       * the current month.
       *
       * @param date - The date to check.
       * @returns {boolean} True if the given date is determined to be the same as the current date in regards
       * to the current view.
       */
      function isNow( date ) {
        return isSame(date, new Date(), scope.current.view);
      };

      //////////////////////////////
      // Private Functions
      //////////////////////////////

      /**
       * Invoked when we identify a new value being saved into our model.
       */
      function onChange() {
        if ( scope.change ) {
          $timeout(scope.change, 0);
        }
      }

      /**
       * Updates the scope's visible date UI elements based on the current date.
       */
      function update() {
        var date = scope.current.date;

        switch ( scope.current.view ) {
          case 'year':
            scope.years = utils.getVisibleYears(date);
            break;
          case 'month':
            scope.months = utils.getVisibleMonths(date);
            break;
          case 'date':
            scope.weeks = utils.getVisibleWeeks(date);
            break;
          case 'hours':
            scope.hours = utils.getVisibleHours(date);
            break;
          case 'minutes':
            scope.minutes = utils.getVisibleMinutes(date, 5);
            break;
        }

        if ( !scope.active ) {
          scope.active = true;

          element.addClass('enter');
          $timeout(function() {
            element.removeClass('enter');
          }, 300);
        }
      }

      /**
       * Go to next view or save our current date and close date picker if we're already on the last view.
       */
      function openNextView() {
        var viewIndex = views.indexOf(scope.current.view);

        if ( (viewIndex + 1) <= lastViewIndex ) {
          scope.current.view = views[viewIndex + 1];
          update();
        } else {
          // update the model
          var newModel = scope.current.date.getTime().toString();
          if ( newModel != scope.model ) {
            scope.model = newModel;
            onChange();
          }
          // Close the date picker
          scope.close();
        }
      }

      /**
       * Updates our scope.minDate to represent the current value of scope.min.
       */
      function onMinUpdated() {
        scope.minDate = toDate(scope.min);
      }

      /**
       * Updates our scope.maxDate to represent the current value of scope.max.
       */
      function onMaxUpdated() {
        scope.maxDate = toDate(scope.max);
      }

      /**
       * Attempts to interpret the given value as a date. Incoming value can be one of: Number representing
       * milliseconds from epoch, a String containing either a formatted date, or seconds from epoch, a JavaScript
       * date object, or a function that returns one of the aforementioned formats.
       */
      function toDate( inDate ) {
        var outDate;
        if ( inDate ) {
          if ( angular.isString(inDate) ) {
            if ( isNaN(inDate) ) {
              outDate = new Date(inDate);
              if ( !utils.isValidDate(outDate) ) {
                outDate = new Date(inDate.replace(/['"]+/g, ''));
              }
            } else {
              var msFromEpoch = parseInt(inDate, 10);
              outDate = new Date(msFromEpoch);
            }
          } else if ( angular.isNumber(inDate) ) {
            outDate = new Date(Math.floor(inDate));
          } else if ( angular.isDate(inDate) ) {
            outDate = new Date(inDate.getTime());
          } else if ( angular.isFunction(inDate) ) {
            outDate = toDate(inDate());
          }
        }
        return outDate;
      }
    }
  }

  bltDatepicker.$inject = ['bltDatepickerUtils', 'BltApi', '$timeout', '$document'];

  /**
   *   filter
   * @name time
   * @desc Formats the hour and minute components of the given date into standard 24 hour time.
   * @returns {Function} Our time filter.
   *
   */
  function time() {
    function format( date ) {
      return ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2);
    }

    return function( date ) {
      if ( !(date instanceof Date) ) {
        date = new Date(date);
        if ( isNaN(date.getTime()) ) {
          return undefined;
        }
      }
      return format(date);
    };
  }

})();