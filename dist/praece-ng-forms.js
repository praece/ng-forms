'use strict';

angular.module('pr.forms', ['ui.select', 'ngMessages']);
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
'use strict';

angular.module('pr.forms').directive('prInput', [

function() {
  var count = 0;

  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      count++;

      var input = element.find('input, select, textarea, .select2').first();
      var label = element.find('label');
      var id = input.attr('id') || 'input-' + count;

      input.attr('id', id);
      label.attr('for', id);
      element.addClass('form-element');
    }
	};
}]);
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
'use strict';

angular.module('pr.forms').directive('prValidate', [
  '$compile',
  '$templateCache',
  '$filter',
  '$http',
  '$q',
  '$timeout',

function($compile, $templateCache, $filter, $http, $q, $timeout) {
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
    function validation(value) {
      if (!value) {
        scope.input.$setValidity('required', false);
        return null;
      }

      scope.input.$setValidity('required', true);
      return value;
    };

    scope.input.$formatters.unshift(validation);
    scope.input.$parsers.unshift(validation);
    validation(scope.input.$modelValue);
  }

  validators.unique = function(scope) {
    scope.input.$asyncValidators.unique = function(modelValue, viewValue) {
      var params = {};
      var deferred = $q.defer();

      params[scope.options.unique.property] = viewValue;

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
    restrict: 'A',
    scope: {
      validations: '=prValidate',
      options: '=prValidateOptions'
    },
    link: function (scope, element, attrs, form) {
      var input;
      var form;
      var template = '' +
        '<div ng-messages="input.$error" ng-if="input.$invalid && (input.$dirty || form.$submitted)" class="form-validation">' +
          '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">' + 
            '<path d="M15.73 3h-7.46l-5.27 5.27v7.455l5.27 5.275h7.455l5.275-5.27v-7.46l-5.27-5.27zM12 17.3c-0.715 0-1.3-0.58-1.3-1.3 0-0.715 0.585-1.3 1.3-1.3s1.3 0.58 1.3 1.3c0 0.72-0.585 1.3-1.3 1.3zM13 13h-2v-6h2v6z" fill="#444444"></path>' +
          '</svg>' +
          '<div ng-message="required">Required</div>' +
          '<div ng-message="phone">Invalid phone number</div>' +
          '<div ng-message="zip">Invalid zip code</div>' +
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
            validators[validation](scope);
          });
        }
      });
    }
  };
}]);

'use strict';

angular.module('pr.forms').filter('prPhone', [

function() {
	return function(number) {
		if (number) {
			var len = _.size(number),
			    cc = len > 10 ? '+' + number.substring(0, len - 10) + ' ' : '',
			    ac = number.substring(len - 10, len - 7),
			    p1 = number.substring(len - 7, len - 4),
			    p2 = number.substring(len - 4);

	    number = cc + ac + '-' + p1 + '-' + p2;
	  }

    return number;
	};
}]);