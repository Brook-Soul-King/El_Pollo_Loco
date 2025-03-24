class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    
    /**
     * Constructor for initializing an object that loads an image and sets its position on the x-axis.
     * The y-axis position is set relative to the height of the object.
     * @param {string} imagePath - The path to the image file that should be loaded for the object.
     * @param {number} x - The x-coordinate (horizontal position) of the object on the screen.
     */
    constructor(imagePath, x) {
        super().loadImg(imagePath);
        this.x = x; 
        this.y = 480 - this.height;
    }
}