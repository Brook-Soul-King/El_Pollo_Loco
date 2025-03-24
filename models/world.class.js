class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    salsaBar = new SalsaBar();
    endbossBar = new EndbossBar();
    throwableObjects = [];
    coinCounter = this.level.coins.length;
    salsaCounter = this.level.salsas.length;
    lastThrow = 0; // Zeitpunkt des letzten Wurfs
    throwCooldown = 1500; // Cooldown-Zeit in Millisekunden (1 Sekunde)

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Sets the world for the character and endboss.
     * This method assigns the current instance of the world to the character and the endboss.
     */
    setWorld() {
        this.character.world = this;
        this.endboss.world = this;
    }

    /**
     * Starts two intervals to check for various collisions and throw objects.
     * The first interval checks for character, coin, salsa, and throwable object collisions every 50ms.
     * The second interval checks if a throwable object can be thrown every 100ms.
     */
    run() {
        setInterval(() => {
            this.checkCharacterCollisions();
            this.checkCoinCollision();
            this.checkSalsaCollision();
            this.checkThrowCollsion();
        }, 50);
        setInterval(() => this.checkThrowObjects(), 100);
    }

    /**
     * Checks if a throwable object can be thrown.
     * If conditions are met, a new ThrowableObject is created and added to the world.
     * Decreases salsa collected by 1 and updates the salsa bar.
     */
    checkThrowObjects() {
        if (this.canThrow()) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.salsaBar.salsaCollected--;
            this.salsaBar.setPercentage(this.salsaCounter);

            this.lastThrow = Date.now(); // Zeitpunkt des letzten Wurfs aktualisieren
        }
    }

    /**
     * Determines whether the character can throw a throwable object.
     * The character can throw if:
     * - The "D" key is pressed
     * - There is salsa collected
     * - The cooldown time has passed since the last throw
     * 
     * @returns {boolean} True if the character can throw, otherwise false.
     */
    canThrow() {
        return this.keyboard.D &&
            this.salsaBar.salsaCollected > 0 &&
            (Date.now() - this.lastThrow >= this.throwCooldown);
    }

    /**
     * Checks for collisions between the character and enemies in the level.
     * If an enemy is hit, the character either damages the enemy or updates HP based on the collision.
     */
    checkCharacterCollisions() {
        if (this.level && this.level.enemies) {
            this.level.enemies.forEach(enemy => {
                if (this.canDamageEnemy(enemy))
                    this.hitEnemy(enemy);
                else if (this.enemyCollision(enemy))
                    this.updateCharacterHP(enemy);
            });
        }
    }

    /**
     * Determines if the character can damage the given enemy.
     * The character can damage an enemy if they are colliding, the character is above the ground and the character must be falling.
     * 
     * @param {Object} enemy The enemy object to check.
     * @returns {boolean} True if the character can damage the enemy, otherwise false.
     */
    canDamageEnemy(enemy) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.isFalling();
    }

    /**
     * Handles the logic when the character hits an enemy.
     * Plays a hurt sound, makes the enemy take damage, and the character jumps.
     * After a short delay, removes the enemy from the level.
     * 
     * @param {Object} enemy The enemy that is hit by the character.
     */
    hitEnemy(enemy) {
        chicken_hurt_sound.play();
        enemy.hit();
        this.character.jump();
        setTimeout(() => this.removeEnemy(enemy), 250);
    }

    /**
     * Checks if the character is colliding with the enemy while not being above ground.
     * 
     * @param {Object} enemy The enemy object to check.
     * @returns {boolean} True if the character collides with the enemy and is not above the ground, otherwise false.
     */
    enemyCollision(enemy) {
        return this.character.isColliding(enemy) && !this.character.isAboveGround();
    }


    /**
     * Updates the character's HP when colliding with an enemy.
     * If the enemy is an instance of Endboss, it sets a flag indicating collision with the endboss.
     * 
     * @param {Object} enemy The enemy object involved in the collision.
     */
    updateCharacterHP(enemy) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.HP);
        if (enemy instanceof Endboss)
            enemy.isCollidingPepe = true;
    }

    /**
     * Checks for collisions between throwable objects and enemies.
     * If a collision occurs, the enemy is hit by the throwable object and removed from the level.
     * If the bottle hits the ground, it is removed.
     */
    checkThrowCollsion() {
        this.throwableObjects.forEach(bottle => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy))
                    this.hitByThrow(enemy, bottle);
                else if (bottle.y > 315)
                    this.bottleHitGround(bottle);
            });
        });
    }

    /**
     * Handles the logic when a throwable object hits an enemy.
     * The bottle explodes, the enemy takes damage (if it's an endboss, it updates the endboss bar).
     * The bottle is then removed from the world.
     * 
     * @param {Object} enemy The enemy object that was hit.
     * @param {Object} bottle The throwable bottle object.
     */
    hitByThrow(enemy, bottle) {
        bottle.explode();
        if (enemy instanceof Endboss) {
            enemy.hit();
            this.endbossBar.setPercentage(enemy.HP);
        } else
            this.removeEnemy(enemy);
        glass_sound.play();
        chicken_hurt_sound.play();
        this.removeBottle(bottle);
    }

    /**
     * Handles the logic when a throwable object hits the ground.
     * The bottle explodes, and after a short delay, it is removed from the world.
     * 
     * @param {Object} bottle The throwable bottle object.
     */
    bottleHitGround(bottle) {
        glass_sound.play();
        bottle.explode();
        setTimeout(() => {
            this.removeBottle(bottle);
        }, 750);
    }

    /**
     * Removes a bottle from the throwable objects array.
     * 
     * @param {Object} bottle The throwable bottle object to be removed.
     */
    removeBottle(bottle) {
        if (this && this.level) {
            let index = this.throwableObjects.indexOf(bottle);
            if (index !== -1) {
                this.throwableObjects.splice(index, 1);
            }
        }
    }

    /**
     * Removes an enemy from the level's enemies array.
     * 
     * @param {Object} enemy The enemy object to be removed.
     */
    removeEnemy(enemy) {
        if (this && this.level) {
            let index = this.level.enemies.indexOf(enemy);
            if (index !== -1) {
                this.level.enemies.splice(index, 1);
            }
        }
    }


    /**
     * Checks for collisions between the character and coins in the level.
     * If a collision occurs, the coin is collected and removed from the level.
     */
    checkCoinCollision() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            let coin = this.level.coins[i];
            if (this.character.isColliding(coin))
                this.collectCoin(i);
        }
    }

    /**
     * Handles the logic for collecting a coin.
     * Updates the coin bar and removes the coin from the level.
     * 
     * @param {number} i The index of the collected coin in the level's coins array.
     */
    collectCoin(i) {
        this.coinBar.coinsCollected++;
        this.coinBar.setPercentage(this.coinCounter);
        this.level.coins.splice(i, 1);
        coin_sound.play();
    }

    /**
     * Checks for collisions between the character and salsa objects in the level.
     * If a collision occurs, the salsa is collected and removed from the level.
     */
    checkSalsaCollision() {
        for (let i = this.level.salsas.length - 1; i >= 0; i--) {
            let salsa = this.level.salsas[i];
            if (this.character.isColliding(salsa))
                this.collectSalsa(i);
        }
    }

    /**
     * Handles the logic for collecting a salsa.
     * Updates the salsa bar and removes the salsa from the level.
     * 
     * @param {number} i The index of the collected salsa in the level's salsas array.
     */
    collectSalsa(i) {
        this.salsaBar.salsaCollected++;
        this.salsaBar.setPercentage(this.salsaCounter);
        this.level.salsas.splice(i, 1);
        salsa_sound.play();
    }

    /**
     * Draws the current state of the game world onto the canvas.
     * Clears the canvas, translates it based on the camera position, and adds all objects (background, clouds, enemies, etc.) to the map.
     * Then calls the loopDraw method for continuous drawing.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addInterface();
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.salsas);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.loopDraw();
    }

    /**
     * Continuously requests animation frames to redraw the world in a loop.
     * This method ensures the `draw()` method is continuously called for animation.
     */
    loopDraw() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Adds the user interface elements (status bar, coin bar, salsa bar, etc.) to the map.
     */
    addInterface() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.endbossBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.salsaBar);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Adds a collection of objects to the map by calling addToMap on each one.
     * 
     * @param {Array} objects The array of objects to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    /**
     * Adds a single object to the map by drawing it on the canvas.
     * Also handles flipping the image if needed based on the object's direction.
     * 
     * @param {Object} mo The object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection)
            this.flipImage(mo);

        mo.draw(this.ctx);

        if (mo.otherDirection)
            this.flipImageBack(mo);
    }


    /**
     * Flips an image horizontally (mirroring it).
     * 
     * @param {Object} mo The object whose image will be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image back to its original orientation.
     * 
     * @param {Object} mo The object whose image will be flipped back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}