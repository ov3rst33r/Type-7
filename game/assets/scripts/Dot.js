class Dot extends Phaser.GameObjects.Sprite {
    constructor(scene, position, value) {
        super(scene, position.x, position.y, 'dot' + value);
        this.scene = scene;
        this.value = value;
        this.setOrigin(0, 0);
        this.scene.add.existing(this);
        this.setInteractive();
    }

    click() {
        
    }
}