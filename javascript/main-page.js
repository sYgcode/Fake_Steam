const playButtons = document.querySelectorAll('.play-button');
const buyButtons = document.querySelectorAll('.buy-button');
const playPreview = document.querySelector('#play-preview-modal');
const previewTitle = document.querySelector(".modal h3");
const gameIframe = playPreview.querySelector('#game-frame');
const seeMore = document.querySelectorAll('.more');
const closeButton = document.querySelector("#close-button");

const gameList = {'Falling Frenzy':'fallingfrenzy', 'Tic-Tac-Toe':'tictactoe'} // Relation between game name and iframe name
const username = sessionStorage.getItem('username');
const gamesOwned = JSON.parse(JSON.parse(localStorage.getItem('users')).find(user => user.username === username).gamesOwned);

closeButton.textContent = "Close Game";
closeButton.addEventListener("click", () => {
    playPreview.style.top = "-100vh";
    document.body.classList.remove("dimmed");
    gameIframe.src = "";
    previewTitle.textContent = "Game Preview";
});

function startModal(iframeName) {
    document.body.classList.add('dimmed');
    playPreview.style.top = "0";

    if (iframeName === undefined) {
        gameIframe.src = "games/no-preview-available.html";
        return;
    }
    else {
        gameIframe.src = `games/${iframeName}.html`;
    }
}

function ownedGame(button) {
    button.textContent = "Play";
    button.style.width = "200px";
}

playButtons.forEach(button => {
    // Find the game name by traversing the DOM and locating the h4 element that contains the game name
    const gameName = button.parentElement.previousElementSibling.firstElementChild.textContent;
    const iframeName = gameList[gameName];

    button.addEventListener('click', () => {
        if (Object.keys(gamesOwned).includes(gameName)) 
            previewTitle.textContent = gameName;
        startModal(iframeName);
    });

    if (Object.keys(gamesOwned).includes(gameName)) { ownedGame(button); }
});

function buyGame(gameName, button) {
    Object.defineProperty(gamesOwned, gameName, { value: { timePlayed: 0, lastPlayed: new Date(), highScore: { score: 0, time: new Date() } } });
    
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(user => user.username === username);
    users[userIndex].gamesOwned = JSON.parse(users[userIndex].gamesOwned);
    users[userIndex].gamesOwned[gameName] = JSON.stringify(gamesOwned[gameName]);
    users[userIndex].gamesOwned = JSON.stringify(users[userIndex].gamesOwned);
    localStorage.setItem('users', JSON.stringify(users));
    console.log(JSON.parse(localStorage.getItem('users')));


    button.style.display = "none";
    const playButton = button.nextElementSibling;
    ownedGame(playButton);
}

buyButtons.forEach(button => {
    const gameName = button.parentElement.previousElementSibling.firstElementChild.textContent.replace(/\s/g, '');

    button.addEventListener('click', () => { buyGame(gameName, button); });

    if (Object.keys(gamesOwned).includes(gameName)) {
        button.style.display = "none";
    }
});

seeMore.forEach(button => {
    button.addEventListener('click', () => { window.location.href = '/html/games.html'; });
});

// Check if the user is not logged in yet
if (sessionStorage.getItem('loggedIn') === 'false' || sessionStorage.getItem('loggedIn') === null) {
    // Redirect directly if they revisit the home page
    window.location.href = '/index.html';
}