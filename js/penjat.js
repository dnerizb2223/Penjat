
document.addEventListener("DOMContentLoaded",()=>{


const words = ["javascript", "html", "css", "python", "typescript"];
const maxWrongAttempts = 10;
let selectedWord, guessedWord, wrongAttempts,gameEnded;


if (localStorage.getItem("selectedWord")== undefined) {
    // SI ES LA PRIMERA VEGADA
    selectedWord = words[Math.floor(Math.random() * words.length)];
    localStorage.setItem("selectedWord", selectedWord);
    guessedWord = Array.from({ length: selectedWord.length }, () => "_").join(" ");
    localStorage.setItem("guessedWord", guessedWord);
    wrongAttempts = 0;
    localStorage.setItem("wrongAttempts", wrongAttempts);
    gameEnded = false;
    localStorage.setItem("gameEnded", gameEnded);

}else{
    // SI JA ESTAVES JUGANT
    selectedWord=localStorage.getItem("selectedWord");
    guessedWord=localStorage.getItem("guessedWord");
    wrongAttempts=localStorage.getItem("wrongAttempts");
    gameEnded=localStorage.getItem("gameEnded");
    document.getElementById("word-display").innerText = guessedWord;

}


initializeGameInterface();

function updateGameInterface() {
    document.getElementById("word-display").innerText = guessedWord.join(" ");
    document.getElementById("wrong-count").innerText = wrongAttempts;

    if (wrongAttempts >= maxWrongAttempts) {
        displayMessage("¡Has perdido! La palabra correcta era: " + selectedWord);
        gameEnded = true;
        localStorage.clear();
    }
}

function ensenyarNinot() {
        let img = document.createElement("img");
        img.src = "./media/1.png"; 
        document.getElementById("image-container").appendChild(img);
}

function initializeGameInterface() {
    document.getElementById("word-display").innerText = guessedWord.join(" ");
}

function displayMessage(message) {
    document.getElementById("message").innerText = message;
}

function guessLetter(letter) {
    if (gameEnded) {
        return; 
    }

    letter = letter.toLowerCase();

    if (!selectedWord.includes(letter)) {
        wrongAttempts++;
        localStorage.setItem("wrongAttempts", wrongAttempts);
        updateGameInterface();
    } else {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }

        localStorage.setItem("guessedWord", guessedWord);
        
        updateGameInterface();

        if (guessedWord.join(" ") === selectedWord) {
            displayMessage("¡Felicidades! Has adivinado la palabra correctamente.");
            gameEnded = true;
            localStorage.clear();
        }
    }
}



document.addEventListener("keydown", function (event) {
    if (/^[a-zA-Z]$/.test(event.key)) {
        guessLetter(event.key);
    }
});

} );
