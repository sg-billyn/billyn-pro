(function() {
	'use strict';

	angular
		.module('localbiz.news')
		.controller('ArticleController', ArticleController);

	ArticleController.$inject = ['$stateParams', 'newsService'];

	/* @ngInject */
	function ArticleController($stateParams, newsService) {
		var articleId = $stateParams.articleId;

		var vm = angular.extend(this, {
			article: null
		});

		(function activate() {
			getArticle();
		})();
		// ********************************************************************

		function getArticle() {
			newsService.get(articleId)
				.then(function(article) {
					vm.article = article;
				});
		}
	}
})();