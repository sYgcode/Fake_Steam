const headerDocument = document.querySelector('nav iframe').contentDocument;

const homeButton = headerDocument.getElementById('home-button');
const gamesButton = headerDocument.getElementById('games-button');

homeButton.addEventListener('click', () => {
    window.location.href = "main-page.html";
});

gamesButton.addEventListener('click', () => {
    window.location.href = "games.html";
});