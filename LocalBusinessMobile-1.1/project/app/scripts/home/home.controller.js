(function() {
	'use strict';

	angular
		.module('localbiz.home')
		.controller('HomeController', HomeController);

	HomeController.$inject = ['homeService', 'externalAppsService', 'openHoursService', 'account'];

	/* @ngInject */
	function HomeController(homeService, externalAppsService, openHoursService, account) {
		var vm = angular.extend(this, {
			business: account.business,
			media: account.media,
			entries: homeService.menuItems,
			isBusinessOpen: openHoursService.isBusinessOpen(),
			currentDateTime: openHoursService.convertToBusinessTimezone(new Date()),
			timezone: setTimezone(),
			distance: null,
			getDirections: getDirections
		});

		(function activate() {
			calculateDistanceToOrigin();
		})();

		// *************************************************************

		function calculateDistanceToOrigin() {
			homeService.getDistanceToOrigin().then(function(distance) {
				vm.distance = distance;
			});
		}

		function getDirections() {
			externalAppsService.openMapsApp(account.business.location);
		}

		function setTimezone() {
			var zone = account.business.hours.zone;
			if (zone > 0) {
				return 'GMT+' + zone;
			}
			if (zone < 0) {
				return 'GMT' + zone;
			}
			return 'GMT';
		}
	}
})();
