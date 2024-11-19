let puzzleImages = [
    'static/images/dork_diaries_1.jpg', // 12 pieces
    'static/images/dork_diaries_2.jpg', // 15 pieces
    'static/images/dork_diaries_3.jpg', // 15 pieces
    'static/images/dork_diaries_4.jpg', // 12 pieces
    'static/images/dork_diaries_5.jpg'  // 12 pieces
];

let puzzlePiecesCount = [12, 15, 15, 12, 12];

let selectedPuzzleIndex = null;

function startPuzzle(puzzleNumber) {
    selectedPuzzleIndex = puzzleNumber - 1;
    const puzzleImage = puzzleImages[selectedPuzzleIndex];
    const piecesCount = puzzlePiecesCount[selectedPuzzleIndex];
    createPuzzle(puzzleImage, piecesCount);
}

function createPuzzle(imageSrc, piecesCount) {
    const container = document.getElementById('puzzle-container');
    container.innerHTML = ''; // Clear any previous puzzle
    
    let puzzleWidth = 0;
    let puzzleHeight = 0;
    
    // Determine the puzzle layout (12 or 15 pieces)
    if (piecesCount === 12) {
        puzzleWidth = 3; // 3x4 grid
        puzzleHeight = 4;
    } else if (piecesCount === 15) {
        puzzleWidth = 5; // 5x3 grid
        puzzleHeight = 3;
    }
    
    // Create puzzle pieces
    const puzzlePieceWidth = 100;
    const puzzlePieceHeight = 100;
    
    for (let i = 0; i < piecesCount; i++) {
        let piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.style.backgroundImage = `url(${imageSrc})`;
        piece.style.backgroundSize = `${puzzlePieceWidth * puzzleWidth}px ${puzzlePieceHeight * puzzleHeight}px`;
        
        let row = Math.floor(i / puzzleWidth);
        let col = i % puzzleWidth;
        
        piece.style.backgroundPosition = `-${col * puzzlePieceWidth}px -${row * puzzlePieceHeight}px`;
        piece.setAttribute('data-index', i);
        piece.draggable = true;
        
        piece.addEventListener('dragstart', dragStart);
        piece.addEventListener('dragover', dragOver);
        piece.addEventListener('drop', drop);
        
        container.appendChild(piece);
    }
}

function dragStart(e) {
    e.dataTransfer.setData('text', e.target.dataset.index);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedIndex = e.dataTransfer.getData('text');
    const draggedPiece = document.querySelector(`[data-index='${draggedIndex}']`);
    
    const targetIndex = e.target.dataset.index;
    const targetPiece = document.querySelector(`[data-index='${targetIndex}']`);
    
    // Swap the background positions
    let temp = draggedPiece.style.backgroundPosition;
    draggedPiece.style.backgroundPosition = targetPiece.style.backgroundPosition;
    targetPiece.style.backgroundPosition = temp;
}