(function() {
  'use strict';

  angular
    .module('blt_core')
    .component('bltSpinner', bltSpinner());

  /**
   * @ngdoc directive
   * @name bltSpinner
   * @module blt_core
   * @description The ngBoltJS Spinner provides a simple loading spinner.
   *
   * @example
   * <example runnable="true">
   *   <html>
   *     <div class="grid-block grid-vertical grid-center">
   *       <blt-spinner></blt-spinner>
   *     </div>
   *   </html>
   * </example>
   */
  function bltSpinner() {
    return {
      template: '<svg class="spinner" viewBox="0 0 66 66">' +
      '<circle stroke-linecap="round" cx="33" cy="33" r="30"></circle>' +
      '</svg>'
    };
  }
})();