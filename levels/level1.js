let level1;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(100),
            new Chicken(300),
            new Chicken(500),
            new Chicken(700),
            new Chicken(900),
            new Chicken(1100),

            new Chick(300),
            new Chick(600),
            new Chick(900),
            new Chick(1200),
            new Chick(1500),
            new Chick(1800),

            new Endboss()
        ],
        [
            new Cloud(0),
            new Cloud(800),
            new Cloud(1600)
        ],
        [
            new Coin(300, 100),
            new Coin(700, 200),
            new Coin(1000, 130),
            new Coin(1500, 80),
            new Coin(2000, 130)
        ],
        [
            new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 500),
            new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 900),
            new Salsa('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1200),
            new Salsa('img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 1600),
            new Salsa('img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 1950)
        ],
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],
    );
}

