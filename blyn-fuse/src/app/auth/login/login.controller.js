(function () {
    'use strict';

    angular
        .module('app.auth.login')
        .controller('LoginController', LoginController);

    /** @ngInject */
    function LoginController($scope,$location, Auth) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                    email: $scope.user.email,
                    password: $scope.user.password
                })
                    .then(function () {
                        // Logged in, redirect to home
                        $location.path('/');
                    })
                    .catch(function (err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

        if (Auth.isLoggedIn()) {
            $location.path('/');
        }
    }
})();