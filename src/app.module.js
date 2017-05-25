var angular = require('angular')

angular.module('puissance', [
		require('angular-route'),
		require('./startMenu').name,
		require('./game').name
	])
	.config(require('./app.route'))
