console.log("Welcome to Spotify");

// Initialize the variables
let songindex = 0;
let audioElement = new Audio('songs/1.mp3'); 
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItems')); 

let songs = [
    { songname: "salame-e-ishq", filepath: "songs/1.mp3", coverpath: "covers/1.jpg" },
    { songname: "mariz--e-ishq", filepath: "songs/2.mp3", coverpath: "covers/2.jpg" },
    { songname: "tum hi ho", filepath: "songs/3.mp3", coverpath: "covers/3.jpg" },
    { songname: "jhoome jo pathaan", filepath: "songs/4.mp3", coverpath: "covers/4.jpg" },
    { songname: "zindae-e-ishq banda", filepath: "songs/5.mp3", coverpath: "covers/5.jpg" },
    { songname: "besharam rang", filepath: "songs/6.mp3", coverpath: "covers/6jpg" },
    { songname: "hum tum se mohabbat karte hai", filepath: "songs/7.mp3", coverpath: "covers/7.jpg" },
    { songname: "i hate love story", filepath: "songs/8.mp3", coverpath: "covers/8.jpg" },
    { songname: "amplifier", filepath: "songs/9.mp3", coverpath: "covers/9.jpg" },
];

songItems.forEach((element, i) => { 
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songname; 
});

// Handle play/pause click
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myprogressbar.value = progress;
});

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
    });
};

Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songindex + 1}.mp3`;
        masterSongName.innerText = songs[songindex].songname;
        audioElement.currentTime = 0; 
        audioElement.play();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
    });
});

document.getElementById('next').addEventListener('click', () => {
    songindex = (songindex + 1) % songs.length;
    audioElement.src = `songs/${songindex + 1}.mp3`;
    masterSongName.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});

document.getElementById('previous').addEventListener('click', () => { 
    songindex = (songindex - 1 + songs.length) % songs.length;
    audioElement.src = `songs/${songindex + 1}.mp3`;
    masterSongName.innerText = songs[songindex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});

