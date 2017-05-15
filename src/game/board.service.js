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

	return {
		createBoard: createBoard,
	}
}

module.exports = boardService
