gameCtrl.$inject = ['boardService', 'checkService', 'gameOptions']

function gameCtrl (boardService, checkService, gameOptions) {
	var vm = this

	vm.board = boardService.createBoard(gameOptions.totalColumns, gameOptions.totalRows)
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

		lastMove = [columnPlayed, rowPlayed, vm.board, vm.player, gameOptions.countToWin]

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
