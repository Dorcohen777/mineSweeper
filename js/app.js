'use strict'


var elEmoji = document.querySelector('.h3-feel')
var elFlagAmount = document.querySelector('.span-flag')
var elSpanLives = document.querySelector('.span-lives')

var gBoardCellsAmount
var gIsVictory = false
var gGameOver = false
var gLiveCount = 3
var gCountTrueCells = 0
var gMinesCount = 0
var gFlagsAmount = 10
var gHearts = ['💗', '💗', '💗']
var gBoard

const MINE = '💣'
const FLAG = '🚩'
const HAPPY = '😄'
const SAD = '😦'
const DEAD = '💀'




// on html page load
function onInit() {

    // handle game board
    gBoard = createBoard(4, 4)
    randMines(3, gBoard.length)
    renderBoard(gBoard, '.board-container')

    // handle emoji face
    elEmoji.innerHTML = HAPPY

    // handle mines counter
    countMines()
    console.log('gMinesCount', gMinesCount)

    // display flag count
    elFlagAmount.innerHTML = gFlagsAmount

}

// placeing random mines on board
function randMines(minesNum, board) {
    // updating Model
    for (var i = 0; i < minesNum; i++) {
        var randI = getRandomInt(0, board)
        var randJ = getRandomInt(0, board)
        gBoard[randI][randJ].content = MINE
    }
    // updating DOM
    handleNumbers()
    renderBoard(gBoard, '.board-container')
}


// loop over the adjacent cells of each mine cell that found
// and then update the content property of these adjacent cells to be the number of adjacent mines
function handleNumbers() {
    for (var i = 0; i < gBoard.length; i++) {
        var currRow = gBoard[i]
        for (var j = 0; j < currRow.length; j++) {
            var currCell = currRow[j]
            if (currCell.content === MINE) {
                for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
                    if (rowIdx < 0 || rowIdx >= gBoard.length) continue
                    for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
                        if (colIdx < 0 || colIdx >= currRow.length) continue
                        var currAdjacentCell = gBoard[rowIdx][colIdx]
                        if (currAdjacentCell.content !== MINE) {
                            currAdjacentCell.content = getAdjacentMinesCount(rowIdx, colIdx)
                        }
                    }
                }
            }
            if (currCell.content === '') {
                currCell.content = 0
            }
        }
    }
}

// function that returns the count of mines in the adjacent cells
function getAdjacentMinesCount(rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue
            if (gBoard[i][j].content === MINE) count++
        }
    }

    return count
}
// when user click on cell handle click
function onUserClick(elBtn, i, j) {

    var currCell = gBoard[i][j]

    if (gGameOver) return

    // If the cell has already been revealed, do nothing
    if (currCell.isRevealed) return

    if (isTime) {
        console.log('true')
        startTime()
        isTime = false
    }
    playClick()

    // If the cell is a mine
    if (currCell.content === MINE) {

        // updating the model
        currCell.isRevealed = true
        // updating the DOM
        elBtn.innerHTML = MINE


        gLiveCount--
        gHearts.pop() // remove heart from array
        elSpanLives.innerHTML = gHearts.join('') // change the heart lives
        elEmoji.innerHTML = SAD

        if (gLiveCount === 0) {
            elEmoji.innerHTML = DEAD
            gGameOver = true
            playOver()
            revealMines(i, j)
            alert('Game over!')
            stopTime()
        }
        return;
    }

    // Reveal the cell and update the UI
    currCell.isRevealed = true;
    elBtn.innerHTML = currCell.content

    // check if victory
    checkVictory()
    if (gIsVictory === true) {
        revealMines(i, j)
        stopTime()
    }



    // If the cell has no adjacent mines, reveal all adjacent cells
    if (currCell.content === 0) {
        for (var rowIdx = i - 1; rowIdx <= i + 1; rowIdx++) {
            if (rowIdx < 0 || rowIdx >= gBoard.length) continue
            for (var colIdx = j - 1; colIdx <= j + 1; colIdx++) {
                if (colIdx < 0 || colIdx >= gBoard[rowIdx].length) continue
                var currAdjacentCell = gBoard[rowIdx][colIdx]
                if (!currAdjacentCell.isRevealed) {
                    var elAdjacentCell = document.querySelector(`.cell-${rowIdx}-${colIdx}`)
                    onUserClick(elAdjacentCell, rowIdx, colIdx)
                }
            }
        }
    }


}

// function that reveal mines when game over
function revealMines(i, j) {

    for (var i = 0; i < gBoard.length; i++) {
        var currCell = gBoard[i]

        for (var j = 0; j < gBoard.length; j++) {

            if (currCell[j].content === MINE) {
                console.log('found mine', i, j)
                // updating the model
                currCell[j].isRevealed = true

                // updating the DOM
                renderCell(currCell[j], MINE)

            }
        }
    }
}

// check if Victory
function checkVictory() {

    gBoardCellsAmount = (gBoard.length ** 2) - gMinesCount
    gCountTrueCells++

    console.log('gCountTrueCells', gCountTrueCells)
    console.log('gBoardCellsAmount', gBoardCellsAmount)
    if (gCountTrueCells === gBoardCellsAmount) {
        alert('you WON :D ')
        elEmoji.innerHTML = HAPPY
        playWin()
        gIsVictory = true
    }
}

function countMines() {
    for (var i = 0; i < gBoard.length; i++) {
        var currCell = gBoard[i]
        for (var j = 0; j < gBoard.length; j++) {

            if (currCell[j].content == MINE) {
                gMinesCount++
            }
        }
    }
}

function onRightClick() {
    const targetElement = event.target
    const classList = targetElement.classList
    const classListMatch = classList[1].match(/(\d+)-(\d+)/) // get only the numbers from the class string


    console.log('targetElement', targetElement)

    if (classListMatch) {
        var i = classListMatch[1]
        var j = classListMatch[2]
    }
    var currCell = gBoard[i][j]

    if (gGameOver) return

    // if cell already been revealed cannot place flag
    if (currCell.isRevealed) return

    playFlag() // play sound

    // if flag already true then unflag
    if (currCell.isFlagged === true) {
        console.log('flag click')
        // updating the MODEL
        currCell.isFlagged = false

        // updating the DOM
        renderCell(currCell, '')

        gFlagsAmount++
    }
    gFlagsAmount--

    // update the MODEL 
    currCell.isFlagged = true

    // update the DOM
    renderCell(currCell, FLAG)
    elFlagAmount.innerHTML = gFlagsAmount
}



