class Character extends MovableObject {
    height = 280;
    width = 140;
    y = 150;
    speed = 8;
    HP = 100;
    lastHit = 0;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png'
    ];
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    currentImage = 0;
    world;

    offset = {
        top: 120,
        right: 40,
        bottom: 10,
        left: 25
    };

    /**
     * Constructor for initializing the character, loading images, applying gravity, and starting animations.
     */
    constructor() {
        super().loadImg('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadPepeImages();
        this.applyGravity();
        this.lastMovementTime = Date.now();
        this.sleepTimeout = null;
        this.animate();
    }

    /**
     * Loads all the images for different character states (walking, jumping, dead, hurt, idle, and sleep).
     */
    loadPepeImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
    }

    /**
     * Starts the character's movement and image animation logic.
     */
    animate() {
        this.charcterMovement();
        this.characterImages();
    }

    /**
     * Handles character movement (right, left, jump) and updates the camera position.
     */
    charcterMovement() {
        setInterval(() => {
            walking_sound.pause();
            if (this.canMoveRight())
                this.moveRight();
            if (this.canMoveLeft())
                this.moveLeft();
            if (this.canJump())
                this.jump();
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
    }

    /**
     * Checks if the character can move right (based on keyboard input and level boundaries).
     * @returns {boolean} True if the character can move right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Moves the character to the right and plays the walking sound.
     */
    moveRight() {
        this.otherDirection = false;
        super.moveRight();
        walking_sound.play();
    }

    /**
     * Checks if the character can move left (based on keyboard input and level boundaries).
     * @returns {boolean} True if the character can move left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > 0;
    }

    /**
     * Moves the character to the left and plays the walking sound.
     */
    moveLeft() {
        this.otherDirection = true;
        super.moveLeft();
        walking_sound.play();
    }

    /**
     * Checks if the character can jump (based on keyboard input and whether the character is above ground).
     * @returns {boolean} True if the character can jump, false otherwise.
     */
    canJump() {
        return this.world.keyboard.SPACE && !this.isAboveGround();
    }

    /**
     * Updates the character's animation based on its current state (dead, hurt, jumping, etc.).
     */
    characterImages() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                loseGame();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.handleMovement();
            }
        }, 125);
    }

    /**
     * Handles the character's movement state (walking or idle) and triggers sleep animation if idle.
     */
    handleMovement() {
        if (this.characterIsMoving()) {
            snoring_sound.pause();
            this.playAnimation(this.IMAGES_WALKING);
            this.lastMovementTime = Date.now();
            this.resetSleepTimer();
        } else {
            this.checkSleepingStatus();
        }
    }

    /**
     * Checks if the character is currently moving (left, right, jumping, hurt, or dead).
     * @returns {boolean} True if the character is moving, false otherwise.
     */
    characterIsMoving() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.isAboveGround() || this.isHurt() || this.isDead();
    }

    /**
     * Checks the character's idle time and plays the appropriate animation (sleep or idle).
     */
    checkSleepingStatus() {
        const idleTime = 7500;
        const timeSinceLastMove = Date.now() - this.lastMovementTime;

        if (timeSinceLastMove >= idleTime) {
            this.playAnimation(this.IMAGES_SLEEP);
        } else {
            this.playAnimation(this.IMAGES_IDLE);
            this.startSleepTimer(idleTime - timeSinceLastMove);
        }
    }

    /**
     * Starts a timer to trigger the sleep animation if the character has been idle for too long.
     * @param {number} time - The time remaining until the character should fall asleep.
     */
    startSleepTimer(time) {
        this.resetSleepTimer();
        this.sleepTimeout = setTimeout(() => {
            if (!this.isAboveGround() && !this.isHurt() && !this.isDead()) {
                this.playAnimation(this.IMAGES_SLEEP);
                snoring_sound.play();
                snoring_sound.loop = true;
            }
        }, time);
    }

    /**
     * Resets the sleep timer, clearing any existing timeout.
     */
    resetSleepTimer() {
        if (this.sleepTimeout) {
            clearTimeout(this.sleepTimeout);
            this.sleepTimeout = null;
        }
    }

}