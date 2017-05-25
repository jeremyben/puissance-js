router.$inject = ['$routeProvider', '$locationProvider']

function router($routeProvider, $locationProvider){
	$locationProvider.hashPrefix('')

	$routeProvider
		.when('/', {
			template: require('./startMenu/startMenu.html'),
			controller: 'startMenuCtrl',
			controllerAs: 'vm'
		})
		.when('/game', {
			template: require('./game/game.html'),
			controller: 'gameCtrl',
			controllerAs: 'vm'
		})
}

module.exports = router
