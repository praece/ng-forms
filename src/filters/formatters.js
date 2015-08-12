'use strict';

angular.module('pr.forms').filter('prPhone', [

function() {
	return function(number) {
		if (number) {
			var number = number.replace(/\W/g,'');
			var len = _.size(number);
			var cc = len > 10 ? '+' + number.substring(0, len - 10) + ' ' : '';
			var ac = number.substring(len - 10, len - 7);
			var p1 = number.substring(len - 7, len - 4);
			var p2 = number.substring(len - 4);

	    number = cc + ac + '-' + p1 + '-' + p2;
	  }

    return number;
	};
}]);

angular.module('pr.forms').filter('prTime', [

function() {
	return function(time) {
		if (_.isString(time) && _.size(time) === 4) {
      var hours = _.parseInt(time.substring(0, 2));
      var minutes = _.parseInt(time.substring(2, 4));
      var period = hours < 12 ? 'AM' : 'PM';
      hours = hours < 13 ? hours : hours - 12;

      time = hours + ':' + _.padLeft(minutes, 2, '0') + ' ' + period;
    }

    return time;
	};
}]);