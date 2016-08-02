(function ()
{
    'use strict';

    angular
        .module('app.auth.reset-password', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.auth_reset-password', {
            url      : '/reset-password',
            views    : {
                'main@'                                : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_reset-password': {
                    templateUrl: 'app/auth/reset-password/reset-password.html',
                    controller : 'ResetPasswordController as vm'
                }
            },
            bodyClass: 'reset-password'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/auth/reset-password');

        // Navigation
        msNavigationServiceProvider.saveItem('auth.reset-password', {
            title : 'Reset Password',
            state : 'app.auth_reset-password',
            weight: 6
        });
    }

})();