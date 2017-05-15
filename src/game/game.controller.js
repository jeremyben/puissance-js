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
		checkHorizontalWin(row, vm.board, vm.player)
		checkDiagonalWin(row, column, vm.board, vm.player)
		switchPlayer()
	}

	function checkVerticalWin(columnPlayed, board, player) {
		var count = 0
		var row

		for (row = 0; row < board[columnPlayed].length; row++) {
			if (board[columnPlayed][row] === player) {
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

	function checkHorizontalWin(rowPlayed, board, player) {
		var count = 0
		var column

		for (column = 0; column < board.length; column++) {
			if (board[column][rowPlayed] === player) {
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

	function checkDiagonalWin(rowPlayed, columnPlayed, board, player) {
		var diagonalMax = Math.min(numberOfCols, numberOfRows)
		var count = 0
		var diag

		console.log(columnPlayed +'x'+ rowPlayed)


		for (diag = 0; diag < diagonalMax; diag++) {

			// Check limites du board
			if (typeof board[columnPlayed + diag] !== 'undefined' &&
				typeof board[columnPlayed - diag] !== 'undefined') {

				// diagonale principale (haut-gauche -> bas-droite)
				// et anti-diagonale (haut-droite -> bas-gauche)
				if (board[columnPlayed + diag][rowPlayed - diag] === player ||
					board[columnPlayed - diag][rowPlayed + diag] === player ||
					board[columnPlayed + diag][rowPlayed + diag] === player ||
					board[columnPlayed - diag][rowPlayed - diag] === player) {
					count++
				} else {
					count = 0
				}
			}

			if (count === winCount) {
				console.log('Joueur ' + player + ' remporte la victoire !')
				return true
			}
		}

	}

	function switchPlayer() {
		vm.player = vm.player === 1 ? 2 : 1
	}

}

module.exports = gameCtrl
