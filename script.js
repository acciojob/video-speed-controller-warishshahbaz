const video = document.querySelector('.player__video');
const toggleButton = document.querySelector('.toggle');
const volumeSlider = document.querySelector('[name="volume"]');
const playbackRateSlider = document.querySelector('[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressFilled = document.querySelector('.progress__filled');
const progress = document.querySelector('.progress');

function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggleButton.textContent = icon;
}

function handleVolumeUpdate() {
  video.volume = this.value;
}

function handlePlaybackRateUpdate() {
  video.playbackRate = this.value;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
toggleButton.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
volumeSlider.addEventListener('input', handleVolumeUpdate);
playbackRateSlider.addEventListener('input', handlePlaybackRateUpdate);
skipButtons.forEach(button => button.addEventListener('click', skip));
video.addEventListener('timeupdate', handleProgress);
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
