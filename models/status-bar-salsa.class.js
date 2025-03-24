class SalsaBar extends DrawableObject {
    IMAGES_SALSA = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    salsaCollected = 0;
    percentage = 0;

    /**
     * Constructor for initializing the salsa percentage object and setting the initial properties.
     * 
     * This constructor initializes the object by loading salsa images, setting initial coordinates,
     * width, height, and calling the method to set the initial salsa percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_SALSA);
        this.x = 410;
        this.y = 0;
        this.width = 200;
        this.height = 50;
        this.setPercentage(0);
    }

    /**
     * Sets the salsa percentage and updates the image based on the percentage.
     * 
     * This method calculates the salsa percentage and updates the displayed image accordingly.
     * 
     * @param {number} percent - The percentage of salsa to set.
     */
    setPercentage(percent) {
        this.percentage = this.salsaCollected / percent * 100;

        let path = this.IMAGES_SALSA[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate image index based on the current salsa percentage.
     * 
     * This method returns an index corresponding to a specific image based on the current salsa percentage.
     * 
     * @returns {number} - The index of the image to display based on the salsa percentage.
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
