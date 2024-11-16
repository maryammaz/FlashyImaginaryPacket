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
    clearCanvas();

    if (doodleCount % doodlesToPoints === 0) {
        points += 10;
        pointsDisplay.textContent = points;
        alert("You earned 10 points!");
    }
}