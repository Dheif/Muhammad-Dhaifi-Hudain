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