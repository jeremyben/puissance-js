gameCtrl.$inject = ['boardService', 'checkService', 'gameOptions']

function gameCtrl (boardService, checkService, gameOptions) {
	var vm = this

	vm.board = boardService.createBoard(gameOptions.totalColumns, gameOptions.totalRows)
	vm.player = 1 // First player begins
	vm.victory = false

	vm.putChipIn = function(columnPlayed) {
		var updated = boardService.updateBoard(columnPlayed, vm.board, vm.player)
		var rowPlayed
		var lastMove

		if (!updated) {
			return
		}

		vm.board = updated.board
		rowPlayed = updated.row
		lastMove = [columnPlayed, rowPlayed, vm.board, vm.player, gameOptions.countToWin]

		if (hasWon(lastMove)) {
			vm.victory = true
		} else {
			switchPlayer()
		}
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
