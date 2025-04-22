function playSong(song) {
    var audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = song;
    audioPlayer.play();
}
