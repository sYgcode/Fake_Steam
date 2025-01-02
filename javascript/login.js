const exampleUser = {
    username: "shua",
    password: "pass",
    email: "1",
    gamesOwned: ['fallingfrenzy', 'Game 3'],
}


// function to retrieve the users array, if it doesn't exist then create a new one
function initializeUserArray() {
    const users = localStorage.getItem('users');
    if (!users) {
        localStorage.setItem('users', JSON.stringify([]));
        users = localStorage.getItem('user');
    }

    return JSON.parse(users);
}

function createUser (username, password, email, gamesOwned=[]) {
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

function nonVal(elem, text) {
    elem.style.display = "block";
    elem.textContent = text;
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

    const not_valid = document.getElementById('not_validS');
    if (!checkUsername(username, users)){
        nonVal(not_valid, "Username already exists");
        return;
    }

    const newUser = createUser(username, email, password);
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
            if (user.password == password){
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
}

function switchToSignup(event){
    event.preventDefault() 
    document.getElementById('login').style.display = "none";
    document.getElementById('signup').style.display = "block";
}



// code
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', login);
const signupForm = document.getElementById('signupForm');
signupForm.addEventListener('submit', signup);


document.getElementById('SwitchToSign').addEventListener('click', switchToSignup);
document.getElementById('SwitchToLog').addEventListener('click', switchToLogin);


// Check if the user is already logged in
if (sessionStorage.getItem('loggedIn') === 'true') {
    // Redirect directly if they revisit the home page
    window.location.href = '/html/main-page.html';
}