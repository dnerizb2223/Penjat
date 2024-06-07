document.addEventListener("DOMContentLoaded", () => {
    initializeGame();
    initializeGameInterface();
    setupKeyboard();
});

const categories = {
    programación: ["javascript", "html", "css", "python", "typescript"],
    animales: ["gato", "perro", "elefante", "leon", "tigre"],
    frutas: ["manzana", "platano", "naranja", "uva", "fresa"]
};
const maxWrongAttempts = 9;
let gameEnded = false;
let selectedWord, guessedWord, wrongAttempts, usedLetters;

function initializeGame() {
    if (localStorage.getItem("selectedWord") == undefined) {
        startNewGame();
    } else {
        loadGameFromLocalStorage();
    }
    updateGameInterface();
}

function startNewGame() {
    const categoryKeys = Object.keys(categories);
    const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
    const selectedCategory = categories[randomCategory];
    selectedWord = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];

    localStorage.setItem("selectedWord", selectedWord);
    guessedWord = Array.from({ length: selectedWord.length }, () => "_");
    localStorage.setItem("guessedWord", guessedWord);
    wrongAttempts = 0;
    localStorage.setItem("wrongAttempts", wrongAttempts);
    usedLetters = [];
    localStorage.setItem("usedLetters", JSON.stringify(usedLetters));
}

function loadGameFromLocalStorage() {
    selectedWord = localStorage.getItem("selectedWord");
    guessedWord = localStorage.getItem("guessedWord").split(",");
    wrongAttempts = parseInt(localStorage.getItem("wrongAttempts"));
    usedLetters = localStorage.getItem("usedLetters") ? JSON.parse(localStorage.getItem("usedLetters")) : [];
    document.getElementById("wrong-count").innerText = wrongAttempts;
    document.getElementById("word-display").innerText = guessedWord.join(" ");
}

function updateGameInterface() {
    document.getElementById("word-display").innerText = guessedWord.join(" ");
    document.getElementById("wrong-count").innerText = wrongAttempts;

    if (wrongAttempts >= maxWrongAttempts) {
        displayMessage("¡Has perdido! La palabra correcta era: " + selectedWord);
        endGame();
        localStorage.clear();
    }
}

function initializeGameInterface() {
    document.getElementById("word-display").innerText = guessedWord.join(" ");
}

function ensenyarNinot() {
    const imageContainer = document.getElementById("image-container");
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }

    const img = document.createElement("img");
    img.src = `../media/${wrongAttempts}.png`;
    imageContainer.appendChild(img);
}

function disableButton(letter) {
    document.getElementById(`btn-${letter}`).disabled = true;
}

function displayMessage(message) {
    document.getElementById("message").innerText = message;
}

const guessLetter = (letter) => {
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

        if (wrongAttempts >= maxWrongAttempts) {
            endGame();
        }
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
            endGame();
            localStorage.clear();
        } else {
            disableButton(letter);
        }
    }
};

function restartGame() {
    localStorage.clear();
    startNewGame();
    updateGameInterface();
    resetGameInterface();
    displayMessage("");
    gameEnded = false;
}

function endGame() {
    gameEnded = true;
    const restartButton = document.getElementById("restart-button");
    restartButton.style.display = "block";

    const imageContainer = document.getElementById("image-container");
    const img = document.createElement("img");
    img.src = `../media/${selectedWord}.jpg`;
    imageContainer.appendChild(img);

    const educationalInfo = document.getElementById("educational-info");
    const info = getEducationalInfo(selectedWord.toLowerCase());
    educationalInfo.textContent = info;
}

function getEducationalInfo(word) {
    const educationalInfo = {
        javascript: "JavaScript es un lenguaje de programación de alto nivel, interpretado, orientado a objetos y de tipado dinámico.",
        html: "HTML es el lenguaje de marcado estándar para crear páginas web.",
        css: "CSS es un lenguaje de hojas de estilo utilizado para describir la presentación de un documento HTML.",
        python: "Python es un lenguaje de programación interpretado, de alto nivel y de propósito general.",
        typescript: "TypeScript es un superconjunto de JavaScript que agrega tipado estático opcional a la sintaxis de JavaScript.",
        gato: "El gato, también conocido como gato doméstico o gato doméstico, es un mamífero carnívoro de la familia Felidae.",
        perro: "El perro, también conocido como perro doméstico, es un mamífero carnívoro de la familia Canidae.",
        elefante: "El elefante es un mamífero proboscídeo de la familia Elephantidae.",
        leon: "El león es una especie de mamífero carnívoro de la familia Felidae.",
        tigre: "El tigre es una especie de mamífero carnívoro de la familia Felidae.",
        manzana: "La manzana es el fruto comestible de la especie Malus domestica.",
        platano: "El plátano es el fruto de la planta del género Musa.",
        naranja: "La naranja es el fruto del naranjo dulce, una especie de Citrus.",
        uva: "La uva es el fruto de la vid, una planta trepadora del género Vitis.",
        fresa: "La fresa es el fruto de la planta del género Fragaria."
    };

    return educationalInfo[word] || "No se encontró información educativa para esta palabra.";
}

function setupKeyboard() {
    const alphabet = "abcdefghijklmnopqrstuvwxyzçñ";
    const keyboardContainer = document.getElementById("keyboard");

    for (const letter of alphabet) {
        const button = document.createElement("button");
        button.textContent = letter.toUpperCase();
        button.dataset.letter = letter;
        button.addEventListener("click", function() {
            guessLetter(this.dataset.letter);
        });
        keyboardContainer.appendChild(button);
    }

    document.addEventListener("keydown", function(event) {
        if (/^[a-zA-Z]$/.test(event.key)) {
            guessLetter(event.key);
        }
    });
}

function resetGameInterface() {
    const imageContainer = document.getElementById("image-container");
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }

    const alphabet = "abcdefghijklmnopqrstuvwxyzçñ";
    for (const letter of alphabet) {
        const button = document.getElementById(`btn-${letter}`);
        if (button) {
            button.disabled = false;
        }
    }

    const restartButton = document.getElementById("restart-button");
    restartButton.style.display = "none";

    const educationalInfo = document.getElementById("educational-info");
    educationalInfo.textContent = "";
}

const restartButton = document.getElementById("restart-button");
restartButton.style.display = "none";
restartButton.addEventListener("click", restartGame);
