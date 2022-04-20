// Rocket prefab class
class Frog extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, left, right, fire) {
        super(scene, x, y, texture, frame);

        // add to existing scene :
        scene.add.existing(this);       // adds to existing scene, some fun with updates and displays
        // Define Input
        this.moveLeft = left;
        this.moveRight = right;
        this.fireButton = fire;
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

        console.log(texture);
        this.color = texture.replace('Frog', '');
        console.log(this.color);

        // add sound effect :
        this.sfxlaunch = scene.sound.add('sfx_launch');         // add the rocket sound effect
        this.sfxcharge = scene.sound.add('sfx_charge');
    }

    update() {
        // movement of the left and of the right : 
        if (!this.isFiring && !this.isCharging) {
            if (this.moveLeft.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
                this.setFlip(0, 0);
            }
            else if (this.moveRight.isDown && this.x <= game.config.width - 
                borderUISize - this.width) {
                this.x += this.moveSpeed;
                this.setFlip(1, 0);
            }
        }

        // fire button
        if (!this.isFiring) {
            if (Phaser.Input.Keyboard.JustDown(this.fireButton)) {
                console.log("charging...");
                // start Charge
                this.isCharging = true;             // charging mode is true
                this.charge = this.minCharge;       // reset current charge to minimum
                this.anims.play(this.color + 'Charge');
                this.sfxcharge.play();
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
                this.launch = this.scene.time.delayedCall(4000, () => {             // if 4 seconds pass, fire frog
                    console.log("you waited too long >:(");
                    this.fire();
                }, null, this);
            }
    
            if (Phaser.Input.Keyboard.JustUp(this.fireButton) && this.isCharging) {
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
        this.anims.play(this.color + 'Launch');
        this.sfxlaunch.play();
        this.sfxcharge.stop();
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
        this.anims.play(this.color + 'Idle');
    }
}