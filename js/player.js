/* ========================================
   PLAYER MUSIC
======================================== */

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


// ========================================
// CURRENT SONG
// ========================================

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


// ========================================
// FORMAT WAKTU
// ========================================

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


// ========================================
// LOAD SONG
// ========================================

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


// ========================================
// PLAY SONG
// ========================================
function playSong() {
    audio.play();
    playIcon.src = "../img/pause.png";
    playIcon.alt = "Pause";
}
// ========================================
// PAUSE SONG
// ========================================
function pauseSong() {
    audio.pause();
    playIcon.src = "../img/play.png";
    playIcon.alt = "Play";
}
// ========================================
// PLAY / PAUSE BUTTON
// ========================================

playButton.addEventListener("click", function () {
    if (audio.paused) {
        playSong();
    } else {
        pauseSong();

    }

});


// ========================================
// AUDIO TIME UPDATE
// ========================================

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


// ========================================
// AUDIO LOADED
// ========================================

audio.addEventListener("loadedmetadata", function () {

    durationText.textContent =
        formatTime(audio.duration);

});


// ========================================
// PROGRESS BAR
// ========================================

progressBar.addEventListener("input", function () {

    if (!audio.duration) {
        return;
    }


    const newTime =
        (progressBar.value / 100) * audio.duration;


    audio.currentTime = newTime;

});


// ========================================
// NEXT SONG
// ========================================

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


// ========================================
// PREVIOUS SONG
// ========================================

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


// ========================================
// NEXT BUTTON
// ========================================

nextButton.addEventListener("click", function () {

    nextSong();

});


// ========================================
// PREVIOUS BUTTON
// ========================================

previousButton.addEventListener("click", function () {

    previousSong();

});


// ========================================
// SONG ENDED
// ========================================

audio.addEventListener("ended", function () {

    nextSong();

});


// ========================================
// VOLUME
// ========================================

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


// ========================================
// LOAD FIRST SONG
// ========================================
loadSong(currentSongIndex);
