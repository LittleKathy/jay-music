const songs = [
  { name: "暗号", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/暗号.mp3" },
  { name: "等你下课", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/等你下课.mp3" },
  { name: "反方向的钟", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/反方向的钟.mp3" },
  { name: "轨迹", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/轨迹.mp3" },
  { name: "红尘客栈", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/红尘客栈.mp3" },
  { name: "你听得到", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/你听得到.mp3" },
  { name: "七里香", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/七里香.mp3" },
  { name: "晴天", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/晴天.mp3" },
  { name: "甜甜的", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/甜甜的.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const volumeValue = document.getElementById('volumeValue');
const songNameEl = document.getElementById('songName');
const artistNameEl = document.getElementById('artistName');
const playlistEl = document.getElementById('playlist');
const albumImg = document.getElementById('albumImg');

function initPlaylist() {
  playlistEl.innerHTML = '';
  songs.forEach((song, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${song.name}`;
    li.addEventListener('click', () => playSong(index));
    if (index === currentSongIndex) {
      li.classList.add('active');
    }
    playlistEl.appendChild(li);
  });
}

function loadSong(index) {
  const song = songs[index];
  audio.src = song.file;
  songNameEl.textContent = song.name;
  artistNameEl.textContent = '周杰伦';
  currentSongIndex = index;
  updatePlaylist();
}

function playSong(index) {
  loadSong(index);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸️';
  albumImg.textContent = '🎵';
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶️';
    albumImg.textContent = '🎶';
  } else {
    audio.play();
    playBtn.textContent = '⏸️';
    albumImg.textContent = '🎵';
  }
  isPlaying = !isPlaying;
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  currentTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const durMinutes = Math.floor(duration / 60);
  const durSeconds = Math.floor(duration % 60);
  durationEl.textContent = `${durMinutes}:${durSeconds.toString().padStart(2, '0')}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function setVolume() {
  const volume = volumeSlider.value / 100;
  audio.volume = volume;
  volumeValue.textContent = `${volumeSlider.value}%`;

  if (volume === 0) {
    volumeIcon.textContent = '🔇';
  } else if (volume < 0.5) {
    volumeIcon.textContent = '🔉';
  } else {
    volumeIcon.textContent = '🔊';
  }
}

function updatePlaylist() {
  const items = playlistEl.getElementsByTagName('li');
  for (let i = 0; i < items.length; i++) {
    items[i].classList.remove('active');
    if (i === currentSongIndex) {
      items[i].classList.add('active');
    }
  }
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);
audio.addEventListener('ended', nextSong);

audio.volume = 0.7;
initPlaylist();
loadSong(0);