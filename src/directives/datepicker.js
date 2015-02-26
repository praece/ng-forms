'use strict';

angular.module('pr.forms').directive('prDatePicker', [

function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {
      element.pickadate({
        format: 'm/d/yy',
        editable: true,
        selectYears: true,
        selectMonths: true
      });

      var picker = element.pickadate('picker');

      ctrl.$formatters.unshift(function(modelValue) {
        if (!modelValue) {
          return null;
        }

        var date = moment(modelValue);

        if (date.isValid()) {
          picker.set('highlight', date.toDate());
        }

        return date.format('M/D/YY');
      });

      ctrl.$parsers.unshift(function(viewValue) {
        var date = moment(viewValue, 'M/D/YY', true);

        if (date.isValid()) {
          picker.set('highlight', date.toDate());
        }

        return date.toDate();
      });
    }
  };
}]);

angular.module('pr.forms').directive('prTimePicker', [

function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attr, ctrl) {
      element.pickatime({
        min: [5,0],
        max: [20,0],
        editable: true
      });

      var picker = element.pickatime('picker');

      ctrl.$formatters.unshift(function(modelValue) {
        picker.set('highlight', modelValue);

        return modelValue;
      });

      ctrl.$parsers.unshift(function(viewValue) {
        picker.set('highlight', viewValue);

        return viewValue;
      });
    }
  };
}]);