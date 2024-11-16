document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".card"));
    const resetButton = document.getElementById("resetButton");
    let flippedCards = [];
    let matchedCards = 0;

    // Shuffle and initialize cards
    shuffleCards();

    // Add click event listeners to each card
    cards.forEach(card => {
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

    // Reset button event listener
    resetButton.addEventListener("click", resetGame);

    // Flip a card
    function flipCard(card) {
        card.classList.add("flip");
    }

    // Check for a match
    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.getAttribute("data-name") === card2.getAttribute("data-name")) {
            // Match found
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards += 2;

            if (matchedCards === cards.length) {
                setTimeout(() => alert("You won!"), 500);
            }

            flippedCards = [];
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove("flip");
                card2.classList.remove("flip");
                flippedCards = [];
            }, 1000);
        }
    }

    // Shuffle cards
    function shuffleCards() {
        cards.forEach(card => {
            card.classList.remove("flip", "matched");
            const randomPosition = Math.floor(Math.random() * cards.length);
            card.style.order = randomPosition;
        });
        flippedCards = [];
        matchedCards = 0;
    }

    // Reset the game
    function resetGame() {
        shuffleCards();
    }
});
