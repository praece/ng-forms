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

      element.on('focus', function() {
        picker.open();
      });

      ctrl.$formatters.unshift(function(modelValue) {
        if (!modelValue) return null;

        var date = moment(modelValue);

        if (date.isValid()) {
          picker.set('highlight', date.toDate());
        }

        return date.format('M/D/YY');
      });

      ctrl.$parsers.unshift(function(viewValue) {
        if (!viewValue) return null;

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
  '$filter',

function($filter) {
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
        modelValue = $filter('prTime')(modelValue);
        picker.set('highlight', modelValue);

        return modelValue;
      });

      ctrl.$parsers.unshift(function(viewValue) {
        picker.set('highlight', viewValue);

        if (viewValue && _.isString(viewValue)) {
          var values = viewValue.split(' ');
          var time = values.shift().replace(':', '');
          var period = values.shift();
          
          viewValue = period === 'AM' ? _.padLeft(time, 4, '0') : (_.parseInt(time) + 1200).toString();
        }

        return viewValue;
      });
    }
  };
}]);