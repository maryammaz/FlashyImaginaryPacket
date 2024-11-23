document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#unscramble-form");
    const resultDiv = document.querySelector("#result");
    const scrambledWordDiv = document.querySelector("#scrambled-word");

    // Get the scrambled and correct words from the data attributes
    const initialScrambledWord = scrambledWordDiv.getAttribute("data-scrambled");
    const initialCorrectWord = scrambledWordDiv.getAttribute("data-correct");

    // Initialize the hidden input with the correct word
    const correctWordInput = document.querySelector("input[name='correct_word']");
    correctWordInput.value = initialCorrectWord;

    // Function to update the displayed scrambled word
    function updateScrambledWord(scrambledWord) {
        scrambledWordDiv.innerHTML = ''; // Clear the previous cards
        scrambledWord.split('').forEach(letter => {
            const card = document.createElement('div');
            card.className = 'card';
            card.textContent = letter;
            scrambledWordDiv.appendChild(card);
        });
    }

    // Display the initial scrambled word on page load
    updateScrambledWord(initialScrambledWord);

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent page reload

        const formData = new FormData(form);
        const userAnswer = formData.get("user_answer");
        const correctWord = formData.get("correct_word");

        const response = await fetch("/unscramble_game", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_answer: userAnswer, correct_word: correctWord }),
        });

        if (response.ok) {
            const data = await response.json();
            resultDiv.textContent = data.result; // Update the result message

            // If the answer is correct, update the scrambled word with a new one
            if (data.result.includes("Correct")) {
                updateScrambledWord(data.new_scrambled);  // Update with new scrambled word
                form.reset();  // Optionally reset the input field after a correct answer
            } else {
                // If the answer is incorrect, keep the same scrambled word for retry
                updateScrambledWord(data.new_scrambled);  // Keep the same scrambled word
            }
        } else {
            resultDiv.textContent = "An error occurred. Please try again.";
        }
    });
});