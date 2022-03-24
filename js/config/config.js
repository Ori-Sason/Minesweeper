'use strict'

function changeDifficutly(elDiff) {
  gGame.currDifficulty = gDifficulties[elDiff.innerText.toLowerCase()]

  renderBestTime()

  const elDifficulties = document.querySelectorAll('.difficulties li')
  elDifficulties.forEach((x) => x.classList.remove('curr-difficulty'))
  elDiff.classList.add('curr-difficulty')

  clearInterval(gGame.timeIntervalId)
  gGame.startTime = Date.now()
  renderTimer()

  resetGameProperties()
  buildBoard()
  renderBoard(gBoard)
}

function updateLives(num) {
  renderIcons(gElLives, num, LIFE)
}

function renderIcons(el, num, icon) {
  var htmlStr = ''
  for (var i = 0; i < num; i++) {
    htmlStr += icon + ' '
  }
  el.innerHTML = htmlStr
}

function renderUlWithIcons(targetEl, icon, numOfLi, onClickFunc = '') {
  var htmlStr = '<ul>'
  for (var i = 0; i < numOfLi; i++) {
    htmlStr += `<li class="icon" onclick="${onClickFunc.name}(this)">${icon}</li>`
  }
  htmlStr += '</ul>'
  targetEl.innerHTML = htmlStr
}

function renderMinesLeft() {
  const minesLeft =
    (gGame.is7Boom ? gGame.mines7Boom : gGame.currDifficulty.MINES) -
    gGame.flagsCount -
    gGame.minesShownCount

  gElMinesLeft.innerText = minesLeft
}

function renderSmiley(smiley) {
  gElSmiley.innerText = smiley
}
