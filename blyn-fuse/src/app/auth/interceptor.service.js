'use strict';

(function () {

  function authInterceptor($rootScope, $q, $cookieStore, $injector) {

    var state;
    return {
      // Add authorization token to headers
      request: function (config) {

        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {

        if (response.status === 401) {
          (state || (state = $injector.get('$state'))).go('app.auth_login');
          // remove any stale tokens
          $cookieStore.remove('token');
        }
        return $q.reject(response);
      }
    };

  }

  angular.module('app.auth')
    .factory('authInterceptor', authInterceptor);

})();
