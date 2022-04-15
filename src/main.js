console.log("hello there");
let scale = 2;
let config = {
    type: Phaser.CANVAS,
    width: 640*scale,
    height: 480*scale,
    title: "Rocket Patrol",
    version: "2.01",
    author: "Kaelen Cook",
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// reserve input keys :
let keyR, keySPACE, keyLEFT, keyRIGHT;

// set UI sizes :

let borderUISize = game.config.width / 15;
let borderPadding = borderUISize / 3;

// game done