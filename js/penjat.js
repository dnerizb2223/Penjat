
document.addEventListener("DOMContentLoaded",()=>{

const words = ["javascript", "html", "css", "python", "typescript"];
const maxWrongAttempts = 9;
let gameEnded = false;
let selectedWord, guessedWord, wrongAttempts, usedLetters;

if (localStorage.getItem("selectedWord")== undefined) {
    // SI ES LA PRIMERA VEGADA
    selectedWord = words[Math.floor(Math.random() * words.length)];
    localStorage.setItem("selectedWord", selectedWord);
    guessedWord = Array.from({ length: selectedWord.length }, () => "_");
    localStorage.setItem("guessedWord", guessedWord);
    wrongAttempts = 0;
    localStorage.setItem("wrongAttempts", wrongAttempts);
}else {
    // SI JA ESTAVES JUGANT f5
    selectedWord = localStorage.getItem("selectedWord");
    guessedWord = localStorage.getItem("guessedWord").split(",");
    wrongAttempts = localStorage.getItem("wrongAttempts");
    usedLetters = localStorage.getItem("usedLetters") ? JSON.parse(localStorage.getItem("usedLetters")) : [];
    document.getElementById("wrong-count").innerText = wrongAttempts;
    document.getElementById("word-display").innerText = guessedWord.join(" ");
}

initializeGameInterface();

function updateGameInterface() {
    document.getElementById("word-display").innerText = guessedWord.join(" ");
    document.getElementById("wrong-count").innerText = wrongAttempts;

    if (wrongAttempts >= maxWrongAttempts) {
        displayMessage("¡Has perdido! La palabra correcta era: " + selectedWord);
        gameEnded = true;
        localStorage.clear();e89
    }
}

let img = document.createElement("img");
function ensenyarNinot() {
    switch (wrongAttempts) {
        case 1:
            img.src = "./media/1.png"; 
        break;
        case 2:
            img.src = "./media/2.png"; 
        break;
        case 3:
            img.src = "./media/3.png"; 
        break;
        case 4:
            img.src = "./media/4.png"; 
        break;
        case 5:
            img.src = "./media/5.png"; 
        break;
        case 6:
            img.src = "./media/6.png"; 
        break;
        case 7:
            img.src = "./media/7.png"; 
        break;
        case 8:
            img.src = "./media/8.png"; 
        break;
        case 9:
            img.src = "./media/9.png"; 
        break;
        default:
            break;
    }
    document.getElementById("image-container").appendChild(img);
}



function initializeGameInterface() {
    document.getElementById("word-display").innerText = guessedWord.join(" ");

    const alphabet = "abcdefghijklmnopqrstuvwxyzçñ";
    for (const letter of alphabet) {
        const button = document.getElementById(`btn-${letter}`);
        if (button) {
            button.disabled = false;
        }
    }
}

function disableButton(letter) {
    document.getElementById(`btn-${letter}`).disabled = true;
}

function displayMessage(message) {
    document.getElementById("message").innerText = message;
}

function guessLetter(letter) {
    if (gameEnded || usedLetters.includes(letter)) {
        return;
    }

    letter = letter.toLowerCase();
    usedLetters.push(letter);
    localStorage.setItem("usedLetters", JSON.stringify(usedLetters));

    if (!selectedWord.includes(letter)) {
        wrongAttempts++;
        localStorage.setItem("wrongAttempts", wrongAttempts);
        updateGameInterface();
        ensenyarNinot();
    } else {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }

        localStorage.setItem("guessedWord", guessedWord);

        updateGameInterface();

        if (guessedWord.join("") === selectedWord) {
            displayMessage("¡Felicidades! Has adivinado la palabra correctamente.");
            gameEnded = true;
            localStorage.clear();
        } else {
            disableButton(letter);
        }
    }
}


document.addEventListener("keydown", function (event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
        guessLetter(event.key);
    }
});

} );