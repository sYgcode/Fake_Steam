const exampleUser = {
    username: "shua",
    password: "pass",
    email: "1",
    profilePicture: "profile_holder.png",
    gamesOwned: {
        FallingFrenzy: { timePlayed: 0, lastPlayed: new Date(), highScore: { score: 0, time: new Date() } },
        Game3: { timePlayed: 0, lastPlayed: new Date(), highScore: { score: 0, time: new Date() } }
    }
}
const allowedAttempts = 3;

// custon hash, srats witha prime num, multiplies by 33 and XOR with char unicdoe, make sure it's positive
function customHash(input) {
    let hash = 5381;
    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);
        hash = (hash * 33) ^ charCode;
    }
    return hash >>> 0;
}

// function to retrieve the users array, if it doesn't exist then create a new one
function initializeUserArray() {
    const users = localStorage.getItem('users');
    if (!users) {
        localStorage.setItem('users', JSON.stringify([]));
        users = localStorage.getItem('users');
    }

    return JSON.parse(users);
}

// update the not valid text box
function nonVal(elem, text, color="red") {
    elem.style.display = "block";
    elem.textContent = text;
    elem.style.color=color;
}

function createUser (username, email, password, profilePicture="profile_holder.png", gamesOwned=JSON.stringify({})) {
    return {username:username, password:password, email:email, profilePicture:profilePicture, gamesOwned:gamesOwned};
}

// add user object to array
function addUser(newUser) {
    let users = initializeUserArray();
    // append the example user if not already in the array
    if (!users.some(user => user.username === newUser.username)) {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        return true;
    }

    return false;
}

// check the username validity
function checkUsername(username, users) {
    if(length(username) > 10)
        return 1
    for (let user of users) {
        if (username == user.username) {
            return 2;
        }
    }
    return 0;
}

// make sure email is not used
function checkEmail(email, users) {
    for (let user of users) {
        if (email == user.email) {
            return false;
        }
    }
    return true;
}

// make sure password has uppercase, is 8 digits long, has lowercase, has number, and has a special char
function isPasswordSuitable(password) {
    const minLength = 8;

    // regular expressions for required character types
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

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

    return true;
}

// check password validity
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




// execute on log in
function loggedIn(username){
    deleteCookie('loginAttempts');
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('username', username);
    window.location.href = '/html/main-page.html';
}

// signup function
function signup(event) {
    event.preventDefault();
    let users = initializeUserArray();
    const username = document.getElementById('usernameS').value;
    const email = document.getElementById('emailS').value;
    const password = document.getElementById('passwordS').value;

    const not_valid_username = document.getElementById('not_valid_usernameS');
    not_valid_username.style.display = "none";
    const username_val = checkUsername(username, users)
    if (username_val==1){
        nonVal(not_valid_username, "Username is too long");
        return;
    }
    else if (username_val==2){
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
    let attempts = parseInt(getCookie('loginAttempts')) || 0;
    if (attempts >= allowedAttempts) {
        // set a lockout cookie that expires in 5 minutes
        setCookie('lockout', 'true', 5);
        deleteCookie('loginAttempts'); // reset login attempts
    }
    const lockout = getCookie('lockout');
    if (lockout) {
        nonVal(not_valid, "Too many attempts, try again later");
        return;
    }
    for (let user of users) {
        if (user.username == username) {
            if (user.password == customHash(password)){
                loggedIn(username);
                return;
            }
            else {
                attempts++;
                nonVal(not_valid,  `Username and password don't match, ${allowedAttempts-attempts} attempts left`);
                setCookie('loginAttempts', attempts, 30);
                return;
            }
        }
    }
    nonVal(not_valid, "Username doesn't exist");
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

function playMusic(event){
    event.preventDefault();
    const isMusicPlaying = sessionStorage.getItem("isMusicPlaying");
    let music_icon = document.getElementById("music_icon");
    if (isMusicPlaying === 'true'){
        audio.pause();
        music_icon.src = "/assets/images/sound_off.png";
        sessionStorage.setItem("isMusicPlaying", "false");
    }
    else{
        audio.play().catch(error => {
            console.error('Error playing audio:', error);
            music_icon.src = "/assets/images/sound_off.png";
            return;
        });
        music_icon.src = "/assets/images/sound_on.png";
        sessionStorage.setItem("isMusicPlaying", "true");
    }

}

// function to get a cookie value by name
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(`${name}=`)) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

// function to set a cookie
function setCookie(name, value, minutes) {
    const expires = new Date();
    expires.setTime(expires.getTime() + minutes * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
}

// function to delete a cookie
function deleteCookie(name) {
    setCookie(name, '', -1);
}

function playMusicOnStart(){
    // Play the audio
    document.removeEventListener('click', playMusicOnStart);
    let music_icon = document.getElementById("music_icon");
    music_icon.addEventListener('click', playMusic);
    audio.loop = true;
    audio.play().catch(error => {
        console.error('Error playing audio:', error);
        music_icon.src = "/assets/images/sound_off.png";
        return;
    });
    sessionStorage.setItem('isMusicPlaying', 'true');
}


// code
document.getElementById('loginForm').addEventListener('submit', login);


document.getElementById('SwitchToSign').addEventListener('click', switchToSignup);
document.addEventListener('click', playMusicOnStart);


// Check if the user is already logged in
if (sessionStorage.getItem('loggedIn') === 'true') {
    // Redirect directly if they revisit the home page
    window.location.href = '/html/main-page.html';
}

const audio = new Audio('assets/audio/background_music.mp3');
