class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load in the required assets :
        // FROGS
        // this.load.image('rocket', './assets/FROG-200.png');
        this.load.spritesheet('frog', './assets/FROGSheet-200.png', 
        {frameWidth: 32*2, frameHeight: 32*2, startFrame: 0, endFrame: 2});
        // other less gigachad things
        this.load.image('car', './assets/car-200.png');
        this.load.image('background', './assets/background.png');
        this.load.image('highway', './assets/highway-200.png');
        // load spritesheet :
        this.load.spritesheet('explosion', './assets/explosion-Sheet-200.png',
        {frameWidth: 64*2, frameHeight: 32*2, startFrame: 0, endFrame: 11});
    }
    create() {
        // add a highway background
        this.background = this.add.tileSprite(0, 0, 640*scale, 480*scale, 'background').setOrigin(0, 0);
        this.highway = this.add.tileSprite(0, 0, 640*scale, 480*scale, 'highway').setOrigin(0, 0);
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
        game.config.height - borderUISize - borderPadding*3, 'frog').setOrigin(0.5, 0);

        // add cars :
        this.ship01 = new Car(this, game.config.width + borderUISize * 6, 
            borderUISize * 4, 'car', 0, 30).setOrigin(0, 0);
        this.ship02 = new Car(this, game.config.width + borderUISize * 3, 
            borderUISize * 5, 'car', 0, 20).setOrigin(0, 0);
        this.ship03 = new Car(this, game.config.width, 
            borderUISize * 6, 'car', 0, 10).setOrigin(0, 0);

        // define input :
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config :
        // explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 11, first: 0}),
            frameRate: 12
        });
        // Frog animations :
        // idle frog animation
        this.anims.create( {
            key: 'idle',
            frames: this.anims.generateFrameNumbers('frog', {start: 0, end: 0, first: 0}),
            frameRate: 0,
            repeat: -1,
        });
        // charging frog animation
        this.anims.create({ 
            key: 'charge',
            frames: this.anims.generateFrameNumbers('frog', {start: 1, end: 1, first: 1}),       // first might be 0?
            frameRate: 0,
            repeat: -1,
        });
        // mega frog
        this.anims.create( {
            key: 'launch',
            frames: this.anims.generateFrameNumbers('frog', {start: 2, end: 2, first: 2}),
            frameRate: 0,
            repeat: -1,
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
        this.clock = this.time.delayedCall(game.settings.gameTimer , () => {
            this.add.text(game.config.width/2, game.config.height/2, 
            'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + borderUISize, 
            'Press [R] to Restart or <-- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        this.background.tilePositionX -= 2;
        this.highway.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            console.log("we're out");
            this.scene.restart();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            console.log("back to the menu, boys");
            this.scene.start('menuScene');
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
        ship.alpha = 0.5;
        ship.moveSpeed = 0;                     // stop ship from moving
        // add boom explosion 
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        ship.reset();
        boom.anims.play('explode');             // play explosion animation
        boom.on('animationcomplete', () => {    // callback after animation done
            ship.alpha = 1;                     // turn ship back on
            ship.moveSpeed = ship.baseSpeed;    // allow it to move again
            boom.destroy();                     // bye bye explosion sprite
        });
        // add and display new score : 
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}