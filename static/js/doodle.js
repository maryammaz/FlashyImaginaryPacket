const canvas = document.getElementById('doodleCanvas');
const ctx = canvas.getContext('2d');
const pointsDisplay = document.getElementById('points');
const brushSizeInput = document.getElementById('brushSize');
const brushColorInput = document.getElementById('brushColor');

let isDrawing = false;
let points = 0;
let doodleCount = 0;
const doodlesToPoints = 5;

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing) return;

    ctx.lineWidth = brushSizeInput.value;
    ctx.strokeStyle = brushColorInput.value;
    ctx.lineCap = 'round';

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveDoodle() {
    doodleCount += 1;
    // Save the current doodle as an image
    const dataUrl = canvas.toDataURL('image/png'); // Converts the canvas to a PNG image
    const link = document.createElement('a'); // Create a temporary link element
    link.href = dataUrl; // Set the href to the image data
    link.download = 'doodle.png'; // Set the download attribute to specify the file name
    link.click(); // Programmatically click the link to trigger the download

    clearCanvas(); // Clear the canvas after saving the doodle

    // Give points every 5 doodles
    if (doodleCount % doodlesToPoints === 0) {
        points += 10;
        pointsDisplay.textContent = points;
        alert("You earned 10 points!");
    }
}