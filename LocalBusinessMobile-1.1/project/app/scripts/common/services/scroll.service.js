(function() {
	'use strict';

	angular
		.module('localbiz.common')
		.factory('scrollService', scrollService);

	scrollService.$inject = ['$rootScope'];

	/* @ngInject */
	function scrollService($rootScope) {
		var service = {
			completeInfiniteScroll: completeInfiniteScroll,
			completeRefresh: completeRefresh
		};
		return service;

		function completeRefresh() {
			$rootScope.$broadcast('scroll.refreshComplete');
		}

		function completeInfiniteScroll() {
			$rootScope.$broadcast('scroll.infiniteScrollComplete');
		}
	}
})();