(function() {
	'use strict';

	angular
		.module('localbiz.products')
		.factory('productsService', productsService);

	productsService.$inject = ['$q', '$http', '_', 'ENV'];

	/* @ngInject */
	function productsService($q, $http, _, ENV) {
		var url = ENV.apiEndpoint + 'api/products?limit=' + ENV.itemsPerPage + '&';
		var lastPage;
		var result = [];

		var service = {
			getItems: getItems,
			getMoreItems: getMoreItems,
			get: get
		};
		return service;

		// *******************************************************

		function getItems(page) {
			if (!page) {
				result = [];
			}
			page = page || 1;

			return $http.get(url + 'page=' + page).then(function(data) {
				result = result.concat(data.data.result);
				lastPage = data.data.page;

				return {
					items: data.data.result,
					canLoadMore: lastPage < data.data.num_pages
				};
			});
		}
		
		function getMoreItems() {
			return getItems(lastPage + 1);
		}

		function get(productID) {
			for (var i = 0; i < result.length; i++) {
				if (result[i]._id === productID) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();
