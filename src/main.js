// Hello there!
// This was all completed, made, fabricated, etc. by Kaelen Cook
// Currently it is Wednesday April 20th (I know, what a fun day)
// This has taken me approximately 200 years to finish, though in hours I think
//      that's closer to maybe 15? 16? I could not tell you to be honest.

// POINTS!
// I added parallax scrolling in the city background, there are multiple images
//      which scroll at different speeds [10 wonderful little points]
// I fully changed the art aesthetic, including sounds and some parts of the UI
//      (I got rid of the top border, gave the background a different color, 
//       changed the other borders to be yellow, made the different scores
//       different colors depending on the player, not even to mention all the art
//       and the beautiful, BEAUTIFUL mouth noises). [60 points baybee!]
// I added a simultaneous two player mode [30 scrumptious points]
// I also added a charging mechanic to fire further, though that's not listed on
//      the list of items (but if it were, I think it should be 20 points. That shit 
//       was not too hard actually but still more difficult than parallax scrolling).
// But yeah! That's frog patrol, I hope you enjoy! 
// The frogs certainly don't. 

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
let keyR, keyLEFT, keyRIGHT, keyUP, keyW, keyA, keyD;

// set UI sizes :

let borderUISize = game.config.width / 15;
let borderPadding = borderUISize / 3;

// game done