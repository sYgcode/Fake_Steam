const playButtons = document.querySelectorAll('.play-button');
const playPreview = document.querySelector('#play-preview-modal');
const body = document.body;

const closeButton = document.querySelector("#close-button");
closeButton.textContent = "Close Game";
closeButton.addEventListener("click", () => {
    playPreview.style.top = "-100vh";
    body.classList.remove("dimmed");
});

function startModal(iframeName) {
    body.classList.add('dimmed');
    playPreview.style.top = "0";
    playPreview.querySelector('iframe').src = `games/${iframeName}.html`;
}

playButtons.forEach(button => {
    // Find the game name by traversing the DOM and locating the h4 element that contains the game name
    const gameName = button.parentElement.previousElementSibling.previousElementSibling.textContent;
    const iframeName = gameName.replace(/\s/g, '').toLowerCase();

    button.addEventListener('click', () => { startModal(iframeName); });
});