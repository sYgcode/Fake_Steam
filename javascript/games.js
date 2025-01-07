// Get the search query from the URL
const urlParams = new URLSearchParams(window.location.search);
const games = document.querySelectorAll(".game"); // Select all game elements
const query = urlParams.get('search');


function filterGames(query) {
    games.forEach(game => {
      const gameName = game.dataset.name.toLowerCase(); // Get the data-name in lowercase
      if (!query || gameName.includes(query)) {
        game.style.display = ""; // Show the game
      } else {
        game.style.display = "none"; // Hide the game
      }
    });
}

function search() {
    if (query == null)
        query = '';
    filterGames(query);
}

addEventListener('DOMContentLoaded', search);

