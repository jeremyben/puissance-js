gameCtrl.$inject = ['boardService', 'checkService']

function gameCtrl (boardService, checkService) {
	var vm = this
	var numberOfCols = 7
	var numberOfRows = 6
	var countToWin = 4

	vm.board = boardService.createBoard(numberOfCols, numberOfRows)
	vm.player = 1 // Premier joueur commence

	vm.putChipIn = function(columnPlayed) {
		var updated = boardService.updateBoard(columnPlayed, vm.board, vm.player)
		var rowPlayed
		var lastMove

		if (!updated) {
			return
		} else {
			vm.board = updated.board
			rowPlayed = updated.row
		}

		lastMove = [columnPlayed, rowPlayed, vm.board, vm.player, countToWin]

		if (hasWon(lastMove)) {
			console.log('Joueur ' + vm.player + ' remporte la victoire !')
		}

		switchPlayer()
	}

	function hasWon(lastMove) {
		var toWin = checkService.vertical.apply(this, lastMove) ||
					checkService.horizontal.apply(this, lastMove) ||
					checkService.diagonal.apply(this, lastMove)

		return toWin
	}

	function switchPlayer() {
		vm.player = vm.player === 1 ? 2 : 1
	}

}

module.exports = gameCtrl
