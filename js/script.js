/**
 * Enables fullscreen mode for the game by requesting the browser to display the game in full screen.
 * It checks for different browser-specific methods for fullscreen.
 * @function
 */
function openFullscreen() {
    let elem = document.getElementById("gameframe");

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}

/**
 * Displays the imprint information in a pop-up by making the pop-up container visible and setting the inner HTML to the imprint content.
 * @function
 */
function showImprint() {
    document.getElementById('pop-up-container').classList.remove('d-none');
    document.getElementById('pop-up-text').innerHTML = returnImprint() + retunCloseBtn();
}

/**
 * Displays the instructions in a pop-up by making the pop-up container visible and setting the inner HTML to the instructions content.
 * @function
 */
function showInstructions() {
    document.getElementById('pop-up-container').classList.remove('d-none');
    document.getElementById('pop-up-text').innerHTML = returnInstructions() + retunCloseBtn();
}

/**
 * Hides the pop-up container by adding a 'd-none' class to hide the element.
 * @function
 */
function hidePopUp() {
    document.getElementById('pop-up-container').classList.add('d-none');
}

/**
 * Prevents the event from propagating further, effectively stopping the close event for the pop-up.
 * @function
 * @param {Event} event - The event object.
 */
function doNotClose(event) {
    event.stopPropagation();
}

/**
 * Checks the device's orientation and displays a message to rotate the device if in portrait mode.
 * It also handles the overflow behavior of the body element based on orientation.
 * @function
 */
function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        document.getElementById("rotateMessage").style.display = "flex";
        document.getElementById("body").style.overflow = "hidden";
    } else {
        document.getElementById("rotateMessage").style.display = "none";
        document.getElementById("body").style.overflow = "auto";
    }
}

/**
 * Navigates back to the main menu by displaying the start screen and hiding the winning, losing screens, and other elements.
 * It also pauses the background sound.
 * @function
 */
function goToMenu() {
    document.getElementById('startscreen').classList.remove('d-none');
    document.getElementById('winningScreen').classList.add('d-none');
    document.getElementById('losingScreen').classList.add('d-none');
    document.getElementById('fullscreen').classList.add('d-none');
    document.getElementById("hud").classList.add("d-none");
    background_sound.pause();
}

// Event listeners to monitor changes in device orientation, resizing, and device orientation events.
window.addEventListener("orientationchange", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("deviceorientation", (event) => {
    checkOrientation();
});

// Initializes the orientation check when the DOM content has fully loaded.
document.addEventListener("DOMContentLoaded", checkOrientation);
