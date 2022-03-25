'use strict'

function set7BoomMode(elBtn) {
  clearManualMode()

  gGame.is7Boom = !gGame.is7Boom
  elBtn.classList.toggle('selected')
  initGame()
}

function setMines7Boom(board) {
  var count = 0
  var mineCounter = 0
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (count % 7 === 0 || (count - 7) % 10 === 0) {
        gBoard[i][j].isMine = true
        setMinesNegsCount(i, j)
        mineCounter++
      }
      count++
    }
  }
  return mineCounter
}

function clear7BoomMode(){
  gGame.is7Boom = false
  gGame.mines7Boom = 0
  gEl7Boom.classList.remove('selected')
}
