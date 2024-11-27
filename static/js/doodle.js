const canvas = document.getElementById('doodleCanvas');
const ctx = canvas.getContext('2d');
const brushSizeInput = document.getElementById('brushSize');
const brushColorInput = document.getElementById('brushColor');
const topicDisplay = document.getElementById('randomTopic'); // Reference for the topic display

let isDrawing = false;
let doodleCount = 0;

// Function to generate and display a random topic
function generateRandomTopic() {
    const topics = [
        "A pink scarf",
        "A heart-shaped balloon",
        "A blue lunchbox",
        "A red pencil sharpener",
        "A purple cupcake",
        "A yellow skateboard",
        "A green bottle of water",
        "A pink school bus",
        "A fluffy stuffed bunny",
        "A rainbow hairbrush",
        "A star-shaped photo frame",
        "A silver bracelet",
        "A cute diary with a lock",
        "A golden ruler",
        "A colorful balloon",
        "A flower pot with daisies",
        "A sparkly pair of mittens",
        "A pink pair of headphones",
        "A bright yellow comb",
        "A white stuffed bear",
        "A purple backpack",
        "A purple backpack",
        "A red ice cream cone",
        "A polka dot umbrella",
        "A heart-shaped cookie",
        "A blue baseball cap",
        "A golden star",
        "A yellow rubber duck",
        "A rainbow lollipop",
        "A green jellybean",
        "A striped beach towel",
        "A pink bicycle",
        "A sparkly snowflake",
        "A cute penguin",
        "A watermelon slice",
        "A sparkly necklace"
    ];

    const randomIndex = Math.floor(Math.random() * topics.length);
    const randomTopic = topics[randomIndex];

    topicDisplay.textContent = `Your topic: ${randomTopic}`;
}

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
}