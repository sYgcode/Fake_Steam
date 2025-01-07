const userProfileWelcome = document.getElementById('user-welcome');
const searchButton = document.getElementById('search-button');
const username = sessionStorage.getItem('username');

userProfileWelcome.textContent = `Hello, ${username}!`;


// function to search for games
function onSearch (event) {
    event.preventDefault();

    const searchData = document.getElementById('search').value.trim().toLowerCase();

    window.top.location.href = `/html/games.html?search=${encodeURIComponent(searchData)}`;
}

searchButton.addEventListener('click', onSearch);