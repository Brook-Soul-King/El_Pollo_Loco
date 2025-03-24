let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game by setting up the game world, handling overlays, checking device type, and initializing background sounds.
 * @function
 */
function init() {
    handleOverlays();
    initLevel();
    checkDevice();
    canvas = document.getElementById('gameframe');
    world = new World(canvas, keyboard);
    handleBackgroundSounds();
}

/**
 * Handles the background sounds for the game. Plays background sound and pauses menu sound.
 * @function
 */
function handleBackgroundSounds() {
    background_sound.play();
    menu_sound.pause();
}

/**
 * Handles the visibility of overlays by adding or removing CSS classes from specific elements.
 * @function
 */
function handleOverlays() {
    document.getElementById('startscreen').classList.add('d-none');
    document.getElementById('fullscreen').classList.remove('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    document.getElementById('losingScreen').classList.add('d-none');
}

/**
 * Handles the actions when the player wins the game, including playing the victory sound, stopping intervals, and displaying the winning screen.
 * @function
 */
function winGame() {
    victory_sound.play();
    clearAllIntervals();
    document.getElementById('winningScreen').classList.remove('d-none');
}

/**
 * Handles the actions when the player loses the game, including playing the losing sound, stopping intervals, and displaying the losing screen.
 * @function
 */
function loseGame() {
    lose_sound.play();
    clearAllIntervals();
    document.getElementById('losingScreen').classList.remove('d-none');
}

/**
 * Clears all intervals that are running by looping through all possible interval IDs.
 * @function
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Checks the device's orientation and hides or shows the HUD accordingly. If the device is in portrait mode, the HUD is hidden.
 * @function
 */
function checkDevice() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.getElementById("hud").classList.add("d-none");
    } else {
        document.getElementById("hud").classList.remove("d-none");
    }
}

/**
 * Sets up event listeners for the touch-based controls on the mobile device, mapping the touch start and end events to keyboard controls.
 * The event listeners handle the movement, jumping, and throwing actions of the player.
 * @function
 */
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("moveLeftBtn").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });
    document.getElementById("moveLeftBtn").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById("moveRightBtn").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });
    document.getElementById("moveRightBtn").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById("jumpBtn").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    });
    document.getElementById("jumpBtn").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.SPACE = false;
    });

    document.getElementById("throwBtn").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.D = true;
    });
    document.getElementById("throwBtn").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    });
});

/**
 * Event listener for the 'keydown' event that updates the keyboard control state when certain keys are pressed.
 * The keys correspond to player movement (left, right), actions (down, space), and throwing (D).
 * @event
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39)
        keyboard.RIGHT = true;

    if (e.keyCode == 37)
        keyboard.LEFT = true;

    if (e.keyCode == 40)
        keyboard.DOWN = true;

    if (e.keyCode == 32)
        keyboard.SPACE = true;

    if (e.keyCode == 68)
        keyboard.D = true;
});

/**
 * Event listener for the 'keyup' event that updates the keyboard control state when certain keys are released.
 * The keys correspond to player movement (left, right), actions (down, space), and throwing (D).
 * @event
 * @param {KeyboardEvent} e - The keyboard event object.
 */
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39)
        keyboard.RIGHT = false;

    if (e.keyCode == 37)
        keyboard.LEFT = false;

    if (e.keyCode == 40)
        keyboard.DOWN = false;

    if (e.keyCode == 32)
        keyboard.SPACE = false;

    if (e.keyCode == 68)
        keyboard.D = false;
});
