(function ()
{
    'use strict';

    angular
        .module('app.auth.lock', [])
        .config(config);

    /** @ngInject */
    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider)
    {
        // State
        $stateProvider.state('app.auth_lock', {
            url      : '/lock',
            views    : {
                'main@'                      : {
                    templateUrl: 'app/core/layouts/content-only.html',
                    controller : 'MainController as vm'
                },
                'content@app.auth_lock': {
                    templateUrl: 'app/auth/lock/lock.html',
                    controller : 'LockController as vm'
                }
            },
            bodyClass: 'lock'
        });

        // Translation
        $translatePartialLoaderProvider.addPart('app/auth/lock');

        // Navigation
        msNavigationServiceProvider.saveItem('auth.lock', {
            title : 'Lock Screen',
            state : 'app.auth_lock',
            weight: 7
        });
    }

})();