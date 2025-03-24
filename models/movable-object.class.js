class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };
    baseY;
    amplitude;
    frequency;
    time;

    lastHit = 0;

    /**
     * Applies gravity to the object by continuously updating its vertical position (`y`) 
     * and vertical speed (`speedY`). The function runs at approximately 30 frames per second.
     * 
     * - If the object is above the ground or moving upwards, it will continue falling.
     * - The speed is reduced by the acceleration factor each frame.
     * - If the object reaches a certain lower boundary (`y > 150`), it is reset to that boundary.
     * - If the object is on the ground and has a negative speed (`speedY < 0`), its speed is reset to zero.
     * 
     * @method applyGravity
     * @memberof Object
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY >= 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;

                if (this.y > 150) {
                    this.y = 150;
                    this.speedY = 0;
                }

                console.log('Y: ' + this.y);
            }
            if (!this.isAboveGround() && this.speedY < 0) {
                this.speedY = 0;
            }
        }, 1000 / 30);
    }


    /**
     * Checks if the object is above the ground.
     * 
     * @returns {boolean} True if the object is above the ground, otherwise false.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject)
            return true;
        else
            return this.y < 150;
    }
    
    /**
     * Checks if the object is falling
     * 
     * @returns {boolean} True if the object is falling, otherwise false.
     */
    isFalling() {
        return this.speedY < 0;
    }

    /**
     * Checks if the object is colliding with another object.
     * 
     * @param {Object} mo - The object to check collision with.
     * @returns {boolean} True if the objects are colliding, otherwise false.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Reduces the object's health points (HP) when hit.
     * 
     * This method decreases the object's HP by 5 and ensures it doesn't go below 0. It also 
     * records the time of the last hit.
     */
    hit() {
        this.HP -= 5;
        if (this.HP < 0) {
            this.HP = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is dead.
     * 
     * @returns {boolean} True if the object's HP is 0, otherwise false.
     */
    isDead() {
        return this.HP == 0;
    }

    /**
     * Checks if the object is hurt.
     * 
     * This method compares the time passed since the last hit and returns true if the object 
     * is still in a "hurt" state.
     * 
     * @returns {boolean} True if the object is hurt (i.e., the last hit was recent), otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Plays an animation by cycling through an array of image paths.
     * 
     * @param {Array} images - Array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Makes the object levitate up and down in a sine wave pattern.
     * 
     * The object will oscillate vertically based on sine wave math for a smooth levitation effect.
     */
    levitate() {
        const animate = () => {
            this.y = this.baseY + Math.sin(this.time) * this.amplitude;
            this.time += this.frequency;
            requestAnimationFrame(animate);
        };
        animate();
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Makes the object jump by setting its vertical speed to a positive value.
     * 
     * The jump sound is also played when the object jumps.
     */
    jump() {
        this.speedY = 30;
        jump_sound.play();
    }

}