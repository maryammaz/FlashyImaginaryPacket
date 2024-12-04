document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");

    const gameBoard = document.querySelectorAll(".cell");
    const statusMessage = document.getElementById("status_message");
    const gameModeSelect = document.getElementById("game_mode");

    // Attach click events to the board cells
    gameBoard.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            makeMove(row, col);
        });
    });

    // Lower the music volume when entering Tic Tac Toe game
    window.addEventListener("lower-music", () => {
        if (audio) {
            console.log("Lowering volume to 30%");
            audio.volume = 0.3; // Lower the music volume when the game page is loaded
        }
    });

    // Restore the music volume
    window.addEventListener("restore-music", () => {
        if (audio) {
            console.log("Restoring volume to 100%");
            audio.volume = 1.0; // Restore volume when returning to main page
        }
    });

    // Function to make a move
    function makeMove(row, col) {
        const gameMode = gameModeSelect.value; // Get the selected game mode (two_player or one_player)

        fetch("/move", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ row, col, game_mode: gameMode })
        })
            .then((response) => response.json())
            .then((data) => {
                updateBoard(data.board); // Update the board with the latest state
                if (data.winner) {
                    // Update the status message with emojis
                    if (data.winner === "X") {
                        statusMessage.textContent = "Player 💖 has won!";
                    } else if (data.winner === "O") {
                        statusMessage.textContent = "Player 🌟 has won!";
                    } else if (data.winner === "Draw") {
                        statusMessage.textContent = "It's a Draw!";
                    }
                    disableBoard(); // Disable further moves
                }
            })
            .catch((error) => console.error("Error:", error));
    }

    // Function to update the board visually
    function updateBoard(board) {
        gameBoard.forEach((cell, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;

            // Map X to 💖 and O to 🌟
            if (board[row][col] === "X") {
                cell.textContent = "💖";
            } else if (board[row][col] === "O") {
                cell.textContent = "🌟";
            } else {
                cell.textContent = ""; // Empty cell
            }
        });
    }

    // Disable the board after the game ends
    function disableBoard() {
        gameBoard.forEach((cell) => {
            cell.style.pointerEvents = "none"; // Disable click events
        });
    }

    // Reset the game
    function resetGame() {
        fetch("/reset", { method: "POST" })
            .then((response) => response.json())
            .then(() => {
                gameBoard.forEach((cell) => {
                    cell.textContent = ""; // Clear the board
                    cell.style.pointerEvents = "auto"; // Re-enable clicks
                });
                statusMessage.textContent = ""; // Clear status message
            })
            .catch((error) => console.error("Error:", error));
    }

    // Attach the resetGame function to the reset button
    document.querySelector("button").addEventListener("click", resetGame);

    // Toggle mute functionality
    window.toggleMute = () => {
        if (audio) {
            if (audio.muted) {
                audio.muted = false;
                muteButton.textContent = "Mute";
                console.log("Unmuted background music.");
            } else {
                audio.muted = true;
                muteButton.textContent = "Unmute";
                console.log("Muted background music.");
            }
        }
    };
});
