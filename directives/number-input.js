'use strict';

angular.module('pr.forms').directive('prNumberInput', [

function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {

      ctrl.$formatters.unshift(function(modelValue) {
        if (!modelValue) {
          return null;
        }

        return modelValue.toString();
      });
      ctrl.$parsers.unshift(function(viewValue) {
        return Number(viewValue);
      });
    }
  };
}]);