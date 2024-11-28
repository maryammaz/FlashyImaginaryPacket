document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-music");

    // Check if the audio element exists
    if (audio) {
        console.log("Audio element found, attempting to play...");

        // Check if the music is already playing in localStorage
        const isPlaying = localStorage.getItem("background-music-playing");

        if (!isPlaying || isPlaying === "true") {
            audio.volume = 1.0; // Set to full volume initially
            audio.play().catch(err => {
                console.error("Audio playback failed:", err);
                alert("Audio failed to load, please check your browser's autoplay settings.");
            });
        }

        // Save audio state in localStorage
        audio.onplay = () => localStorage.setItem("background-music-playing", "true");
        audio.onpause = () => localStorage.setItem("background-music-playing", "false");
    } else {
        console.error("Audio element not found.");
    }

    // Volume adjustment events
    window.addEventListener("lower-music", () => {
        if (audio) {
            console.log("Lowering volume to 30%");
            audio.volume = 0.3;
        }
    });

    window.addEventListener("restore-music", () => {
        if (audio) {
            console.log("Restoring volume to 100%");
            audio.volume = 1.0;
        }
    });
});
