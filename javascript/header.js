const userProfileWelcome = document.getElementById('user-welcome');
const searchButton = document.getElementById('search-button');
const homeButton = document.getElementById('home-button');
const gamesButton = document.getElementById('games-button');
const logoutButton = document.getElementById('logout-button');
const userProfileHolder = document.getElementById('profile-holder');
const username = sessionStorage.getItem('username');

userProfileWelcome.textContent = `Hello, ${username}!`;


// function to search for games
function onSearch (event) {
    event.preventDefault();

    const searchData = document.getElementById('search').value.trim().toLowerCase();

    window.top.location.href = `/html/games.html?search=${encodeURIComponent(searchData)}`;
}

homeButton.addEventListener('click', () => {
    window.top.location.href = "main-page.html";
});

gamesButton.addEventListener('click', () => {
    window.top.location.href = "games.html";
});

logoutButton.addEventListener('click', () => {
    sessionStorage.setItem('loggedIn', 'false');
    window.top.location.href = "/index.html";
});

userProfileHolder.addEventListener('click', () => {
    window.top.location.href = 'user-profile.html';
});

searchButton.addEventListener('click', onSearch);

// Check if the user is not logged in yet
if (sessionStorage.getItem('loggedIn') == null ||sessionStorage.getItem('loggedIn') === 'false') {
    // Redirect directly if they revisit the home page
    window.top.location.href = '/index.html';
}
