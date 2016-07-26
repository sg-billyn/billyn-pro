'use strict';

angular.module('blynApp')
  .config(function($stateProvider) {
    $stateProvider.state('main', {
      url: '/',
      template: '<main></main>',
      authenticate: true
    });
  });
