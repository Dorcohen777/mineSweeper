'use strict'

const elTimerDisplay = document.querySelector('.span-timer')

function onEasyLevel() {
    playLevel() // play sound
    
    // handle game board
    gBoard = createBoard(4, 4)
    gMinesCount = 0
    randMines(3, gBoard.length)
    renderBoard(gBoard, '.board-container')

    // handle emoji face
    elEmoji.innerHTML = HAPPY

    // handle mines counter
    countMines() // TODO - need to fix so that after clicking on level it wont increment countMines
    console.log('gMinesCount', gMinesCount)

    // display flag count
    elFlagAmount.innerHTML = gFlagsAmount

    // reset params
    gLiveCount = 3
    gCountTrueCells = 0
    gFlagsAmount = 10
    gHearts = ['💗', '💗', '💗']
    elSpanLives.innerHTML = gHearts.join('') // change the heart lives
    elFlagAmount.innerHTML = gFlagsAmount // reset flags
    gTimer = 0
    isTime = true
    gIsVictory = false
    gGameOver = false
    stopTime()
    elTimerDisplay.innerHTML = 0
    gBoardCellsAmount = (gBoard.length ** 2) - gMinesCount
}

function onMediumLevel() {
    playLevel()
    // handle game board
    gBoard = createBoard(8, 8)
    gMinesCount = 0
    randMines(10, gBoard.length)
    renderBoard(gBoard, '.board-container')

    // handle emoji face
    elEmoji.innerHTML = HAPPY

    // handle mines counter
    countMines()
    console.log('gMinesCount', gMinesCount)

    // display flag count
    elFlagAmount.innerHTML = gFlagsAmount

    // reset params
    gLiveCount = 3
    gCountTrueCells = 0
    gFlagsAmount = 10
    gHearts = ['💗', '💗', '💗']
    elSpanLives.innerHTML = gHearts.join('') // change the heart lives
    elFlagAmount.innerHTML = gFlagsAmount // reset flags
    gTimer = 0
    isTime = true
    gIsVictory = false
    gGameOver = false
    stopTime()
    elTimerDisplay.innerHTML = 0
    console.log('gBoard.length', gBoard.length)
    console.log('gMinesCount', gMinesCount)
    gBoardCellsAmount = (gBoard.length ** 2) - gMinesCount // reset count of cells for checkVictory function
    console.log('gBoardCellsAmount', gBoardCellsAmount)
    
}

function onHardLevel() {
    playLevel()

    // handle game board
    gBoard = createBoard(12, 12)
    gMinesCount = 0
    randMines(25, gBoard.length)
    renderBoard(gBoard, '.board-container')

    // handle emoji face
    elEmoji.innerHTML = HAPPY

    // handle mines counter
    countMines()
    console.log('gMinesCount', gMinesCount)

    // display flag count
    elFlagAmount.innerHTML = gFlagsAmount

    // reset params
    gLiveCount = 3
    gCountTrueCells = 0
    gFlagsAmount = 10
    gHearts = ['💗', '💗', '💗']
    elSpanLives.innerHTML = gHearts.join('') // reset hearts
    elFlagAmount.innerHTML = gFlagsAmount // reset flags
    gTimer = 0
    isTime = true
    gIsVictory = false
    gGameOver = false
    stopTime()
    elTimerDisplay.innerHTML = 0
    gBoardCellsAmount = (gBoard.length ** 2) - gMinesCount
    
}