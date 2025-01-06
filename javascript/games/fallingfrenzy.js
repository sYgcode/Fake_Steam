const gameArea = document.getElementById('game-area');
const gameScore = document.getElementById('score');
const obstacles = document.querySelector('#obstacles');
const player = document.getElementById('player');
const restartButton = document.getElementById('restart-game');
const gameTimeout = [];

const startTime = new Date();

// let timePlayed = localStorage.getItem('users').find(user => user.username === username).games["Falling Frenzy"].timePlayed;

let tickRate = 30,
    keyDown = {},
    keyMap = {
        'ArrowLeft': 'left',
        'ArrowRight': 'right'
    };

let playerX = gameArea.offsetWidth / 2 - 15;
let score = 0;
let isRunning = true;
let obstacleSpeed = 5;

document.addEventListener('keydown', (e) => { keyDown[keyMap[e.key]] = true; });
document.addEventListener('keyup', (e) => { keyDown[keyMap[e.key]] = false; });

let tick = () => {
    const gameLeftBorder = 0;
    const gameRightBorder = gameArea.offsetWidth;

    if (keyDown['left'] && playerX - 30 > gameLeftBorder) {
        playerX -= 15;
    } else if (keyDown['right'] && playerX + 30 < gameRightBorder) {
        playerX += 15;
    }
    player.style.left = playerX + 'px';

    setTimeout(tick, tickRate);
};

tick();

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    obstacle.style.top = 0;
    obstacles.appendChild(obstacle);
}

function dropObjects() {
    if (!isRunning) {
        clearInterval(fallInterval);
        obstacles.innerHTML = '';
    }
        
    for (let obstacle of obstacles.children) {
        let obstacleY = parseInt(obstacle.style.top) + obstacleSpeed;
        obstacle.style.top = obstacleY + 'px';

        if (checkCollision(player, obstacle)) {
            endGame();
        }
    
        if (obstacleY > gameArea.offsetHeight) {
            obstacle.remove();
            score++;
            let temp = obstacleSpeed;
            obstacleSpeed = 5 + Math.floor(score / 5);
            if ((obstacleSpeed - temp) && (temp % 2)) {
                gameTimeout.push(setInterval(gameLoop, 1000 - Math.min(score * 10, 800)));
            }
            gameScore.textContent = `Score: ${score}`;
        }
    }
}

let fallInterval = setInterval(dropObjects, 20);

function checkCollision(player, obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        playerRect.top > obstacleRect.bottom ||
        playerRect.right < obstacleRect.left ||
        playerRect.bottom < obstacleRect.top ||
        playerRect.left > obstacleRect.right
    );
}

function endGame() {
    isRunning = false;
    // const timePlayed = timePlayed + (new Date() - startTime) / 1000;
    keyDown = {};
    alert(`Game Over! Score: ${score}`);
    console.log(score, (new Date()).toLocaleString());
    const retry = confirm('Retry?');
    if (retry) {
        restartGame();
    }
}

function restartGame() {
    // startTime = new Date();
    isRunning = true;
    score = 0;
    obstacles.innerHTML = '';
    gameScore.textContent = 'Score: 0';
    obstacleSpeed = 5;
    for (let i = gameTimeout.length - 1; i >= 0 ; i--) {
        clearInterval(gameTimeout[i]);
        gameTimeout.pop();
    }
    gameTimeout.push(setInterval(gameLoop, 1000 - Math.min(score * 10, 800)));
    clearInterval(fallInterval);
    fallInterval = setInterval(dropObjects, 20);
    restartButton.textContent = 'Restart Game';
}

function gameLoop() {
    if (!isRunning) {
        return;
    }

    createObstacle();
}

restartButton.addEventListener('click', restartGame);