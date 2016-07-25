'use strict';

angular.module('blynApp.auth', ['blynApp.constants', 'blynApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
