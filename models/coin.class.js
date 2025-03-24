class Coin extends MovableObject {
    height = 175;
    width = 175;
    offset = {
        top: 60,
        right: 60,
        bottom: 60,
        left: 60
    };
    baseY = 280;
    amplitude = 10;
    frequency = 0.02;
    time = 0;

    /**
     * Constructor for initializing the coin, loading its image, and setting its position.
     * @param {number} x - The initial horizontal position of the coin.
     * @param {number} y - The base vertical position of the coin.
     */
    constructor(x, y) {
        super().loadImg('img/8_coin/coin_1.png');

        this.x = x;
        this.baseY = y;
        this.levitate();
    }

}