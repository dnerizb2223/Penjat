const words = ["javascript", "html", "css", "python", "typescript"];
const selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = Array.from({ length: selectedWord.length }, () => "_");
let maxWrongAttempts = 10;
let wrongAttempts = 0;
let gameEnded = false;

function updateGameInterface() {
    document.getElementById("word-display").innerText = guessedWord.join(" ");
    document.getElementById("wrong-count").innerText = wrongAttempts;

    if (wrongAttempts >= maxWrongAttempts) {
        displayMessage("¡Has perdido! La palabra correcta era: " + selectedWord);
        gameEnded = true;
    }
}

function initializeGameInterface() {
    // Inicializa la interfaz con espacios en blanco
    document.getElementById("word-display").innerText = guessedWord.join(" ");
}

function displayMessage(message) {
    document.getElementById("message").innerText = message;
}

function guessLetter(letter) {
    if (gameEnded) {
        return; // No hacer nada si el juego ha terminado
    }

    letter = letter.toLowerCase();

    if (!selectedWord.includes(letter)) {
        wrongAttempts++;
        updateGameInterface();
    } else {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letter) {
                guessedWord[i] = letter;
            }
        }

        updateGameInterface();

        if (guessedWord.join("") === selectedWord) {
            displayMessage("¡Felicidades! Has adivinado la palabra correctamente.");
            gameEnded = true;
        }
    }
}

// Llama a initializeGameInterface al cargar la página
document.addEventListener("DOMContentLoaded", initializeGameInterface);

// Escucha el evento de teclado en el documento
document.addEventListener("keydown", function (event) {
    // Verifica si la tecla presionada es una letra
    if (/^[a-zA-Z]$/.test(event.key)) {
        // Llama a la función guessLetter con la letra presionada
        guessLetter(event.key);
    }
});

function saveName() {
    const playerName = document.getElementById("input-nom").value;
    localStorage.setItem("playerName", playerName);
    document.getElementById("player-name").innerText = playerName;
}
