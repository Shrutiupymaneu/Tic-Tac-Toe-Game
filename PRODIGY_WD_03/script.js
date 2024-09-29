const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const winnerMessage = document.getElementById('winner-message');
const winnerText = document.getElementById('winner');
const restartBtn = document.getElementById('restartBtn');

let circleTurn;
const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartBtn.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.textContent = ''; // Clear the text content in each cell
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerMessage.classList.add('hide');
    winnerText.innerText = ''; // Clear the winner text on restart
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function endGame(draw) {
    if (draw) {
        winnerText.innerText = "Draw!";
    } else {
        winnerText.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
    winnerMessage.classList.remove('hide');
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === X_CLASS ? 'X' : 'O'; // Add the X or O symbol
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}
