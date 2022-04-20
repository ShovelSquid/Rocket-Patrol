class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load in the required assets :
        // FROGS
        // this.load.image('Frog', './assets/FROG-200.png');
        this.load.spritesheet('greenFrog', './assets/greenFROGSheet-200.png', 
        {frameWidth: 32*2, frameHeight: 32*2, startFrame: 0, endFrame: 2});
        this.load.spritesheet('redFrog', './assets/redFROGSheet-200.png', 
        {frameWidth: 32*2, frameHeight: 32*2, startFrame: 0, endFrame: 2});
        // other less gigachad things
        this.load.image('car', './assets/car-200.png');
        this.load.image('background', './assets/background-200.png');
        this.load.image('cityback', './assets/cityback-200.png');
        this.load.image('cityfront', './assets/cityfront-200.png');
        this.load.image('highway', './assets/highway-200.png');
        // load spritesheet :
        this.load.spritesheet('explosion', './assets/explosion-Sheet-200.png',
        {frameWidth: 64*2, frameHeight: 32*2, startFrame: 0, endFrame: 11});
    }
    create() {
        // add a highway background
        this.background = this.add.tileSprite(0, 0, 640*scale, 480*scale, 'background').setOrigin(0, 0);
        this.cityback = this.add.tileSprite(0, 0, 640*scale, 480*scale, 'cityback').setOrigin(0, 0);
        this.cityfront = this.add.tileSprite(0, 0, 640*scale, 480*scale, 'cityfront').setOrigin(0, 0);
        this.highway = this.add.tileSprite(0, 0, 640*scale, 480*scale, 'highway').setOrigin(0, 0);


        // define input :
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        // add player one frog :
        this.p1Frog = new Frog(this, game.config.width/2 - borderUISize, 
        game.config.height - borderUISize - borderPadding*3, 'greenFrog', 0, 
        keyLEFT, keyRIGHT, keyUP).setOrigin(0.5, 0);
        // add player two frog : 
        this.p2Frog = new Frog(this, game.config.width/2 + borderUISize, 
        game.config.height - borderUISize - borderPadding*3, 'redFrog', 0, 
        keyA, keyD, keyW).setOrigin(0.5, 0);

        // add cars :
        this.ship01 = new Car(this, game.config.width + borderUISize * 6, 
            borderUISize * 3 + borderPadding, 'car', 0, 30).setOrigin(0, 0);
        this.ship02 = new Car(this, game.config.width + borderUISize * 3, 
            borderUISize * 4 + borderPadding * 2, 'car', 0, 20).setOrigin(0, 0);
        this.ship03 = new Car(this, game.config.width, 
            borderUISize * 6, 'car', 0, 10).setOrigin(0, 0);


        // Background rectangles
        // this.add.rectangle(0, borderUISize + borderPadding,
        //     game.config.width, borderUISize * 2, 0x03FEA3).setOrigin(0, 0);
        this.add.rectangle(0, 0, 
            game.config.width, borderUISize, 0xFFFFAA).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, 
            game.config.width, borderUISize, 0xFFFFAA).setOrigin(0, 0);
        this.add.rectangle(0, 0, 
            borderUISize, game.config.height, 0xFFFFAA).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, 
            borderUISize, game.config.height, 0xFFFFAA).setOrigin(0, 0);        



        // animation config :
        // explosion animation
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 11, first: 0}),
            frameRate: 12
        });
        // Green Frog animations :
        // idle frog animation
        this.anims.create({
            key: 'greenIdle',
            frames: this.anims.generateFrameNumbers('greenFrog', {start: 0, end: 0, first: 0}),
            frameRate: 0,
            repeat: -1,
        });
        // charging frog animation
        this.anims.create({ 
            key: 'greenCharge',
            frames: this.anims.generateFrameNumbers('greenFrog', {start: 1, end: 1, first: 1}),
            frameRate: 0,
            repeat: -1,
        });
        // mega frog
        this.anims.create( {
            key: 'greenLaunch',
            frames: this.anims.generateFrameNumbers('greenFrog', {start: 2, end: 2, first: 2}),
            frameRate: 0,
            repeat: -1,
        });
        // Red Frog animations : 
        // idle frog animation
        this.anims.create({
            key: 'redIdle',
            frames: this.anims.generateFrameNumbers('redFrog', {start: 0, end: 0, first: 0}), 
            frameRate: 0,
            repeat: -1
        });
        // charging frog animation
        this.anims.create({ 
            key: 'redCharge', 
            frames: this.anims.generateFrameNumbers('redFrog', {start: 1, end: 1, first: 1}),
            frameRate: 0,
            repeat: -1
        });
        // launching frog animation
        this.anims.create({
            key: 'redLaunch',
            frames: this.anims.generateFrameNumbers('redFrog', {start: 2, end: 2, first: 2}),
            frameRate: 0,
            repeat: -1
        });

        // score!
        this.p1Score = 0;
        this.p2Score = 0;

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
        // player one score display
        scoreConfig.color = '#0AFF0A';
        this.scoreLeft = this.add.text(borderUISize + borderPadding, 
            borderUISize + borderPadding * 2, this.p1Score, scoreConfig).setOrigin(0, 0);
        // player two score display
        scoreConfig.color = '#FF0A0A';
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding, 
            borderUISize + borderPadding * 2, this.p2Score, scoreConfig).setOrigin(1, 0);
        
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
        this.cityback.tilePositionX -= 1;
        this.cityfront.tilePositionX -= 3;
        this.highway.tilePositionX -= 4;
        if (!this.gameOver) {
            this.p1Frog.update();
            this.p2Frog.update();
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

        // collision detection between player 1 and ships
        if (this.checkCollision(this.p1Frog, this.ship01)) {
            console.log("ship 1 has been grounded");
            this.p1Frog.reset();
            this.shipExplode(this.ship01, 1);
        }
        if (this.checkCollision(this.p1Frog, this.ship02)) {
            console.log("we've got the middle bug!");
            this.p1Frog.reset();
            this.shipExplode(this.ship02, 1);
        }
        if (this.checkCollision(this.p1Frog, this.ship03)) {
            console.log("locust ship 3 destroyed!");
            this.p1Frog.reset();
            this.shipExplode(this.ship03, 1);
        }
        // collision detection between player 2 and ships
        if (this.checkCollision(this.p2Frog, this.ship01)) {
            console.log("ship 1 has been grounded");
            this.p2Frog.reset();
            this.shipExplode(this.ship01, 2);
        }
        if (this.checkCollision(this.p2Frog, this.ship02)) {
            console.log("we've got the middle bug!");
            this.p2Frog.reset();
            this.shipExplode(this.ship02, 2);
        }
        if (this.checkCollision(this.p2Frog, this.ship03)) {
            console.log("locust ship 3 destroyed!");
            this.p2Frog.reset();
            this.shipExplode(this.ship03, 2);
        }
    }

    checkCollision(frog, ship) {
        // AABB checking
        if (frog.x < ship.x + ship.width && 
            frog.x + frog.width > ship.x && 
            frog.y < ship.y + ship.height && 
            frog.y + frog.height > ship.y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship, player) {
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
        if (player == 1) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        }
        else if (player == 2) {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        this.sound.play('sfx_explosion');
    }
}