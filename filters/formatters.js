'use strict';

angular.module('pr.forms').filter('prPhone', [

function() {
	return function(number) {
		if (number) {
			var len = _.size(number),
			    cc = len > 10 ? '+' + number.substring(0, len - 10) + ' ' : '',
			    ac = number.substring(len - 10, len - 7),
			    p1 = number.substring(len - 7, len - 4),
			    p2 = number.substring(len - 4);

	    number = cc + ac + '-' + p1 + '-' + p2;
	  }

    return number;
	};
}]);