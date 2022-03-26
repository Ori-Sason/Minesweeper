'use strict'

function cellClicked(elCell, idxI, idxJ) {
  var cell = gBoard[idxI][idxJ]
  if (gGame.isManualMine) return setMineOnBoard(elCell, idxI, idxJ)
  if (!gGame.isOn || cell.isFlagged || cell.isShown) return

  if (checkIsFirstMove()) {
    initGame({ i: idxI, j: idxJ })
    cell = gBoard[idxI][idxJ]
  }

  if (gGame.isHintMode) {
    useHint(idxI, idxJ)
    return
  }

  showCell(cell)
  createUndoStackStage(cell)

  if (cell.isMine) {
    gGame.minesShownCount++
    gGame.livesCount--
    updateLives(gGame.livesCount)
    renderMinesLeft()

    if (gGame.livesCount === 0) {
      gGame.shownDeadMine = { i: idxI, j: idxJ }
    } else {
      gGame.shownLiveMines.push({ i: idxI, j: idxJ })
    }
  } else if (cell.minesAroundCount === 0) {
    expandShown(gBoard, idxI, idxJ)
  }

  checkGameOver()
  renderBoard(gBoard)
}

function showCell(cell) {
  cell.isShown = true
  gGame.shownCount++
}

function expandShown(board, idxI, idxJ) {
  const neighbors = getNeighbors(board, idxI, idxJ)

  for (var i = 0; i < neighbors.length; i++) {
    const neighbor = neighbors[i]
    if (neighbor.isShown) continue

    showCell(neighbor)
    addToUndoStack(neighbor)
    if (neighbor.minesAroundCount === 0) {
      expandShown(board, neighbor.i, neighbor.j)
    }
  }
}

//Right click Event
function cellFlagged(event, elCell, idxI, idxJ) {
  event.preventDefault()

  if (!gGame.shownCount && !gGame.flagsCount) {
    initGame({ idxI, idxJ })
    elCell = document.querySelector(`.cell-${idxI}-${idxJ}`)
  }

  const cell = gBoard[idxI][idxJ]
  if (!gGame.isOn || cell.isShown) return

  cell.isFlagged = !cell.isFlagged
  elCell.classList.toggle('icon')

  if (cell.isFlagged) {
    elCell.innerText = FLAG
    gGame.flagsCount++
  } else {
    elCell.innerText = ''
    gGame.flagsCount--
  }

  renderMinesLeft()
  checkGameOver()
}

function tableRightClick(event){
  event.preventDefault()
}
