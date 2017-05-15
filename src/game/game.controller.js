gameCtrl.$inject = ['boardService']

function gameCtrl (boardService) {
	var vm = this
	var numberOfCols = 7
	var numberOfRows = 6
	var winCount = 4

	vm.board = boardService.createBoard(numberOfCols, numberOfRows)
	vm.player = 1 // Premier joueur commence

	vm.putChipIn = function(column) {
		var row
		// Boucle inversée pour placer les jetons en partant du bas visuellement
		// (pas possible avec filter reverse dans ng-repeat)
		for (row = vm.board[column].length - 1; row >= 0; row--) {
			if (vm.board[column][row] === 0) {
				// Place numéro du joueur et arrête boucle au premier zéro rencontré
				vm.board[column][row] = vm.player
				break
			}
			if (row === 0) {
				// Coupe execution lorsque "sommet" (ici 0) atteint
				return
			}
		}
		checkVerticalWin(column, vm.board, vm.player)
		switchPlayer()
	}

	function checkVerticalWin(column, board, player) {
		var count = 0
		var row

		for (row = 0; row < board[column].length; row++) {
			if (board[column][row] === player) {
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

	function checkHorizontalWin(board, column, player) {
		var rowBoard = boardService.convertToRows(board)
	}

	function switchPlayer() {
		vm.player = vm.player === 1 ? 2 : 1
	}

}

module.exports = gameCtrl
