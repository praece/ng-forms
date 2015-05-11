'use strict';

var demo = angular.module('demo', ['ui.select', 'pr.forms']);

demo.controller('demoCtrl', [
	'$timeout',
  '$scope',

function($timeout, $scope) {
  var demo = this;

  demo.clients = [
    {id: '1', name: 'Praece Consulting', disabled: true}, 
    {id: '2', name: 'Microsoft'}, 
    {id: '3', name: 'Daniel\'s Broiler'},
    {id: '4', name: 'Jack in the Box', disabled: true},
    {id: '5', name: 'Burger King'},
    {id: '6', name: 'Boeing'},
    {id: '7', name: 'Manmoon', disabled: true},
    {id: '8', name: 'Fred Meyer'},
    {id: '9', name: 'Fikes Products'}
  ];
  
  demo.pickadateSettings = {min: moment().toDate()};
  demo.startDate = moment().toDate();
  demo.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  demo.time = '0330';
  demo.accountNumber = '123';

  demo.phone = '253-740-8839';
  demo.passwordOptions = {};

  $scope.$watch('demo.phone', function(newValue) {
    demo.passwordOptions.required = {disabled: demo.phone};
  });

  demo.contacts = [{phone: '253-740-8838'}, {}];

  demo.addContact = function() {
    demo.contacts.push({});
  };

  demo.submit = function() {
  	console.log(demo);
  };
}]);
