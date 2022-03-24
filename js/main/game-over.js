'use strict'

function checkGameOver() {
  var isGameOver = false
  if (gGame.livesCount === 0) {
    isGameOver = true
    showAllMines()
    renderSmiley(SMILIES.lose)
    changeBgImg(BG_IMAGE_LOSE)
  } else if (
    gGame.flagsCount + gGame.minesShownCount === gGame.currDifficulty.MINES &&
    gGame.shownCount + gGame.flagsCount === gGame.currDifficulty.SIZE ** 2
  ) {
    isGameOver = true
    renderSmiley(SMILIES.win)
    changeBgImg(BG_IMAGE_WIN)
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

function changeBgImg(toImgSrc) {
 gElBgImg.style.opacity = 0

  setTimeout((toImgSrc) => {
   gElBgImg.style.backgroundImage = toImgSrc
   gElBgImg.style.opacity = 1
  }, 200, toImgSrc)
}

function checkPlayImg(){
  return gElBgImg.style.backgroundImage === BG_IMAGE_PLAY
}