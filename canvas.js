// By Andreas Faisst, December 2021
// Graphics from: https://www.gamedeveloperstudio.com/
//file:///Users/afaisst/Sites/JSGames/game2/index.html

// CANVAS SETUP
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 500;

ctx.font = '30px Georgia';
ctx.textAlign = "center";
ctx.textBaseline = "middle"



// GLOBAL VARIABLES
let gameSpeed = 3; // game speed
let score = 0; // score counter
let gameOver = false; // flag for game over
let gameFrame = 1; // game frame
let gamestarted = false; // flag set if game started
let player_acc = false; // flag if player is pressing RightArrow for acceleration

let packageArray = []; // array for packages (although only 1 package per drop)
let islandArray = []; // array for Islands
let fuelplaneArray = []; // array for fuel planes (although only 1 at a time)

let dragforce = 0.1; // drag force (-x)
let gravityforce = 0.1; // gravity (+y)

let fuel = 100; // Fuel in Percent

let fuelplanespawnspeed = parseInt(Math.random()*300+200); // at this rate, fuel planes are spawned. This gets recalculated after each fuel plane.

