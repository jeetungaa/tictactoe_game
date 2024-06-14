
const board = document.querySelector('.board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
let currentPlayer = 'X';
let winner = null;
const cells = Array.from({ length: 9 }).fill(null);

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            return cells[a];
        }
    }
    return null;
}

function handleCellClick(index) {
    if (winner || cells[index]) return;

    cells[index] = currentPlayer;
    render();

    winner = checkWinner();

    if (winner) {
        setTimeout(() => {
            winningMessageTextElement.innerText = `Player ${winner} wins!`;
            messageElement.classList.add('show');
        }, 100);
    } else if (!cells.includes(null)) {
        setTimeout(() => {
            winningMessageTextElement.innerText = "It's a tie!";
            messageElement.classList.add('show');
        }, 100);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function render() {
    board.innerHTML = '';
    cells.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell', value);
        cell.textContent = value || '';
        cell.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cell);
    });
}

function resetGame() {
    cells.fill(null);
    currentPlayer = 'X';
    winner = null;
    messageElement.classList.remove('show');
    render();
}

restartButton.addEventListener('click', resetGame);

render();
