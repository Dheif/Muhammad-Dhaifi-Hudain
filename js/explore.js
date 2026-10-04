const exploreSongContainer = document.getElementById(
    "explore-song-container"
)
function showExploreSongs(songList) {
    exploreSongContainer.innerHTML = "";
    songList.forEach(song => {
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

showExploreSongs(songs);

// filter modd
const filterButtons = document.querySelectorAll(".filter-button");
filterButtons.forEach(button => {
    button.addEventListener("click", function () {
        // Ambil mood dari tombol
        const selectedMood = this.dataset.mood;
        // All
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
        // Hapus active dari semua tombol
        filterButtons.forEach(item => {
            item.classList.remove("active");
        });
        // Tambahkan active ke tombol yang dipilih
        this.classList.add("active");
    });
});