let walking_sound = new Audio('audio/walking.mp3');
walking_sound.volume = 0.1;
walking_sound.playbackRate = 1.5;
let coin_sound = new Audio('audio/collect-coin.mp3');
let glass_sound = new Audio('audio/glass-breaking.mp3');
let salsa_sound = new Audio('audio/collect-salsa.mp3');
let chicken_hurt_sound = new Audio('audio/chicken-hurt.mp3');
let jump_sound = new Audio('audio/jump.mp3');
let victory_sound = new Audio('audio/victory.mp3');
victory_sound.volume = 0.5;
let lose_sound = new Audio('audio/lose.mp3');
let snoring_sound = new Audio('audio/snoring.mp3');
let background_sound = new Audio('audio/background.mp3');
background_sound.loop = true;
background_sound.volume = 0.025;
let menu_sound = new Audio('audio/menu.mp3');
menu_sound.loop = true;

let allAudios = [
    walking_sound,
    coin_sound,
    glass_sound,
    salsa_sound,
    chicken_hurt_sound,
    jump_sound,
    victory_sound,
    lose_sound,
    snoring_sound,
    background_sound,
    menu_sound
];
let volumeStatus = true;

/**
* Disables the sound and saves the status.
*/
function volumeOff() {
    allAudios.forEach((audio) => (audio.volume = 0));
    document.getElementById('volumeBtn').innerHTML = returnMuteSVG();
    volumeStatus = false;
    setVolumeStatus();
}

/**
* Enables the sound and saves the status.
*/
function volumeOn() {
    allAudios.forEach((audio) => (audio.volume = 1));
    victory_sound.volume = 0.5;
    walking_sound.volume = 0.1;
    background_sound.volume = 0.025;
    document.getElementById('volumeBtn').innerHTML = returnLoudSVG();
    volumeStatus = true;
    setVolumeStatus();
}

/**
 * Saves the current sound status in LocalStorage.
 */
function setVolumeStatus() {
    localStorage.setItem('volumeStatus', volumeStatus);
}

/**
* Retrieves the stored sound state from LocalStorage and implements it.
*/
function getVolumeStatus() {
    let savedStatus = localStorage.getItem('volumeStatus');
    if (savedStatus !== null) {
        volumeStatus = savedStatus === 'true'; // Konvertiert den String in einen Boolean
        if (volumeStatus) {
            volumeOn();
        } else {
            volumeOff();
        }
    }
}

// Get the sound status when the page loads
window.addEventListener('DOMContentLoaded', getVolumeStatus);
