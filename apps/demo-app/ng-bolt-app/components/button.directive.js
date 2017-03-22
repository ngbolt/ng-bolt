(function() {
  'use strict';

  angular.module('demo.components')
    .directive('button', btnDirective);

  /**
   * @ngdoc directive
   * @area app
   * @name btnDirective
   * @module appComponents
   */
  function btnDirective() {
    var directive = {
      restrict: 'E',
      link: linkFn
    };

    return directive;

    function linkFn( scope, element, attrs ) {
      var classname;

      switch ( attrs.style ) {
        case 'text':
          classname = (attrs.hasOwnProperty('submit') && attrs.submit !== false) ? 'btn-text-submit' : 'btn-text';
          break;
        case 'solid':
          classname = (attrs.hasOwnProperty('submit') && attrs.submit !== false) ? 'btn-solid-submit' : 'btn-solid';
          break;
        case 'icon':
          classname = 'btn-icon';
      }

      element.addClass(classname);

      if ( attrs.style === 'icon' && attrs.hasOwnProperty('icon') ) {
        var iconSpan = '<span class="fa ' + attrs.icon + '"></span>';
        element.html(iconSpan);
      } else if ( attrs.style === 'icon' && !attrs.hasOwnProperty('icon') ) {
        console.error('Please provide class name for your icon.');
      }

      element.removeAttr('data-submit');
      element.removeAttr('data-type');
    }
  }

})();