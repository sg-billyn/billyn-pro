(function() {
	'use strict';

	angular
		.module('localbiz.products')
		.controller('ProductController', ProductController);

	ProductController.$inject = ['$scope', '$stateParams', 'productsService', 'externalAppsService'];

	/* @ngInject */
	function ProductController($scope, $stateParams, productsService, externalAppsService) {
		var productId = $stateParams.productId;
		
		var vm = angular.extend(this, {
			product: null,
			buy: buy
		});


		(function activate() {
			loadProduct();
		})();
		// **********************************************

		function loadProduct() {
			productsService.get(productId)
				.then(function(product) {
					vm.product = product;
				});
		}

		function buy() {
			externalAppsService.openExternalUrl(vm.product.url);
		}
	}
})();