'use strict'

function setManualMineMode(elLi) {
  gGame.isManualMine = !gGame.isManualMine
  resetGameProperties()
  buildBoard()
  renderBoard(gBoard)

  elLi.classList.toggle('selected')

  if (gGame.isManualMine) {
    resetGameProperties()
    revealBoard()

    document
      .querySelectorAll('.cell')
      .forEach((cell) => (cell.style.cursor = 'pointer'))
  } else {
    clearManualModeUI()
    initGame()
  }
}

function setMineOnBoard(elTd, idxI, idxJ) {
  const isMine = elTd.innerText !== MINE

  gGame.minesShownCount += isMine ? 1 : -1
  elTd.innerText = isMine ? MINE : ''
  elTd.style.color = isMine ? 'black' : 'transparent'
  gBoard[idxI][idxJ].isMine = isMine

  renderMinesLeft()
  if (isMine && +gElMinesLeft.innerText === 0) startManualMineGame()
}

function revealBoard() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      gBoard[i][j].isShown = true
    }
  }

  renderBoard(gBoard)
}

function startManualMineGame() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      if (gBoard[i][j].isMine) setMinesNegsCount(i, j)
      gBoard[i][j].isShown = false
    }
  }

  clearManualModeUI()

  gGame.isManualMine = false
  gGame.isManualGame = true
  gGame.timeIntervalId = setInterval(renderTimer, 1000)
  initGame()
}

function clearManualModeUI() {
  gElManualMines.style.border = ''
  gElManualMines.style.color = ''
}
