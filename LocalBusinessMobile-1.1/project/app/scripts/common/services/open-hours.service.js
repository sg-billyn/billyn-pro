(function() {
	'use strict';

	angular
		.module('localbiz.common')
		.factory('openHoursService', openHoursService);

	openHoursService.$inject = ['_', 'account'];

	/* @ngInject */
	function openHoursService(_, account) {
		var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

		var service = {
			isBusinessOpen: isBusinessOpen,
			getOpenHours: getOpenHours,
			convertToBusinessTimezone: convertToBusinessTimezone
		};
		return service;

		// *****************************************************************

		function getOpenHours() {
			var openHours = account.business.hours;

			var days = [];
			var groupedDays = _.groupBy(openHours.days, 'day');
			_.each(groupedDays, function(groupedDay) {
				var day = {
					times: []
				};

				_.each(groupedDay, function(d) {
					day.name = dayNames[d.day];
					var openAt = new Date(d.openAt);
					var closeAt = new Date(d.closeAt);

					openAt = convertToBusinessTimezone(openAt);
					closeAt = convertToBusinessTimezone(closeAt);

					var from = openAt.format('hh:MMtt');
					var to = closeAt.format('hh:MMtt');
					day.times.push(from + ' - ' + to);
				});

				days.push(day);
			});

			return days;
		}

		function convertToBusinessTimezone(date, inGmt) {
			var businessTimezone = account.business.hours.zone;

			var ms = date.getTime();
			ms = ms + date.getTimezoneOffset() * 60 * 1000;
			ms = ms + businessTimezone * 60 * 60 * 1000;

			return new Date(ms);
		}

		function isBusinessOpen() {
			var openHours = account.business.hours;

			var now = (new Date());
			var day = now.getDay();

			var normalizedTime = normalizeDate(now);

			var open;
			for (var i = 0; i < openHours.days.length; i++) {
				open = openHours.days[i];

				if (open.day !== day) {
					continue;
				}

				var openAt = normalizeDate(new Date(open.openAt));
				var closeAt = normalizeDate(new Date(open.closeAt));

				if (normalizedTime >= openAt && normalizedTime <= closeAt) {
					return true;
				}
			}

			return false;
		}

		function normalizeDate(date, convertToGmt) {
			var hours = date.getHours();
			var minutes = date.getMinutes();

			date = (new Date(2015, 0, 1, hours, minutes, 0));
			var ms = date.getTime();
			return ms;
		}
	}
})();
