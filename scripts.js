/*jshint esversion: 6 */

// Get elements

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');  //grabs the <video> tag
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build functions

togglePlay = () => {
    video.paused ? video.play() : video.pause();  //if video is paused...play.  If not...pause
};

updateButton = () => {
    const icon = this.paused ? '►' : '❚ ❚';  //toggle the play/pause button
    toggle.textContent = icon;
};

 function skip() {
    console.log(this.dataset);
    video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.name);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}



function scrub(e) {
    console.log(e);
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

//hook up event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);

skipButtons.forEach((button) => {
    button.addEventListener('click', skip);
});

ranges.forEach((button) => {
    button.addEventListener('change', handleRangeUpdate);
});

ranges.forEach((button) => {
    button.addEventListener('mousemove', handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => {
    if (mousedown && scrub(e));
});
progress.addEventListener('mousedown', () => {
    mousedown = true;
});
progress.addEventListener('mouseup', () => {
    mousedown = false;
});
window.addEventListener('keypress', (e) => {
    if (e.charCode === 32) {
        togglePlay();
    }
});
