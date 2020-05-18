function initBoard() {
    let board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        let boardCell = document.createElement('div');
        boardCell.classList.add('cell');
        board.append(boardCell);
    }
    return board;
}

function checkAvailableSteps() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML == '')
            return true;
    }
    return false;
}

function checkWinner() {
    let cells = document.querySelectorAll('.cell');
    let row, column, diag, diag1;
    for (let i = 0; i < 3; i++) {
        row = (cells[i * 3 + 0].innerHTML != '');
        column = (cells[i].innerHTML != '');
        diag = (cells[0].innerHTML != '');
        diag1 = (cells[2].innerHTML != '');
        for (let j = 0; j < 3 - 1; j++) {
            row = row && (cells[i * 3 + j].innerHTML == cells[i * 3 + j + 1].innerHTML);
            column = column && (cells[j * 3 + i].innerHTML == cells[(j + 1) * 3 + i].innerHTML);
            diag = diag && (cells[j * 3 + j].innerHTML == cells[(j + 1) * 3 + j + 1].innerHTML);
            diag1 = diag1 && (cells[j * 3 + 3 - 1 - j].innerHTML == cells[(j + 1) * 3 + 3 - 1 - (j + 1)].innerHTML);
        }
        let winner = (row && cells[i * 3 + 0].innerHTML) || (column && cells[i].innerHTML) || (diag && cells[0].innerHTML) || (diag1 && cells[2].innerHTML);
        if (winner) {
            return winner;
        }
    }
    return false;
}

function clickHandler(event) {
    if (event.target.className == 'cell') {
        if (gameOver) {
            showMsg('Игра окончена, начните новую игру!', 'error');
            return
        }
        if (event.target.innerHTML != '') {
            showMsg('Эта клетка уже занята!', 'error');
        } else {
            event.target.innerHTML = turn == 0 ? 'X' : 'O';
            turn = (turn + 1) % 2;
        }
        let winner = checkWinner();
        if (winner || !checkAvailableSteps()) {
            gameOver = 1;
            showMsg(winner ? `${winner} одержал победу!` : 'Ничья!');
        }
    }
}

function newGame() {
    let cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    turn = 0;
    gameOver = 0;
}

function showMsg(msg, category = 'success') {
    let msgContainer = document.querySelector('.messages');
    let msgElement = document.createElement('div');
    msgElement.innerHTML = msg;
    msgElement.classList.add('msg');
    msgElement.classList.add(category);
    msgContainer.append(msgElement);
    setTimeout(() => msgElement.remove(), 2000);
}

let turn = 0;
let gameOver = 0;

window.onload = function () {
    let board = initBoard();
    board.onclick = clickHandler;
    document.querySelector('.new-game-btn').onclick = newGame;
}