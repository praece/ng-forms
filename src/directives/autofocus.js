'use strict';

angular.module('pr.forms').directive('prFocus', [
  '$timeout',
function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
      });
    }
	};
}]);


angular.module('pr.forms').directive('selectOnClick', [
  '$window', 
function ($window) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      element.on('click', function () {
        if (!$window.getSelection().toString()) {
          //Mobile Safari does not support this.select(), must use
          //setSelectionRange
          this.setSelectionRange(0, this.value.length);
        }
      });
    }
  };
}]);