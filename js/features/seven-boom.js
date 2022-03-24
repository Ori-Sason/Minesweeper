'use strict'

function set7BoomMode() {
  gGame.is7Boom = true
  initGame()
}

function setMines7Boom(board) {
  var count = 0
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (count % 7 === 0 || (count - 7) % 10 === 0) {
        gBoard[i][j].isMine = true
        setMinesNegsCount(i, j)
      }
      count++
    }
  }
}
