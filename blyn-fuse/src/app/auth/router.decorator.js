(function () {

  'use strict';

  angular.module('fuse')
    .run(function ($rootScope, $state, Auth, $location) {
      // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
      $rootScope.$on('$stateChangeStart', function (event, next) {
        Auth.isLoggedInAsync(function (loggedIn) {
          if (next.authenticate && !loggedIn) {
            event.preventDefault();
            $state.go('app.auth_login');
            //$location.path('/login');
          }
        });//*/
      });
    });

})();
