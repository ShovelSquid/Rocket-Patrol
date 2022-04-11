console.log("hello there");

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
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