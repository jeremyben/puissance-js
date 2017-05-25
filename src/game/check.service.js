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
		var countMainDiag = 0
		var countAntiDiag = 0
		var startColumn = columnPlayed - countToWin
		var endColumn = columnPlayed + countToWin
		var delta

		for (delta = -countToWin ; delta <= countToWin ; delta++) {
			// Diagonale principale (haut-gauche -> bas-droite)
			if (board[columnPlayed + delta] !== undefined && board[columnPlayed + delta][rowPlayed - delta] === player) {
				countMainDiag++
			} else {
				countMainDiag = 0
			}

			// Anti-diagonale (bas-gauche -> haut-droite)
			if (board[columnPlayed + delta] !== undefined && board[columnPlayed + delta][rowPlayed + delta] === player) {
				countAntiDiag++
			} else {
				countAntiDiag = 0
			}

			if (countMainDiag === countToWin || countAntiDiag === countToWin) {
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
