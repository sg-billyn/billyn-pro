(function () {
	'use strict';

	angular
		.module('starter')
		.factory('authInterceptor', authInterceptor);

	authInterceptor.$inject = ['localStorageService'];

	function authInterceptor(localStorageService) {
		var service = {
			request: request,
		};
		return service;

		function request(config) {
			if (config.url.indexOf('http') !== 0 || config.url.indexOf('/auth/client?') > 0) {
				return config;
			}

			setToken(config);
			return config;
		}
		
		function setToken(config) {
			var token = localStorageService.get('token');
			config.headers = config.headers || {};
			config.headers.Authorization = 'Bearer ' + token;
		}
	}
})();
