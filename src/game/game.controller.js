gameCtrl.$inject = ['boardService']

function gameCtrl (boardService) {
	var vm = this
	var numberOfCols = 7
	var numberOfRows = 6
	var winCount = 4

	vm.board = boardService.createBoard(numberOfCols, numberOfRows)
	vm.player = 1 // Premier joueur commence

	vm.putChipIn = function(column, player) {
		// Boucle inversée pour placer les jetons en partant du bas visuellement
		// (pb avec filter reverse dans ng-repeat des trous)
		for (var hole = vm.board[column].length - 1; hole >= 0; hole--) {
			if (vm.board[column][hole] === 0) {
				// Place numéro du joueur et arrête boucle au premier zéro rencontré
				vm.board[column][hole] = player
				break
			}
			if (hole === 0) {
				// Coupe execution lorsque "sommet" (ici 0) atteint
				return
			}
		}
		checkVerticalWin(vm.board, column, player)
		switchPlayer()
	}

	function checkVerticalWin(board, column, player) {
		var count = 0

		for (var hole = 0; hole < board[column].length; hole++) {
			if (board[column][hole] === player) {
				count++
			} else {
				count = 0
			}
			if (count === winCount) {
				console.log('Joueur ' + player + ' remporte la victoire !')
				return true
			}
		}
		return false
	}

	function switchPlayer() {
		vm.player = vm.player === 1 ? 2 : 1
	}

}

module.exports = gameCtrl
