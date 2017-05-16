module.exports = angular.module('game', [])
	.controller('gameCtrl', require('./game.controller'))
	.factory('boardService', require('./board.service'))
	.factory('checkService', require('./check.service'))
	.directive('gameBoard', require('./board.directive'))

