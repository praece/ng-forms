'use strict';

angular.module('pr.forms').directive('prNumberInput', [

function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {

      element.keypress(function(event) {
        var character = String.fromCharCode(event.which);

        if (character !== character.replace(/[^0-9.\-]/g, "")) return false;
      });

      ctrl.$formatters.push(function(modelValue) {
        if (!modelValue) {
          return null;
        }

        return Number(modelValue);
      });

      ctrl.$parsers.unshift(function(viewValue) {
        if (!viewValue && viewValue !== 0) {
          return null;
        }

        var newValue = viewValue.replace(/[^0-9.\-]/g, "");

        if (viewValue !== newValue) {
          viewValue = newValue;
          ctrl.$setViewValue(viewValue);
          ctrl.$render();
        }
        
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