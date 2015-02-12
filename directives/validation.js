'use strict';

angular.module('pr.forms').directive('prValidate', [
  '$compile',
  '$templateCache',
  '$filter',
  '$http',
  '$q',

function($compile, $templateCache, $filter, $http, $q) {
  var validators = {};

  validators.phone = function(scope) {
    scope.input.$formatters.unshift(function (modelValue) {
      return $filter('prPhone')(modelValue);
    });

    scope.input.$parsers.unshift(function (viewValue) {
      if (!viewValue) {
        scope.input.$setValidity('phone', true);
        return null;
      }

      viewValue = viewValue.replace(/\W/g,'');

      // Check for letters and make sure the value is the right length.
      if (!_.isNaN(+viewValue) && _.size(viewValue) > 9 && _.size(viewValue) < 16) {
        scope.input.$setValidity('phone', true);
      } else {
        scope.input.$setValidity('phone', false);
      }

      return viewValue;
    });
  }

  validators.zip = function(scope) {
    scope.input.$parsers.unshift(function (viewValue) {
      if (!viewValue) {
        scope.input.$setValidity('zip', true);
        return null;
      }

      var test = viewValue.replace('-','');

      // Check for letters and make sure the value is the right length.
      if (!_.isNaN(+test) && (_.size(test) === 5 || _.size(test) === 9)) {
        scope.input.$setValidity('zip', true);
      } else {
        scope.input.$setValidity('zip', false);
      }

      return viewValue;
    });
  }

  validators.required = function(scope) {
    scope.input.$formatters.unshift(function (modelValue) {
      if (!modelValue) {
        scope.input.$setValidity('required', false);
        return null;
      }

      scope.input.$setValidity('required', true);
      return modelValue;
    });

    scope.input.$parsers.unshift(function (viewValue) {
      if (!viewValue) {
        scope.input.$setValidity('required', false);
        return null;
      }

      scope.input.$setValidity('required', true);
      return viewValue;
    });
  }

  validators.unique = function(scope) {
    scope.input.$asyncValidators.unique = function(modelValue, viewValue) {
      var params = {};
      var deferred = $q.defer();

      params[scope.input.$name] = viewValue;

      if (!viewValue) {
        deferred.resolve();
      } else {
        $http.get(scope.options.unique.url, {params: params})
          .success(function(data, status) {
            if (data.length > 0) {
              if (data[0].id === scope.options.unique.id) {
                deferred.resolve();
              }
              else {
                deferred.reject();
              }
            }
            else {
              deferred.resolve();
            }
          })
          .error(function(data, status) {
            console.log(status);
          });
      }

      return deferred.promise;
    }
  }

  return {
    require: '^^form',
    restrict: 'A',
    scope: {
      validations: '=prValidate',
      options: '=prValidateOptions'
    },
    link: function (scope, element, attrs, form) {
      var input = element.find('input, select, .select2');
      var template = '' +
        '<div ng-messages="input.$error" ng-if="input.$invalid && (input.$dirty || form.$submitted)" class="form-validation">' +
          '<i class="invalid-icon picon-warning"></i>' +
          '<div ng-message="required">Required</div>' +
          '<div ng-message="phone">Invalid phone number</div>' +
          '<div ng-message="zip">Invalid zip code</div>' +
          '<div ng-message="unique">This {{options.unique.label}} is taken</div>' +
        '</div>';

      scope.input = angular.element(input).controller('ngModel');
      scope.form = form;
      element.append($compile(template)(scope));

      _.forEach(scope.validations, function(validation){
        validators[validation](scope);
      });
    }
  };
}]);
