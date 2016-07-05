(function() {
	'use strict';

	angular
		.module('localbiz.services')
		.controller('ServicesController', ServicesController);

	ServicesController.$inject = ['$scope', '$state', 'servicesService', 'scrollService'];

	/* @ngInject */
	function ServicesController($scope, $state, servicesService, scrollService) {
		var vm = angular.extend(this, {
			services: [],
			doRefresh: doRefresh,
			showServiceDetails: showServiceDetails
		});

		(function activate() {
			loadItems();
		})();

		// ******************************************************

		function loadItems() {
			return servicesService.getItems().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.services = data.items;
			});
		}

		function doRefresh() {
			loadItems().then(function() {
				scrollService.completeRefresh();
			});
		}
		
		function loadMore() {
			servicesService.getMoreItems().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.services = vm.services.concat(data.items);

				scrollService.completeInfiniteScroll();
			});
		}

		function showServiceDetails(serviceId) {
			$state.go('app.service', {
				serviceId: serviceId
			});
		}
	}
})();