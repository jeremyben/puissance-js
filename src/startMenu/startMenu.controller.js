startMenuCtrl.$inject = ['$location', 'gameOptions']

function startMenuCtrl ($location, gameOptions) {
	var vm = this

	vm.totalColumns = gameOptions.totalColumns
	vm.totalRows = gameOptions.totalRows
	vm.countToWin = gameOptions.countToWin

	vm.play = function() {
		gameOptions.totalColumns = Number(vm.totalColumns)
		gameOptions.totalRows = Number(vm.totalRows)
		gameOptions.countToWin = Number(vm.countToWin)

		$location.path('/game')
	}

}

module.exports = startMenuCtrl
