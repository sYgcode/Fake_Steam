const user = JSON.parse(localStorage.getItem('users')).find(user => user.username === sessionStorage.getItem('username'));

const recentActivity = document.getElementById('recent-activity');
const profilePicture = document.getElementById('placeholder');
const username = document.getElementById('username');
const email = document.getElementById('email');

// Set user profile information
profilePicture.src = `../assets/images/${user.profilePicture}`;
username.textContent = user.username;
email.textContent = user.email;

// Display recent activity
for (let game in JSON.parse(user.gamesOwned)) {
    // Parse the game data from the user object
    const gamePlayed = JSON.parse(JSON.parse(user.gamesOwned)[game]);
    const gameDiv = document.createElement('div');
    gameDiv.classList.add('activity-item');

    // Create the game thumbnail
    const gameImage = document.createElement('img');
    gameImage.src = `../assets/images/${game}.jpeg`;
    gameImage.classList.add('game-thumbnail');

    // Create the game information
    const activityInfo = document.createElement('div');
    activityInfo.classList.add('activity-info');

    // Create the game title
    const gameTitle = document.createElement('p');
    gameTitle.textContent = game;
    gameTitle.classList.add('game-title');
    activityInfo.appendChild(gameTitle);

    // Create the game's play time
    const playTime = document.createElement('p');
    playTime.textContent = `Time Played: ${gamePlayed.timePlayed} seconds`;
    playTime.classList.add('play-time');
    activityInfo.appendChild(playTime);

    // Create the game's last played date
    const lastPlayed = document.createElement('p');
    lastPlayed.textContent = `Last Played: ${gamePlayed.lastPlayed}`;
    lastPlayed.classList.add('last-played');
    activityInfo.appendChild(lastPlayed);

    // Create the game's high score
    const highScore = document.createElement('p');
    highScore.textContent = `High Score: ${gamePlayed.highScore.score}`;
    highScore.classList.add('high-score');
    activityInfo.appendChild(highScore);

    // Append the game thumbnail and information to the activity item
    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(activityInfo);

    recentActivity.appendChild(gameDiv);
}