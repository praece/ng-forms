'use strict';

angular.module('pr.forms').service('prValidateSrvc', [
  '$filter',

function ($filter){
  return {
    required: function(scope, ctrl) {
      ctrl.$formatters.unshift(function (modelValue) {
        if (!modelValue) {
          ctrl.$setValidity('required', false);
          return null;
        }

        ctrl.$setValidity('required', true);
        return modelValue;
      });

      ctrl.$parsers.unshift(function (viewValue) {
        if (!viewValue) {
          ctrl.$setValidity('required', false);
          return null;
        }

        ctrl.$setValidity('required', true);
        return viewValue;
      });
    },

    phone: function(scope, ctrl) {
      ctrl.$formatters.unshift(function (modelValue) {
        return $filter('prPhone')(modelValue);
      });

      ctrl.$parsers.unshift(function (viewValue) {
        if (!viewValue) {
          ctrl.$setValidity('phone', true);
          return null;
        }

        viewValue = viewValue.replace(/\W/g,'');

        // Check for letters and make sure the value is the right length.
        if (!_.isNaN(+viewValue) && _.size(viewValue) > 9 && _.size(viewValue) < 16) {
          ctrl.$setValidity('phone', true);
        } else {
          ctrl.$setValidity('phone', false);
        }

        return viewValue;
      });
    },

    zip: function(scope, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        if (!viewValue) {
          ctrl.$setValidity('zip', true);
          return null;
        }

        var test = viewValue.replace('-','');

        // Check for letters and make sure the value is the right length.
        if (!_.isNaN(+test) && (_.size(test) === 5 || _.size(test) === 9)) {
          ctrl.$setValidity('zip', true);
        } else {
          ctrl.$setValidity('zip', false);
        }

        return viewValue;
      });
    },

    passwordConfirmation: function(scope, ctrl) {
      ctrl.$parsers.unshift(function (viewValue) {
        var password = scope.user.data.password;
        var confirm = viewValue;

        if (!viewValue) {
          ctrl.$setValidity('passwordConfirm', true);
          return null;
        }

        if (password && confirm && password !== confirm) {
          ctrl.$setValidity('passwordConfirm', false);
        } else {
          ctrl.$setValidity('passwordConfirm', true);
        }

        return viewValue;
      });
    }
  };
}]);