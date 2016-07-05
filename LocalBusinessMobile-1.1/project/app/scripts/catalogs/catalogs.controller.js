(function() {
	'use strict';

	angular
		.module('localbiz.catalogs')
		.controller('CatalogsController', CatalogsController);

	CatalogsController.$inject = ['$scope', '$state', 'catalogsService', 'scrollService'];

	/* @ngInject */
	function CatalogsController($scope, $state, catalogsService, scrollService) {
		var vm = angular.extend(this, {
			catalogs: [],
			doRefresh: doRefresh,
			openCatalog: openCatalog
		});

		(function activate() {
			loadItems();
		})();

		// ******************************************************

		function loadItems() {
			return catalogsService.getItems().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.catalogs = data.items;
			});
		}

		function doRefresh() {
			loadItems().then(function() {
				scrollService.completeRefresh();
			});
		}
		
		function loadMore() {
			catalogsService.getMoreItems().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.catalogs = vm.catalogs.concat(data.items);

				scrollService.completeInfiniteScroll();
			});
		}

		function openCatalog(catalogId) {
			$state.go('app.catalog', {
				catalogId: catalogId
			});
		}
	}
})();