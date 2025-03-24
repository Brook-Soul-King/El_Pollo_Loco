class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;

    /**
     * Constructor for initializing the background cloud, loading the image, and setting the initial position.
     * @param {number} x - The initial horizontal position of the cloud.
     */
    constructor(x) {
        super().loadImg('img/5_background/layers/4_clouds/1.png');

        this.x = x + Math.random() * 500;
        this.animate();
    }

    /**
     * Animates the cloud by continuously moving it left.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

}