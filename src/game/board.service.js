boardService.$inject = []

function boardService() {

	// Crée matrice sous forme d'un tableau de colonnes
	// Chaque colonne est elle-même un tableau de lignes
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

	// Ajoute jeton à dernière ligne disponible d'une colonne
	function updateBoard(column, board, player) {
		var row

		// Boucle inversée pour placer les jetons en partant du bas visuellement
		// (pas possible avec filter reverse dans ng-repeat)
		for (row = board[column].length - 1; row >= 0; row--) {
			if (board[column][row] === 0) {
				// Place numéro du joueur et retourne board et ligne au premier zéro rencontré
				board[column][row] = player
				return {
					board: board,
					row: row
				}
			}

			if (row === 0) {
				// Retourne faux lorsque "sommet" (ici 0) atteint
				return false
			}
		}
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
		updateBoard: updateBoard,
		convertToRows: convertToRows
	}
}

module.exports = boardService
