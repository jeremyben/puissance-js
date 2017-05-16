checkService.$inject = []

function checkService() {

	function vertical(columnPlayed, rowPlayed, board, player, countToWin) {
		var count = 0
		var startRow = rowPlayed - countToWin
		var endRow = rowPlayed + countToWin
		var row

		for (row = startRow ; row <= endRow ; row++) {
			if (board[columnPlayed][row] !== undefined && board[columnPlayed][row] === player) {
				count++
			} else {
				count = 0
			}

			if (count === countToWin) {
				return true
			}
		}

		return false
	}

	function horizontal(columnPlayed, rowPlayed, board, player, countToWin) {
		var count = 0
		var startColumn = columnPlayed - countToWin
		var endColumn = columnPlayed + countToWin
		var column

		for (column = startColumn ; column <= endColumn ; column++) {
			if (board[column] !== undefined && board[column][rowPlayed] === player) {
				count++
			} else {
				count = 0
			}

			if (count === countToWin) {
				return true
			}
		}

		return false
	}

	function diagonal(columnPlayed, rowPlayed, board, player, countToWin) {
		var countRight = 0
		var countLeft = 0
		var delta

		for (delta = 0 ; delta <= countToWin ; delta++) {

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

			if (countRight === countToWin || countLeft === countToWin) {
				return true
			}
		}

		return false
	}

	return {
		vertical: vertical,
		horizontal: horizontal,
		diagonal: diagonal
	}
}

module.exports = checkService
