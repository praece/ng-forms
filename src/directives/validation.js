'use strict';

angular.module('pr.forms').directive('prValidate', [
  '$compile',
  '$templateCache',
  '$http',
  '$q',
  '$timeout',

function($compile, $templateCache, $http, $q, $timeout) {
  var validators = {};

  validators.phone = function(scope) {
    scope.input.$parsers.unshift(function (viewValue) {
      if (is.empty(viewValue) || is.nanpPhone(viewValue)) {
        scope.input.$setValidity('phone', true);
      } else {
        scope.input.$setValidity('phone', false);
      }

      return viewValue;
    });
  };

  validators.fax = function(scope) {
    scope.input.$parsers.unshift(function (viewValue) {
      if (is.empty(viewValue) || is.nanpPhone(viewValue)) {
        scope.input.$setValidity('fax', true);
      } else {
        scope.input.$setValidity('fax', false);
      }

      return viewValue;
    });
  };

  validators.email = function(scope) {
    scope.input.$parsers.unshift(function (viewValue) {
      if (is.empty(viewValue) || is.email(viewValue)) {
        scope.input.$setValidity('email', true);
      } else {
        scope.input.$setValidity('email', false);
      }

      return viewValue;
    });
  };

  validators.zip = function(scope) {
    scope.input.$parsers.unshift(function (viewValue) {
      if (is.empty(viewValue) || is.usZipCode(viewValue)) {
        scope.input.$setValidity('zip', true);
      } else {
        scope.input.$setValidity('zip', false);
      }

      return viewValue;
    });
  };

  validators.positiveNumber = function(scope) {
    scope.input.$parsers.unshift(function (viewValue) {
      if (is.empty(viewValue) || (is.number(+viewValue) && +viewValue >= 0)) {
        scope.input.$setValidity('positive-number', true);
      } else {
        scope.input.$setValidity('positive-number', false);
      }

      return viewValue;
    });
  };

  validators.integer = function(scope) {
    scope.input.$parsers.unshift(function (viewValue) {
      if (is.empty(viewValue) || is.integer(Number(viewValue))) {
        scope.input.$setValidity('integer', true);
      } else {
        scope.input.$setValidity('integer', false);
      }

      return viewValue;
    });
  };

  validators.required = function(scope, input) {
    function validation(value) {
      var defaults = {required: {disabled: false}};
      var options = _.merge(defaults, scope.options);
      var set = is.existy(value) && (is.not.empty(value) || is.date(value));
      var disabled = !!options.required.disabled;

      scope.input.$setValidity('required', set || disabled);
      return value;
    };

    if (scope.options && scope.options.required) {
      scope.$watch('options.required.disabled', function(newValue) {
        validation(scope.input.viewValue);
      });
    }

    scope.input.$formatters.unshift(validation);
    scope.input.$parsers.unshift(validation);
    validation(scope.input.$modelValue);
  };

  validators.unique = function(scope) {
    scope.input.$asyncValidators.unique = scope.options.unique.validationFunction;
  };

  return {
    restrict: 'A',
    scope: {
      validations: '=prValidate',
      options: '=prValidateOptions'
    },
    link: function (scope, element, attrs, form) {
      var input;
      var form;
      var template = '' +
        '<div ng-messages="input.$error" ng-if="input.$invalid && form.$submitted" class="form-validation">' +
          '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">' + 
            '<path d="M15.73 3h-7.46l-5.27 5.27v7.455l5.27 5.275h7.455l5.275-5.27v-7.46l-5.27-5.27zM12 17.3c-0.715 0-1.3-0.58-1.3-1.3 0-0.715 0.585-1.3 1.3-1.3s1.3 0.58 1.3 1.3c0 0.72-0.585 1.3-1.3 1.3zM13 13h-2v-6h2v6z" fill="#444444"></path>' +
          '</svg>' +
          '<div ng-message="required">Required</div>' +
          '<div ng-message="phone">Invalid phone number</div>' +
          '<div ng-message="fax">Invalid fax number</div>' +
          '<div ng-message="zip">Invalid zip code</div>' +
          '<div ng-message="email">Invalid email address</div>' +
          '<div ng-message="positive-number">Must be positive</div>' +
          '<div ng-message="unique">This {{options.unique.label}} is taken</div>' +
        '</div>';

      $timeout(function() {
        input = element.find('input, select, textarea, .select2').first();
        form = element.closest('form');
        scope.input = angular.element(input).controller('ngModel');
        scope.form = angular.element(input).controller('form');

        if (scope.input && scope.form) {
          element.append($compile(template)(scope));

          _.forEach(scope.validations, function(validation){
            validators[validation](scope, input);
          });
        }
      });
    }
  };
}]);
