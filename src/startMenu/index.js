module.exports = angular.module('startMenu', [
		require('../game').name
	])
	.controller('startMenuCtrl', require('./startMenu.controller'))
