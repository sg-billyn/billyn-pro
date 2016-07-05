(function() {
	'use strict';

	angular
		.module('localbiz.map')
		.controller('MapController', MapController);

	MapController.$inject = ['$scope', 'account'];

	/* @ngInject */
	function MapController($scope, account) {
		var vm = angular.extend(this, {
			origin: {
				lat: account.business.location.latitude,
				lon: account.business.location.longitude
			},
			zoom: account.business.zoom,
			markers: []
		});

		var markers = [];
		markers.push({
			name: account.business.name,
			lat: account.business.location.latitude,
			lon: account.business.location.longitude
		});
		vm.markers = markers;
	}
})();