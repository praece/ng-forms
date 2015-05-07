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
        if (!viewValue) {
          return null;
        }

        viewValue = viewValue.replace(/[^0-9]/g, "");
        ctrl.$setViewValue(viewValue);
        ctrl.$render();
        
        return viewValue;
      });
    }
  };
}]);

angular.module('pr.forms').directive('prPhoneInput', [
  '$filter',

function($filter) {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {

      ctrl.$formatters.unshift(function (modelValue) {
        return $filter('prPhone')(modelValue);
      });
    }
  };
}]);