const exampleUser = {
    username: "shua",
    password: "pass",
    email: "1",
    gamesOwned: ['fallingfrenzy', 'Game 3'],
}


function customHash(input) {
    let hash = 5381; // Starting with a prime number
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i); // Get the Unicode of the character
        hash = (hash * 33) ^ charCode; // Multiply by 33 and XOR with the character code
    }
    return hash >>> 0; // Ensure the hash is non-negative by using unsigned right shift
}

// function to retrieve the users array, if it doesn't exist then create a new one
function initializeUserArray() {
    const users = localStorage.getItem('Users');
    const users = localStorage.getItem('users');
    if (!users) {
        localStorage.setItem('users', JSON.stringify([]));
        users = localStorage.getItem('users');
    }

    return JSON.parse(users);
}

function nonVal(elem, text, color="red") {
    elem.style.display = "block";
    elem.textContent = text;
    elem.style.color=color;
}

function createUser (username, email, password, gamesOwned=[]) {
    return {username:username, password:password, email:email, gamesOwned:gamesOwned};
}

// add user object to array
function addUser(newUser) {
    let users = initializeUserArray();
    // Append the example user if not already in the array
    if (!users.some(user => user.username === newUser.username)) {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    return false;
}

function checkUsername(username, users) {
    for (let user of users) {
        if (username == user.username) {
            return false;
        }
    }
    return true;
}

function checkEmail(email, users) {
    for (let user of users) {
        if (email == user.email) {
            return false;
        }
    }
    return true;
}

function isPasswordSuitable(password) {
    // Minimum length requirement
    const minLength = 8;

    // Regular expressions for required character types
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    // Check password against rules
    if (password.length < minLength) {
        return "Password must be at least 8 characters long.";
    }
    if (!hasUppercase.test(password)) {
        return "Password must include at least one uppercase letter.";
    }
    if (!hasLowercase.test(password)) {
        return "Password must include at least one lowercase letter.";
    }
    if (!hasDigit.test(password)) {
        return "Password must include at least one digit.";
    }
    if (!hasSpecialChar.test(password)) {
        return "Password must include at least one special character.";
    }

    // If all checks pass
    return true;
}

function checkPassword(event){
    password = document.getElementById("passwordS").value;
    let isValid = isPasswordSuitable(password);
    const not_valid = document.getElementById('not_valid_passwordS');
    if (isValid === true){
        nonVal(not_valid, "Password is suitable", "green");
        return;
    }
    nonVal(not_valid, isValid);
}





function loggedIn(username){
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('username', username);
    window.location.href = '/html/main-page.html';
}

function signup(event) {
    event.preventDefault();
    let users = initializeUserArray();
    const username = document.getElementById('usernameS').value;
    const email = document.getElementById('emailS').value;
    const password = document.getElementById('passwordS').value;

    const not_valid_username = document.getElementById('not_valid_usernameS');
    not_valid_username.style.display = "none";
    if (!checkUsername(username, users)){
        nonVal(not_valid_username, "Username already exists");
        return;
    }
    const not_valid_email = document.getElementById('not_valid_emailS');
    not_valid_email.style.display = "none";
    if (!checkEmail(email, users)){
        nonVal(not_valid_email, "An account is already registered to this email");
        return;
    }

    const not_valid_password = document.getElementById('not_valid_passwordS');
    not_valid_password.style.display = "none";
    let isPassValid = isPasswordSuitable(password);
    console.log(isPassValid);
    if (!(isPassValid===true)){
        nonVal(not_valid_password, isPassValid);
        return;
    }


    const newUser = createUser(username, email, customHash(password));
    let succeeded = addUser(newUser);
    if(!succeeded){
        nonVal(not_valid, "Error creating user, try again later")
        return;
    }

    loggedIn(username);
}

// login function
function login(event) {
    event.preventDefault();

    const users = initializeUserArray();

    const username = document.getElementById('usernameL').value;
    const password = document.getElementById('passwordL').value;

    const not_valid = document.getElementById('not_validL');
    for (let user of users) {
        if (user.username == username) {
            if (user.password == customHash(password)){
                loggedIn(username);
                return;
            }
            else {
                nonVal(not_valid, "Username and password don't match");
                return;
            }
        }
    }
    not_valid.style.fontSize = '1em';
    not_valid.textContent = "Username doesn't exist"
    return;
}

function switchToLogin(event){
    event.preventDefault() 
    document.getElementById('signup').style.display = "none";
    document.getElementById('login').style.display = "block";
    document.getElementById('SwitchToSign').addEventListener('click', switchToSignup);
    document.getElementById('SwitchToLog').removeEventListener('click', switchToLogin);
    document.getElementById('passwordS').removeEventListener("input", checkPassword);
    document.getElementById('signupForm').removeEventListener('submit', signup);
}

function switchToSignup(event){
    event.preventDefault() 
    document.getElementById('login').style.display = "none";
    document.getElementById('signup').style.display = "block";
    document.getElementById('SwitchToLog').addEventListener('click', switchToLogin);
    document.getElementById('signupForm').addEventListener('submit', signup);
    document.getElementById('passwordS').addEventListener("input", checkPassword);
    document.getElementById('SwitchToSign').removeEventListener('click', switchToSignup);
    document.getElementById('loginForm').removeEventListener('submit', login);
}

function playMusic(){
    // Play the audio
    document.removeEventListener('click', playMusic);
    audio.loop = true;
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
    });
}


// code
document.getElementById('loginForm').addEventListener('submit', login);


document.getElementById('SwitchToSign').addEventListener('click', switchToSignup);
document.addEventListener('click', playMusic);


// Check if the user is already logged in
if (sessionStorage.getItem('loggedIn') === 'true') {
    // Redirect directly if they revisit the home page
    window.location.href = '/html/main-page.html';
}

const audio = new Audio('assets/audio/background_music.mp3');
