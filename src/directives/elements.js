'use strict';

angular.module('pr.forms').directive('prInput', [

function() {
  var count = 0;

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      count++;

      var input = element.find('input, select, textarea, .select2');
      var label = element.find('label');

      input.attr('id', 'input' + count);
      label.attr('for', 'input' + count);
      element.addClass('form-element');
    }
	};
}]);