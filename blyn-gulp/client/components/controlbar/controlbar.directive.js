'use strict';

angular.module('blynApp')
  .directive('controlbar', () => ({
    templateUrl: 'components/controlbar/controlbar.html',
    restrict: 'E',
    controller: 'ControlbarController',
    controllerAs: 'cb'
  }));
