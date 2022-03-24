'use strict'

function checkGameOver() {
  var isGameOver = false
  if (gGame.livesCount === 0) {
    isGameOver = true
    showAllMines()
    renderSmiley(SMILIES.lose)
  } else if (
    gGame.flagsCount + gGame.minesShownCount === gGame.currDifficulty.MINES &&
    gGame.shownCount + gGame.flagsCount === gGame.currDifficulty.SIZE ** 2
  ) {
    isGameOver = true
    renderSmiley(SMILIES.win)
    updateBestTime()
  }

  if (isGameOver) {
    gGame.isOn = false
    gGame.isManualGame = false
    clearInterval(gGame.timeIntervalId)
  }

  return isGameOver
}

function showAllMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      const cell = gBoard[i][j]
      if (cell.isMine) cell.isShown = true
    }
  }
}
