'use strict';

angular.module('pr.forms').directive('prDatePicker', [

function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {
      element.pickadate({
        format: 'm/d/yy'
      });

      ctrl.$formatters.unshift(function(modelValue) {
        if (!modelValue) {
          return null;
        }

        return moment(modelValue).format('M/D/YY');
      });
      ctrl.$parsers.unshift(function(viewValue) {
        return moment(viewValue).format('YYYY/MM/DD');
      });
    }
  };
}]);

angular.module('pr.forms').directive('prTimePicker', [

function() {
  return {
    link: function(scope, element, attr) {
      element.pickatime({
        min: [5,0],
        max: [20,0]
      });
    }
  };
}]);