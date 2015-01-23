'use strict';

angular.module('pr.forms').directive('prInput', [

function() {
  return {
    restrict: 'A',
    require: '^^form',
    transclude: true,
    scope: {},
    templateUrl: '/app/praece-modules/forms/partials/input.html',
    link: function(scope, element, attrs, form) {
      var input = element.find('input, select, .select2');
      var label = element.find('label');
      var name = input.attr('name');

      scope.formItem = form[name];
      scope.form = form;
      input.attr('id', name);
      label.attr('for', name);
      element.addClass('form-element');

      // Float labels
      // Grab the input child, and just do nothing if there is no child
      input = angular.element(input[0]);
      var ngModelCtrl = input.controller('ngModel');
      if(!input) {return;}

      function onInputChange() {
        element.toggleClass('input-has-value', !!ngModelCtrl.$viewValue);
      }

      // When the input value changes, check if it "has" a value, and 
      // set the appropriate class on the input group
      if (ngModelCtrl) {
        scope.$watch(
          function() { return ngModelCtrl.$viewValue; },
          onInputChange
        );
      }
      input.on('input', onInputChange);

      // When the input focuses, add the focused class to the group
      input.on('focus', function(e) {
        element.addClass('input-focused');
      });
      // When the input blurs, remove the focused class from the group
      input.on('blur', function(e) {
        element.removeClass('input-focused');
      });
    }
	};
}]);