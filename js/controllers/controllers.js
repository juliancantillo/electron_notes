'use strict';

angular.module('app.controllers',[])

.controller('MainCtrl', ['$scope', 'Storage', function($scope, Storage){
	
}])

.controller('AddNoteCtrl', ['$scope','$rootScope', '$q', '$timeout','Note', '$location', function($scope, $rootScope, $q, $timeout, Note, $location){
	var idx = null;


}])

.controller('listCtrl', ['$scope','$rootScope', '$filter', 'Note', '$window', function($scope, $rootScope, $filter, Note, $window){
	$scope.notes = [];
	$scope.searchText = '';
	$scope.enable_remove = false;

	var updateList = function() {
		$scope.notes = Note.list();
	}

	$scope.showRemoveButtons = function() {
		$scope.enable_remove = !$scope.enable_remove;
	}

	updateList();

	$rootScope.$on('updateList', updateList);

	$scope.removeItem = function (idx) {
		Note.remove(idx);
		$scope.enable_remove = false;
	}

	$scope.bookmarkItem = function (idx) {
		Note.bookmark(idx);

		$rootScope.$broadcast('updateList');
	}

	$scope.addItem = function () {
		var note = Note.save({ text: 'Nueva nota', created_at: Date.now() });

		$window.location.href = '#/view/' + note.id;
	}



}])

.controller('ViewNoteCtrl', ['$scope','$rootScope', '$timeout','Note', '$window', '$routeParams', function($scope, $rootScope, $timeout, Note, $window, $routeParams){
	var idx = $routeParams.id,
	  savePromise = null;

	console.log(idx);

	$scope.note = Note.get(idx);

	if (!$scope.note) {
		$window.location.href = '#/';
	}
	
	$scope.$watchCollection('note', function(new_value,old_value) {

		if (savePromise) {
			$timeout.cancel(savePromise);
		}
		savePromise = $timeout(saveNote, 500, true, new_value);
	});

	var saveNote = function (note) {
		console.log('saved');
		$scope.note = Note.save(note);

		$rootScope.$broadcast('updateList');
	}

}])