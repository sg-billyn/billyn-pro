// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
	'ionic',
	'config',
	'LocalStorageModule',
	'http-auth-interceptor',
	'ionic.service.core',
	'ionic.service.push',
	'localbiz.products',
	'localbiz.news',
	'localbiz.map',
	'localbiz.home',
	'localbiz.push',
	'localbiz.menu',
	'localbiz.services',
	'localbiz.catalogs',
	'localbiz.contact-us',
	'localbiz.wordpress',
	'localbiz.drupal',

	'gMaps',
	'ngCordova'
])

.value('_', window._)

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)

		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.run(function($rootScope, tokenService) {
	$rootScope.$on('event:auth-loginRequired', function() {
		tokenService.refreshToken();
	});
})

.config(function($urlRouterProvider, $httpProvider) {
	$httpProvider.interceptors.push('authInterceptor');
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/home');
});
