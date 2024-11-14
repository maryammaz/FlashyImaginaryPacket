// static/js/memory.js
document.addEventListener("DOMContentLoaded", () => {
    const cards = Array.from(document.querySelectorAll(".card"));
    let flippedCards = [];
    let matchedCards = 0;

    // Shuffle the cards at the beginning
    shuffleCards();

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (!card.classList.contains("flip") && flippedCards.length < 2) {
                flipCard(card);
                flippedCards.push(card);

                // Check if two cards are flipped
                if (flippedCards.length === 2) {
                    checkForMatch();
                }
            }
        });
    });

    function flipCard(card) {
        const name = card.getAttribute("data-name");
        card.textContent = name; // Reveal card's symbol
        card.classList.add("flip");
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.getAttribute("data-name") === card2.getAttribute("data-name")) {
            // It's a match
            card1.classList.add("matched");
            card2.classList.add("matched");
            matchedCards += 2;

            // Check if game is won
            if (matchedCards === cards.length) {
                setTimeout(() => alert("You won!"), 500);
            }

            // Reset flipped cards array
            flippedCards = [];
        } else {
            // Not a match, flip back after a short delay
            setTimeout(() => {
                card1.classList.remove("flip");
                card1.textContent = "";
                card2.classList.remove("flip");
                card2.textContent = "";
                flippedCards = [];
            }, 1000);
        }
    }

    function shuffleCards() {
        cards.forEach(card => {
            const randomPosition = Math.floor(Math.random() * cards.length);
            card.style.order = randomPosition;
        });
    }
});
