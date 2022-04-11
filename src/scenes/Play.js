const { Phaser } = require("../../lib/phaser");

class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load in the required assets :
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/locust.png');
        this.load.image('background', './assets/background.png');
        this.load.image('starfield', './assets/frontground.png');
        // load spritesheet :
        this.load.spritesheet('explosion', './assets/explosion-Sheet.png', 
        {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 11});
    }
    create() {
        // add a starfield background
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // Background rectangles
        this.add.rectangle(0, borderUISize + borderPadding,
            game.config.width, borderUISize * 2, 0x03FEA3).setOrigin(0, 0);
        this.add.rectangle(0, 0, 
            game.config.width, borderUISize, 0xFFFFAA).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, 
            game.config.width, borderUISize, 0xFFFFAA).setOrigin(0, 0);
        this.add.rectangle(0, 0, 
            borderUISize, game.config.height, 0xFFFFAA).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, 
            borderUISize, game.config.height, 0xFFFFAA).setOrigin(0, 0);

        // add player one rocket :
        this.p1Rocket = new Rocket(this, game.config.width/2, 
        game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships :
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, 
            borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, 
            borderUISize * 5, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 
            borderUISize * 6, 'spaceship', 0, 10).setOrigin(0, 0);

        // define input :
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config :
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 11, first: 0}),
            frameRate: 12
        });

        // score!
        this.p1Score = 0;

        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFAA',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        
        // GAME OVER flag?
        this.gameOver = false;
        // Final timer!
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(1000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 
            'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 
            'Press [R] to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        this.background.tilePositionX -= 2;
        this.starfield.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            console.log("ship 1 has been grounded");
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            console.log("we've got the middle bug!");
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            console.log("locust ship 3 destroyed!");
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket, ship) {
        // AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && 
            rocket.y + rocket.height > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily HIDE the ship . ____ . 
        ship.alpha = 0;
        // add boom explosion 
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explosion animation
        boom.on('animationcomplete', () => {    // callback after animation done
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // turn ship back on
            boom.destroy();                     // bye bye explosion sprite
        });
        // add and display new score :
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}