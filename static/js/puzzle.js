let selectedPuzzleIndex = null;
let currentPuzzleImage = ""; // Store the current puzzle image name
let isMuted = false; // Variable to track mute state
let puzzleAudio = new Audio("/static/audio/background2.mp3"); // Path to your puzzle background music

function startPuzzle(puzzleNumber) {
    console.log(`Starting Puzzle ${puzzleNumber}`); // Debug log to ensure the function is triggered

    selectedPuzzleIndex = puzzleNumber - 1; // Puzzle index starts from 0
    const puzzleImage = puzzleImages[selectedPuzzleIndex];
    const piecesCount = puzzlePiecesCount[selectedPuzzleIndex];

    if (!puzzleImage || !piecesCount) {
        console.error(`Puzzle ${puzzleNumber} is not configured properly.`);
        return;
    }

    currentPuzzleImage = puzzleImage; // Store the image for the current puzzle
    createPuzzle(puzzleImage, piecesCount);
}

function createPuzzle(imageSrc, piecesCount) {
    console.log(`Creating puzzle with image: ${imageSrc} and ${piecesCount} pieces`); // Debug log

    const container = document.getElementById("puzzle-container");
    container.innerHTML = ""; // Clear previous puzzle

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
        console.log("Image loaded successfully!");

        let puzzleWidth = 0;
        let puzzleHeight = 0;

        if (piecesCount === 12) {
            puzzleWidth = 3; // 3x4 grid
            puzzleHeight = 4;
        } else if (piecesCount === 15) {
            puzzleWidth = 5; // 5x3 grid
            puzzleHeight = 3;
        }

        container.style.gridTemplateColumns = `repeat(${puzzleWidth}, 100px)`; // Set grid columns

        const puzzlePieceWidth = 100; // Tile width
        const puzzlePieceHeight = 100; // Tile height
        const backgroundWidth = puzzlePieceWidth * puzzleWidth;
        const backgroundHeight = puzzlePieceHeight * puzzleHeight;

        for (let i = 0; i < piecesCount; i++) {
            const piece = document.createElement("div");
            piece.classList.add("puzzle-piece");
            piece.style.backgroundImage = `url(${imageSrc})`;
            piece.style.backgroundSize = `${backgroundWidth}px ${backgroundHeight}px`;

            const row = Math.floor(i / puzzleWidth);
            const col = i % puzzleWidth;

            piece.style.backgroundPosition = `-${col * puzzlePieceWidth}px -${row * puzzlePieceHeight}px`;
            piece.setAttribute("data-index", i);
            piece.draggable = true;

            // Attach drag-and-drop event listeners
            piece.addEventListener("dragstart", dragStart);
            piece.addEventListener("dragover", dragOver);
            piece.addEventListener("drop", drop);

            container.appendChild(piece);
        }

        // Scramble the pieces after adding them to the container
        scramblePieces(container);

        // Play puzzle sound if not muted
        if (!isMuted) {
            puzzleAudio.play();
        }
    };

    img.onerror = () => {
        console.error("Image failed to load. Please check the path:", imageSrc);
    };
}

// Scramble puzzle pieces
function scramblePieces(container) {
    const pieces = Array.from(container.children);
    pieces.sort(() => Math.random() - 0.5);
    pieces.forEach((piece) => container.appendChild(piece));
}

// Drag-and-drop logic
function dragStart(e) {
    e.dataTransfer.setData("text", e.target.dataset.index);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();

    const draggedIndex = e.dataTransfer.getData("text");
    const draggedPiece = document.querySelector(`[data-index='${draggedIndex}']`);

    const targetIndex = e.target.dataset.index;
    const targetPiece = document.querySelector(`[data-index='${targetIndex}']`);

    if (!draggedPiece || !targetPiece) return;

    // Swap background positions
    const tempPosition = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition = targetPiece.style.backgroundPosition;
    targetPiece.style.backgroundPosition = tempPosition;
}

// Function to show the "Complete" message
function showCompleteMessage() {
    const completeMessageDiv = document.getElementById("complete-message");
    completeMessageDiv.style.display = "block"; // Display the message
}

// Function to close the "Complete" message
function closeCompleteMessage() {
    const completeMessageDiv = document.getElementById("complete-message");
    completeMessageDiv.style.display = "none"; // Hide the message
}

// Function to trigger the download of the puzzle image
function savePuzzleImage() {
    const imageName = currentPuzzleImage.split("/").pop(); // Extract the image file name (e.g., "dork_diaries_1.jpg")

    const link = document.createElement("a");
    link.href = currentPuzzleImage; // The image source
    link.download = imageName; // Set the file name for downloading
    document.body.appendChild(link);
    link.click(); // Trigger the download
    document.body.removeChild(link); // Remove the link after triggering download

    closeCompleteMessage(); // Close the "Complete" message after saving
}

// Mute and unmute function
function toggleMute() {
    isMuted = !isMuted; // Toggle mute state
    const muteButton = document.getElementById("mute-button");

    if (isMuted) {
        puzzleAudio.pause(); // Pause audio if muted
        muteButton.textContent = "Unmute"; // Change button text to "Unmute"
    } else {
        puzzleAudio.play(); // Resume audio if not muted
        muteButton.textContent = "Mute"; // Change button text to "Mute"
    }
}

// Attach mute/unmute function to the mute button
document.getElementById("mute-button").addEventListener("click", toggleMute);
