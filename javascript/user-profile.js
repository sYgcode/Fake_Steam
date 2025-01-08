const user = JSON.parse(localStorage.getItem('users')).find(user => user.username === sessionStorage.getItem('username'));

const recentActivity = document.getElementById('recent-activity');
const profilePicture = document.getElementById('placeholder');
const username = document.getElementById('username');
const email = document.getElementById('email');

profilePicture.src = `../assets/images/${user.profilePicture}`;
username.textContent = user.username;
email.textContent = user.email;

for (let game in JSON.parse(user.gamesOwned)) {
    const gamePlayed = JSON.parse(JSON.parse(user.gamesOwned)[game]);
    const gameDiv = document.createElement('div');
    gameDiv.classList.add('activity-item');

    const gameImage = document.createElement('img');
    gameImage.src = `../assets/images/${game}.jpeg`;
    gameImage.classList.add('game-thumbnail');

    const activityInfo = document.createElement('div');
    activityInfo.classList.add('activity-info');

    const gameTitle = document.createElement('p');
    gameTitle.textContent = game;
    gameTitle.classList.add('game-title');
    activityInfo.appendChild(gameTitle);

    const playTime = document.createElement('p');
    playTime.textContent = `Time Played: ${gamePlayed.timePlayed} seconds`;
    playTime.classList.add('play-time');
    activityInfo.appendChild(playTime);

    const lastPlayed = document.createElement('p');
    lastPlayed.textContent = `Last Played: ${gamePlayed.lastPlayed}`;
    lastPlayed.classList.add('last-played');
    activityInfo.appendChild(lastPlayed);

    const highScore = document.createElement('p');
    highScore.textContent = `High Score: ${gamePlayed.highScore.score}`;
    highScore.classList.add('high-score');
    activityInfo.appendChild(highScore);

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(activityInfo);

    recentActivity.appendChild(gameDiv);
}