document.addEventListener("DOMContentLoaded", () => {
    const categories = {
        programación: ["javascript", "html", "css", "python", "typescript"],
        animales: ["gato", "perro", "elefante", "leon", "tigre"],
        frutas: ["manzana", "platano", "naranja", "uva", "fresa"]
    };
    const maxWrongAttempts = 9;
    let gameEnded = false;
    let selectedWord, guessedWord, wrongAttempts, usedLetters;

    if (localStorage.getItem("selectedWord") == undefined) {
        // SI ES LA PRIMERA VEZ
        const categoryKeys = Object.keys(categories);
        const randomCategory = categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
        const selectedCategory = categories[randomCategory];
        selectedWord = selectedCategory[Math.floor(Math.random() * selectedCategory.length)];

        localStorage.setItem("selectedWord", selectedWord);
        guessedWord = Array.from({ length: selectedWord.length }, () => "_");
        localStorage.setItem("guessedWord", guessedWord);
        wrongAttempts = 0;
        localStorage.setItem("wrongAttempts", wrongAttempts);
        usedLetters = []; // Inicializar usedLetters como un array vacío
        localStorage.setItem("usedLetters", JSON.stringify(usedLetters)); // Guardar en localStorage
    } else {
        // SI YA ESTABA JUGANDO
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
            endGame(); // Llama a esta función cuando el juego termine
            localStorage.clear();
        }
    }

    function ensenyarNinot() {
        // Eliminar la imagen anterior si existe
        const imageContainer = document.getElementById("image-container");
        while (imageContainer.firstChild) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
    
        // Crear y agregar la nueva imagen
        const img = document.createElement("img");
        img.src = `../media/${wrongAttempts}.png`;
        imageContainer.appendChild(img);
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

    // Definición de la función guessLetter
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

        // Llamar a endGame después de un intento fallido
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
            endGame(); // Llama a esta función cuando el juego termine
            localStorage.clear();
        } else {
            disableButton(letter);
        }
    }
};

    

    // Definimos la función restartGame fuera del bloque DOMContentLoaded
    function restartGame() {
        localStorage.clear(); // Limpiar datos del juego almacenados en localStorage
    
        // Reiniciar variables y cargar una nueva palabra
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
    
        // Actualizar la interfaz del juego
        updateGameInterface();
    
        // Eliminar la imagen del ahorcado si está presente
        const imageContainer = document.getElementById("image-container");
        while (imageContainer.firstChild) {
            imageContainer.removeChild(imageContainer.firstChild);
        }
    
        // Habilitar los botones del teclado
        const alphabet = "abcdefghijklmnopqrstuvwxyzçñ";
        for (const letter of alphabet) {
            const button = document.getElementById(`btn-${letter}`);
            if (button) {
                button.disabled = false;
            }
        }
    
        // Limpiar mensaje
        displayMessage("");
    
        // Ocultar el botón de reinicio
        const restartButton = document.getElementById("restart-button");
        restartButton.style.display = "none";
    
        // Ocultar la información educativa
        const educationalInfo = document.getElementById("educational-info");
        educationalInfo.textContent = "";
    
        // Habilitar el juego
        gameEnded = false;
    }
    
    

    // Esta función se llama cuando el juego finaliza para mostrar el botón de reinicio
    function endGame() {
        gameEnded = true;
        const restartButton = document.getElementById("restart-button");
        restartButton.style.display = "block";
    
        // Mostrar imagen relacionada con la palabra
        const imageContainer = document.getElementById("image-container");
        const img = document.createElement("img");
        img.src = `../media/${selectedWord}.jpg`; // Asumiendo que las imágenes tienen nombres coincidentes con las palabras
        imageContainer.appendChild(img);
    
        // Mostrar información educativa relacionada con la palabra
        const educationalInfo = document.getElementById("educational-info");
        const info = getEducationalInfo(selectedWord.toLowerCase()); // Función para obtener información educativa según la palabra
        educationalInfo.textContent = info;
        
    }
    
    // Función para obtener información educativa según la palabra
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
    
        // Verificar si hay información educativa disponible para la palabra
        if (educationalInfo.hasOwnProperty(word)) {
            return educationalInfo[word];
        } else {
            return "No se encontró información educativa para esta palabra.";
        }
    }
    

    // Llamada inicial para asegurarse de que el botón de reinicio esté oculto al cargar la página
    const restartButton = document.getElementById("restart-button");
    restartButton.style.display = "none";
    
    // Event listener para reiniciar el juego al hacer clic en el botón
    restartButton.addEventListener("click", restartGame);

    document.addEventListener("keydown", function (event) {
        if (/^[a-zA-Z]$/.test(event.key)) {
            guessLetter(event.key);
        }
    });

    const alphabet = "abcdefghijklmnopqrstuvwxyzçñ";
    const keyboardContainer = document.getElementById("keyboard");

    // Recorremos el alfabeto para crear y agregar botones al teclado
    for (const letter of alphabet) {
        const button = document.createElement("button");
        button.textContent = letter.toUpperCase();
        button.dataset.letter = letter; // Establecemos el atributo data-letter
        button.addEventListener("click", function() {
            guessLetter(this.dataset.letter); // Llamamos a guessLetter con el valor del atributo data-letter
        });
        keyboardContainer.appendChild(button); // Agregamos el botón al contenedor del teclado
    }

});
