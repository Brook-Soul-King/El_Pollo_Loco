class ThrowableObject extends MovableObject {
    IMAGES_ROTATING = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    currentImage = 0;

    /**
     * Constructor for initializing the salsa bottle object and setting initial properties.
     * 
     * This constructor loads the images for the salsa bottle rotation and splash animations,
     * sets initial position (x, y), size (height, width), and triggers the throw and animation behavior.
     * 
     * @param {number} x - The x-coordinate for the initial position of the salsa bottle.
     * @param {number} y - The y-coordinate for the initial position of the salsa bottle.
     */
    constructor(x, y) {
        super().loadImg('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATING);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 70;
        this.throw();
        this.animate();
    }

    /**
     * Throws the salsa bottle by applying an initial velocity and direction.
     * 
     * This method handles the logic for throwing the salsa bottle, including setting its speed and direction.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 25);
    }

    /**
     * Starts the animation for the salsa bottle's movement and rotation.
     * 
     * This method animates the salsa bottle by continuously updating its position and rotation.
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_ROTATING);
            }
        }, 100);
    }

    /**
     * Starts explosion animation
     */
    explode() {
        this.speedY = 0;
        setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 100);
    }
}
