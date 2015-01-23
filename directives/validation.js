'use strict';

angular.module('pr.forms').directive('prValidate', [
  'prValidate',

function(prValidate) {
  return {
    require: '^ngModel',
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      var validations = scope.$eval(attrs.prValidate);

      _.forEach(validations, function(validation){
        prValidate[validation](ctrl);
      });
    }
  };
}]);

angular.module('pr.forms').directive('prValidateRequired', [
  'prValidate',

function(prValidate) {
  return {
    require: '^ngModel',
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      prValidate.required(ctrl);
    }
  };
}]);

angular.module('pr.forms').directive('prValidatePhone', [
  'prValidate',

function(prValidate) {
  return {
		require: '^ngModel',
		restrict: 'A',
		link:	function (scope, element, attrs, ctrl) {
      prValidate.phone(ctrl);
		}
	};
}]);

angular.module('pr.forms').directive('prValidateZip', [
  'prValidate',

function(prValidate) {
  return {
		require: '^ngModel',
		restrict: 'A',
		link:	function (scope, element, attrs, ctrl) {
      prValidate.zip(ctrl);
		}
	};
}]);

angular.module('pr.forms').directive('prValidatePasswordConfirm', [
  'prValidate',

function(prValidate) {
  return {
    require: '^ngModel',
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      prValidate.passwordConfirm(ctrl);
    }
  };
}]);