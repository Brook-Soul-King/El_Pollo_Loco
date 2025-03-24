class Chick extends MovableObject {
    y = 370;
    height = 50;
    width = 50;
    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    currentImage = 0;
    HP = 4;

    /**
     * Constructor for initializing the enemy (chicken), loading images, and setting initial position and speed.
     * @param {number} x_offset - The horizontal offset for positioning the enemy.
     */
    constructor(x_offset) {
        super().loadImg('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x_offset + 400 + Math.random() * 500;
        this.speed = 0.5 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Animates the enemy by continuously moving left and updating the animation based on its state (walking or dead).
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else {
                this.playAnimation(this.IMAGES_DEAD);
            }
        }, 1000 / 10);
    };

    /**
     * Removes the enemy from the level's list of enemies.
     */
    removeEnemy() {
        if (this.world && this.world.level) {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1) {
                this.world.level.enemies.splice(index, 1);
            }
        }
    }

}