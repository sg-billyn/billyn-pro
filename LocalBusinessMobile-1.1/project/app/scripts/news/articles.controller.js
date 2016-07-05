(function() {
	'use strict';

	angular
		.module('localbiz.news')
		.controller('ArticlesController', ArticlesController);

	ArticlesController.$inject = ['$scope', '$state', 'newsService', 'scrollService'];

	/* @ngInject */
	function ArticlesController($scope, $state, newsService, scrollService) {
		var vm = angular.extend(this, {
			articles: [],
			navigate: navigate,
			doRefresh: doRefresh,
			loadMore: loadMore,
			canLoadMore: false
		});

		(function activate() {
			loadItems();
		})();
		
		// ********************************************************************

		function loadItems() {
			return newsService.getItems().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.articles = data.items;
			});
		}

		function doRefresh() {
			loadItems().then(function() {
				scrollService.completeRefresh();
			});
		}
		
		function loadMore() {
			newsService.getMoreItems().then(function(data) {
				vm.canLoadMore = data.canLoadMore;
				vm.articles = vm.articles.concat(data.items);

				scrollService.completeInfiniteScroll();
			});
		}

		function navigate(articleId) {
			$state.go('app.article', { articleId: articleId });
		}
	}
})();