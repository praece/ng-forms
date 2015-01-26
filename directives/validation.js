'use strict';

angular.module('pr.forms').directive('prValidate', [
  'prValidateSrvc',

function(prValidateSrvc) {
  return {
    require: '^ngModel',
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      var validations = scope.$eval(attrs.prValidateSrvc);

      _.forEach(validations, function(validation){
        prValidateSrvc[validation](scope, ctrl);
      });
    }
  };
}]);

angular.module('pr.forms').directive('prValidateRequired', [
  'prValidateSrvc',

function(prValidateSrvc) {
  return {
    require: '^ngModel',
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      prValidateSrvc.required(scope, ctrl);
    }
  };
}]);

angular.module('pr.forms').directive('prValidatePhone', [
  'prValidateSrvc',

function(prValidateSrvc) {
  return {
		require: '^ngModel',
		restrict: 'A',
		link:	function (scope, element, attrs, ctrl) {
      prValidateSrvc.phone(scope, ctrl);
		}
	};
}]);

angular.module('pr.forms').directive('prValidateZip', [
  'prValidateSrvc',

function(prValidateSrvc) {
  return {
		require: '^ngModel',
		restrict: 'A',
		link:	function (scope, element, attrs, ctrl) {
      prValidateSrvc.zip(scope, ctrl);
		}
	};
}]);

angular.module('pr.forms').directive('prValidatePasswordConfirm', [
  'prValidateSrvc',

function(prValidateSrvc) {
  return {
    require: '^ngModel',
    restrict: 'A',
    link: function (scope, element, attrs, ctrl) {
      prValidateSrvc.passwordConfirm(scope, ctrl);
    }
  };
}]);