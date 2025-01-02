const playButtons = document.querySelectorAll('.play-button');
const buyButtons = document.querySelectorAll('.buy-button');
const playPreview = document.querySelector('#play-preview-modal');
const gameIframe = playPreview.querySelector('#game-frame');
const seeMore = document.querySelectorAll('.more');
const closeButton = document.querySelector("#close-button");

const gameList = {'Falling Frenzy':'fallingfrenzy'}
const username = sessionStorage.getItem('username');
// const gamesOwned = JSON.parse(localStorage.getItem('Users')).find(user => user.username === username).gamesOwned;
const gamesOwned = ['Falling Frenzy', 'Game 3'];
console.log(gamesOwned);

closeButton.textContent = "Close Game";
closeButton.addEventListener("click", () => {
    playPreview.style.top = "-100vh";
    document.body.classList.remove("dimmed");
    gameIframe.src = "";
});

function startModal(iframeName) {
    document.body.classList.add('dimmed');
    playPreview.style.top = "0";

    if (iframeName === undefined) {
        alert("No preview available for this game.");
        gameIframe.src = "games/no-preview-available.html";
        return;
    }
    else {
        gameIframe.src = `games/${iframeName}.html`;
    }
}

playButtons.forEach(button => {
    // Find the game name by traversing the DOM and locating the h4 element that contains the game name
    const gameName = button.parentElement.previousElementSibling.previousElementSibling.textContent;
    const iframeName = gameList[gameName];

    button.addEventListener('click', () => { startModal(iframeName); });

    if (gamesOwned.includes(gameName)) {
        button.textContent = "Play";
        button.style.width = "200px";
    }
});

buyButtons.forEach(button => {
    const gameName = button.parentElement.previousElementSibling.previousElementSibling.textContent;

    if (gamesOwned.includes(gameName)) {
        button.style.display = "none";
    }
});

seeMore.forEach(button => {
    button.addEventListener('click', () => { window.location.href = '/html/games.html'; });
});