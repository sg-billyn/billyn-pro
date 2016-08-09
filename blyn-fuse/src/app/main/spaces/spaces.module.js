(function () {
    'use strict';

    angular
        .module('app.spaces', [
            //'flow'
        ])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider, msApiProvider, $stateProvider, $translatePartialLoaderProvider) {

        // State
        $stateProvider
            .state('app.spaces', {
                url: '/spaces',
                authenticate: true,
                resolve: {
                    mySpaces: function (apiResolver,$rootScope) {
                        return apiResolver.resolve('space@getMySpaces')
                            .then(function (mySpaces) {
                                $rootScope.current = $rootScope.current || {};
                                $rootScope.current.mySpaces = mySpaces;
                            });
                    }
                }
            })
            .state('app.spaces.dashboard', {
                url: '/dashboard',
                authenticate: true,
                views    : {
                    'content@app': {
                        templateUrl: 'app/main/spaces/views/dashboard/dashboard.html',
                        controller : 'SpaceDashboardController as vm'
                    }
                },
                bodyClass: 'ecommerce'
            });

        // Translation
        $translatePartialLoaderProvider.addPart('app/main/spaces');

        // Api
        //msApiProvider.register('apiSpace', [api.space]);

        // Navigation
        msNavigationServiceProvider.saveItem('spaces', {
            title: 'Spaces',
            group: true,
            weight: 2
        });

        msNavigationServiceProvider.saveItem('spaces.dashboard', {
            title: 'Dashboard',
            state: 'app.spaces.dashboard',
            weight   : 2
        });

    }

})();