'use strict'

//firstPos is an object { i: i, j: j } of gBoard location
function initGame(firstPos) {
  resetGameProperties()

  if (!gGame.isManualMine && !gGame.isManualGame) buildBoard()

  if (firstLoad) {
    renderBestTime()
    firstLoad = false
  }

  gElTimer.innerText = '00:00'

  if (gGame.is7Boom) {
    setMines7Boom(gBoard)
  } else if (firstPos && !gGame.isManualGame) {
    if (gGame.is7Boom) gGame.is7Boom = false
    else {
      setMinesRandomly(gBoard, gGame.currDifficulty.MINES, firstPos)
      gGame.timeIntervalId = setInterval(renderTimer, 1000)
    }
  }

  renderBoard(gBoard)
}

function resetGameProperties() {
  if (firstLoad) gElBgImg.style.backgroundImage = BG_IMAGE_PLAY
  else if (!checkPlayImg()) changeBgImg(BG_IMAGE_PLAY)
  
  clearInterval(gGame.timeIntervalId)

  gGame.isOn = true
  gGame.shownCount = 0
  gGame.flagsCount = 0
  gGame.minesShownCount = 0
  gGame.livesCount = gGame.currDifficulty.LIVES
  gGame.hintsCount = 3
  gGame.isHintMode = false
  gGame.safeClicksCount = 3
  gGame.startTime = new Date()
  gGame.timeIntervalId = 0
  gGame.shownLiveMines = []
  gGame.shownDeadMine = null
  gGame.undo = []

  renderSmiley(SMILIES.playing)
  updateSafeClicks(gGame.safeClicksCount)
  updateLives(gGame.livesCount)
  updateHints(gGame.hintsCount)
  renderMinesLeft(gGame.currDifficulty.MINES)
}

function buildBoard() {
  gBoard = []
  for (var i = 0; i < gGame.currDifficulty.SIZE; i++) {
    gBoard.push([])

    for (var j = 0; j < gGame.currDifficulty.SIZE; j++) {
      gBoard[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isFlagged: false,
        i,
        j,
      }
    }
  }

  return gBoard
}

function setMinesRandomly(board, numOfMines, firstPos) {
  while (numOfMines > 0) {
    const randomI = getRandomIntInclusive(0, board.length - 1)
    const randomJ = getRandomIntInclusive(0, board[randomI].length - 1)

    const cell = board[randomI][randomJ]
    if (cell.isMine || (randomI === firstPos.i && randomJ === firstPos.j)) {
      continue
    }

    cell.isMine = true
    numOfMines--
    setMinesNegsCount(randomI, randomJ)
  }
}

function setMinesNegsCount(idxI, idxJ) {
  var neighbors = getNeighbors(gBoard, idxI, idxJ)
  for (var i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i]
    neighbor.minesAroundCount++
  }
}

function checkIsFirstMove() {
  var firstMove = false
  if (gGame.timeIntervalId === 0 && !gGame.shownCount && !gGame.flagsCount)
    //can't use only timeInterval because of 7BOOM
    firstMove = true

  return firstMove
}
