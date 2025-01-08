const restartButton = document.getElementById('restart-game');
const musicButton = document.getElementById('music-button');
let board = [
    [0,0,0],
    [0,0,0],
    [0,0,0]
];
let Xturn = true;

function buildBoard() {
    restartButton.textContent = 'Restart Game';
    board = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ];
    Xturn = true;
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear the board before rebuilding

    // Loop through the board array to create cells
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            // Add click event listener
            cell.addEventListener('click', onClick);

            boardElement.appendChild(cell);
        }
    }
}

function didWin(player){
    // Check rows
    for (let row = 0; row < 3; row++) {
        if (board[row].every(cell => cell === player)) {
            return true; // Winning row
        }
    }

    // Check columns
    for (let col = 0; col < 3; col++) {
        if (board[0][col] === player && board[1][col] === player && board[2][col] === player) {
            return true; // Winning column
        }
    }

    // Check diagonals
    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {
        return true; // Top-left to bottom-right diagonal
    }

    if (board[0][2] === player && board[1][1] === player && board[2][0] === player) {
        return true; // Top-right to bottom-left diagonal
    }

    // No winner
    return false;
}

function didTie() {
    for (let row=0; row < 3; row++) {
        for (let col=0; col<3; col++) {
            if (board[row][col] == 0)
                return false;
        }
    }

    return true;
}

function endGame() {
    // Get all cells
    const cells = document.querySelectorAll('.cell');

    // Remove all event listeners
    cells.forEach(cell => {
        // Clone the cell and replace it to remove all listeners
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
    });
}

// Handle click event
function onClick(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // Check if the cell is empty
    if (board[row][col] === 0) {
        let source = '';
        let altType = ''
        if (Xturn){
            source = "/assets/images/x.png";
            altType = 'X';
        }
        else {
            source = "/assets/images/o.png";
            altType = 'O';
        }
        // Update board array and cell display
        board[row][col] = altType;
        // Create an image element
        const img = document.createElement('img');
        img.src = source; 
        img.alt = altType; 
        img.style.width = '100%';
        img.style.height = '100%';

        cell.appendChild(img);
        Xturn = !Xturn;

        if(didWin(altType)) {
            endGame();
            setTimeout(() => {
                const retry = confirm(`Player ${altType} won! Retry?`);
                if (retry) {
                    buildBoard();
                }
            }, 500); // Delay matches the timeout in endGame
        }
        else if (didTie()) {
            endGame();
            setTimeout(() => {
                const retry = confirm(`You tied! Retry?`);
                if (retry) {
                    buildBoard();
                }
            }, 400); // Delay matches the timeout in endGame
        }
    }
}

restartButton.addEventListener('click', buildBoard);