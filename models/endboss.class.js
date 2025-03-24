class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    x;
    offset = {
        top: 60,
        right: 0,
        bottom: 18,
        left: 0
    };
    HP = 25;
    lastHit = 0;
    isCollidingPepe = false;
    i = 0;
    speed = 0.50;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEATH = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    /**
     * Initializes the enemy with images and properties, then starts the animation.
     */
    constructor() {
        super().loadImg(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALK);
        this.x = 2500;
        this.animate();
    };

    /**
     * Animates the enemy based on various conditions like death, hurt, walking, or attacking.
     */
    animate() {
        setInterval(() => {
            if (this.isDead())
                this.isDying();
            else if (this.isHurt())
                this.playAnimation(this.IMAGES_HURT);
            else if (this.HP < 25)
                this.isWalking();
            else if (this.isCollidingPepe)
                this.isAttacking();
            else
                this.playAnimation(this.IMAGES_ALERT);
        }, 150);
    };

    /**
     * Handles the death animation for the enemy and triggers the win condition.
     */
    isDying() {
        if (this.i < 3) {
            this.playAnimation(this.IMAGES_DEATH);
            this.i++;
        }
        winGame();
    }

    /**
     * Makes the enemy walk by moving left, and plays the walking animation.
     */
    isWalking() {
        setInterval(() => this.moveLeft(), 1000 / 60);
        this.playAnimation(this.IMAGES_WALK);
    }
    
    /**
     * Handles the enemy's attack animation and resets the attacking state.
     */
    isAttacking() {
        this.playAnimation(this.IMAGES_ATTACK);
        this.isCollidingPepe = false;
    }
}