module.exports = angular.module('game', [])
	.controller('gameCtrl', require('./game.controller'))
	.directive('board', require('./board.directive'))

