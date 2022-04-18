// Rocket prefab class
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        // add to existing scene :
        scene.add.existing(this);       // adds to existing scene, some fun with updates and displays
        // Booleans
        this.isFiring = false;          // boolean to see if firing, currently it isn't. YET
        this.isCharging = false;        // boolean to see if charging, also currently not yet
        // Speed & Charging
        this.moveSpeed = 3*scale;           // SPEED  // (in pixels per frame)
        this.maxCharge = 10*scale;          // Max launch speed
        this.minCharge = 2*scale;           // Mininum launch speed
        this.charge = this.minCharge;       // charge speed to set firespeed to
        this.fireSpeed = this.minCharge;    // actual launch speed
        // height
        this.baseHeight = this.y;

        // add sound effect :
        this.sfxRocket = scene.sound.add('sfx_rocket');         // add the rocket sound effect
    }

    update() {
        // movement of the left and of the right : 
        if (!this.isFiring && !this.isCharging) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
                this.setFlip(0, 0);
            }
            else if (keyRIGHT.isDown && this.x <= game.config.width - 
                borderUISize - this.width) {
                this.x += this.moveSpeed;
                this.setFlip(1, 0);
            }
        }

        // fire button
        if (!this.isFiring) {
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                console.log("charging...");
                // start Charge
                this.isCharging = true;             // charging mode is true
                this.charge = this.minCharge;       // reset current charge to minimum
                this.anims.play('charge');
                // Charging events
                this.chargeLowest = this.scene.time.delayedCall(500, () => {        // after half a second, increase charge
                    console.log("Charging...")
                    this.charge = this.maxCharge*0.3;
                }, null, this);
                this.chargeMid = this.scene.time.delayedCall(1000, () => {          // after a second, further increase charge
                    console.log("CHARGING...!!")
                    this.charge = this.maxCharge*0.6;
                }, null, this);
                this.chargeMax = this.scene.time.delayedCall(2000, () => {          // after 2 seconds, fully charged
                    console.log("CHARGED!!")
                    this.charge = this.maxCharge;
                }, null, this);
                this.launch = this.scene.time.delayedCall(5000, () => {             // if 5 seconds pass, fire frog
                    console.log("you waited too long >:(");
                    this.fire();
                }, null, this);
            }
    
            if (Phaser.Input.Keyboard.JustUp(keySPACE) && this.isCharging) {
                this.fire();
            }
        }

        // if fired, move up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.fireSpeed;
        }

        // reset on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    fire() {
        console.log("FIRE!");
        this.isFiring = true;
        this.isCharging = false;
        this.anims.play('launch');
        // release charge at speed
        this.fireSpeed = this.charge;
        this.scene.time.removeEvent([this.chargeLowest, this.chargeMid, this.chargeMax, this.launch]);      // keep events from going on in the background
        this.fall = this.scene.time.delayedCall(1000, () => {           // reset frog after a second of flying through the night sky
            console.log('hullo');
            this.reset();
        }, null, this);
    }

    reset() {
        this.scene.time.removeEvent(this.fall);
        this.isFiring = false;
        this.y = this.baseHeight;
        this.anims.play('idle');
    }
}