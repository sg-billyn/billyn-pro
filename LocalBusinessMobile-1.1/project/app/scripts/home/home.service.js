(function() {
	'use strict';

	angular
		.module('localbiz.home')
		.factory('homeService', homeService);

	homeService.$inject = ['$cordovaGeolocation', '$q', 'geolib', 'convert', 'account'];

	/* @ngInject */
	function homeService($cordovaGeolocation, $q, geolib, convert, account) {
		var menuItems = [{
			title: 'News',
			path: 'articles',
			icon: 'icon ion-speakerphone'
		}, {
			title: 'Products',
			path: 'products',
			icon: 'icon ion-ios-cart'
		}, {
			title: 'Services',
			path: 'services',
			icon: 'icon ion-android-list'
		}, {
			title: 'Catalogs',
			path: 'catalogs',
			icon: 'fa fa-file-pdf-o'
		}];

		var service = {
			menuItems: menuItems,
			getDistanceToOrigin: getDistanceToOrigin
		};
		return service;

		// ***************************************************************

		function getDistanceToOrigin() {
			var posOptions = {
				enableHighAccuracy: true
			};

			var deferred = $q.defer();

			$cordovaGeolocation
				.getCurrentPosition(posOptions)
				.then(function(position) {
					var distance = geolib.getDistance({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude
					}, account.business.location);

					if (distance < 1000) {
						distance = distance + ' m';
					} else {
						distance = distance = convert(distance, 'meters', {
							precision: 2
						}).toKilometers() + ' km';
					}

					return deferred.resolve(distance);
				});

			return deferred.promise;
		}
	}

})();
