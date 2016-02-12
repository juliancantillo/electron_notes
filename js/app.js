'use strict';

var app = angular.module('notesApp',[
  'app.controllers',
  'app.services',
  'ngRoute'
  ]);


app.config(['$routeProvider',function($routeProvider) {
	$routeProvider
  .when('/',{
		controller: 'MainCtrl',
    templateUrl: 'templates/main.html'
	})
  .when('/add',{
    controller: 'AddNoteCtrl',
    templateUrl: 'templates/add-note.html'
  })
  .when('/view/:id',{
    controller: 'ViewNoteCtrl',
    templateUrl: 'templates/view-note.html'
  });
}]);