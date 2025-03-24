class EndbossBar extends DrawableObject {
    IMAGES_HP = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];

    percentage = 25;

    /**
     * Constructor for initializing the health percentage object and setting the initial properties.
     * 
     * This constructor initializes the object by loading health images, setting initial coordinates,
     * width, height, and calling the method to set the initial health percentage.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HP);
        this.x = 15;
        this.y = 50;
        this.width = 200;
        this.height = 50;
        this.setPercentage(25);
    }

    /**
     * Sets the health percentage and updates the image based on the percentage.
     * 
     * This method assigns the percentage and updates the displayed image according to the health status.
     * 
     * @param {number} percent - The percentage of health to set.
     */
    setPercentage(percent) {
        this.percentage = percent;
        let path = this.IMAGES_HP[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the appropriate image index based on the current health percentage.
     * 
     * This method returns an index corresponding to a specific image based on the current health percentage.
     * 
     * @returns {number} - The index of the image to display based on the health percentage.
     */
    resolveImageIndex() {
        if (this.percentage >= 25)
            return 5;
        else if (this.percentage == 20)
            return 4;
        else if (this.percentage == 15)
            return 3;
        else if (this.percentage == 10)
            return 2;
        else if (this.percentage == 5)
            return 1;
        else
            return 0;
    }
}
