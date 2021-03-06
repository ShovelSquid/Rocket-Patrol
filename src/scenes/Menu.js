class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    }
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#000000',
            color: '#FFFFAA',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text : 
        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 
        'ROCKET PATROL', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 
        'Use <-- --> arrows to move and (SPACE) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 
        'Press <-- for Novice or --> for Expert', menuConfig).setOrigin(0.5);

        // define Keys :
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        keyLEFT.on('down', () => {
            console.log('yeah we goin easy')
            this.startGame('easy');
        })
        keyRIGHT.on('down', () => {
            console.log('THIS AINT LIKE THE SIMULATIONS');
            this.startGame('hard');
        })
    }

    // update() {
    //     // if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
    //     //     // easy mode

    //     //     this.sound.play('sfx_select');
    //     //     this.scene.start('playScene');
    //     // }

    //     // if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
    //     //     // hard mode

    //     //     this.sound.play('sfx_select');
    //     //     this.scene.start('playScene');
    //     // }
    // }

    // why even have update lol

    startGame(difficulty) {
        if (difficulty == 'easy') {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 60000
            };
        }
        if (difficulty == 'hard') {
            game.settings = {
                spaceshipSpeed: 6,
                gameTimer: 45000
            };
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');
    }
}