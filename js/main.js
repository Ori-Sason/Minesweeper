'use strict'

const MINE = '💣'
const FLAG = '🚩'
const LIFE = '&#10084;'
const SMILIES = { playing: '🤔', win: '😁', lose: '😅' }
const HINT = '💡'
const LOCAL_STORAGE_KEY = 'minesweeperTime'
const SAFE_CLICK = '🔐' //
const BG_IMAGE_PLAY = 'url("/img/background-play.png")'
const BG_IMAGE_WIN = 'url("/img/background-win.png")'
const BG_IMAGE_LOSE = 'url("/img/background-lose.png")'

const DIGIT_COLORS = [
  'transparent',
  'blue',
  'green',
  'red',
  'darkblue',
  'darkred',
  'darkcyan',
  'black',
  'darkolivegreen',
  'black',
]

var gBoard = []
const gDifficulties = {
  easy: { SIZE: 4, MINES: 2, LIVES: 2 },
  medium: { SIZE: 8, MINES: 12, LIVES: 3 },
  expert: { SIZE: 12, MINES: 30, LIVES: 3 },
}

const gGame = {
  isOn: true,
  shownCount: 0,
  flagsCount: 0,
  minesShownCount: 0,
  livesCount: 3,
  hintsCount: 0,
  isHintMode: false,
  safeClicksCount: 0,
  is7Boom: false,
  isManualMine: false,
  isManualGame: false,

  startTime: new Date(),
  timeIntervalId: 0,

  currDifficulty: gDifficulties.medium,
  shownLiveMines: [],
  shownDeadMine: null,
  safeInterval: 0,
  undo: [],
}

var firstLoad = true
var visibilityStates = [] //for the hint feature

const gElBgImg = document.querySelector('.bg-image')
const gElSafeClicks = document.querySelector('.safe-click')
const gElManualMines = document.querySelector('.manual-mines')
const gElLives = document.querySelector('.lives')
const gElHints = document.querySelector('.hints')
const gElMinesLeft = document.querySelector('.mines-left span')
const gElBestTime = document.querySelector('.best-time span')
const gElTimer = document.querySelector('.timer span')
const gElSmiley = document.querySelector('.restart-btn')
