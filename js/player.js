const songs = [
  { name: "暗号", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/暗号.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/八度空间.JPG" },
  { name: "等你下课", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/等你下课.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/等你下课.JPG" },
  { name: "反方向的钟", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/反方向的钟.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/Jay.JPG" },
  { name: "轨迹", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/轨迹.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/寻找周杰伦.JPG" },
  { name: "红尘客栈", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/红尘客栈.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/十二新作.JPG" },
  { name: "你听得到", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/你听得到.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/叶惠美.JPG" },
  { name: "七里香", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/七里香.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/七里香.JPG" },
  { name: "晴天", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/晴天.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/叶惠美.JPG" },
  { name: "甜甜的", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/甜甜的.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/我很忙.JPG" },
  { name: "爱的飞行日记", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/爱的飞行日记.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/跨时代.JPG" },
  { name: "爱在西元前", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/爱在西元前.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/范特西.JPG" },
  { name: "安静", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/安静.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/Jay.JPG" },
  { name: "可爱女人", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/可爱女人.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/Jay.JPG" },
  { name: "龙卷风", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/龙卷风.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/Jay.JPG" },
  { name: "双截棍", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/双截棍.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/范特西.JPG" },
  { name: "一路向北", file: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/一路向北.mp3", cover: "https://raw.githubusercontent.com/LittleKathy/musicfiles/main/musiccover/J III MP3 Player.JPG" }
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
const songNameEl = document.getElementById('songName');
const artistNameEl = document.getElementById('artistName');
const playlistEl = document.getElementById('playlist');
const albumImg = document.getElementById('albumImg');
const vinylRecord = document.getElementById('vinylRecord');

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

  if (song.cover) {
    albumImg.innerHTML = `<img src="${song.cover}" alt="${song.name}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
  } else {
    albumImg.innerHTML = '🎵';
  }
}

function playSong(index) {
  loadSong(index);
  audio.play();
  isPlaying = true;
  playBtn.textContent = '⏸️';
  vinylRecord.classList.add('playing');
}

function togglePlay() {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = '▶️';
    vinylRecord.classList.remove('playing');
  } else {
    audio.play();
    playBtn.textContent = '⏸️';
    vinylRecord.classList.add('playing');
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
audio.addEventListener('ended', nextSong);

audio.volume = 0.7;
initPlaylist();
loadSong(0);