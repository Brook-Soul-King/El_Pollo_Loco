class Chicken extends MovableObject {
    y = 345;
    height = 80;
    width = 60;
    offset = {
        top: 0,
        right: 0,
        bottom: 5,
        left: 0
    };
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];
    currentImage = 0;
    HP = 4;

    /**
     * Creates a new Chicken instance.
     */
    constructor(x_offset) {
        super().loadImg('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = x_offset + 260 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Starts the animation loop for movement and sprite animation.
     */
    animate() {
        setInterval(() => this.moveLeft(), 1000 / 60);

        setInterval(() => {
            if (!this.isDead())
                this.playAnimation(this.IMAGES_WALKING);
            else
                this.playAnimation(this.IMAGES_DEAD);
        }, 1000 / 10);
    };

    /**
     * Updates the character's sprite based on its state.
     */
    characterImages() {
        setInterval(() => {
            if (this.isDead())
                loadImg('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            else
                this.playAnimation(this.IMAGES_WALKING);
        }, 1000 / 10);
    }

    /**
     * Removes the chicken from the enemy list in the level.
     */
    removeEnemy() {
        if (this.world && this.world.level) {
            let index = this.world.level.enemies.indexOf(this);
            if (index !== -1)
                this.world.level.enemies.splice(index, 1);
        }
    }

}