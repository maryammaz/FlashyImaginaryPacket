let gameMode = "two_player";  // Default to two-player

// Update game mode based on user selection
document.getElementById("game_mode").addEventListener("change", (e) => {
    gameMode = e.target.value;  // Set game mode to player's selection
});

function makeMove(row, col) {
    // Send the player's move along with the game mode
    fetch("/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            row: row, 
            col: col, 
            game_mode: gameMode // Include game mode in request
        })
    })
    .then(response => response.json())
    .then(data => updateBoard(data.board));
}

function updateBoard(board) {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 3);
        const col = index % 3;
        const symbol = board[row][col] === "X" ? "💖" :
                       board[row][col] === "O" ? "🌟" : "";
        cell.textContent = symbol;
    });
}

// Function to handle AI move
function aiMove() {
    // Logic for AI to make a move (random selection of available move)
    fetch("/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            row: aiRow, // AI move row
            col: aiCol, // AI move column
            game_mode: gameMode // Ensure game mode is included
        })
    })
    .then(response => response.json())
    .then(data => updateBoard(data.board));
}