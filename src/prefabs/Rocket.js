// Rocket prefab class
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to existing scene :
        scene.add.existing(this);       // adds to existing scene, some fun with updates and displays
        this.isFiring = false;          // boolean to see if firing, currently it isn't. YET
        this.moveSpeed = 2;             // SPEED  // (in pixels per frame)
    }

    update() {
        // movement of the left and of the right : 
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width - 
                borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // fire button
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            console.log("FIRE!")
            this.isFiring = true;
        }

        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
        }
    }
}