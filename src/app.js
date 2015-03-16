'use strict';

var demo = angular.module('demo', ['ui.select', 'pr.forms']);

demo.controller('demoCtrl', [
	'$timeout',

function($timeout) {
  var demo = this;

  demo.clients = [
    {id: '1', name: 'Praece Consulting'}, 
    {id: '2', name: 'Microsoft'}, 
    {id: '3', name: 'Daniel\'s Broiler'},
    {id: '4', name: 'Jack in the Box'},
    {id: '5', name: 'Burger King'},
    {id: '6', name: 'Boeing'},
    {id: '7', name: 'Manmoon'},
    {id: '8', name: 'Fred Meyer'},
    {id: '9', name: 'Fikes Products'}
  ];
  
  demo.pickadateSettings = {min: moment().toDate()};
  demo.startDate = moment().toDate();
  demo.days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  demo.time = '0330';

  demo.contacts = [{phone: '253-740-8838'}, {}];

  demo.addContact = function() {
    demo.contacts.push({});
  };

  demo.submit = function() {
  	console.log(demo);
  };
}]);
