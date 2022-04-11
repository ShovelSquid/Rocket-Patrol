class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {
        // load in the required assets :
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/locust.png');
        this.load.image('background', './assets/background.png');
        this.load.image('starfield', './assets/frontground.png')
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

        // define input :
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        this.background.tilePositionX -= 2;
        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();
    }
}