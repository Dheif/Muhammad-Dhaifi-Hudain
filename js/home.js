const songContainer = document.getElementById("song-container");
const recommendedTitle = document.getElementById("recomended-title");
const moodCards = document.querySelectorAll(".mood-card");


// ========================================
// MENAMPILKAN LAGU
// ========================================

function showSongs(mood) {

    // Bersihkan card sebelumnya
    songContainer.innerHTML = "";


    // Ambil lagu berdasarkan mood
    const filteredSongs = songs
        .filter(song => {
            return song.mood.toLowerCase() === mood.toLowerCase();
        })
        .slice(0, 3);


    // Kalau tidak ada lagu
    if (filteredSongs.length === 0) {

        songContainer.innerHTML = `
            <p class="no-songs">
                No songs found for this mood.
            </p>
        `;

        return;
    }


    // ========================================
    // BUAT CARD LAGU
    // ========================================

    filteredSongs.forEach(song => {

        const songIndex = songs.indexOf(song);


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


    // ========================================
    // TOMBOL PLAY
    // ========================================

    const playButtons =
        document.querySelectorAll(".play-button");


    playButtons.forEach(button => {

        button.addEventListener("click", function () {

            const songIndex =
                parseInt(this.dataset.index);


            // Simpan lagu yang dipilih
            localStorage.setItem(
                "selectedSong",
                songIndex
            );


            // Tandai bahwa lagu dipilih dari Home
            sessionStorage.setItem(
                "autoplaySong",
                "true"
            );


            // Pindah ke Player
            window.location.href = "player.html";

        });

    });

}


// ========================================
// KLIK MOOD
// ========================================

moodCards.forEach(card => {

    card.addEventListener("click", function () {

        const selectedMood =
            this.dataset.mood;


        // Tampilkan lagu
        showSongs(selectedMood);


        // Ubah judul Recommended
        recommendedTitle.textContent =
            selectedMood + " Songs";


        // Hapus active dari semua card
        moodCards.forEach(item => {
            item.classList.remove("active");
        });


        // Aktifkan card yang dipilih
        this.classList.add("active");

    });

});


// ========================================
// DEFAULT
// ========================================

// Pertama kali buka Home
// tampilkan Chill
showSongs("Chill");


// Card Chill aktif
const defaultMood =
    document.querySelector(
        '.mood-card[data-mood="Chill"]'
    );


if (defaultMood) {

    defaultMood.classList.add("active");

}