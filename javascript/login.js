const exampleUser = {
    username: "shua",
    password: "pass",
    email: "1",
    age: 5,
    gamesOwned: ['fallingfrenzy', 'Game 3'],
}


// function to retrieve 
function initializeUserArray() {
    const users = localStorage.getItem('users');
    if (!users) {
        localStorage.setItem('users', JSON.stringify([]));
        users = localStorage.getItem('User');
    }

    return JSON.parse(users);
}

function addUser(newUser) {
    let users = initializeUserArray();
    // Append the example user if not already in the array
    if (!users.some(user => user.username === newUser.username)) {
        users.push(newUser);
        localStorage.setItem('Users', JSON.stringify(users));
        console.log('Example user added:', newUser);
    } else {
        console.log('Example user already exists:', newUser);
    }
}

addUser(exampleUser);

function login(event) {
    event.preventDefault();

    const users = initializeUserArray();

    const username = document.getElementById('usernameL').value;
    const password = document.getElementById('passwordL').value;

    const not_valid = document.getElementById('not_validL');
    for (let user of users) {
        if (user.username == username) {
            if (user.password == password){
                alert("Logged In");
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', username);
                console.log(sessionStorage.getItem('username'));
                window.location.href = '/html/main-page.html';
                return;
            }
            else {
                not_valid.style.display = "block";
                not_valid.style.fontSize = '1em';
                not_valid.textContent = "Username and password don't match"
                return;
            }
        }
    }
    not_valid.style.fontSize = '1em';
    not_valid.textContent = "Username doesn't exist"
    return;
}

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', login);


// Check if the user is already logged in
if (sessionStorage.getItem('loggedIn') === 'true') {
    // Redirect directly if they revisit the home page
    window.location.href = '/html/main-page.html';
}