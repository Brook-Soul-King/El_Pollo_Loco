class Level {
    enemies;
    clouds;
    collectables;
    backgroundObjects;
    level_end_x = 2200;

    /**
     * Initializes the game objects such as enemies, clouds, coins, salsas, and background objects.
     * 
     * @param {Array} enemies - Array of enemy objects in the game.
     * @param {Array} clouds - Array of cloud objects in the game.
     * @param {Array} coins - Array of coin objects in the game.
     * @param {Array} salsas - Array of salsa objects in the game.
     * @param {Array} backgroundObjects - Array of background objects in the game.
     */
    constructor(enemies, clouds, coins, salsas, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.salsas = salsas;
        this.backgroundObjects = backgroundObjects;
    }
}