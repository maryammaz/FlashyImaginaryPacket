document.addEventListener("DOMContentLoaded", () => {
    const words = [
        "science", "mathlete", "geek", "comic", "robotics",
        "nerd", "astronomy", "crush", "diary", "friend",
        "drama", "frenemy", "journalist", "locker", "adventure",
        "bourgeoisie", "relationship"
    ];

    let usedWords = [];
    let currentWord = "";
    let scrambledWord = "";

    const scrambledWordDiv = document.querySelector("#scrambled-word");
    const resultDiv = document.querySelector("#result");
    const userAnswerInput = document.querySelector("#user-answer");
    const submitButton = document.querySelector("#submit-answer");
    const skipButton = document.querySelector("#skip-word");
    const backgroundMusic = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");

    // Function to toggle mute
    function toggleMute() {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            muteButton.textContent = "Mute";
        } else {
            backgroundMusic.muted = true;
            muteButton.textContent = "Unmute";
        }
    }

    // Attach mute toggle to the button
    muteButton.addEventListener("click", toggleMute);

    // Function to scramble a word
    function scrambleWord(word) {
        let scrambled = word.split('');
        do {
            scrambled.sort(() => Math.random() - 0.5);
        } while (scrambled.join('') === word);
        return scrambled.join('');
    }

    // Function to get a new random word
    function getNewWord() {
        if (usedWords.length === words.length) {
            usedWords = []; // Reset used words when all are exhausted
        }

        const availableWords = words.filter(word => !usedWords.includes(word));
        currentWord = availableWords[Math.floor(Math.random() * availableWords.length)];
        scrambledWord = scrambleWord(currentWord);
        usedWords.push(currentWord);

        displayScrambledWord(scrambledWord);
    }

    // Function to display the scrambled word as cards
    function displayScrambledWord(word) {
        scrambledWordDiv.innerHTML = ""; // Clear previous word
        word.split("").forEach(letter => {
            const card = document.createElement("div");
            card.className = "card";
            card.textContent = letter;
            scrambledWordDiv.appendChild(card);
        });
    }

    // Function to check user's answer
    function checkAnswer(userAnswer) {
        return userAnswer.trim().toLowerCase() === currentWord.toLowerCase();
    }

    // Event listener for submitting an answer
    submitButton.addEventListener("click", () => {
        const userAnswer = userAnswerInput.value;
        if (checkAnswer(userAnswer)) {
            resultDiv.textContent = "Correct! Here's the next word.";
            resultDiv.style.color = "green";
            userAnswerInput.value = ""; // Clear input field
            getNewWord(); // Load a new word
        } else {
            resultDiv.textContent = "Incorrect. Try again!";
            resultDiv.style.color = "red";
        }
    });

    // Event listener for skipping a word
    skipButton.addEventListener("click", () => {
        resultDiv.textContent = "Word skipped. Here's a new word.";
        resultDiv.style.color = "blue";
        userAnswerInput.value = ""; // Clear input field
        getNewWord(); // Load a new word
    });

    // Initialize the game by loading the first word
    getNewWord();
});
