boardService.$inject = []

function boardService() {

	// Cree matrice sous forme d'un tableau de colonnes
	// Chaque colonne est elle-meme un tableau de lignes
	function createBoard(totalColumns, totalRows) {
		var board = []
		var column
		var row

		for (column = 0; column < totalColumns; column++) {
			board.push([])
			for (row = 0; row < totalRows; row++) {
				board[column].push(0)
			}
			// Version Yolo:
			// board[column] = Array.apply(null, Array(totalRows)).map(function(){ return 0 })
		}

		return board
	}

	// Convertit colonnes contenant des lignes en lignes contenant des colonnes
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
		convertToRows: convertToRows
	}
}

module.exports = boardService
