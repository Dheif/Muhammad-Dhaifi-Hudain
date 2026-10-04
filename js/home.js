const songContainer = document.getElementById("song-container");

for(let i = 0; i < 3; i++){
    const song = songs[i];
    songContainer.innerHTML += `
        <div class="song-card">
            <img src="${song.cover}" alt="${song.title}">
            <div class="song-info">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <span class="genre chill-text">${song.mood}</span>
            </div>
            <button class="play-button">
                <img src="../img/play.png" alt="Play">
            </button>
        </div>
    `;
}