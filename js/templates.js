function returnImprint() {
    return `
        Lukas Schröer<br>
        Storchenweg 26<br>
        46395 Bocholt<br>
        lukas.schrooer.25@gmail.com
    `;
}

function returnInstructions() {
    return `
        <div class="instructions">
            <div>
                ${returnSpacebar()}
                <p>Springen</p>
            </div>
            <div>
                ${returnD()}
                <p>Salsa werfen</p>
            </div>
            <div>
                ${returnLeft()}
                <p>Links laufen</p>
            </div>
            <div>
                ${returnRight()}
                <p>Rechts laufen</p>
            </div>
        </div>
    `;
}

function returnSpacebar() {
    return `
        <svg width="250" height="90" viewBox="0 0 250 90" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="250" height="90" rx="16" fill="#3C3838"/>
            <rect x="5" y="5" width="240" height="80" rx="16" fill="#D9D9D9"/>
            <path d="M85 45H93.8889V55H156.111V45H165V55C165 57.75 161 60 156.111 60H93.8889C89 60 85 57.75 85 55V45Z" fill="#3C3838"/> 
        </svg>
    `;
}

function returnD() {
    return `
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="90" height="90" rx="16" fill="#3C3838"/>
        <rect x="5" y="5" width="80" height="80" rx="16" fill="#D9D9D9"/>
        <path d="M43 69H28.6364V22.4545H43.6364C48.1515 22.4545 52.0152 23.3864 55.2273 25.25C58.4394 27.0985 60.9015 29.7576 62.6136 33.2273C64.3258 36.6818 65.1818 40.8182 65.1818 45.6364C65.1818 50.4848 64.3182 54.6591 62.5909 58.1591C60.8636 61.6439 58.3485 64.3258 55.0455 66.2045C51.7424 68.0682 47.7273 69 43 69ZM34.2727 64H42.6364C46.4848 64 49.6742 63.2576 52.2045 61.7727C54.7348 60.2879 56.6212 58.1742 57.8636 55.4318C59.1061 52.6894 59.7273 49.4242 59.7273 45.6364C59.7273 41.8788 59.1136 38.6439 57.8864 35.9318C56.6591 33.2045 54.8258 31.1136 52.3864 29.6591C49.947 28.1894 46.9091 27.4545 43.2727 27.4545H34.2727V64Z" fill="#3C3838"/>
    </svg>
    `;
}

function returnLeft() {
    return `
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="90" height="90" rx="16" fill="#3C3838"/>
        <rect x="5" y="5" width="80" height="80" rx="16" fill="#D9D9D9"/>
        <path d="M26.4545 45.6364V42L55.7273 27.0909V32.9091L33.2727 43.7273L33.4545 43.3636V44.2727L33.2727 43.9091L55.7273 54.7273V60.5455L26.4545 45.6364Z" fill="#3C3838"/>
    </svg>
    `;
}

function returnRight() {
    return `
    <svg width="115" height="90" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="90" height="90" rx="16" fill="#3C3838"/>
        <rect x="5" y="5" width="80" height="80" rx="16" fill="#D9D9D9"/>
        <path d="M60.7273 45.6364L31.4545 60.5455V54.7273L53.9091 43.9091L53.7273 44.2727V43.3636L53.9091 43.7273L31.4545 32.9091V27.0909L60.7273 42V45.6364Z" fill="#3C3838"/>
    </svg>
    `;
}

function retunCloseBtn() {
    return `
        <div id="closeBtn" onclick="hidePopUp()">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40px" height="40px">
                <title>close pop up</title>
                <path
                    d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
            </svg>
        </div>
    `;
}

function returnMuteSVG() {
    return `
        <svg onclick="volumeOn()"v xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32px" height="32px">
            <title>volume-low</title>
            <path d="M7,9V15H11L16,20V4L11,9H7Z" />
        </svg>
    `;
}

function returnLoudSVG() {
    return `
        <svg onclick="volumeOff()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32px" height="32px">
            <title>volume-high</title>
            <path
                d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
        </svg>
    `;
}