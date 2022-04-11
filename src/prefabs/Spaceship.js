// Spaceship prefab class
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);       // add to existing scene
        this.points = pointValue;       // store point value
        this.moveSpeed = 4;             // speed pixels per speed frames
    }

    update() {
        // move spaceship left
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