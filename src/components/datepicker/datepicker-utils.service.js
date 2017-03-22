(function() {
  'use strict'

  angular
    .module('blt_datepicker')
    .factory('bltDatepickerUtils', bltDatepickerUtils);

  /**
   * @ngdoc service
   * @name BltDatepickerUtils
   * @module blt_datepicker
   * @description Helper functions to support the {@link bltDatepicker}.
   */
  function bltDatepickerUtils() {
    var createNewDate = function( year, month, day, hour, minute ) {
      // without any arguments, the default date will be 1899-12-31T00:00:00.000Z
      return new Date(year | 0, month | 0, day | 0, hour | 0, minute | 0);
    };

    var service = {};

    service.getVisibleYears = getVisibleYears;
    service.getVisibleMonths = getVisibleMonths;
    service.getVisibleWeeks = getVisibleWeeks;
    service.getVisibleHours = getVisibleHours;
    service.getVisibleMinutes = getVisibleMinutes;
    service.isAfter = isAfter;
    service.isBefore = isBefore;
    service.isValidDate = isValidDate;

    return service;

    /**
     * @ngdoc method
     * @name BltDatepickerUtils#getVisibleYears
     * @summary Gets years to display in the years view of the open datepicker.
     * @description Gets years to display in the years view of the open datepicker.
     *
     * @param {date} date The current value of the selected date.
     *
     * @returns {array} Array of years to display in the view.
     */
    function getVisibleYears( date ) {
      date.setFullYear(date.getFullYear() - 6);
      var year = date.getFullYear();
      var years = [];
      var pushedDate;
      for ( var i = 0; i < 15; i++ ) {
        pushedDate = createNewDate(year);
        years.push(pushedDate);
        year++;
      }
      return years;
    }

    /**
     * @ngdoc method
     * @name BltDatepickerUtils#getVisibleMonths
     * @description Gets months to display in the months view of the open datepicker.
     *
     * @param {date} date The current value of the selected date.
     *
     * @returns {array} Array of months to display in the view.
     */
    function getVisibleMonths( date ) {
      var year = date.getFullYear();
      var months = [];
      var pushedDate;
      for ( var month = 0; month < 12; month++ ) {
        pushedDate = createNewDate(year, month, 1);
        months.push(pushedDate);
      }
      return months;
    }

    /**
     * @ngdoc method
     * @name BltDatepickerUtils#getVisibleWeeks
     * @description Gets weeks to display in the weeks view of the open datepicker.
     *
     * @param {date} date The current value of the selected date.
     *
     * @returns {array} Array of weeks to display in the view.
     */
    function getVisibleWeeks( date ) {
      var year = date.getFullYear();
      var month = date.getMonth();

      // set date to start of the month
      var newDate = createNewDate(year, month, 1);
      var day = 1;

      if ( newDate.getDay() !== 0 ) {
        // date is not sunday, reset to beginning of week
        var day = newDate.getDate() - newDate.getDay();
        newDate.setDate(day);
      }

      // Get the weeks of the month
      var weeks = [];
      for ( var week = 0; week < 6; week++ ) {
        // If date is new year or next month stop getting weeks
        if ( week > 4 && (newDate.getFullYear() > year || newDate.getMonth() > month) ) {
          break;
        }

        // Get days of the week
        var days = [];
        for ( var weekday = 0; weekday < 7; weekday++ ) {
          days.push(newDate);

          // next day
          day++;

          // update new date to next day
          newDate = createNewDate(year, month, day);
        }

        // Add week to weeks
        weeks.push(days);
      }
      return weeks;
    }

    /**
     * @ngdoc method
     * @name BltDatepickerUtils#getVisibleHours
     * @description Gets hours to display in the hours view of the open datepicker.
     *
     * @param {date} date The current value of the selected date.
     *
     * @returns {array} Array of hours to display in the view.
     */
    function getVisibleHours( date ) {
      date = new Date(date || new Date());
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hours = [];
      var hour, pushedDate;
      for ( hour = 0; hour < 24; hour++ ) {
        pushedDate = createNewDate(year, month, day, hour);
        hours.push(pushedDate);
      }
      return hours;
    }

    /**
     * @ngdoc method
     * @name BltDatepickerUtils#getVisibleMinutes
     * @description Gets minutes to display in the minutes view of the open datepicker.
     *
     * @param {date} date The current value of the selected date.
     *
     * @returns {array} Array of minutes to display in the view.
     */
    function getVisibleMinutes( date, step ) {
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      var hour = date.getHours();
      var minutes = [];
      var minute, pushedDate;
      for ( minute = 0; minute < 60; minute += step ) {
        pushedDate = createNewDate(year, month, day, hour, minute);
        minutes.push(pushedDate);
      }
      return minutes;
    }

    /**
     * @ngdoc method
     * @name BltDatepickerUtils#isAfter
     * @description Checks if selected date is after the current value of the model.
     *
     * @param {date} model The current value of the datepicker's model.
     * @param {date} date The selected date.
     *
     * @returns date, boolean
     */
    function isAfter( model, date ) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return model && model.getTime() >= date.getTime();
    }

    /**
     * @ngdoc method
     * @name BltDatepickerUtils#isBefore
     * @description Checks if selected date is before the current value of the model.
     *
     * @param {date} model The current value of the datepicker's model.
     * @param {date} date The selected date.
     *
     * @returns date, boolean
     */
    function isBefore( model, date ) {
      model = (model !== undefined) ? new Date(model) : model;
      date = new Date(date);
      return model.getTime() <= date.getTime();
    }

    /**
     * @ngdoc method
     * @name BltDatepickerUtils#isValidDate
     * @description Checks if date is valid.
     *
     * @param {date} value A date.
     *
     * @returns boolean
     */
    function isValidDate( value ) {
      // Invalid Date: getTime() returns NaN
      return value && !(value.getTime && value.getTime() !== value.getTime());
    }
  }
})();