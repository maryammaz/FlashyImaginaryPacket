document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById("gameBoard");
    const resetButton = document.getElementById("resetButton");
    const difficultySelector = document.getElementById("difficulty");
    const muteButton = document.getElementById("muteButton");
    const backgroundMusic = document.getElementById("background-music");

    let flippedCards = [];
    let matchedCards = 0;
    let cards = [];

    const images = [
        "card1.png", "card2.png", "card3.png", "card4.png",
        "card5.png", "card6.png", "card7.png", "card8.png",
        "card9.png", "card10.png", "card11.png", "card12.png",
        "card13.png", "card14.png", "card15.png", "card16.png"
    ]; 

    // Event listener for difficulty selection
    difficultySelector.addEventListener("change", startGame);
    resetButton.addEventListener("click", startGame);
    muteButton.addEventListener("click", toggleMute);

    // Start the game
    function startGame() {
        const difficulty = difficultySelector.value;
        let numPairs;

        if (difficulty === "easy") numPairs = 6;
        else if (difficulty === "medium") numPairs = 12;
        else if (difficulty === "hard") numPairs = 16;

        const selectedImages = images.slice(0, numPairs);
        cards = shuffle([...selectedImages, ...selectedImages]); // Duplicate and shuffle the cards
        matchedCards = 0;
        flippedCards = [];
        renderCards();
    }

    // Render cards on the game board
    function renderCards() {
        gameBoard.innerHTML = ""; 
        gameBoard.style.gridTemplateColumns = `repeat(${Math.sqrt(cards.length)}, 100px)`;

        cards.forEach((image, index) => {
            const card = document.createElement("div");
            card.className = "card";
            card.dataset.name = image;
            card.style.order = index;

            const img = document.createElement("img");
            img.src = `/static/images/${image}`;
            img.alt = `Card ${index + 1}`;
            img.style.display = "none"; // Hide the image initially

            card.appendChild(img);
            gameBoard.appendChild(card);

            // Add click event for flipping
            card.addEventListener("click", () => {
                if (!card.classList.contains("flip") && flippedCards.length < 2) {
                    flipCard(card);
                    flippedCards.push(card);

                    if (flippedCards.length === 2) {
                        checkForMatch();
                    }
                }
            });
        });
    }

    // Flip a card
    function flipCard(card) {
        card.classList.add("flip");
        const img = card.querySelector("img");
        img.style.display = "block";  // Show the image
    }

    // Check for a match
    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.name === card2.dataset.name) {
            // Match found
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards += 2;

            if (matchedCards === cards.length) {
                setTimeout(() => alert("You won!"), 500);
            }

            flippedCards = []; // Reset flipped cards array
        } else {
            // No match, flip back after a delay
            setTimeout(() => {
                card1.classList.remove("flip");
                card1.querySelector("img").style.display = "none";
                card2.classList.remove("flip");
                card2.querySelector("img").style.display = "none";
                flippedCards = []; // Reset flipped cards array
            }, 1000);
        }
    }

    // Shuffle an array
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
    }

    // Toggle mute on/off
    function toggleMute() {
        if (backgroundMusic.muted) {
            backgroundMusic.muted = false;
            muteButton.textContent = "Mute"; // Change button text back to "Mute"
        } else {
            backgroundMusic.muted = true;
            muteButton.textContent = "Unmute"; // Change button text to "Unmute"
        }
    }

    // Start the game with the default difficulty
    startGame();
});
