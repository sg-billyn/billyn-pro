'use strict';

angular.module('blynApp')
  .directive('leftbar', () => ({
    templateUrl: 'components/leftbar/leftbar.html',
    restrict: 'E',
    controller: 'LeftbarController',
    controllerAs: 'lb'
  }));
