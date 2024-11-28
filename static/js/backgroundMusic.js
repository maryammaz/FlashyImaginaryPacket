document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("background-music");

    // Play music when the page loads
    if (audio) {
        const isPlaying = localStorage.getItem("background-music-playing");

        if (!isPlaying || isPlaying === "true") {
            audio.volume = 1.0;
            audio.play().catch(err => console.error("Audio playback failed:", err));
        }

        // Save audio state in localStorage
        audio.onplay = () => localStorage.setItem("background-music-playing", "true");
        audio.onpause = () => localStorage.setItem("background-music-playing", "false");
    }

    // Volume adjustment events
    window.addEventListener("lower-music", () => {
        if (audio) audio.volume = 0.3;
    });
    window.addEventListener("restore-music", () => {
        if (audio) audio.volume = 1.0;
    });
});
