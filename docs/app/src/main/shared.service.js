(function() {
'use strict';

  /**
   * @ngdoc service
   * @name Shared
   * @module bltDocs.main
   */
  function Shared() {
    this.sidebarData = [];
    this.showSidebar = false;
    this.currentPage = '';
  }

  angular
    .module('main')
    .service('Shared', Shared);

  Shared.$inject = [];
})();