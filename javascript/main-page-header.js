const headerDocument = document.querySelector('nav iframe').contentDocument;

const homeButton = headerDocument.getElementById('home-button');
const gamesButton = headerDocument.getElementById('games-button');
const userProfileHolder = headerDocument.getElementById('profile-holder');

homeButton.addEventListener('click', () => {
    window.location.href = "main-page.html";
});

gamesButton.addEventListener('click', () => {
    window.location.href = "games.html";
});

userProfileHolder.addEventListener('click', () => {
    window.location.href = 'user-profile.html';
});