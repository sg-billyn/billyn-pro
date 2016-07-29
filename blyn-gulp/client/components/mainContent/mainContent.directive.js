'use strict';

angular.module('blynApp')
  .directive('maincontent', () => ({
    templateUrl: 'components/mainContent/mainContent.html',
    restrict: 'E',
    controller: 'MainContentController',
    controllerAs: 'vm'
  }));
