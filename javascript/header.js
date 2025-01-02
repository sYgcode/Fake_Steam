const userProfile = document.getElementById('user-profile');
const username = sessionStorage.getItem('username');
console.log(username);

userProfile.textContent = `Hello, ${username}!`;