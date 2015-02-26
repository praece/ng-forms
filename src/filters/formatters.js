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