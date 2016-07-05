(function() {
	'use strict';

	angular
		.module('localbiz.common')
		.factory('tokenService', tokenService);

	tokenService.$inject = ['authService', '$injector', 'ENV', 'localStorageService'];

	/* @ngInject */
	function tokenService(authService, $injector, ENV, localStorageService) {
		var service = {
			refreshToken: refreshToken
		};
		return service;
		
		function refreshToken() {
			getToken().then(function(response) {
				authService.loginConfirmed('success', function(config) {
					localStorageService.set('token', response.data.token)
					config.headers["Authorization"] = 'Bearer ' + response.data.token;
					return config;
				});
			});
		}
		
		function getToken() {
			var $http = $injector.get('$http');
			
			var url = ENV.apiEndpoint + 'auth/client';
			url += '?client_id=' + ENV.clientId;
			url += '&client_secret=' + ENV.clientSecret;
	
			return $http.post(url);
		}
	}
})();