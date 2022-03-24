'use strict'

function updateHints(num) {
  renderUlWithIcons(gElHints, HINT, num, setHintMode)
}

function setHintMode(elBtn) {
  //if the game is not started, reject using hint (we dind't build the board yet)
  if (checkIsFirstMove() || !gGame.isOn) {
    elBtn.style.color = 'transparent'
    elBtn.style.textShadow = '0 0 0 red'
    setTimeout(() => updateHints(gGame.hintsCount), 100)
    return
  }

  if (gGame.isHintMode) {
    updateHints(gGame.hintsCount)
  } else {
      elBtn.classList.add()
    elBtn.style.color = 'transparent'
    elBtn.style.textShadow = '0 0 0 black'
  }
  gGame.isHintMode = !gGame.isHintMode
}

function useHint(idxI, idxJ) {
  updateHints(--gGame.hintsCount)
  gGame.isOn = false

  const cellAndNegs = getNeighbors(gBoard, idxI, idxJ)
  cellAndNegs.push(gBoard[idxI][idxJ])
  showOrHideCells(cellAndNegs, true)

  setTimeout(showOrHideCells, 1000, cellAndNegs, false)
}

function showOrHideCells(cells, isVisible) {
  for (var i = 0; i < cells.length; i++) {
    const cell = cells[i]
    const elCell = document.querySelector(`.cell-${cell.i}-${cell.j}`)

    if (isVisible) {
      visibilityStates.push(cell.isShown)
      cell.isShown = true
    } else {
      cell.isShown = visibilityStates[i]
    }

    renderBoard(gBoard)
  }

  if (!isVisible) {
    visibilityStates = []
    gGame.isHintMode = false
    gGame.isOn = true
  }
}
