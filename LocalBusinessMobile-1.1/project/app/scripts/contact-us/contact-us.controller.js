(function() {
	'use strict';

	angular
		.module('localbiz.contact-us')
		.controller('ContactUsController', ContactUsController);

	ContactUsController.$inject = [
		'account', 'externalAppsService', '$cordovaEmailComposer', 'openHoursService'];

	/* @ngInject */
	function ContactUsController(account, externalAppsService, $cordovaEmailComposer, openHoursService) {
		var vm = angular.extend(this, {
			contact: account.contact,
			business: account.business,
			media: account.media,
			getDirections: getDirections,
			sendEmail: sendEmail,
			openFacebookPage: openFacebookPage,
			openHours: openHoursService.getOpenHours()
		});

		// **********************************************************************

		function getDirections() {
			externalAppsService.openMapsApp(vm.business.latlong);
		}

		function sendEmail() {
			$cordovaEmailComposer.isAvailable().then(function() {
				var email = {
					to: vm.contact.email,
					subject: 'Cordova Icons',
					body: 'How are you? Nice greetings from Leipzig'
				};

				$cordovaEmailComposer.open(email);
			});
		}

		function openFacebookPage() {
			externalAppsService.openExternalUrl(vm.business.social.facebookPage);
		}
	}
})();
