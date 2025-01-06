const restartButton = document.getElementById('restart-game');
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
            cell.dataset.row = row; // Store row index
            cell.dataset.col = col; // Store column index

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

function endGame() {
    // Get all cells
    const cells = document.querySelectorAll('.cell');

    // Add a slight delay to ensure the last image has time to load
    // Remove all event listeners
    cells.forEach(cell => {
        // Clone the cell and replace it to remove all listeners
        const newCell = cell.cloneNode(true);
        cell.parentNode.replaceChild(newCell, cell);
    });

    console.log("Game ended. All listeners removed."); // Adjust the delay (in milliseconds) if needed
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
        board[row][col] = altType; // Or alternate with 'O'
        // Create an image element
        const img = document.createElement('img');
        img.src = source; // Replace with your X or O image URL
        img.alt = altType; // Use 'O' for the other player
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
    }
}

restartButton.addEventListener('click', buildBoard);