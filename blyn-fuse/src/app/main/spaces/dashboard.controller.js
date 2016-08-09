(function ()
{
    'use strict';

    angular
        .module('app.spaces')
        .controller('SpaceDashboardController', SpaceDashboardController);

    /** @ngInject */
    function SpaceDashboardController($rootScope)
    {
        var vm = this;

        vm.mySpaces = $rootScope.current.mySpaces;

    }
})();
