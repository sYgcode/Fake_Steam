const userProfileWelcome = document.getElementById('user-welcome');
const username = sessionStorage.getItem('username');
console.log(username);

userProfileWelcome.textContent = `Hello, ${username}!`;