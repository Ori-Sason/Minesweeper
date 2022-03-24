'use strict'

function renderTimer() {
  const strHtml = timer(gGame.startTime)
  gElTimer.innerText = strHtml
}

function getBestTime() {
  var bestTime = localStorage.getItem(
    LOCAL_STORAGE_KEY + gGame.currDifficulty.SIZE
  )
  return bestTime
}

function setBestTime(bestTime) {
  localStorage.setItem(LOCAL_STORAGE_KEY + gGame.currDifficulty.SIZE, bestTime)
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
