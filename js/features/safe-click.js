'use strict'

function showSafeClick(elTd) {
  if (checkIsFirstMove() || !gGame.isOn) {
    elTd.style.textDecoration = 'line-through'
    elTd.style.textDecorationColor = 'red'
    setTimeout((elTd) => (elTd.style.textDecoration = 'none'), 300, elTd)
    return
  }

  const safeCells = getAllSafeCells(gBoard)
  if (safeCells.length === 0) return
  const randIdx = getRandomIntInclusive(0, safeCells.length - 1)
  const safeCell = safeCells[randIdx]
  const elSafeTd = document.querySelector(`.cell-${safeCell.i}-${safeCell.j}`)
  const timeout = 300

  gGame.safeInterval = setInterval(
    blinkTd,
    timeout,
    elSafeTd,
    'rgb(98, 71, 170)'
  )

  setTimeout(
    (elTd) => {
      clearInterval(gGame.safeInterval)
      elTd.style.backgroundColor = ''
    },
    timeout * 10,
    elSafeTd
  )

  updateSafeClicks(--gGame.safeClicksCount)
}

function getAllSafeCells(board) {
  const safeCells = []
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      const cell = board[i][j]
      if (!cell.isMine && !cell.isShown) safeCells.push(cell)
    }
  }

  return safeCells
}

function updateSafeClicks(num) {
  renderUlWithIcons(gElSafeClicks, SAFE_CLICK, num, showSafeClick)
}

function blinkTd(elTd, colorStr) {
  if (elTd.style.backgroundColor === colorStr) {
    elTd.style.backgroundColor = ''
  } else {
    elTd.style.backgroundColor = colorStr
  }
}
