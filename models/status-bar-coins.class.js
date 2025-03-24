class CoinBar extends DrawableObject {
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];

    coinsCollected = 0;
    percentage = 0;

    /**
     * Constructor for initializing the coin percentage object and setting the initial properties.
     * 
     * This constructor initializes the object by loading coin images, setting initial coordinates,
     * width, height, and calling the method to set the percentage of collected coins.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 215;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of collected coins and updates the image accordingly.
     * 
     * This method calculates the percentage based on the number of coins collected and
     * assigns the appropriate image based on the calculated percentage.
     * 
     * @param {number} percent - The number of collected coins to set the percentage.
     */
    setPercentage(percent) {
        this.percentage = this.coinsCollected / percent * 100;

        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate image index based on the current percentage.
     * 
     * This method returns an index corresponding to a specific image based on the percentage of coins collected.
     * 
     * @returns {number} - The index of the image to display based on the percentage.
     */
    resolveImageIndex() {
        if (this.percentage >= 100)
            return 5;
        else if (this.percentage > 60)
            return 4;
        else if (this.percentage > 40)
            return 3;
        else if (this.percentage > 20)
            return 2;
        else if (this.percentage > 0)
            return 1;
        else
            return 0;
    }
}
