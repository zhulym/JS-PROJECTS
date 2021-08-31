const player = document.querySelector('.video__player');
const videoItem = document.querySelectorAll('.video-item');
const play = document.querySelector('.small-play');
const playImage = document.querySelector('.small-play__item');
const largePlay = document.querySelector('.video__large-play-button');
const videoContent = document.querySelector('.video__content');
const videoControl = document.querySelector('.video__controls');
const ranges = document.querySelectorAll('.ranges');
const videoProgress = document.querySelector('.video__progress');
const soundProgress = document.querySelector('.sound__progress');
const speaker = document.querySelector('.speaker');
const fullscreenBtn = document.querySelector('.fullscreen');
const playRate = document.querySelector('.play-back-rate');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentItem = 0;
let mouseActive = false;
let video = videoItem[currentItem];
let ended = false;
video.volume = 0.2;

play.addEventListener('click', playVideo);
largePlay.addEventListener('click', playVideo);
videoItem[currentItem].addEventListener('timeupdate', handleProgress);
videoItem[currentItem].addEventListener('ended', handleEnd);
player.addEventListener('fullscreenchange', toogleControl);
speaker.addEventListener('click', muteVideo);
prevBtn.addEventListener('click', handlePrevBtn);
nextBtn.addEventListener('click', handleNextBtn);
fullscreenBtn.addEventListener('click', toggleFullscreen);
videoContent.addEventListener('click', playVideo);
videoProgress.addEventListener('input', handleProgressChange);
videoProgress.addEventListener('click', handleProgressClick);
videoProgress.addEventListener('mousemove', (e) => mouseActive && handleProgressClick(e));
videoProgress.addEventListener('mousedown', () => mouseActive = true);
videoProgress.addEventListener('mouseup', () => mouseActive = false);
soundProgress.addEventListener('input', handleVolumeChange);
document.addEventListener('keypress', handleKeys);
document.addEventListener('keydown', handleKeys);

function playVideo() {
  largePlay.classList.toggle('hide__large-button');
  if (largePlay.classList.contains('hide__large-button')) {
    playImage.setAttribute('src', './assets/images/video/pause-button.png')
    video.play();
    setInterval(() => {
      handleProgress();
    }, 10);
  } else {
    playImage.setAttribute('src', './assets/images/video/small-play-button.svg')
    video.pause();
  }
}

function rangePosition(range, value) {
  return range.style.background = `linear-gradient(to right, #660606 0%, #660606 ${value}%, #fff ${value}%, #fff 100%)`;
}

function handleProgressChange() {
  rangePosition(videoProgress, videoProgress.value);
}

function handleProgressClick(e) {
  video.currentTime = (e.offsetX / videoProgress.offsetWidth) * video.duration;
}

function handleProgress() {
  let percentDuration = (video.currentTime / video.duration) * 100;
  videoProgress.value = percentDuration;
  rangePosition(videoProgress, percentDuration);
  if (video.currentTime === video.duration && !ended) {
    handleEnd();
    ended = !ended;
  }
}

function handleProgressKeyNum(percent) {
  video.currentTime = (percent / 100) * video.duration;
}

function handleEnd() {
  largePlay.classList.toggle('hide__large-button');
  playImage.setAttribute('src', './assets/images/video/small-play-button.svg');
  rangePosition(videoProgress, 0);
  videoProgress.value = 0;
}

function handleVolumeChange() {
  video.volume = soundProgress.value;
  if (video.volume === 0) {
    speaker.classList.add('mute');
    video.muted = true;
  } else {
    speaker.classList.remove('mute');
    video.muted = false;
  }
  rangePosition(soundProgress, soundProgress.value * 100);
}

function muteVideo() {
  video.muted = !video.muted;
  video.muted ? speaker.classList.add('mute') : speaker.classList.remove('mute');
  if (video.muted) {
    video.volume = 0;
    soundProgress.value = 0;
    rangePosition(soundProgress, video.volume * 100);
  } else {
    video.volume = 0.2;
    soundProgress.value = 0.2;
    rangePosition(soundProgress, video.volume * 100);
  }
}

function launchFS(element) {
  element.requestFullscreen ? element.requestFullscreen() : null;
}

function exitFS() {
  document.exitFullscreen ? document.exitFullscreen() : null;
}

function toggleFullscreen() {
  document.fullscreenElement ? exitFS() : launchFS(player);
}

function toogleControl() {
  videoControl.classList.toggle('show-control');
}

