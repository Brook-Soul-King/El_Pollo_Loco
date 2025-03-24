class DrawableObject {
    x = 120;
    y = 120;
    height = 190;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from a specified path and sets it as the image source.
     * @param {string} path - The path to the image file to be loaded.
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image onto the canvas at the specified position.
     * @param {CanvasRenderingContext2D} ctx - The 2D context of the canvas on which to draw the image.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads multiple images from an array of paths and caches them.
     * @param {Array<string>} arr - An array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}