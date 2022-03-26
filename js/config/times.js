'use strict'

function renderTimer() {
  const strHtml = timer(gGame.startTime)
  gElTimer.innerText = strHtml
}

function getBestTime() {
  var bestTime = localStorage.getItem(getBestTimeKeyName())
  return bestTime
}

function setBestTime(bestTime) {
  localStorage.setItem(getBestTimeKeyName(), bestTime)
}

function getBestTimeKeyName() {
  var keyName = LOCAL_STORAGE_KEY
  keyName += gGame.is7Boom ? '7Boom' : ''
  keyName += gGame.isManualMine || gGame.isManualGame ? 'Manual' : ''
  keyName += gGame.currDifficulty.SIZE
  return keyName
}

function renderBestTime() {
  var bestTime = getBestTime()
  if (!bestTime) bestTime = '00:00'
  gElBestTime.innerText = bestTime
}

function updateBestTime() {
  var bestTime = getBestTime()
  if (!bestTime) setBestTime(gElTimer.innerText)
  else {
    const oldTime = convertTimeToHours(bestTime)
    const currTime = convertTimeToHours(gElTimer.innerText)

    if (currTime < oldTime) setBestTime(gElTimer.innerText)
  }

  renderBestTime()
}

function convertTimeToHours(timeStr) {
  const times = timeStr.split(':')
  return +times[0] * 60 + +times[1]
}
