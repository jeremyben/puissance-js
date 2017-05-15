boardService.$inject = []

function boardService() {

	function createBoard(totalColumns, totalRows) {
		var board = []

		for (var col = 0; col < totalColumns; col++) {
			board.push([])
			for (var row = 0; row < totalRows; row++) {
				board[col].push(0)
			}
			// Version Yolo:
			// board[col] = Array.apply(null, Array(totalRows)).map(function(){ return 0 })
		}

		return board
	}

	function convertToRows(board) {
		var totalCols = board.length
		var totalRows = board[0].length
		var rowBoard = []

		for (var hole = 0; hole < totalRows; hole++) {
			rowBoard.push([])
			for (var col = 0; col < totalCols; col++) {
				rowBoard[hole].push(board[col][hole])
			}
		}

		return rowBoard
	}

	return {
		createBoard: createBoard,
		convertToRows: convertToRows
	}
}

module.exports = boardService
