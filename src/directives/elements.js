'use strict';

angular.module('pr.forms').directive('prInput', [

function() {
  var count = 0;

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      count++;

      var input = element.find('input, select, textarea, .select2').first();
      var label = element.find('label');
      var id = input.attr('id') || 'input-' + count;

      input.attr('id', id);
      label.attr('for', id);
      element.addClass('form-element');
    }
	};
}]);