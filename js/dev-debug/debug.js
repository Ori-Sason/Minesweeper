'use strict'

function revealBoard() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
        gBoard[i][j].isShown = true
    }
  }

  renderBoard(gBoard)
}
