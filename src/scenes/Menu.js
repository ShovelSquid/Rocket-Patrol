class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/Frog_Patrol.m4a');
        this.load.audio('sfx_explosion', './assets/Car_explodes.m4a');
        this.load.audio('sfx_charge', './assets/Charging.m4a');
        this.load.audio('sfx_launch', './assets/Launch.m4a')
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
        'Frog Patrol', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2, 
        'Use <-- --> arrows to move and (UP) to fire', menuConfig).setOrigin(0.5);
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
                carSpeed: 4,
                gameTimer: 60000
            };
        }
        if (difficulty == 'hard') {
            game.settings = {
                carSpeed: 6,
                gameTimer: 45000
            };
        }
        this.sound.play('sfx_select');
        this.scene.start('playScene');
    }
}