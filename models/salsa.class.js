class Salsa extends MovableObject {
    height = 90;
    width = 90;
    y = 340;
    offset = {
        top: 15,
        right: 20,
        bottom: 15,
        left: 30
    };

    /**
     * Constructor for initializing the object with an image and a position.
     * 
     * This method loads an image and sets the object's initial x-position.
     * 
     * @param {string} image - The image path to load for the object.
     * @param {number} x - The initial x-position of the object.
     */
    constructor(image, x) {
        super().loadImg(image);

        this.x = x;
    }
}