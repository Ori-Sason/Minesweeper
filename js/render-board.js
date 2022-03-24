'use strict'

function renderBoard(board) {
  var strHtml = ''
  for (var i = 0; i < board.length; i++) {
    strHtml += '<tr>'
    for (var j = 0; j < board.length; j++) {
      strHtml += getCellHtml(board, i, j)
    }
    strHtml += '</tr>'
  }

  document.querySelector('.board-tbody').innerHTML = strHtml
}

function getCellHtml(board, idxI, idxJ) {
  const innerText = getCellValue(board[idxI][idxJ])
  const classNames = getClassList(innerText, idxI, idxJ)
  const fontColor = getFontColor(innerText)
  return `<td class="${classNames}" style="color: ${fontColor}" onclick="cellClicked(this, ${idxI}, ${idxJ})" oncontextmenu="cellFlagged(event, this, ${idxI}, ${idxJ})">${innerText}</td>`
}

//**@@@@ I DIDN'T USE THIS FUNCTION */
function renderCell(board, idxI, idxJ) {
  const elCell = document.querySelector(`.cell-${idxI}-${idxJ}`)
  elCell.innerHTML = getCellHtml(board, idxI, idxJ)
}

function getCellValue(cell) {
  if (cell.isFlagged) return FLAG
  if (!cell.isShown) return ''
  if (cell.isMine) return MINE
  return cell.minesAroundCount
}

function getClassList(value, idxI, idxJ) {
  var classNames = [`cell cell-${idxI}-${idxJ}`]
  if (value !== FLAG && value !== '') classNames.push('visible')
  if (value === MINE || value === FLAG) classNames.push('icon')

  if (
    gGame.shownDeadMine &&
    gGame.shownDeadMine.i === idxI &&
    gGame.shownDeadMine.j === idxJ
  ) {
    classNames.push('mine-dead')
  }

  if (gGame.shownLiveMines.length > 0) {
    for(var i = 0; i < gGame.shownLiveMines.length; i++){
      const minePos = gGame.shownLiveMines[i]
      if(minePos.i === idxI && minePos.j === idxJ) classNames.push('mine-alive')
    }
  }

  return classNames.join(' ')
}

function getFontColor(value) {
  if (value >= 0 && value !== '') return DIGIT_COLORS[value]
  return DIGIT_COLORS[DIGIT_COLORS.length - 1]
}
