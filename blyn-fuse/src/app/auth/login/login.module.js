(function ()
{
    'use strict';

    angular
        .module('app.auth.login', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.auth_login', {
            url      : '/login',
            views    : {
                'main@'                       : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_login': {
                    templateUrl: 'app/auth/login/login.html',
                    controller : 'LoginController as vm'
                }
            },
            bodyClass: 'login'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/auth/login');

        /*

        // Navigation
        msNavigationServiceProvider.saveItem('auth', {
            title : 'Authentication',
            icon  : 'icon-lock',
            weight: 1
        });

        msNavigationServiceProvider.saveItem('auth.login', {
            title : 'Login',
            state : 'app.auth_login',
            weight: 1
        });
        */
    }

})();