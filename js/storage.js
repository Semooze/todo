(function (exports) {

	'use strict';

	var STORAGE_KEY = 'todosapp';

  if(typeof(Storage) === "undefined") alert('yout browser doesn\'t support webstorage');

	exports.todoStorage = {
		fetch: function () {
			return localStorage.getItem(STORAGE_KEY) || 'all';
		},
		save: function (visibility) {
			localStorage.setItem(STORAGE_KEY, visibility);
		}
	};

})(window);
