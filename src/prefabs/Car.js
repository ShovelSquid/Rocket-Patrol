// Car prefab class
class Car extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);       // add to existing scene
        this.points = pointValue;       // store point value
        this.baseSpeed = game.settings.carSpeed*scale;
        this.moveSpeed = this.baseSpeed;             // speed pixels per speed frames
    }

    update() {
        // move car left
        this.x -= this.moveSpeed;
        // wrap around from left edge to right edge
        if (this.x <= 0 - this.width) {
            this.reset();
        }
    }
    
    reset() {
        this.x = game.config.width;
    }
}