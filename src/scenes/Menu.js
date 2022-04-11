class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    create() {
        this.add.text(config.width/4, config.height/8, "Menu for the infamous Rocket Patrol");
        this.scene.start("playScene");
    }
}