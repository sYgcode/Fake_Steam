const playButtons = document.querySelectorAll('.play-button');
const playPreview = document.querySelector('#play-preview-modal');
const body = document.body;

const closeButton = document.querySelector("#close-button");
closeButton.textContent = "Close Game";
closeButton.addEventListener("click", () => {
    playPreview.style.top = "-100vh";
    body.classList.remove("dimmed");
});

function startModal() {
    body.classList.add('dimmed');
    playPreview.style.top = "0";
}

playButtons.forEach(button => {
    button.addEventListener('click', startModal);
});