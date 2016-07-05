(function() {
	'use strict';

	angular
		.module('localbiz.services')
		.factory('servicesService', servicesService);

	servicesService.$inject = ['$q', '$http', 'ENV'];

	/* @ngInject */
	function servicesService($q, $http, ENV) {
		var url = ENV.apiEndpoint + 'api/services?limit=' + ENV.itemsPerPage + '&';
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

		function get(serviceId) {
			for (var i = 0; i < result.length; i++) {
				if (result[i]._id === serviceId) {
					return $q.when(result[i]);
				}
			}
			return $q.when(null);
		}
	}
})();
