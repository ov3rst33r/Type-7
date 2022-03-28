let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    rows: 6,
    cols: 6,                            //short for columns
    dots: [1, 2, 3, 4, 5, 6],
    scene: new GameScene()
};

let game = new Phaser.Game(config);