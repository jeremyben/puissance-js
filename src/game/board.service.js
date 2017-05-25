boardService.$inject = []

function boardService() {

	// Create matrix in a form of a array of columns
	// Each column is itself a array of rows
	function createBoard(totalColumns, totalRows) {
		var board = []
		var column
		var row

		for (column = 0; column < totalColumns; column++) {
			board.push([])

			for (row = 0; row < totalRows; row++) {
				board[column].push(0)
			}
		}

		return board
	}

	// Add chip to last row available of a column
	function updateBoard(column, board, player) {
		var row

		// Reversed loop to put chips in starting from the bottom visually
		for (row = board[column].length - 1; row >= 0; row--) {
			if (board[column][row] === 0) {
				// Put player's number in and returns board and row at the first zero met
				board[column][row] = player
				return {
					board: board,
					row: row
				}
			}

			if (row === 0) {
				// Returns null when top (here: 0) is reached
				return null
			}
		}
	}

	// Transforms columns made of rows into rows made of columns
	function convertToRows(board) {
		var totalCols = board.length
		var totalRows = board[0].length
		var rowBoard = []
		var row
		var column

		for (row = 0; row < totalRows; row++) {
			rowBoard.push([])
			for (column = 0; column < totalCols; column++) {
				rowBoard[row].push(board[column][row])
			}
		}

		return rowBoard
	}

	return {
		createBoard: createBoard,
		updateBoard: updateBoard,
		convertToRows: convertToRows
	}
}

module.exports = boardService
