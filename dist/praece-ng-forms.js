'use strict';

angular.module('pr.forms', ['ngMessages']);
'use strict';

angular.module('pr.forms').directive('prDatePicker', [

function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      options: '=prDatePicker'
    },
    link: function(scope, element, attr, ctrl) {
      var defaults = {
        format: 'm/d/yy',
        editable: true,
        selectYears: true,
        selectMonths: true
      };

      var options = _.merge({}, defaults, scope.options);

      element.pickadate(options);

      var picker = element.pickadate('picker');

      element.on('focus', function() {
        picker.open();
      });

      element.on('click', function() {
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
    scope: {
      options: '=prTimePicker'
    },
    link: function(scope, element, attr, ctrl) {
      var defaults = {
        min: [5,0],
        max: [20,0]
      };

      var options = _.merge({}, defaults, scope.options);

      element.pickatime(options);

      var picker = element.pickatime('picker');

      element.on('focus', function() {
        picker.open();
      });

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
          
          viewValue = period === 'AM' || _.parseInt(time) >= 1200 ? _.padLeft(time, 4, '0') : (_.parseInt(time) + 1200).toString();
        }

        return viewValue;
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

      element.keypress(function(event) {
        var character = String.fromCharCode(event.which);

        if (character !== character.replace(/[^0-9.\-]/g, "")) event.preventDefault();
      });

      ctrl.$formatters.push(function(modelValue) {
        if (!modelValue && modelValue !== 0) {
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

'use strict';

angular.module('pr.forms').directive('prFocus', [
  '$timeout',
function($timeout) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
      });
    }
	};
}]);
'use strict';

angular.module('pr.forms').filter('prPhone', [

function() {
	return function(number) {
		if (number) {
			var number = number.replace(/\W/g,'');
			var len = _.size(number);
			var cc = len > 10 ? '+' + number.substring(0, len - 10) + ' ' : '';
			var ac = number.substring(len - 10, len - 7);
			var p1 = number.substring(len - 7, len - 4);
			var p2 = number.substring(len - 4);

	    number = cc + ac + '-' + p1 + '-' + p2;
	  }

    return number;
	};
}]);

angular.module('pr.forms').filter('prTime', [

function() {
	return function(time) {
		if (_.isString(time) && _.size(time) === 4) {
      var hours = _.parseInt(time.substring(0, 2));
      var minutes = _.parseInt(time.substring(2, 4));
      var period = hours < 12 ? 'AM' : 'PM';
      hours = hours < 13 ? hours : hours - 12;

      time = hours + ':' + _.padLeft(minutes, 2, '0') + ' ' + period;
    }

    return time;
	};
}]);