router.$inject = ['$routeProvider', '$locationProvider']

function router($routeProvider, $locationProvider){
	$locationProvider.hashPrefix('')

	$routeProvider
		.when('/', {
			templateUrl: 'startMenu/startMenu.html',
			controller: 'startMenuCtrl',
			controllerAs: 'vm'
		})
		.when('/game', {
			templateUrl: 'game/game.html',
			controller: 'gameCtrl',
			controllerAs: 'vm'
		})
}

module.exports = router
