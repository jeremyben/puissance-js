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
		checkVerticalWin(column, row, vm.board, vm.player)
		checkHorizontalWin(column, row, vm.board, vm.player)
		checkDiagonalWin(column, row, vm.board, vm.player)
		switchPlayer()
	}

	function checkVerticalWin(columnPlayed, rowPlayed, board, player) {
		var count = 0
		var startRow = rowPlayed - winCount
		var endRow = rowPlayed + winCount
		var row

		for (row = startRow ; row <= endRow ; row++) {
			if (board[columnPlayed][row] !== undefined && board[columnPlayed][row] === player) {
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

	function checkHorizontalWin(columnPlayed, rowPlayed, board, player) {
		var count = 0
		var startColumn = columnPlayed - winCount
		var endColumn = columnPlayed + winCount
		var column

		for (column = startColumn ; column <= endColumn ; column++) {
			if (board[column] !== undefined && board[column][rowPlayed] === player) {
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

	function checkDiagonalWin(columnPlayed, rowPlayed, board, player) {
		var countRight = 0
		var countLeft = 0
		var delta

		for (delta = 0 ; delta <= winCount ; delta++) {

			// Diagonales vers la droite
			if (board[columnPlayed + delta] !== undefined) {
				if (board[columnPlayed + delta][rowPlayed - delta] === player || // haut-gauche -> bas-droite
					board[columnPlayed + delta][rowPlayed + delta] === player) { // bas-gauche -> haut-droite
					countRight++
				} else {
					countRight = 0
				}
			}

			// Diagonales vers la gauche
			if (board[columnPlayed - delta] !== undefined) {
				if (board[columnPlayed - delta][rowPlayed + delta] === player || // bas-droite -> haut-gauche
					board[columnPlayed - delta][rowPlayed - delta] === player) { // haut-droite -> bas-gauche
					countLeft++
				} else {
					countLeft = 0
				}
			}

			if (countRight === winCount || countLeft === winCount) {
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
