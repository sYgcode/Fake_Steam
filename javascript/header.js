const userProfileWelcome = document.getElementById('user-welcome');
const username = sessionStorage.getItem('username');

userProfileWelcome.textContent = `Hello, ${username}!`;