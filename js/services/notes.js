'use strict';

angular.module('app.services')

.factory('Note', ['Storage', '$filter', function(Storage, $filter){
	var self = this,
	    _notes = [];
	
	self._notes = JSON.parse(Storage.get('notes')) || [];

	return {

		list: function () {

			self._notes = $filter('orderBy')(self._notes, '-created_at');
			self._notes = $filter('orderBy')(self._notes, '-bookmarked_at');

			// return $filter('orderBy')(self._notes, '-created_at');
			// console.log('Notas', self._notes);

			return self._notes;
		},
		save: function (note) {

			if(note.id){
				var idx = self._notes.indexOf(note);

				note.title = note.text.substr(0, 15);

				self._notes[idx] = note;

			}else{

				note.title = note.text.substr(0, 15);
				note.created_at = Date.now();
				note.bookmarked_at = note.bookmarked_at || 0;
				note.id = Date.now();

				self._notes.push(note);
			}

			// Update the storage
			this.update_storage();

			return note;

		},
		get: function (id) {
			var note = null;
			angular.forEach(self._notes, function(element) {
				if(id == element.id )
					note = element;
			});
			return note;

			// return self._notes[idx];
		},
		remove: function (idx) {
			
			self._notes.splice(idx, 1);
			this.update_storage();

		},
		bookmark: function (idx) {
			var note = self._notes[idx];

			note.bookmarked_at = Date.now();

			this.update_storage();
		},
		update_storage: function() {
			var json = JSON.stringify(self._notes);
			Storage.set('notes', json);
		}
	};
}]);