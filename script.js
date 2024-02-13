document.addEventListener('DOMContentLoaded', () => {
  const video = document.querySelector('.player__video');
  const playButton = document.querySelector('.toggle');
  const volumeSlider = document.querySelector('input[name="volume"]');
  const playbackRateSlider = document.querySelector('input[name="playbackRate"]');
  const rewindButton = document.querySelector('button[data-skip="-10"]');
  const forwardButton = document.querySelector('button[data-skip="25"]');
  const progressBar = document.querySelector('.progress__filled');

  function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }

  function updatePlayButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    playButton.textContent = icon;
  }

  function handleVolumeChange() {
    video.volume = this.value;
  }

  function handlePlaybackRateChange() {
    video.playbackRate = this.value;
  }

  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
  }

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  }

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }

  video.addEventListener('click', togglePlay);
  video.addEventListener('play', updatePlayButton);
  video.addEventListener('pause', updatePlayButton);
  video.addEventListener('timeupdate', handleProgress);

  playButton.addEventListener('click', togglePlay);
  volumeSlider.addEventListener('input', handleVolumeChange);
  playbackRateSlider.addEventListener('input', handlePlaybackRateChange);
  rewindButton.addEventListener('click', skip);
  forwardButton.addEventListener('click', skip);

  let mousedown = false;
  progressBar.addEventListener('click', scrub);
  progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progressBar.addEventListener('mousedown', () => mousedown = true);
  progressBar.addEventListener('mouseup', () => mousedown = false);
});