function arrowUpVolume() {
  if (video.volume === 1) return;
  speaker.classList.remove('mute');
  video.muted = false;
  video.volume = +(video.volume).toFixed(2) + 0.1;
  soundProgress.value = video.volume;
  rangePosition(soundProgress, video.volume * 100);
}

function arrowDownVolume() {
  if (video.volume !== 0) {
    video.volume = +(video.volume).toFixed(2) - 0.1;
    if (video.volume === 0) {
      video.muted = true;
      speaker.classList.add('mute');
    }
    soundProgress.value = video.volume;
    rangePosition(soundProgress, video.volume * 100);
  }
}

function showPlayBackRate() {
  playRate.innerHTML = `X ${video.playbackRate}`;
  setTimeout(() => { playRate.innerHTML = '' }, 1000)
}

function faster() {
  if (video.playbackRate >= 2) return;
  video.playbackRate += 0.25;
  showPlayBackRate();
}

function slower() {
  if (video.playbackRate <= 0.5) return;
  video.playbackRate -= 0.25
  showPlayBackRate();
}

function resetParams() {
  videoItem[currentItem].pause();
  videoItem[currentItem].currentTime = 0;
  rangePosition(videoProgress, 0);
  videoProgress.value = 0;
  videoItem[currentItem].volume = 0.2;
  soundProgress.value = 0.2;
  rangePosition(soundProgress, video.volume * 100);
  speaker.classList.remove('mute');
  largePlay.classList.remove('hide__large-button');
  playImage.setAttribute('src', './assets/images/video/small-play-button.svg')
  videoItem[currentItem].classList.remove('video__active', 'video');
  ended = false;
}

function handleNextBtn() {
  resetParams();
  if (currentItem === videoItem.length - 1) currentItem = -1;
  currentItem++;
  videoItem[currentItem].classList.add('video__active', 'video');
  video = videoItem[currentItem];
}

function handlePrevBtn() {
  resetParams();
  if (currentItem === 0) currentItem = videoItem.length - 1;
  currentItem--;
  videoItem[currentItem].classList.add('video__active', 'video');
  video = videoItem[currentItem];
}

function plusTenSec() {
  video.currentTime += 10;
}
function minusTenSec() {
  video.currentTime -= 10;
}

function handleKeys(e) {
  e.preventDefault();
  e.key === 'm' || e.key === 'ь' ? muteVideo() : null;
  e.key === 'k' || e.key === 'л' ? playVideo() : null;
  e.key === 'l' || e.key === 'д' ? plusTenSec() : null;
  e.key === 'j' || e.key === 'о' ? minusTenSec() : null;
  e.key === 'p' || e.key === 'з' ? handlePrevBtn() : null;
  e.key === 'n' || e.key === 'т' ? handleNextBtn() : null;
  e.key === 'f' || e.key === 'а' ? toggleFullscreen() : null;
  e.code === 'Space' ? playVideo() : null;
  e.key === 'ArrowUp' ? arrowUpVolume() : null;
  e.key === 'ArrowDown' ? arrowDownVolume() : null;
  e.key === 'End' ? handleProgressKeyNum(99) : null;
  e.key === 'Home' ? handleProgressKeyNum(0) : null;
  e.key === '1' ? handleProgressKeyNum(10) : null;
  e.key === '2' ? handleProgressKeyNum(20) : null;
  e.key === '3' ? handleProgressKeyNum(30) : null;
  e.key === '4' ? handleProgressKeyNum(40) : null;
  e.key === '5' ? handleProgressKeyNum(50) : null;
  e.key === '6' ? handleProgressKeyNum(60) : null;
  e.key === '7' ? handleProgressKeyNum(70) : null;
  e.key === '8' ? handleProgressKeyNum(80) : null;
  e.key === '9' ? handleProgressKeyNum(90) : null;
  e.key === '<' || e.key === 'б' || e.key === ',' ? slower() : null;
  e.key === '>' || e.key === 'ю' || e.key === '.' ? faster() : null;
}

console.log('Самооценка: \n 1. Первый этап: основные ф-ции реализованы (+10) \n 2. Второй этап. Обязательный функционал (Space, shift + <, shift + >, M, F) (+10) \n 3. Третий этап. Дополнительный функционал: \n    (Home, End, клавиши 1-9, Стрелка вверх, Стрелка вниз, P, N, J, K, L) (+10)   \n    а также слайдер видео с постерами (+10)   \n    визуализация скорости видео по shift + <>   \n\n   Итого: 30')
