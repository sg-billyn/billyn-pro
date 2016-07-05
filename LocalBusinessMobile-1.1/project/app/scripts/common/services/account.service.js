(function () {
	'use strict';

	angular
		.module('localbiz.contact-us')
		.factory('account', account);

	account.$inject = ['$http', 'ENV', 'localStorageService', '$q'];

	/* @ngInject */
	function account($http, ENV, localStorageService, $q) {
		var url = ENV.apiEndpoint + 'api/accounts';

		var service = {
			init: init,
			contact: null,
			business: null,
			medua: null
		};
		return service;

		function init() {
			var deferred = $q.defer();

			$http.get(url).then(function (response) {
				var account = response.data.result[0];
				localStorageService.set('account', account);
				initInternally(account);
				deferred.resolve(account);
			}, function () {
				var account = localStorageService.get('account');
				if (!account) {
					account = getHardcodedAccount();
				}
				initInternally(account);
				deferred.resolve(account);
			});

			return deferred.promise;
		}

		function initInternally(account) {
			service.business = account.business;
			service.media = account.media;
			service.contact = account.contact;

			var latlong = account.business.latlong.split(',');
			account.business.location = {
				latitude: parseFloat(latlong[0]),
				longitude: parseFloat(latlong[1])
			};
			account.business.zoom = parseFloat(account.business.zoom);
		}

		function getHardcodedAccount() {
			var account = {
				'media': [
					{
						'uri': 'http://skounis-dev.s3.amazonaws.com/local-business/558aac658cec591100b22b94/17-vju3js.jpg'
					},
					{
						'uri': 'http://skounis-dev.s3.amazonaws.com/local-business/558aac658cec591100b22b94/17-18okrew.jpg'
					}
				],
				'contact': {
					'email': 'info@ateuismod.com',
					'phone': '+30 697 12 555',
					'name': 'Ante Ipsum'
				},
				'business': {
					'zoom': '2.3',
					'latlong': '40.7421, -70.345',
					'zipcode': '455 25',
					'addressExtra': 'malesuada fames 73',
					'address': 'Interdum 21',
					'email': 'info@ateuismod.com',
					'website': 'http://www.ateuismod.com',
					'social': {
						'facebookPage': 'https://www.facebook.com/ionicframework'
					},
					'hours': {
						'zone': 3,
						'days': [
							{
								'closeAt': 1420135200000,
								'openAt': 1420092000000,
								'day': 1
							},
							{
								'closeAt': 1420135200000,
								'openAt': 1420092000000,
								'day': 2
							},
							{
								'closeAt': 1420135200000,
								'openAt': 1420092000000,
								'day': 3
							},
							{
								'closeAt': 1420135200000,
								'openAt': 1420092000000,
								'day': 4
							},
							{
								'closeAt': 1420135200000,
								'openAt': 1420092000000,
								'day': 5
							}
						]
					},
					'description': 'Maecenas sed mi eu ex placerat fermentum. Nulla nisl risus, sagittis sit amet turpis vel, eleifend dictum mi. Etiam luctus sem fermentum dui laoreet semper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras et tempus dui. Praesent placerat erat et interdum maximus. Mauris felis mi, auctor ut convallis at, ultrices ut justo. Phasellus vitae fringilla risus. Vestibulum ac mauris libero. Vivamus rutrum finibus lectus nec finibus. Vestibulum quis mauris elit. Praesent elit nisi, consequat quis lacus at, convallis tempor leo.',
					'name': 'Auctor Ipsum'
				}
			};
			return account;
		}
	}
})();
