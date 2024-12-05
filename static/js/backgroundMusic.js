// backgroundMusic.js

document.addEventListener("DOMContentLoaded", () => {
    const backgroundMusic = document.getElementById("background-music");
    const muteButton = document.getElementById("mute-button");

    // Check for and apply the saved mute state from localStorage
    const isMuted = localStorage.getItem("background-music-muted") === "true";

    if (backgroundMusic) {
        backgroundMusic.muted = isMuted; // Set the initial mute state
    }

    if (muteButton) {
        muteButton.textContent = isMuted ? "Unmute" : "Mute"; // Update button text

        // Add a click event listener for mute/unmute functionality
        muteButton.addEventListener("click", () => {
            if (backgroundMusic) {
                backgroundMusic.muted = !backgroundMusic.muted; // Toggle mute
                localStorage.setItem("background-music-muted", backgroundMusic.muted); // Save state
                muteButton.textContent = backgroundMusic.muted ? "Unmute" : "Mute"; // Update button text
            }
        });
    }
});
