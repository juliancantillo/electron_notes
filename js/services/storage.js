'use strict';

angular.module('app.services',[])

.factory('Storage', ['$window',function($window){
	return {
		get: function (key) {
			return $window.localStorage.getItem(key) || null;
		},
		set: function(key, value) {
			$window.localStorage.setItem(key, value);
		}
	};
}])