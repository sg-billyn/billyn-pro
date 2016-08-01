(function () {
    'use strict';

    angular
        .module('app.auth',
        [
            'app.auth.login',
            'app.auth.login-v2',
            'app.auth.register',
            'app.auth.register-v2',
            'app.auth.forgot-password',
            'app.auth.reset-password',
            'app.auth.lock'
        ])
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        })
        
})();