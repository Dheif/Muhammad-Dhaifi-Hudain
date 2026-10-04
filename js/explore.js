const exploreSongContainer = document.getElementById(
    "explore-song-container"
);

// Menampilkan lagu
function showExploreSongs(songList) {
    exploreSongContainer.innerHTML = "";
    songList.forEach(song => {
        // Cari index lagu dari songs.js
        const songIndex = songs.indexOf(song);
        exploreSongContainer.innerHTML += `
            <div class="explore-song-card">
                <img
                    src="${song.cover}"
                    alt="${song.title}"
                >
                <div class="explore-song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                    <span class="genre ${song.mood.toLowerCase()}-text">
                        ${song.mood}
                    </span>
                </div>
                <button
                    class="explore-play-button"
                    type="button"
                    data-index="${songIndex}"
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
    
    // tombol play
    const playButtons = document.querySelectorAll(
        ".explore-play-button"
    );
    playButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Ambil index lagu
            const songIndex = this.dataset.index;
            // Simpan lagu yang dipilih
            localStorage.setItem(
                "selectedSong",
                songIndex
            );
            // Pindah ke halaman Player
            window.location.href = "player.html";
        });
    });
}

// tampilkan semua lagu (All
showExploreSongs(songs);
// filter mood
const filterButtons = document.querySelectorAll(
    ".filter-button"
);
filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Ambil mood dari tombol
        const selectedMood = this.dataset.mood;
        // ======================================
        // ALL
        // ========================================
        if (selectedMood === "All") {
            showExploreSongs(songs);
        } else {
            // Cari lagu berdasarkan mood
            const filteredSongs = songs.filter(song => {
                return song.mood.toLowerCase() ===
                       selectedMood.toLowerCase();
            });
            showExploreSongs(filteredSongs);
        }
        // Button active
        filterButtons.forEach(item => {
            item.classList.remove("active");
        });
        this.classList.add("active");
    });
});