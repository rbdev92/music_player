const trackName = document.getElementById("track-name");
const artistName = document.getElementById("artist-name");
const track = document.getElementById("track");
const cover = document.getElementById("cover");
const likeButton = document.getElementById("like");

const play = document.getElementById("play");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const shuffle = document.getElementById("shuffle");
const repeat = document.getElementById("repeat");

const progressContainer = document.getElementById("progress-container");
const currentProgressBar = document.getElementById("current-progress-bar");

const trackTime = document.getElementById("track-time");
const totalTime = document.getElementById("total-time");

const albumLayer = { cover: "rap_e_compromisso" };
const introducao = {
  trackName: "Introdução",
  artistName: "Sabotage",
  file: "01_introducao",
  liked: false,
};

const rapECompromisso = {
  trackName: "Rap É Compromisso",
  artistName: "Sabotage",
  file: "02_rap_e_compromisso",
  liked: false,
};

const umBomLugar = {
  trackName: "Um Bom Lugar",
  artistName: "Sabotage",
  file: "03_um_bom_lugar",
  liked: false,
};

const noBrooklin = {
  trackName: "No Brooklin",
  artistName: "Sabotage",
  file: "04_no_brooklin",
  liked: false,
};

const cocaina = {
  trackName: "Cocaína",
  artistName: "Sabotage",
  file: "05_cocaina",
  liked: false,
};

const naZonaSul = {
  trackName: "Na Zona Sul",
  artistName: "Sabotage",
  file: "06_na_zona_sul",
  liked: false,
};

const aCultura = {
  trackName: "A Cultura",
  artistName: "Sabotage",
  file: "07_a_cultura",
  liked: false,
};

const incentivandoOSom = {
  trackName: "Incentivando O Som",
  artistName: "Sabotage",
  file: "08_incentivando_o_som",
  liked: false,
};

const respeitoEPraQuemTem = {
  trackName: "Respeito É Pra Quem Tem",
  artistName: "Sabotage",
  file: "09_respeito_e_pra_quem_tem",
  liked: false,
};

const paisDaFome = {
  trackName: "País da Fome",
  artistName: "Sabotage",
  file: "10_pais_da_fome",
  liked: false,
};

const cantandoProSanto = {
  trackName: "Cantando Pro Santo",
  artistName: "Sabotage",
  file: "11_cantando_pro_panto",
  liked: false,
};

const playlist = JSON.parse(localStorage.getItem("playlist")) ?? [
  introducao,
  rapECompromisso,
  umBomLugar,
  noBrooklin,
  cocaina,
  naZonaSul,
  aCultura,
  incentivandoOSom,
  respeitoEPraQuemTem,
  paisDaFome,
  cantandoProSanto,
];

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
let sortedPlaylist = [...playlist];
let index = 0;

function playTrack() {
  play.querySelector(".bi").classList.remove("bi-play-circle-fill");
  play.querySelector(".bi").classList.add("bi-pause-circle-fill");
  track.play();
  isPlaying = true;
}

function pauseTrack() {
  play.querySelector(".bi").classList.add("bi-play-circle-fill");
  play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
  track.pause();
  isPlaying = false;
}

function playPauseDecider() {
  if (isPlaying === true) {
    pauseTrack();
  } else {
    playTrack();
  }
}

function likeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    likeButton.querySelector(".bi").classList.remove("bi-heart");
    likeButton.querySelector(".bi").classList.add("bi-heart-fill");
    likeButton.classList.add("btn-active");
  } else {
    likeButton.querySelector(".bi").classList.add("bi-heart");
    likeButton.querySelector(".bi").classList.remove("bi-heart-fill");
    likeButton.classList.remove("btn-active");
  }
}

function initializeTrack() {
  cover.src = `assets/images/${albumLayer.cover}.jpg`;
  track.src = `assets/songs/sabotage_rap_e_compromisso/${sortedPlaylist[index].file}.mp3`;
  trackName.innerText = sortedPlaylist[index].trackName;
  artistName.innerText = sortedPlaylist[index].artistName;
  likeButtonRender();
}

function previousTrack() {
  if (index === 0) {
    index = sortedPlaylist.length - 1;
  } else {
    index -= 1;
  }

  initializeTrack();
  playTrack();
}

function nextTrack() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }

  initializeTrack();
  playTrack();
}

function updateProgress() {
  const barWidth = (track.currentTime / track.duration) * 100;
  currentProgressBar.style.setProperty("--progress", `${barWidth}%`);
  trackTime.innerText = toHoursMinutesSeconds(track.currentTime);
}

function jumpTo(event) {
  const witdh = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / witdh) * track.duration;
  track.currentTime = jumpToTime;
}

function shuffleArray(pressShuffleArray) {
  let size = pressShuffleArray.length;
  let currentIndex = size - 1;
  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = pressShuffleArray[currentIndex];
    pressShuffleArray[currentIndex] = pressShuffleArray[randomIndex];
    pressShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffle.classList.add("btn-active");
  } else {
    isShuffled = false;
    sortedPlaylist = [...playlist];
    shuffle.classList.remove("btn-active");
  }
}

function repeatClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeat.classList.add("btn-active");
  } else {
    repeatOn = false;
    repeat.classList.remove("btn-active");
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextTrack();
  } else {
    playTrack();
  }
}

function toHoursMinutesSeconds(originalNumber) {
  const ONE_HOUR_IN_SECONDS = 3600;
  const ONE_HOUR_IN_MINUTES = 60;

  let hours = Math.floor(originalNumber / ONE_HOUR_IN_SECONDS);
  let minutes = Math.floor(
    (originalNumber - hours * ONE_HOUR_IN_SECONDS) / ONE_HOUR_IN_MINUTES
  );
  let seconds = Math.floor(
    originalNumber - hours * ONE_HOUR_IN_SECONDS - minutes * ONE_HOUR_IN_MINUTES
  );

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateCurrentTime() {
  trackTime.innerText = toHoursMinutesSeconds(track.currentTime);
}

function updateTotalTime() {
  totalTime.innerText = toHoursMinutesSeconds(track.duration);
}

function likeButtonClicked() {
  if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
  localStorage.setItem("playlist", JSON.stringify(playlist));
}

initializeTrack();

play.addEventListener("click", playPauseDecider);
previous.addEventListener("click", previousTrack);
next.addEventListener("click", nextTrack);
track.addEventListener("timeupdate", updateProgress);
track.addEventListener("ended", nextOrRepeat);
track.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
shuffle.addEventListener("click", shuffleClicked);
repeat.addEventListener("click", repeatClicked);
likeButton.addEventListener("click", likeButtonClicked);
