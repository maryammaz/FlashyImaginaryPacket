let gameMode = "two_player";  // Default to two-player

// Update game mode based on user selection
document.getElementById("game_mode").addEventListener("change", (e) => {
    gameMode = e.target.value;
});

function makeMove(row, col) {
    fetch("/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ row: row, col: col, game_mode: gameMode })
    })
    .then(response => response.json())
    .then(data => updateBoard(data.board));
}

function updateBoard(board) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const symbol = board[row][col] === "X" ? "💖" : board[row][col] === "O" ? "🌟" : "";
        cell.textContent = symbol;
    });
}

// Function to reset the game
function resetGame() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => cell.textContent = "");  // Clear UI

    fetch("/reset", { method: "POST" })  // Server reset
        .then(response => response.json())
        .then(data => console.log("Game reset on server"));
}