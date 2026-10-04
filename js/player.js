
// Ambil elemen HTML
const audio = document.getElementById("audio-player");

const cover = document.getElementById("player-cover");
const title = document.getElementById("player-title");
const artist = document.getElementById("player-artist");
const mood = document.getElementById("player-mood");

const playButton = document.getElementById("play-button");
const playIcon = document.getElementById("play-icon");

const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

const progressBar = document.getElementById("progress-bar");

const currentTimeText = document.getElementById("current-time");
const durationText = document.getElementById("duration");

const volumeBar = document.getElementById("volume-bar");
const volumeIcon = document.getElementById("volume-icon");


// Default lagu
let currentSongIndex = 10;

// Kalau ada lagu yang dikirim dari halaman lain
// melalui localStorage
const savedSong = localStorage.getItem("selectedSong");
if (savedSong !== null) {
    currentSongIndex = parseInt(savedSong);
}
// Pastikan index tidak keluar dari data songs
if (
    isNaN(currentSongIndex) ||
    currentSongIndex < 0 ||
    currentSongIndex >= songs.length
) {
    currentSongIndex = 0;
}

// waktu
function formatTime(seconds) {
    if (isNaN(seconds)) {
        return "0:00";
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds
        .toString()
        .padStart(2, "0")}`;
}

// function song-song
function loadSong(index) {
    const song = songs[index];
    if (!song) {
        return;
    }

    // Informasi lagu
    title.textContent = song.title;
    artist.textContent = song.artist;
    mood.textContent = song.mood;

    // Cover
    cover.src = song.cover;
    cover.alt = song.title;

    // Audio
    audio.src = song.audio;
    audio.load();

    // Reset progress
    progressBar.value = 0;
    currentTimeText.textContent = "0:00";
    durationText.textContent = "0:00";

    // Icon kembali ke play
    playIcon.src = "../img/play.png";
    playIcon.alt = "Play";
}

function (index) {
    const song = songs[index];
    if (!song) {
        return;
    }

    // Informasi lagu
    title.textContent = song.title;
    artist.textContent = song.artist;
    mood.textContent = song.mood;

    // Cover
    cover.src = song.cover;
    cover.alt = song.title;

    // Audio
    audio.src = song.audio;
    audio.load();

    // Reset progress
    progressBar.value = 0;
    currentTimeText.textContent = "0:00";
    durationText.textContent = "0:00";

    // Icon kembali ke play
    playIcon.src = "../img/play.png";
    playIcon.alt = "Play";
}

// play
function playSong() {
    audio.play();
    playIcon.src = "../img/pause.png";
    playIcon.alt = "Pause";
}
// pause
function pauseSong() {
    audio.pause();
    playIcon.src = "../img/play.png";
    playIcon.alt = "Play";
}
// play/pause
playButton.addEventListener("click", function () {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();

    }
});


// audio time update
audio.addEventListener("timeupdate", function () {

    if (!audio.duration) {
        return;
    }

    // Persentase progress
    const progress =
        (audio.currentTime / audio.duration) * 100;

    progressBar.value = progress;

    // Waktu berjalan
    currentTimeText.textContent =
        formatTime(audio.currentTime);
});

// audio load
audio.addEventListener("loadedmetadata", function () {

    durationText.textContent =
        formatTime(audio.duration);

});

// progres bar
progressBar.addEventListener("input", function () {
    if (!audio.duration) {
        return;
    }

    const newTime =
        (progressBar.value / 100) * audio.duration;

    audio.currentTime = newTime;
});

// next music
function nextSong() {

    currentSongIndex++;

    // Kalau sudah lagu terakhir
    // kembali ke lagu pertama
    if (currentSongIndex >= songs.length) {

        currentSongIndex = 0;
    }

    localStorage.setItem(
        "selectedSong",
        currentSongIndex
    );

    loadSong(currentSongIndex);
    playSong();

}

// previous
function previousSong() {

    currentSongIndex--;

    // Kalau berada di lagu pertama
    // kembali ke lagu terakhir
    if (currentSongIndex < 0) {

        currentSongIndex = songs.length - 1;
    }
    localStorage.setItem(
        "selectedSong",
        currentSongIndex
    );
    loadSong(currentSongIndex);
    playSong();
}

// next button
nextButton.addEventListener("click", function () {
    nextSong();

});

// prev button
previousButton.addEventListener("click", function () {
    previousSong();
});

// song end
audio.addEventListener("ended", function () {
    nextSong();
});

// volume
audio.volume = 0.8;
volumeBar.value = 80;
volumeBar.addEventListener("input", function () {
    const volume =
        volumeBar.value / 100;
    audio.volume = volume;

    // Kalau volume 0
    if (volume === 0) {
        volumeIcon.src = "../img/mute.png";
        volumeIcon.alt = "Muted";
    } else {
        volumeIcon.src = "../img/speaker.png";
        volumeIcon.alt = "Volume";
    }

});

// load lagu pertama
loadSong(currentSongIndex);

// hapus local storage saat pengguna menutup browser
window.addEventListener("beforeunload", function () {
    localStorage.removeItem("selectedSong");
});