'use strict'

//cell is gBoard cell object
function createUndoStackStage(cell) {
  gGame.undo.push([cell])
  return
}

function addToUndoStack(cell) {
  gGame.undo[gGame.undo.length - 1].push(cell)
  return
}

function recoverFromUndo(elBtn) {
  //if the game over, reject using unto
  if (!gGame.isOn) {
    elBtn.style.color = 'red'
    setTimeout(() => (elBtn.style.color = ''), 100)
    return
  }

  const undoCells = gGame.undo.pop()
  if (!undoCells) return

  for (var i = 0; i < undoCells.length; i++) {
    const cell = undoCells[i]
    gBoard[cell.i][cell.j].isShown = false
    if (cell.isMine) gGame.shownLiveMines.pop()

    gGame.shownCount--
  }
  renderBoard(gBoard)
}
