(function() {
	'use strict';

	angular
		.module('localbiz.products')
		.controller('ProductsController', ProductsController);

	ProductsController.$inject = ['$scope', '$state', 'productsService', 'scrollService'];

	/* @ngInject */
	function ProductsController($scope, $state, productsService, scrollService) {
		var vm = angular.extend(this, {
			products: [],
			doRefresh: doRefresh,
			loadMore: loadMore,
			canLoadMore: false,
			showProductDetails: showProductDetails
		});

		(function activate() {
			loadItems();
		})();
		
		// ******************************************************

		function loadItems() {
			return productsService.getItems().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.products = data.items;
			});
		}

		function doRefresh() {
			loadItems().then(function() {
				scrollService.completeRefresh();
			});
		}
		
		function loadMore() {
			productsService.getMoreItems().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.products = vm.products.concat(data.items);

				scrollService.completeInfiniteScroll();
			});
		}

		function showProductDetails(productId) {
			$state.go('app.product', {
				productId: productId
			});
		}
	}
})();