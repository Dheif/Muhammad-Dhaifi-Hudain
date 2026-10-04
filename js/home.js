const songContainer = document.getElementById("song-container");
const recommendedTitle = document.getElementById("recommended-title");
const moodCards = document.querySelectorAll(".mood-card");

// Menampilkan Lagu
function showSongs(mood) {

    // Bersihkan card sebelumnya
    songContainer.innerHTML = "";

    // Ambil lagu berdasarkan mood
    const filteredSongs = songs.filter(song => {
        return song.mood.toLowerCase() === mood.toLowerCase();
    }).slice(0, 3);

    // Kalau tidak ada lagu
    if (filteredSongs.length === 0) {

        songContainer.innerHTML = `
            <p class="no-songs">
                No songs found for this mood.
            </p>
        `;
        return;}
    // Buat card lagu
    filteredSongs.forEach(song => {
        songContainer.innerHTML += `
            <div class="song-card">
                <img
                    src="${song.cover}"
                    alt="${song.title}"
                >
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                    <span class="genre ${song.mood.toLowerCase()}-text">
                        ${song.mood}
                    </span>
                </div>

                <button
                    class="play-button"
                    type="button"
                    aria-label="Play ${song.title}"
                >
                    <img
                        src="../img/play.png"
                        alt="Play"
                    >
                </button>
            </div>
        `;
    });
}

// Klik Mood
moodCards.forEach(card => {
    card.addEventListener("click", function () {
        // Ambil mood dari data-mood
        const selectedMood = this.dataset.mood;
        // Tampilkan lagu
        showSongs(selectedMood);
        // Ubah judul Recommended
        recommendedTitle.textContent =
            selectedMood + " Songs";
    });
});

// Sesuai desain Figma,
// Home pertama kali menampilkan lagu Chill.
showSongs("Chill");

// Card Chill aktif saat pertama dibuka
const defaultMood = document.querySelector(
    '.mood-card[data-mood="Chill"]'
);

if (defaultMood) {
    defaultMood.classList.add("active");
}
