'use strict'

var gTimer = 0
var isTime = true
var gintervalId

// create board matrix 
function createBoard(col, row) {
    var board = []
    for (var i = 0; i < col; i++) {
        board[i] = []
        for (var j = 0; j < row; j++) {
            const cell = {
                i: i,
                j: j,
                content: '',
                isRevealed: false,
                isFlagged: false

            };

            board[i][j] = cell
        }
    }
    console.table(board)
    return board
}


// render board EX
function renderBoard(mat, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {

            const cell = mat[i][j]
            const className = `cell cell-${i}-${j}`

            // If the cell is not revealed, hide the content
            const content = cell.isRevealed ? cell.content : ''

            strHTML += `<td onclick="onUserClick(this, ${i}, ${j})" class="${className}">${content}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'

    const elContainer = document.querySelector(selector)

    // prevent right click menu to show up and also assign function
    elContainer.addEventListener("contextmenu", onRightClick);
    elContainer.addEventListener("contextmenu", (e) => { e.preventDefault() });

    elContainer.innerHTML = strHTML
}


// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}


// random number
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}


// Timer functions
function updateTimer() {
    const elTimerDisplay = document.querySelector('.span-timer')
    gTimer += 1;
    elTimerDisplay.innerHTML = gTimer
}

function startTime() {
    gintervalId = setInterval(updateTimer, 1000)
    setInterval(gintervalId)
}

function stopTime() {
    clearInterval(gintervalId)
}


// sounds
function playClick() {
    var audio = new Audio('sounds/click.wav');
    audio.play();
}

function playLevel() {
    var audio = new Audio('sounds/level.mp3');
    audio.play();
}

function playWin() {
    var audio = new Audio('sounds/win.mp3');
    audio.play();
}

function playFlag() {
    var audio = new Audio('sounds/flag.mp3');
    audio.play();
}

function playOver() {
    var audio = new Audio('sounds/gameover.mp3');
    audio.play();
}



